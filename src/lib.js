const { Octokit } = require('@octokit/rest');

const parsePR = pr => {
  return `- [${pr.title}](${pr.html_url}) by ${pr.user.login}\n`;
};

module.exports.work = async ({token, owner, repo}) => {
    if (!token) {
      throw new Error('No token');
    }

    if (!repo) {
      throw new Error('No repo');
    }

    if (!owner) {
      throw new Error('No owner');
    }

    const octokit = new Octokit(token);
    const { data: pullRequests } = await octokit.pulls.list({owner, repo, state: 'open'});

    if (!pullRequests.length) {
      return 'No open pull requests right now.';
    }

    const header = 'These are the open pull requests right now:\n';
    const parsedPullRequests = pullRequests.map(parsePR).join('');
    const output = `${header}${parsedPullRequests}`.trim();

    return output;
};
