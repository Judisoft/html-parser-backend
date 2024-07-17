# HTML Parser / Web Scraper - Backend

## Project Overview

This project is the backend component of an HTML Parser / Web Scraper web application. The backend processes user-submitted URLs to extract and analyze various elements of the web pages, providing detailed insights into their structure and content.

## Features:

- HTML Version Detection: Identifies the HTML version of the document.
- Page Title Extraction: Retrieves and returns the page title.
- Headings Count: Counts the number of headings grouped by heading level.
- Links Count: Categorizes and counts hypermedia links as internal or external.
- Login Form Detection: Detects the presence of login forms on the page.
- Link Validation: Checks the reachability of all links and provides detailed error messages for any unreachable links.

## SetUp and Installation

## Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x )

## Installation

### 1. Clone the repository

  `git clone <repository_url>`
 `cd <repository_directory>`

### 2. Install dependencies

  `npm install`

## Running the Server

 ### `npm start`

By default, the server will run on http://localhost:3000.

## API Endpoints

### Parse  URL

URL: /api/v1/parse-html-page\
Method: GET\
Content-Type: application/json

### Request Body:

{\
  "url": "http://example.com"\
}

### Response:

{\
  "htmlVersion": "HTML5",\
  "pageTitle": "Example Domain",\
  "headingsCount": {\
    "h1": 1,\
    "h2": 0\
  },\
  "linksCount": {\
    "internal": 10,\
    "external": 5\
  },\
  "hasLoginForm": true,\
  "linkValidationResults": [\
    {\
      "url": "http://example.com/internal-link",\
      "reachable": true\
    },\
    {\
      "url": "http://external.com/external-link",\
      "reachable": false,\
      "error": "Connection refused"\
    }\
  ]\
}

## Code Structure

- server.js: Entry point for the backend server.
- scrapper.js: Contains the main scraping and analysis logic.
- utils/: Utility functions for specific tasks such as HTML version identification, headings count, link validation, etc.

## Unit Tests

Unit tests are written using Jest. To run the tests, use the following command:

`npm test`

## Assumptions and Design Decisions

HTML Parsing: cheerio is used for its simplicity and effectiveness in server-side HTML parsing. \
Link Validation: axios is employed for robust HTTP requests and handling redirections.\
Error Handling: Comprehensive error handling is implemented to ensure meaningful feedback for all link validation issues.\
Performance: Concurrent link validation is used to handle multiple requests efficiently.


## Known Constraints and Limitations

- Login Form Detection: The heuristic-based (trial and error) detection may not cover all possible login form implementations.
- Link Validation: Dependent on network conditions and may have latency in checking numerous links.
- Scalability: Designed for small to medium-scale usage; may require optimization for high-traffic scenarios.

## Author 
- Kum Jude Bama [kumjude09@gmail.com]
