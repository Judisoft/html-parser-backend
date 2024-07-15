const determineHtmlVersion = ($) => {
  const doctype = $.root().get(0).children.find(node => node.type === 'directive' && node.name.toLowerCase() === '!doctype');

  if (doctype) {
    const doctypeString = doctype.data.toLowerCase();
    if (doctypeString.includes('html')) {
      return 'HTML5';
    } else if (doctypeString.includes('xhtml')) {
      return 'XHTML';
    } else if (doctypeString.includes('html 4.01')) {
      return 'HTML 4.01';
    }
  }

  return 'Unknown';
};

module.exports = determineHtmlVersion;
