const fs = require("fs");

const { ExcelController } = require("../excel-controller");
const { WordController } = require("../word-controller");
const { getContractType } = require("../utils/get-contract-type");

const { WORD_SAMPLE_PATHS } = require("../constants/word-sample-paths");
const { OUTPUT_DIRECTORY } = require("../constants/output-directory");

const generateWordDocs = (fileDirectory) => {
  const excel = new ExcelController(fileDirectory);
  const modifiedRowsArray = excel.getModifiedRowsArray();
  const contractType = getContractType(modifiedRowsArray);
  const word = new WordController(OUTPUT_DIRECTORY, contractType);

  return word.generateContractDocument(modifiedRowsArray);
};

module.exports = { generateWordDocs };
