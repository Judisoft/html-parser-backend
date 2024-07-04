exports.processHTMLPage = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "HTML page has been parsed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Operation failed! Try again",
    });
  }
};
