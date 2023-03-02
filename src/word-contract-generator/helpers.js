const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const DocxMerger = require("docx-merger");

/**
 * Генерирует новый word файл и заполняет его данными исходя из шаблонов `JSON` и `DOCX`
 * @param {{ [key: string]: string }} modifiedRow `JSON` объект строки Excel
 * @param {Buffer & String} sampleFile Word'овский шаблон `DOCX`
 * @param {String} outputFilePath Полный путь с полным именем (и форматом) файла, куда будет сгенерирован `DOCX`
 */
const generateWordDocumentBySamples = (sampleFile, modifiedRow, outputFilePath) => {
  const zip = new PizZip(sampleFile);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  doc.render(modifiedRow);
  fs.writeFileSync(outputFilePath, doc.getZip().generate({ type: "nodebuffer" }));
};

/**
 * Соединяет все сгенерированные Word документы в один, где каждый документ равен одному листу
 * @param {String[]} docxPaths Массив путей ко всем созданным `DOCX` файлам
 * @param {String} outputFilePath Полный путь с полным именем (и форматом) файла, куда будет сгенерирован `DOCX`
 */
const mergeWordDocs = (docxPaths, outputFilePath) => {
  const files = docxPaths.map((file) => fs.readFileSync(file, "binary"));
  const docxMerger = new DocxMerger({}, files);

  docxMerger.save("nodebuffer", (data) => fs.writeFileSync(outputFilePath, data));
  docxPaths.map((file) => fs.unlinkSync(file));
};

module.exports = {
  mergeWordDocs,
  generateWordDocumentBySamples,
};
