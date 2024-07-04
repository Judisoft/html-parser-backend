const express = require("express");
const cors = require("cors");
const HTMLParserController = require("./contollers/HTMLParserController");

const app = express();
app.use(cors());
// parse request of content-type - application/json
app.use(express.json());
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const port = process.env.PORT || 4000;

// routes
app.get("/api/v1/parse-html-page", HTMLParserController.processHTMLPage);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

module.exports = app;
