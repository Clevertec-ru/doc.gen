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

  generateWordDoc(template, index = 0) {
    const zip = new PizZip(this.#sampleFile);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(template);

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    fs.writeFileSync(`${this.#outputDirectory}/output_${index}.docx`, buf);
  }
}
