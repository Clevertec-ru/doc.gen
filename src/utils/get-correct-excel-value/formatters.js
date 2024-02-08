const { format, addDays, parse } = require('date-fns');
const { ru } = require('date-fns/locale');
const { DateTime } = require('luxon');
const numberToWordsRu = require('number-to-words-ru');

const { getInitialsFromName } = require('./helpers');

const { CURRENCY_OPTIONS } = require('../../constants/currency-options');
const {
  EXCEL_INVERTED_COLUMN_NAMES,
} = require('../../constants/excel-column-names');

const getCorrectStartWorkDate = (date, columnName) => {
  const correctDate = DateTime.fromFormat(date, 'dd.MM.yy');
  const formattedDate = correctDate.toFormat('dd.MM.yyyy');

  return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate };
};

const getCorrectEndWorkDate = (date, columnName) => {
  const correctDate = DateTime.fromFormat(date, 'dd.MM.yyyy');
  const formattedDate = correctDate.toFormat('dd.MM.yyyy');
  const formattedDateShort = correctDate.toFormat('ddMMyy');
  const formattedDateRus = correctDate.toFormat('«dd» MMMM yyyy г', {
    locale: 'ru',
  });

  return {
    [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate,
    [EXCEL_INVERTED_COLUMN_NAMES.endWorkDateFormatted]: formattedDateRus,
    [EXCEL_INVERTED_COLUMN_NAMES.formattedDateShort]: formattedDateShort,
  };
};

const getCorrectContractDate = (date, columnName) => {
  const correctDate = DateTime.fromFormat(date, 'dd.MM.yy');
  const formattedDate = correctDate.toFormat('dd.MM.yyyy');
  const contractDateFormatted = correctDate.toFormat('«dd» MMMM yyyy г', {
    locale: 'ru',
  });

  return {
    [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate,
    [EXCEL_INVERTED_COLUMN_NAMES.contractDateFormatted]: contractDateFormatted,
  };
};

const getCorrectActSum = (actSum, columnName) => {
  const actSumNumber = Number(actSum);
  const integerCurrency = numberToWordsRu.convert(
    actSumNumber,
    CURRENCY_OPTIONS.withoutFractional
  );
  const fractionalCurrency = numberToWordsRu.convert(
    actSumNumber,
    CURRENCY_OPTIONS.withoutInteger
  );

  const correctActSum = `${actSum.toLocaleString()} (${integerCurrency}) российских рублей ${fractionalCurrency}`;

  return {
    [EXCEL_INVERTED_COLUMN_NAMES.textedAmount]: correctActSum,
  };
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
