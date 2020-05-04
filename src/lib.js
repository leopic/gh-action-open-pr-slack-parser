const { Octokit } = require('@octokit/rest');

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

    let output = 'These are the open pull requests right now:\n';
    const parsedPullRequests = pullRequests.map(pr => `- [${pr.title}](${pr.html_url}) by ${pr.user.login} \n`);
    output += parsedPullRequests;

    return output.trim();
};
