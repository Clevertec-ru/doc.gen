const { format, addDays, parse } = require("date-fns");
const { ru } = require("date-fns/locale");
const numberToWordsRu = require("number-to-words-ru");

const { getInitialsFromName } = require("./helpers");

const { CURRENCY_OPTIONS } = require("../../constants/currency-options");
const { EXCEL_INVERTED_COLUMN_NAMES } = require("../../constants/excel-column-names");

const getCorrectStartWorkDate = (date, columnName) => {
  const correctDate = addDays(date, 1);
  const formattedDate = format(correctDate, "dd.MM.yyyy");

  return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate };
};

const getCorrectEndWorkDate = (date, columnName) => {
  const correctDate = addDays(date, 1);
  const formattedDate = format(correctDate, "dd.MM.yyyy");
  const formattedDateRus = format(correctDate, "«dd» MMMM yyyy г", { locale: ru });

  return {
    [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate,
    [EXCEL_INVERTED_COLUMN_NAMES.endWorkDateFormatted]: formattedDateRus,
  };
};

const getCorrectContractDate = (date, columnName) => {
  const parsedDate = parse(date, "dd.MM.yy", new Date());
  const formattedDate = format(parsedDate, "dd.MM.yyyy");

  return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate };
};

const getCorrectActSum = (actSum, columnName) => {
  const actSumNumber = Number(actSum);
  const integerCurrency = numberToWordsRu.convert(actSumNumber, CURRENCY_OPTIONS.withoutFractional);
  const fractionalCurrency = numberToWordsRu.convert(actSumNumber, CURRENCY_OPTIONS.withoutInteger);
  const correctActSum = `${actSumNumber.toLocaleString()} (${integerCurrency}) российских рублей ${fractionalCurrency}`;

  return { [EXCEL_INVERTED_COLUMN_NAMES.textedAmount]: correctActSum };
};

const getCorrectFullname = (fullname, columnName) => {
  const parsedName = getInitialsFromName(fullname);

  return {
    [EXCEL_INVERTED_COLUMN_NAMES.initialName]: parsedName,
    [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: fullname,
  };
};

module.exports = {
  getCorrectActSum,
  getCorrectContractDate,
  getCorrectFullname,
  getCorrectStartWorkDate,
  getCorrectEndWorkDate,
};
