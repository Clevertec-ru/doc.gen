const { CONTRACT_TYPES } = require("../constants/contract-types");
const { EXCEL_COLUMN_NAMES, EXCEL_INVERTED_COLUMN_NAMES } = require("../constants/excel-column-names");

const getContractType = (modifiedRowsArray) => {
  const contractString = modifiedRowsArray[0][EXCEL_INVERTED_COLUMN_NAMES[EXCEL_COLUMN_NAMES.contractType]];

  return CONTRACT_TYPES[contractString];
};

module.exports = { getContractType };
