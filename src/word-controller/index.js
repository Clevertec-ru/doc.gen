const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const DocxMerger = require("docx-merger");

const { RESULT_FILE_NAME } = require("../constants/result-file-name");
const { WORD_SAMPLE_PATHS } = require("../constants/word-sample-paths");
const { EXCEL_INVERTED_COLUMN_NAMES, EXCEL_COLUMN_NAMES } = require("../constants/excel-column-names");

const { createEmptyFolder } = require("../utils/create-empty-folder");

const tttest = ["test", "test2"];

class WordController {
  #outputDirectory = "";
  #contractType = "";

  /**
   * @param {String} outputDirectory Путь к папке, куда в будущем будет производиться рендер файла
   * @param {String} contractType Тип контракта
   */
  constructor(outputDirectory = "", contractType = "") {
    this.#outputDirectory = outputDirectory;
    this.#contractType = contractType;
  }

  /**
   * Генерирует Word'овский документ исходя из массива строк Excel, где каждая строка равна одной странице
   * @param {{ [key: string]: string }[]} modifiedRowsArray Массив объектов (строк Excel)
   * @returns {String[]} Массив сообщений (информации) о сгенерированных файлах
   */
  generateContractDocument(modifiedRowsArray) {
    if (!modifiedRowsArray) {
      throw new Error("Rows array is empty");
    }

    createEmptyFolder(this.#outputDirectory);

    const { filePaths, generatedDocsMessages } = this.#generateWordDocs(modifiedRowsArray);

    this.#mergeWordDocs(filePaths);

    return generatedDocsMessages;
  }

  /**
   * Генерирует Word'овские документы
   * @param {{ [key: string]: string }[]} modifiedRowsArray Массив объектов (строк Excel)
   * @returns {{ filePaths: string[], generatedDocsMessages: string[] }} Массив объектов информации о сгенерированных файлах
   */
  #generateWordDocs(modifiedRowsArray) {
    const defaultAcc = { filePaths: [], generatedDocsMessages: [] };

    return modifiedRowsArray.reduce((acc, row) => {
      const genderType = row[EXCEL_INVERTED_COLUMN_NAMES[EXCEL_COLUMN_NAMES.sex]];
      const wordPath = WORD_SAMPLE_PATHS[genderType][this.#contractType];
      const wordSampleFile = fs.readFileSync(wordPath, "binary");
      const { resultName, fullFileName } = this.#generateWordDoc(row, wordSampleFile);

      acc.generatedDocsMessages.push(resultName);
      acc.filePaths.push(fullFileName);

      return acc;
    }, defaultAcc);
  }

  /**
   * Генерирует новый word файл и заполняет его данными исходя из шаблона
   * @param {{ [key: string]: string }} modifiedRow
   * @param {Buffer & String} sampleFile Word'овский шаблон (docx)
   * @returns Объект с полями имён файлов
   */
  #generateWordDoc(modifiedRow = null, sampleFile = null) {
    if (!modifiedRow || !sampleFile) {
      throw new Error("Row | Sample file is undefined");
    }

    const { contract, endWorkDate, textedAmount, initialName } = modifiedRow;
    const zip = new PizZip(sampleFile);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.render(modifiedRow);

    const buf = doc.getZip().generate({ type: "nodebuffer" });
    const fileName = `Акт-ГПД-Н${contract} ${endWorkDate}(${textedAmount}=00)`;
    const resultName = `${initialName.split(" ")[0]} ${fileName}`;
    const fullFileName = `${this.#outputDirectory}\\${fileName}.docx`;

    fs.writeFileSync(fullFileName, buf);

    return { resultName, fullFileName };
  }

  /**
   * Соединяет все сгенерированные Word документы в один, где каждый документ равен одному листу
   * @param {String[]} filePaths массив путей ко всем созданным файлам
   */
  #mergeWordDocs(filePaths = []) {
    if (!filePaths.length) {
      return;
    }

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
