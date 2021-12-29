import fs from "fs";

import { deleteFilesFromOutput } from "./delete-files/index.js";
import { ExcelController } from "./excel-controller/index.js";
import { WordController } from "./word-controller/index.js";

const outputDirectory = "./output";
const wordSampleFile = fs.readFileSync("./assets/format.docx", "binary");
const Excel = new ExcelController("./assets/source.xlsx");
const Word = new WordController(outputDirectory, wordSampleFile);
const modifiedRowsArray = Excel.getModifiedRowsArray();

deleteFilesFromOutput(outputDirectory);

modifiedRowsArray.forEach((row, index) => {
  Word.generateWordDoc(row, index);
  console.log(`word file number ${index}, is generated`);
});

console.log("Done");
