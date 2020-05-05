'use strict';

const process = require('process');
const cp = require('child_process');
const path = require('path');

// const action = require('./index');
const lib = require('./../../src/lib');

const context = require('@actions/github').context;
const Octokit = require('@octokit/rest');

describe('anus start', () => {
  it('should just work', () => {
    expect(true).toBeTrue();
  });
});

// beforeEach(() => {
//   // context.mockClear();
// });
//
// it('ing mocks', () => {
//   console.log(context);
//   console.log(Octokit);
// });

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
