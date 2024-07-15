const {URL} = require("url");

const linksCounter = async ($, baseDomain) => {
    const linksCount = {internal: 0, external: 0};
    $('a[href]').each((i, link) => {
        const href = $(link).attr('href');
        const linkDomain = new URL(href, baseDomain).hostname;

        if (linkDomain === baseDomain.hostman) {
            linksCount.internal++;
        } else {
            linksCount.external++;
        }
    });

    return linksCount;
}

module.exports = linksCounter;