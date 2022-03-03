const path = require("path");

const { OUTSIDE_PATH } = require("./outside-path");
const { CONTRACT_TYPES } = require("./contract-types");
const { RECIPIENT_SEX } = require("./recipient-sex");

const WORD_SAMPLE_PATHS = {
  [RECIPIENT_SEX.male]: {
    [CONTRACT_TYPES.A]: path.join(OUTSIDE_PATH, "assets/assets_A/format_male.docx"),
    [CONTRACT_TYPES.AT]: path.join(OUTSIDE_PATH, "assets/assets_AT/format_male.docx"),
    [CONTRACT_TYPES.D]: path.join(OUTSIDE_PATH, "assets/assets_D/format_male.docx"),
    [CONTRACT_TYPES.R]: path.join(OUTSIDE_PATH, "assets/assets_R/format_male.docx"),
    [CONTRACT_TYPES.T]: path.join(OUTSIDE_PATH, "assets/assets_T/format_male.docx"),
  },
  [RECIPIENT_SEX.female]: {
    [CONTRACT_TYPES.A]: path.join(OUTSIDE_PATH, "assets/assets_A/format_female.docx"),
    [CONTRACT_TYPES.AT]: path.join(OUTSIDE_PATH, "assets/assets_AT/format_female.docx"),
    [CONTRACT_TYPES.D]: path.join(OUTSIDE_PATH, "assets/assets_D/format_female.docx"),
    [CONTRACT_TYPES.R]: path.join(OUTSIDE_PATH, "assets/assets_R/format_female.docx"),
    [CONTRACT_TYPES.T]: path.join(OUTSIDE_PATH, "assets/assets_T/format_female.docx"),
  },
};

module.exports = { WORD_SAMPLE_PATHS };
