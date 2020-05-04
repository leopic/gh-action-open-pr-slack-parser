module.exports.GitHub = {
  pulls: {
    list: {
      full: require('./stubs/github-pulls-list.json'),
      empty: {data: []}
    }
  },
  repos: {
    get: require('./stubs/github-repos-get.json')
  }
};

module.exports.Slack = {
  chat: {
    postMessage: require('./stubs/slack-post-message.json')
  }
};
