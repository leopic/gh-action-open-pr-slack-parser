const core = require('@actions/core');
const context = require('@actions/github').context;

const lib = require('./src/lib');

module.exports.run = async () => {
  try {
    const originalRepository = process.env['GITHUB_REPOSITORY'];

    if (process.env['MOCK_GITHUB_REPOSITORY'] !== '') {
      process.env['GITHUB_REPOSITORY'] = process.env['MOCK_GITHUB_REPOSITORY'];
    }

    const {owner, repo} = context.repo;
    const token = process.env['GITHUB_TOKEN'] || '';
    const output = await lib.work({token, owner, repo});

    core.setOutput('message', output);
    core.info(output);

    process.env['GITHUB_REPOSITORY'] = originalRepository;
  } catch (error) {
    core.setFailed(error.message)
  }
};

if (!process.argv.join('').includes('jasmine')) {
  module.exports.run();
}
