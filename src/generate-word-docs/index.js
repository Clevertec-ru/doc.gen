const fs = require("fs");

const { deleteFilesFromOutput } = require("../delete-files");
const { ExcelController } = require("../excel-controller");
const { WordController } = require("../word-controller");

const { WORD_SAMPLE_PATH } = require("../constants/word-sample-path");
const { OUTPUT_DIRECTORY } = require("../constants/output-directory");

const generateWordDocs = (fileDirectory) => {
  console.log(fileDirectory, OUTPUT_DIRECTORY, WORD_SAMPLE_PATH);

  const wordSampleFile = fs.readFileSync(WORD_SAMPLE_PATH, "binary");
  const Excel = new ExcelController(fileDirectory);
  const Word = new WordController(OUTPUT_DIRECTORY, wordSampleFile);
  const modifiedRowsArray = Excel.getModifiedRowsArray();

  let generatedDocsMessage = [];

  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
  }

  deleteFilesFromOutput(OUTPUT_DIRECTORY);

  modifiedRowsArray.forEach((row) => {
    const generatedFile = Word.generateWordDoc(row);
    generatedDocsMessage.push(generatedFile);
  });

  return generatedDocsMessage;
};

module.exports = {
  generateWordDocs,
};
