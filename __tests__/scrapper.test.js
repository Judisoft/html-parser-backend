const cheerio = require("cheerio");
const loginFormChecker  = require("../utils/loginFormChecker");
const linksCounter = require("../utils/internalAndExternalLinkCounter");
const headingsCounter = require("../utils/headingsCounter");
const determineHtmlVersion = require("../utils/htmlVersionIdentifier");

describe('Utility functions', () => {
  let $;

  beforeEach(() => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h2>Another Heading 2</h2>
        <a href="http://example.com">External Link</a>
        <a href="/internal">Internal Link</a>
        <form>
          <input type="text" name="username">
          <input type="password" name="password">
          <button type="submit">Login</button>
        </form>
      </body>
      </html>
    `;
    $ = cheerio.load(html);
  });

  test('containsLoginForm should detect a login form', () => {
    expect(loginFormChecker($)).toBe(true);
  });

  test('countHeadings should count headings by level', () => {
    const expectedHeadingsCount = {
      h1: 1,
      h2: 2,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
    };
    expect(headingsCounter($)).toEqual(expectedHeadingsCount);
  });


test('countLinks should count internal and external links', async () => {
  const testHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Page</title>
    </head>
    <body>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h2>Another Heading 2</h2>
      <a href="http://external.com">External Link</a>
      <a href="/internal">Internal Link</a>
      <form>
        <input type="text" name="username">
        <input type="password" name="password">
        <button type="submit">Login</button>
      </form>
    </body>
    </html>
  `;

  const $ = cheerio.load(testHTML);
  const baseDomain = new URL('http://example.com');

  const expectedLinksCount = {
    internal: 1,
    external: 1,
  };

  const actualLinksCount = await linksCounter($, baseDomain);
  expect(actualLinksCount).toEqual(expectedLinksCount);
});

  test('determineHtmlVersion should return HTML5 for an HTML5 document', () => {
    expect(determineHtmlVersion($)).toBe('HTML5');
  });
});
