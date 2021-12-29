import excelToJson from "convert-excel-to-json";
import { format } from "date-fns";
import numberToWordsRu from "number-to-words-ru";

import { getInitialsFromName } from "./helpers.js";

import { CURRENCY_OPTIONS } from "../constants/currency-options.js";
import { EXCEL_COLUMN_NAMES, EXCEL_INVERTED_COLUMN_NAMES } from "../constants/excel-column-names.js";

export class ExcelController {
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

  #getCorrectCollumn(columnValue, columnName) {
    const isCollumnDate =
      columnName === EXCEL_COLUMN_NAMES.startWorkDate || columnName === EXCEL_COLUMN_NAMES.endWorkDate;

    if (isCollumnDate) {
      const correctDate = format(columnValue, "dd.MM.yyyy");
      const usDate = format(columnValue, 'yyyy-MM-dd');
      const column = EXCEL_INVERTED_COLUMN_NAMES[columnName];
      const usFormatColumn = `usFormat${column.charAt(0).toUpperCase() + column.slice(1)}`
      return {
        [column]: correctDate,
        [usFormatColumn]: usDate
      };
    }
    if (columnName === EXCEL_COLUMN_NAMES.actSum) {
      const integerCurrency = numberToWordsRu.convert(columnValue, CURRENCY_OPTIONS.withoutFractional);
      const fractionalCurrency = numberToWordsRu.convert(columnValue, CURRENCY_OPTIONS.withoutInteger);
      // TODO: сделать склонения рублЕЙ
      const correctActSum = `${columnValue} (${integerCurrency}) российских рублей ${fractionalCurrency}`;

      return { [EXCEL_INVERTED_COLUMN_NAMES.textedAmount]: correctActSum, [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: columnValue };
    }

    return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: columnValue };
  }

  getModifiedRowsArray() {
    const assignedRowsArray = this.#getAssignedRowsArray();

    return assignedRowsArray.map((row) => {
      return Object.keys(row).reduce((acc, columnName) => {
        const correctCollumn = this.#getCorrectCollumn(row[columnName], columnName);
        return { ...acc, ...correctCollumn };
      }, {});
    });
  }
}
