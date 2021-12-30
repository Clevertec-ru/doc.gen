const CURRENCY_OPTIONS = {
  withoutFractional: {
    currency: "rub",
    declension: "nominative",
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    showCurrency: {
      integer: false,
    },
  },
  withoutInteger: {
    currency: "rub",
    declension: "nominative",
    showNumberParts: {
      integer: false,
      fractional: true,
    },
  },
};

module.exports = {
  CURRENCY_OPTIONS,
};
