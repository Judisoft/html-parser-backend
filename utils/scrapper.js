const axios = require("axios");
const cheerio = require("cheerio");
const {URL} = require("url");
const htmlVersionIdentifier  = require("./htmlVersionIdentifier");
const headingsCounter = require("./headingsCounter")
const loginFormChecker  = require("./loginFormChecker");
const internalAndExternalLinkCounter = require("./internalAndExternalLinkCounter");

const scrapper = async (url) => {
    try {
        const response = await axios.get(url, 
        {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const html = response.data;
        const $ = cheerio.load(html);
        const baseDomain = new URL(url);

        const htmlVersion = htmlVersionIdentifier($);
        const pageTitle = $('title').text();
        const headingsCount = headingsCounter($);
        const linksCount = internalAndExternalLinkCounter($, baseDomain);
        const hasLoginForm = loginFormChecker($);

        return {
            htmlVersion,
            pageTitle,
            headingsCount,
            linksCount,
            hasLoginForm,
        };
    } catch (error) {
        console.error('An error occurred while trying to scrape the page: ', error.message);
        throw error;
    }
}

module.exports = scrapper;