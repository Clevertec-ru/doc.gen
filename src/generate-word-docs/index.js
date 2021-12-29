const fs = require("fs");

const { deleteFilesFromOutput } = require("../delete-files");
const { ExcelController } = require("../excel-controller");
const { WordController } = require("../word-controller");

const { WORD_SAMPLE_PATH } = require("../constants/word-sample-path");
const { OUTPUT_DIRECTORY } = require("../constants/output-directory");

const generateWordDocs = (fileDirectory) => {
  const wordSampleFile = fs.readFileSync(WORD_SAMPLE_PATH, "binary");
  const Excel = new ExcelController(fileDirectory);
  const Word = new WordController(OUTPUT_DIRECTORY, wordSampleFile);
  const modifiedRowsArray = Excel.getModifiedRowsArray();

  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
  }

  deleteFilesFromOutput(OUTPUT_DIRECTORY);

  modifiedRowsArray.forEach((row, index) => {
    Word.generateWordDoc(row);
    console.log(`word file number ${index}, is generated`);
  });

  console.log("Done");
};

module.exports = {
  generateWordDocs,
};