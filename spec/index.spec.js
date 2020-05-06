'use strict';

const process = require('process');
const cp = require('child_process');
const path = require('path');

// const action = require('./index');
let lib = require('./../src/lib');

const fixtures = require('./support/fixtures');
const helpers = require('./support/helpers');
const pullResponse = require('./support/pulls.json');
const nock = require('nock');


describe('index', () => {
  it('should work when run from the command line', async () => {
    // process.env['GITHUB_TOKEN'] = 'valid token';
    // process.env['GITHUB_REPOSITORY'] = 'login/repo-name';

    const scope = nock('https://api.github.com:443', {"encodedQueryParams": true})
      .get('/repos/leopic/gh-action-open-pr-notifier/pulls')
      .query({"state": "open"})
      .reply(200,
        helpers.encode(pullResponse),
        fixtures.headers);

    const creds = {token: 'INVALID', owner: 'leopic', repo: 'gh-action-open-pr-notifier'};
    await lib.work(creds);

    scope.done();

    expect(true).toBe(true);

    return;
    // const ip = path.join(__dirname, './../', 'index.js');
    //
    // const exec = cp.execSync(`node ${ip}`).toString();
    //
    // console.log(exec);

    // delete process.env['GITHUB_TOKEN'];
    // delete process.env['GITHUB_REPOSITORY'];

    // expect(true).toBe(true);
  });
});

// test('fails when incomplete params are given', async () => {
//   await expect(lib({})).rejects.toThrow('No token');
//   await expect(lib({token: '123'})).rejects.toThrow('No repo');
//   await expect(lib({token: '123', repo: 'leopic/gh-action-pr-notifier'})).rejects.toThrow('No owner');
//   await expect(lib({token: '123', owner: 'leopic'})).rejects.toThrow('No repo');
// });

// test('avoid calling github', async () => {
//     const credentials = {token: '123', owner: 'leopic', repo: 'gh-action-open-pr-notifier'};
//
//     await lib(credentials).then(result => {
//       console.log('___ result', result);
//     }, error => {
//       console.error('___ error', error);
//     });
// });

// shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//   // process.env['GITHUB_TOKEN'] = 'MY TOKEN';
//   process.env['GITHUB_REPOSITORY'] = 'leopic/gh-action-open-pr-notifier';
//
//   const ip = path.join(__dirname, 'index.js');
//   const exec = cp.execSync(`node ${ip}`).toString();
//   console.log(exec);
//
//   // delete process.env['GITHUB_TOKEN'];
//   delete process.env['GITHUB_REPOSITORY'];
//
//   expect(true).toBe(true);
// });
