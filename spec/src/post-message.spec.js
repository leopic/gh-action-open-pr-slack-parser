'use strict';

const token = 'valid slack token';
const channel = 'D013WYMJ3AJ';
const blocks = [
  {type: 'section', text: {type: 'mrkdwn', text: 'mock message'}}
];

const handlers = {
  error: () => {
  },
  success: () => {
  }
};

let errorSpy;
let successSpy;

const {Slack: fixtures} = require('../support/fixtures');
const postMessage = require('../../src/post-message');

describe('postMessage', () => {
  beforeEach(() => {
    errorSpy = spyOn(handlers, 'error');
    successSpy = spyOn(handlers, 'success');
  });

  it('should reject incomplete invocations', async () => {
    await postMessage().then(handlers.success, handlers.error);
    await postMessage({token}).then(handlers.success, handlers.error);
    await postMessage({token, channel}).then(handlers.success, handlers.error);
    await postMessage({token, blocks}).then(handlers.success, handlers.error);
    await postMessage({channel, blocks}).then(handlers.success, handlers.error);

    expect(errorSpy).toHaveBeenCalledTimes(5);
    expect(successSpy).not.toHaveBeenCalled();
  });

  it('should prefix error messages with "Slack"', async () => {
    const mockSlackClient = {
      chat: {
        postMessage: () => {
          throw new Error('Invalid channel id');
        }
      }
    };

    await postMessage({Slack: mockSlackClient, channel, blocks}).then(handlers.success, handlers.error);

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(successSpy).not.toHaveBeenCalled();

    const [errorThrown] = Array.from(errorSpy.calls.mostRecent().args);
    expect(errorThrown.message).toBe('Slack Invalid channel id');
  });

  it('should relay failures posting messages to slack', async () => {
    const mockSlackClient = {
      chat: {
        postMessage: () => Promise.resolve({ok: false})
      }
    };

    await postMessage({Slack: mockSlackClient, channel, blocks}).then(handlers.success, handlers.error);

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(successSpy).not.toHaveBeenCalled();

    const [errorThrown] = Array.from(errorSpy.calls.mostRecent().args);
    expect(errorThrown.message).toBe('Slack Error posting message');
  });

  it('should correctly post messages to slack', async () => {
    const mockSlackClient = {
      chat: {
        postMessage: () => Promise.resolve(fixtures.chat.postMessage)
      }
    };

    await postMessage({Slack: mockSlackClient, channel, blocks}).then(handlers.success, handlers.error);

    expect(errorSpy).not.toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalledTimes(1);

    const [result] = Array.from(successSpy.calls.mostRecent().args);
    expect(result).toBeTruthy();
  });
});
