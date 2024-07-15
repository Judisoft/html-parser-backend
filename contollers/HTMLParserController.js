const scrapper = require("../utils/scrapper");

exports.processHTMLPage = async (req, res) => {
  try {
    const url = req.query.url
    const result = await scrapper(url);
    const linksCount = await result.linksCount;
    
    return res.status(200).json({
      success: true,
      message: "HTML page has been parsed successfully",
      data: {
        htmlVersion: result.htmlVersion,
        pageTitle: result.pageTitle,
        headingsCount: result.headingsCount,
        linksCount: linksCount,  
        hasLoginForm: result.hasLoginForm
      }
    });
  } catch (error) {
    console.log('Error processing HTML Page: ', error);
    return res.status(500).json({
      success: false,
      message: "Operation failed! Try again",
    });
  }
};
