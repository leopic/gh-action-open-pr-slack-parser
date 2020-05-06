const core = require('@actions/core');
const context = require('@actions/github').context;

const lib = require('./src/lib');

const run = async () => {
  try {
    const token = process.env['GITHUB_TOKEN'] || '';
    const {owner, repo} = context.repo;

    console.log('___ debug', lib.work, token, owner, repo);
    // console.log('___ debug', lib.work, token, owner, repo);

    console.log(await lib.work({token, owner, repo}));
    // const prs = await lib.work({token, owner, repo});
    //
    // core.info(prs);
    // core.setOutput('message', prs);
  } catch (error) {
    core.setFailed(error.message)
  }
};

run();
