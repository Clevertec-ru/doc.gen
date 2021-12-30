const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

class WordController {
  #outputDirectory = "";
  #sampleFile = "";

  constructor(outputDirectory = null, sampleFile = null) {
    this.#outputDirectory = outputDirectory;
    this.#sampleFile = sampleFile;
  }

  generateWordDoc(template) {
    const { contract, endWorkDate, actSum } = template;
    const zip = new PizZip(this.#sampleFile);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(template);

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    fs.writeFileSync(`${this.#outputDirectory}/Акт-ГПД-Н${contract} ${endWorkDate}(${actSum}=00).docx`, buf);
  }
}

module.exports = {
  WordController,
};
