const headingsCounter = ($) => {
    const headingsCount = {};
    for (let i = 1; i <= 6; i++) {
        headingsCount[`h${i}`] = $(`h${i}`).length;
    }
    return headingsCount;
};

module.exports = headingsCounter;