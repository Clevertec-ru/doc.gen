const excelToJson = require("convert-excel-to-json");

const { EXCEL_COLUMN_NAMES, EXCEL_INVERTED_COLUMN_NAMES } = require("../constants/excel-column-names");

const { getCorrectExcelValue } = require("../utils/get-correct-excel-value");
const { getAssignedRowsArray, setMissingEmptyFields } = require("./helpers");

class ExcelContractParser {
  #filePath = "";

  /**
   * Пасрер, который переводить Excel файл в нужный `JSON` формат
   * @param {String} filePath Путь к Excel шаблону, от куда вся информация будет парситься в `JSON`
   */
  constructor(filePath = "") {
    this.#filePath = filePath;
  }

  /**
   * Модифицирует все значение полей строк Excel в нужный формат
   * @returns { { [key: string]: string }[] } Массив объектов *( строк Excel )*, где ключ - заголовок колонки
   */
  getModifiedRowsArray() {
    const jsonExcel = this.#getParsedExcelToJson();
    const assignedRowsArray = getAssignedRowsArray(jsonExcel);
    const assignedRowsWithMissingFields = setMissingEmptyFields(assignedRowsArray);

    return assignedRowsWithMissingFields.map((row) => {
      return Object.keys(row).reduce((acc, columnName) => {
        const correctColumn = getCorrectExcelValue(row[columnName], columnName);

        return { ...acc, ...correctColumn };
      }, {});
    });
  }

  /**
   * Парсирует `Excel` в `JSON`
   * @returns {{ [key: string]: any[] }} `JSON`
   */
  #getParsedExcelToJson() {
    return excelToJson({
      sourceFile: this.#filePath,
      header: {
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });
  }
}

module.exports = { ExcelContractParser };
