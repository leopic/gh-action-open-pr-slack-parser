![Linting and Unit Tests](https://github.com/leopic/gh-action-open-pr-slack-parser/workflows/Linting%20and%20Unit%20Tests/badge.svg?branch=master)

# GitHub Open PR list Slack Block Parser
A GitHub action, meant to be run on a schedule, to list all open pull requests on a GitHub repository.

## Usage
```yaml
name: Verify All Open Pull Requests

on:
  schedule:
    - cron: "0 9 * 1-5 *"

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - name: Get PR list
        uses: leopic/gh-action-open-pr-notifier@v1.0.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          slackbot-token: YOUR_SLACKBOT_TOKEN
          slack-conversation-id: YOUR_CHANNEL_ID

```

## Output example
The output is similar to:
![Usage example when integrated into Slack](https://cldup.com/_1kSIuUbXi.png)
