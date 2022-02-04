const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const DocxMerger = require("docx-merger");

const { RESULT_FILE_NAME } = require("../constants/result-file-name");

const { deleteFilesFromOutput } = require("../delete-files");

class WordController {
  #outputDirectory = "";
  #sampleFile = "";

  constructor(outputDirectory = null, sampleFile = null) {
    this.#outputDirectory = outputDirectory;
    this.#sampleFile = sampleFile;
  }

  generateWordDocs(templates = []) {
    if (!fs.existsSync(this.#outputDirectory)) {
      fs.mkdirSync(this.#outputDirectory, { recursive: true });
    } else {
      deleteFilesFromOutput(this.#outputDirectory);
    }

    const generatedDocsMessage = [];
    const filePaths = [];

    templates.forEach((row) => {
      const { resultName, fullFileName } = this.#generateWordDoc(row);

      generatedDocsMessage.push(resultName);
      filePaths.push(fullFileName);
    });

    this.#mergeWordDocs(filePaths);

    return generatedDocsMessage;
  }

  #generateWordDoc(template) {
    const { contract, endWorkDate, textedAmount, initialName } = template;
    const zip = new PizZip(this.#sampleFile);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(template);

    const buf = doc.getZip().generate({ type: "nodebuffer" });
    const fileName = `Акт-ГПД-Н${contract} ${endWorkDate}(${textedAmount}=00)`;
    const resultName = `${initialName.split(" ")[0]} ${fileName}`;
    const fullFileName = `${this.#outputDirectory}\\${fileName}.docx`;

    fs.writeFileSync(fullFileName, buf);

    return { resultName, fullFileName };
  }

  #mergeWordDocs(filePaths = []) {
    const files = filePaths.map((file) => fs.readFileSync(file, "binary"));
    const docxMerger = new DocxMerger({}, files);

    docxMerger.save("nodebuffer", (data) => {
      fs.writeFileSync(`${this.#outputDirectory}/${RESULT_FILE_NAME}`, data);
    });

    filePaths.map((file) => fs.unlinkSync(file));
  }
}

module.exports = {
  WordController,
};
