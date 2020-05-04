import {context} from "@actions/github";

const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = process.env['GITHUB_TOKEN'] || '';

    if (token === '') {
      throw new Error('No token');
    }

    const octokit = new github.GitHub(token);

    const { data: pulls } = await octokit.pulls.list({
      ...context.repo,
      state: 'open'
    });

    console.log(pulls);
    console.log('Open PRs:', pulls.map(pr => `- ${pr.title} by ${pr.user.login} - ${pr.html_url} \n`));
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
