const { EXCEL_COLUMN_NAMES } = require("../constants/excel-column-names");
const { DEFALUT_EXCEL_ROW } = require("../constants/default-excel-row");

/**
 * Соединяет все поля со совпадающими номерами контрактов со всех страниц в одно поле
 * @param { { [key: string]: any[] } } xlsxJson
 * @returns { { [key: string]: any }[] } Массив объектов *( строк Excel )*, где ключ - заголовок колонки
 */
const getAssignedRowsArray = (xlsxJson) => {
  const unitedPageDatas = Object.keys(xlsxJson).reduce((acc, pageName) => [...acc, ...xlsxJson[pageName]], []);
  const uniqueContractArray = unitedPageDatas
    .reduce((acc, row) => [...acc, row[EXCEL_COLUMN_NAMES.contract]], [])
    .filter((contract, index, array) => array.indexOf(contract) !== index);

  return uniqueContractArray.map((contractName) => {
    const filteredRows = unitedPageDatas.filter((row) => row[EXCEL_COLUMN_NAMES.contract] === contractName);

    return filteredRows.reduce((acc, row) => {
      return { ...acc, ...row };
    }, {});
  });
};

/**
 * Устанавливает недостающие поля (стандартный парсер их просто пропускает)
 * @param { { [key: string]: any }[] } assignedRowsArray
 * @returns { { [key: string]: any }[] } Массив объектов *( строк Excel )*, но уже с недостающими полями
 */
const setMissingEmptyFields = (assignedRowsArray) => {
  return assignedRowsArray.map((row) => ({ ...DEFALUT_EXCEL_ROW, ...row }));
};

module.exports = {
  getAssignedRowsArray,
  setMissingEmptyFields,
};
