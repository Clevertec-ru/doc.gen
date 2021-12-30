const excelToJson = require("convert-excel-to-json");
const { format } = require("date-fns");
const numberToWordsRu = require("number-to-words-ru");

const { getInitialsFromName } = require("./helpers");

const { CURRENCY_OPTIONS } = require("../constants/currency-options");
const { EXCEL_COLUMN_NAMES, EXCEL_INVERTED_COLUMN_NAMES } = require("../constants/excel-column-names");

class ExcelController {
  #excelObject = {};

  constructor(filePath = "") {
    this.#excelObject = excelToJson({
      sourceFile: filePath,
      header: {
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });
  }

  #getAssignedRowsArray() {
    const unitedPageDatas = Object.keys(this.#excelObject).reduce((acc, pageName) => {
      return [...acc, ...this.#excelObject[pageName]];
    }, []);
    const uniqueContractArray = unitedPageDatas
      .reduce((acc, row) => {
        acc.push(row[EXCEL_COLUMN_NAMES.contract]);
        return acc;
      }, [])
      .filter((contract, index, array) => array.indexOf(contract) === index);

    return uniqueContractArray.map((contractName) => {
      const filteredRows = unitedPageDatas.filter((row) => row[EXCEL_COLUMN_NAMES.contract] === contractName);
      return filteredRows.reduce((acc, row) => {
        return { ...acc, ...row };
      }, {});
    });
  }

  #getCorrectColumn(columnValue, columnName) {
    const isColumnDate =
      columnName === EXCEL_COLUMN_NAMES.startWorkDate || columnName === EXCEL_COLUMN_NAMES.endWorkDate;

    if (isColumnDate) {
      const correctDate = format(columnValue, "dd.MM.yyyy");

      return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: correctDate };
    }
    if (columnName === EXCEL_COLUMN_NAMES.actSum) {
      const integerCurrency = numberToWordsRu.convert(columnValue, CURRENCY_OPTIONS.withoutFractional);
      const fractionalCurrency = numberToWordsRu.convert(columnValue, CURRENCY_OPTIONS.withoutInteger);
      const correctActSum = `${columnValue} (${integerCurrency}) российских рублей ${fractionalCurrency}`;

      return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: correctActSum };
    }

    return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: columnValue };
  }

  getModifiedRowsArray() {
    const assignedRowsArray = this.#getAssignedRowsArray();

    return assignedRowsArray.map((row) => {
      return Object.keys(row).reduce((acc, columnName) => {
        const correctColumn = this.#getCorrectColumn(row[columnName], columnName);
        return { ...acc, ...correctColumn };
      }, {});
    });
  }
}

module.exports = {
  ExcelController,
};
