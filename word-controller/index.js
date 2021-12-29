import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export class WordController {
  #outputDirectory = "";
  #sampleFile = "";

  constructor(outputDirectory = null, sampleFile = null) {
    this.#outputDirectory = outputDirectory;
    this.#sampleFile = sampleFile;
  }

  generateWordDoc(template) {
    const zip = new PizZip(this.#sampleFile);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(template);

    const buf = doc.getZip().generate({ type: "nodebuffer" });
    const { contract, usFormatEndWorkDate, actSum } = template;
    fs.writeFileSync(`${this.#outputDirectory}/Акт-ГПД-Н${contract} ${usFormatEndWorkDate}(${actSum}=00).docx`, buf);
  }
}
