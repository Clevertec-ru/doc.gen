const fs = require("fs");

const { ExcelController } = require("../excel-controller");
const { WordController } = require("../word-controller");

const { WORD_SAMPLE_PATH } = require("../constants/word-sample-path");
const { OUTPUT_DIRECTORY } = require("../constants/output-directory");

const generateWordDocs = (fileDirectory) => {
  const wordSampleFile = fs.readFileSync(WORD_SAMPLE_PATH, "binary");
  const excel = new ExcelController(fileDirectory);
  const word = new WordController(OUTPUT_DIRECTORY, wordSampleFile);
  const modifiedRowsArray = excel.getModifiedRowsArray();

  return word.generateWordDocs(modifiedRowsArray);
};

module.exports = {
  generateWordDocs,
};
