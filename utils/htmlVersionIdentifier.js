const htmlVersionIdentifier = ($) => {
    const doctype = $('!DOCTYPE').html();
    if (doctype) {
        if (doctype.includes('html')) {
            return 'HTML5';
          } else if (doctype.includes('XHTML')) {
            return 'XHTML';
          } else if (doctype.includes('HTML 4.01')) {
            return 'HTML 4.01';
          }
    }

    return 'Unknown';
}

module.exports = htmlVersionIdentifier;