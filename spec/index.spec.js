'use strict';

const nock = require('nock');

const lib = require('./../src/lib');

const fixtures = require('./support/fixtures');

describe('lib', () => {
  const token = 'valid token';
  const repo = 'repo-name';
  const owner = 'login';
  const cannedResponses = fixtures.pullRequestData.responses;
  const cannedHeaders = fixtures.pullRequestData.headers;

  let networkStubBase = nock('https://api.github.com', {"encodedQueryParams": true})
    .get('/repos/login/repo-name/pulls')
    .query({"state": "open"});

  const handlers = {
    error: () => {},
    success: () => {}
  };

  let errorSpy;
  let successSpy;

  beforeEach(() => {
    errorSpy = spyOn(handlers, 'error');
    successSpy = spyOn(handlers, 'success');
  });

  it('should reject incomplete invocations', async () => {
    await lib.work({}).then(handlers.success, handlers.error);
    await lib.work({token}).then(handlers.success, handlers.error);
    await lib.work({token, repo}).then(handlers.success, handlers.error);
    await lib.work({token, owner}).then(handlers.success, handlers.error);

    expect(errorSpy).toHaveBeenCalledTimes(4);
    expect(successSpy).not.toHaveBeenCalled();
  });

  it('should handle empty lists', async () => {
    const scope = networkStubBase.reply(200, cannedResponses.empty, cannedHeaders);

    await lib.work({token, owner, repo}).then(handlers.success, handlers.error);

    scope.done();

    expect(errorSpy).not.toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalledTimes(1);

    const [result] = Array.from(successSpy.calls.mostRecent().args);
    const expectation = 'No open pull requests right now.';
    expect(result).toBe(expectation);
  });

  it('should handle full lists', async () => {
    const scope = networkStubBase.reply(200, cannedResponses.full, cannedHeaders);

    await lib.work({token, owner, repo}).then(handlers.success, handlers.error);

    scope.done();

    expect(errorSpy).not.toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalledTimes(1);

    const [result] = Array.from(successSpy.calls.mostRecent().args);
    const expectation = `These are the open pull requests right now:\n- [Trying to trigger a PR](https://github.com/leopic/gh-action-open-pr-notifier/pull/2) by leopic`;
    expect(result).toBe(expectation);
  });
});
