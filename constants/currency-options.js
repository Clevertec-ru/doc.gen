export const CURRENCY_OPTIONS = {
  withoutFractional: {
    currency: "rub",
    declension: "genitive",
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
    declension: "genitive",
    showNumberParts: {
      integer: false,
      fractional: true,
    },
  },
};
