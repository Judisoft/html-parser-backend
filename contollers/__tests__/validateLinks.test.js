const axios = require('axios');
const validateLinks = require('../../utils/validateLinks');

jest.mock('axios');

describe('validateLinks', () => {
  const baseDomain = new URL('https://example.com');

  it('should return reachable as true for internal links', async () => {
    const links = ['https://example.com/page1', 'https://example.com/page2'];

    axios.head.mockImplementation((url) => {
      return Promise.resolve({
        request: {
          res: {
            responseUrl: url,
          },
        },
      });
    });

    const results = await validateLinks(links, baseDomain);

    expect(results).toEqual([
      { url: 'https://example.com/page1', reachable: true },
      { url: 'https://example.com/page2', reachable: true },
    ]);
  });

  it('should return reachable as false for external links', async () => {
    const links = ['https://external.com/page1', 'https://external.com/page2'];

    axios.head.mockImplementation((url) => {
      return Promise.resolve({
        request: {
          res: {
            responseUrl: url,
          },
        },
      });
    });

    const results = await validateLinks(links, baseDomain);

    expect(results).toEqual([
      { url: 'https://external.com/page1', reachable: false },
      { url: 'https://external.com/page2', reachable: false },
    ]);
  });

  it('should handle ECONNREFUSED error', async () => {
    const links = ['https://example.com/page1'];

    axios.head.mockImplementation(() => {
      const error = new Error('Connection refused');
      error.code = 'ECONNREFUSED';
      return Promise.reject(error);
    });

    const results = await validateLinks(links, baseDomain);

    expect(results).toEqual([
      { url: 'https://example.com/page1', reachable: false, error: 'Connection refused' },
    ]);
  });

  it('should handle other errors', async () => {
    const links = ['https://example.com/page1'];

    axios.head.mockImplementation(() => {
      return Promise.reject(new Error('Some other error'));
    });

    const results = await validateLinks(links, baseDomain);

    expect(results).toEqual([
      { url: 'https://example.com/page1', reachable: false, error: 'Some other error' },
    ]);
  });
});
