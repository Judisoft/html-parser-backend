const axios = require("axios");

const validateLinks = async (links, baseDomain) => {
    const results = [];
    // const concurrencyLimit = 10; // Adjust based on server capacity, 10 is arbitrary
  
    await Promise.all(
      links.map(async (link) => {
        try {
          const response = await axios.head(link, { maxRedirects: 5 });
          const destinationUrl = response.request.res.responseUrl;
          const reachable = new URL(destinationUrl).hostname === baseDomain.hostname;
          results.push({ url: link, reachable });
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                results.push({ url: link, reachable: false, error: 'Connection refused' });
              } else {
                results.push({ url: link, reachable: false, error: error.message });
            }
        }
      })
    );
  
    return results;
  };

  module.exports = validateLinks;