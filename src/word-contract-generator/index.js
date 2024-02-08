const fs = require('fs');

const { ExcelContractParser } = require('../excel-contract-parser');

const { createEmptyFolder } = require('../utils/create-empty-folder');
const { mergeWordDocs, generateWordDocumentBySamples } = require('./helpers');

const {
  EXCEL_COLUMN_NAMES,
  EXCEL_INVERTED_COLUMN_NAMES,
} = require('../constants/excel-column-names');
const { WORD_SAMPLE_PATHS } = require('../constants/word-sample-paths');
const {
  getInitialsFromName,
} = require('../utils/get-correct-excel-value/helpers');

class WordContractGenerator {
  /**
   * Контроллер, который занимается рендерингом и прочими внутренними операциями связанными с рендером Word документа
   * @param {String} outputDirectory  Путь к папке, куда в будущем будет производиться рендер файлов
   * @param {String} excelFilePath  Путь к Excel файлу, от куда будет браться вся информация
   */
  constructor(outputDirectory, excelFilePath) {
    this._excelContractParser = new ExcelContractParser(excelFilePath);
    this._outputDirectory = outputDirectory;
  }

  /**
   * Генерирует Word'овские документы исходя из массива строк Excel, где каждая строка равна одной странице.
   * Сколько типов контрактов, столько и будет сгенерировано файлов
   * @returns {{ filePath: string, fileName: string }[]} массивами путей к сгенерированным файлам и имён этих файлов
   */
  generateContractDocuments() {
    const modifiedExcelRowsArray =
      this._excelContractParser.getModifiedRowsArray();
    const defaultAccamulator = { filePaths: [], fileNames: [] };

    const generatedFilePaths = modifiedExcelRowsArray.reduce(
      (acc, excelRows) => {
        const currentGender =
          excelRows[EXCEL_INVERTED_COLUMN_NAMES[EXCEL_COLUMN_NAMES.sex]];
        const currentContract =
          excelRows[EXCEL_INVERTED_COLUMN_NAMES[EXCEL_COLUMN_NAMES.contract]];
        const currentContractType = excelRows[
          EXCEL_INVERTED_COLUMN_NAMES[EXCEL_COLUMN_NAMES.contract]
        ]
          .slice(7, 9)
          .replaceAll('-', '');
        const currentEndWordDate =
          excelRows[
            EXCEL_INVERTED_COLUMN_NAMES[EXCEL_COLUMN_NAMES.endWorkDate]
          ];
        const currentTextedAmount =
          excelRows[EXCEL_INVERTED_COLUMN_NAMES.textedAmount];
        const currentWordPath =
          WORD_SAMPLE_PATHS[currentGender][currentContractType];

        const initials = getInitialsFromName(
          excelRows[EXCEL_INVERTED_COLUMN_NAMES[EXCEL_COLUMN_NAMES.fio]]
        );

        const actNumber =
          excelRows[EXCEL_INVERTED_COLUMN_NAMES[EXCEL_COLUMN_NAMES.actNumber]];

        const fileName = `АКТ-${currentContract}-${actNumber} ${initials}`;
        const outputFilePath = `${this._outputDirectory}\\${fileName}.docx`;
        const wordSampleFile = fs.readFileSync(currentWordPath, 'binary');

        generateWordDocumentBySamples(
          wordSampleFile,
          excelRows,
          outputFilePath
        );

        acc.fileNames.push(fileName);
        acc.filePaths.push(outputFilePath);

        return acc;
      },
      defaultAccamulator
    );

    const outputFilePath = `${this._outputDirectory}\\`;

    // mergeWordDocs(generatedFilePaths.filePaths, outputFilePath); // закидывает все в один файл - использовать по надобности

    return {
      fileNames: generatedFilePaths.fileNames,
      allFilePaths: generatedFilePaths.filePaths,
      filePath: outputFilePath,
    };
  }
}

module.exports = { WordContractGenerator };
