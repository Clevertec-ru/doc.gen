const { format, addDays, parse } = require('date-fns');
const { ru } = require('date-fns/locale');
const numberToWordsRu = require('number-to-words-ru');

const { getInitialsFromName } = require('./helpers');

const { CURRENCY_OPTIONS } = require('../../constants/currency-options');
const {
  EXCEL_INVERTED_COLUMN_NAMES,
} = require('../../constants/excel-column-names');

const getCorrectStartWorkDate = (date, columnName) => {
  const correctDate = addDays(date, 1);
  const formattedDate = format(correctDate, 'dd.MM.yyyy');

  return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate };
};

const getCorrectEndWorkDate = (date, columnName) => {
  const correctDate = addDays(date, 1);
  const formattedDate = format(correctDate, 'dd.MM.yyyy');
  const formattedDateShort = format(correctDate, 'ddMMyy');
  const formattedDateRus = format(correctDate, '«dd» MMMM yyyy г', {
    locale: ru,
  });

  return {
    [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate,
    [EXCEL_INVERTED_COLUMN_NAMES.endWorkDateFormatted]: formattedDateRus,
    [EXCEL_INVERTED_COLUMN_NAMES.formattedDateShort]: formattedDateShort,
  };
};

const getCorrectContractDate = (date, columnName) => {
  const parsedDate = parse(date, 'dd.MM.yy', new Date());
  const formattedDate = format(parsedDate, 'dd.MM.yyyy');

  return { [EXCEL_INVERTED_COLUMN_NAMES[columnName]]: formattedDate };
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


// C:\Users\admin\Clevertec\doc.gen\dist\win-unpacked\assets\assets_R\format_male.docx
// C:\Users\admin\Clevertec\doc.gen\dist\win-unpacked\resources\assets\assets_R\format_male.docx