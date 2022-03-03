const {
  getCorrectActSum,
  getCorrectContractDate,
  getCorrectFullname,
  getCorrectEndWorkDate,
  getCorrectStartWorkDate,
} = require("./formatters");

const { EXCEL_COLUMN_NAMES, EXCEL_INVERTED_COLUMN_NAMES } = require("../../constants/excel-column-names");

const getCorrectExcelValue = (value, columnName) => {
  if (!value) {
    return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: "" };
  }

  switch (columnName) {
    case EXCEL_COLUMN_NAMES.startWorkDate:
      return getCorrectStartWorkDate(value, columnName);
    case EXCEL_COLUMN_NAMES.endWorkDate:
      return getCorrectEndWorkDate(value, columnName);
    case EXCEL_COLUMN_NAMES.contractDate:
      return getCorrectContractDate(value, columnName);
    case EXCEL_COLUMN_NAMES.actSum:
      return getCorrectActSum(value, columnName);
    case EXCEL_COLUMN_NAMES.fio:
      return getCorrectFullname(value, columnName);

    default:
      return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: value };
  }
};

module.exports = { getCorrectExcelValue };
