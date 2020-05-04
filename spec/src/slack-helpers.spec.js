'use strict';

const {divider, getTextBlock, link, sectionWithText} = require('../../src/slack-helpers');

describe('slackHelpers', () => {
  it('should correctly build a divider', () => {
    const expectation = { type: 'divider' };
    const result = divider;
    expect(result).toEqual(expectation);
  });

  it('should correctly build a text block', () => {
    const result = getTextBlock('test');
    const expectation = { type: 'mrkdwn', text: 'test' };
    expect(result).toEqual(expectation);
  });

  it('should correctly build a link', () => {
    const result = link('text', 'url');
    const expectation = '<url|text>';
    expect(result).toEqual(expectation);
  });

  it('should correctly build a section with text', () => {
    const result = sectionWithText('test');
    const expectation = [
      { type: 'section', text: { type: 'mrkdwn', text: 'test' } },
      { type: 'divider' }
    ];
    expect(result).toEqual(expectation);
  });
});
