import excelToJson from "convert-excel-to-json";
import { format } from "date-fns";
import numberToWordsRu from "number-to-words-ru";

import { getInitialsFromName } from "./helpers.js";

import { CURRENCY_OPTIONS } from "../constants/currency-options.js";
import { EXCEL_COLLUMN_NAMES, EXCEL_INVERTED_COLLUMN_NAMES } from "../constants/excel-collumn-names.js";

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
        acc.push(row[EXCEL_COLLUMN_NAMES.contract]);
        return acc;
      }, [])
      .filter((contract, index, array) => array.indexOf(contract) === index);

    return uniqueContractArray.map((contractName) => {
      const filteredRows = unitedPageDatas.filter((row) => row[EXCEL_COLLUMN_NAMES.contract] === contractName);
      return filteredRows.reduce((acc, row) => {
        return { ...acc, ...row };
      }, {});
    });
  }

  #getCorrectCollumn(collumnValue, collumnName) {
    const isCollumnDate =
      collumnName === EXCEL_COLLUMN_NAMES.startWorkDate || collumnName === EXCEL_COLLUMN_NAMES.endWorkDate;

    if (isCollumnDate) {
      const correctDate = format(collumnValue, "dd.MM.yyyy");

      return { [EXCEL_INVERTED_COLLUMN_NAMES[collumnName]]: correctDate };
    }
    if (collumnName === EXCEL_COLLUMN_NAMES.actSum) {
      const integerCurrency = numberToWordsRu.convert(collumnValue, CURRENCY_OPTIONS.withoutFractional);
      const fractionalCurrency = numberToWordsRu.convert(collumnValue, CURRENCY_OPTIONS.withoutInteger);
      const correctActSum = `${collumnValue} (${integerCurrency}) российских рублей ${fractionalCurrency}`;

      return { [EXCEL_INVERTED_COLLUMN_NAMES[collumnName]]: correctActSum };
    }

    return { [EXCEL_INVERTED_COLLUMN_NAMES[collumnName]]: collumnValue };
  }

  getModifiedRowsArray() {
    const assignedRowsArray = this.#getAssignedRowsArray();

    return assignedRowsArray.map((row) => {
      return Object.keys(row).reduce((acc, collumnName) => {
        const correctCollumn = this.#getCorrectCollumn(row[collumnName], collumnName);
        return { ...acc, ...correctCollumn };
      }, {});
    });
  }
}
