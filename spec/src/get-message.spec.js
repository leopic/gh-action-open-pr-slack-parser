'use strict';


const token = 'valid token';
const repo = 'repo-name';
const owner = 'login';

const handlers = {
  error: () => {
  },
  success: () => {
  }
};

let errorSpy;
let successSpy;

const {GitHub: fixtures} = require('../support/fixtures');
const getMessage = require('../../src/get-message');

describe('getMessage', () => {
  beforeEach(() => {
    errorSpy = spyOn(handlers, 'error');
    successSpy = spyOn(handlers, 'success');
  });

  it('should reject incomplete invocations', async () => {
    await getMessage({}).then(handlers.success, handlers.error);
    await getMessage({token}).then(handlers.success, handlers.error);
    await getMessage({token, repo}).then(handlers.success, handlers.error);
    await getMessage({token, owner}).then(handlers.success, handlers.error);

    expect(errorSpy).toHaveBeenCalledTimes(4);
    expect(successSpy).not.toHaveBeenCalled();
  });

  it('should prefix error messages with "GitHub"', async () => {
    const Octokit = {
      pulls: {
        list: () => {
          throw new Error('Pull request fetching error');
        }
      }
    };

    await getMessage({Octokit, owner, repo}).then(handlers.success, handlers.error);

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(successSpy).not.toHaveBeenCalled();

    const [errorThrown] = Array.from(errorSpy.calls.mostRecent().args);
    expect(errorThrown.message).toBe('GitHub Pull request fetching error');
  });

  it('should handle cases without open pull requests', async () => {
    const Octokit = {
      pulls: {
        list: () => Promise.resolve(fixtures.pulls.list.empty)
      },
      repos: {
        get: () => Promise.resolve(fixtures.repos.get)
      }
    };

    await getMessage({Octokit, owner, repo}).then(handlers.success, handlers.error);

    expect(errorSpy).not.toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalledTimes(1);

    const [result] = Array.from(successSpy.calls.mostRecent().args);
    const expectation = [
      {type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*<https://github.com/login/repo-name|login/repo-name>* has no open pull requests right now'
        }
      },
      {type: 'divider'}
    ];
    expect(result).toEqual(expectation);
  });

  it('should handle repos with open pull requests', async () => {
    const Octokit = {
      pulls: {
        list: () => Promise.resolve(fixtures.pulls.list.full)
      }
    };

    await getMessage({Octokit, owner, repo}).then(handlers.success, handlers.error);

    expect(errorSpy).not.toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalledTimes(1);

    const [result] = Array.from(successSpy.calls.mostRecent().args);
    const lineOne = '*<https://github.com/login/repo-name|login/repo-name>* has the following PRs open:';
    const lineTwo = '- <https://github.com/login/repo-name/pull/2|Trying to trigger a PR> by login';
    const lineThree = '- <https://github.com/login/repo-name/pull/3|Trying to trigger yet another PR> by login';
    const message = [lineOne, lineTwo, lineThree].join(`\n`);

    const expectation = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message
        }
      },
      {
        type: 'divider'
      }
    ];

    expect(result).toEqual(expectation);
  });
});
