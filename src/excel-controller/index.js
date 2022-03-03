const excelToJson = require("convert-excel-to-json");

const { getCorrectExcelValue } = require("../utils/get-correct-excel-value");
const { getAssignedRowsArray, setMissingEmptyFields } = require("./helpers");

class ExcelController {
  #excelObject = {};

  constructor(filePath = "") {
    this.#excelObject = excelToJson({
      sourceFile: filePath,
      header: { rows: 1 },
      columnToKey: { "*": "{{columnHeader}}" },
    });
  }

  /**
   * Модифицирует все значение полей строк Excel в нужный формат
   * @returns { { [key: string]: string }[] } Массив объектов *( строк Excel )*, где ключ - заголовок колонки
   */
  getModifiedRowsArray() {
    const assignedRowsArray = getAssignedRowsArray(this.#excelObject);
    const assignedRowsWithMissingFields = setMissingEmptyFields(assignedRowsArray);

    return assignedRowsWithMissingFields.map((row) => {
      return Object.keys(row).reduce((acc, columnName) => {
        const correctColumn = getCorrectExcelValue(row[columnName], columnName);

        return { ...acc, ...correctColumn };
      }, {});
    });
  }
}

module.exports = { ExcelController };
