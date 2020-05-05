const core = require('@actions/core');
const context = require('@actions/github').context;

const lib = require('./src/lib');

const run = async () => {
  try {
    const token = process.env['GITHUB_TOKEN'] || '';
    const {owner, repo} = context.repo;

    const prs = await lib({token, owner, repo});

    core.info(prs);
    core.setOutput('message', prs);
  } catch (error) {
    core.setFailed(error.message)
  }
};

run();
