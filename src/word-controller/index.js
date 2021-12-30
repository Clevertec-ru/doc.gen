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
    const { contract, endWorkDate, actSum, fio } = template;
    const zip = new PizZip(this.#sampleFile);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(template);

    const buf = doc.getZip().generate({ type: "nodebuffer" });
    const fileName = `Акт-ГПД-Н${contract} ${endWorkDate}(${actSum}=00).docx`;
    const resultName = `${fio.split(" ")[0]} ${fileName}`;

    fs.writeFileSync(`${this.#outputDirectory}/${fileName}`, buf);

    return {
      resultName,
      fileName,
    };
  }
}

module.exports = {
  WordController,
};
