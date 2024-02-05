const path = require("path");

const { OUTSIDE_PATH } = require("./outside-path");
const { CONTRACT_TYPES } = require("./contract-types");

const WORD_SAMPLE_PATHS = {
  Male: {
    [CONTRACT_TYPES['А']]: path.join(OUTSIDE_PATH, "assets/assets_A/format_male.docx"),
    [CONTRACT_TYPES['АТ']]: path.join(OUTSIDE_PATH, "assets/assets_AT/format_male.docx"),
    [CONTRACT_TYPES['Д']]: path.join(OUTSIDE_PATH, "assets/assets_D/format_male.docx"),
    [CONTRACT_TYPES['БР']]: path.join(OUTSIDE_PATH, "assets/assets_R/format_male.docx"),
    [CONTRACT_TYPES['ФР']]: path.join(OUTSIDE_PATH, "assets/assets_R/format_male.docx"),
    [CONTRACT_TYPES['ХР']]: path.join(OUTSIDE_PATH, "assets/assets_R/format_male.docx"),
    [CONTRACT_TYPES['Т']]: path.join(OUTSIDE_PATH, "assets/assets_T/format_male.docx"),
  },
  Female: {
    [CONTRACT_TYPES['А']]: path.join(OUTSIDE_PATH, "assets/assets_A/format_female.docx"),
    [CONTRACT_TYPES['АТ']]: path.join(OUTSIDE_PATH, "assets/assets_AT/format_female.docx"),
    [CONTRACT_TYPES['Д']]: path.join(OUTSIDE_PATH, "assets/assets_D/format_female.docx"),
    [CONTRACT_TYPES['БР']]: path.join(OUTSIDE_PATH, "assets/assets_R/format_female.docx"),
    [CONTRACT_TYPES['ФР']]: path.join(OUTSIDE_PATH, "assets/assets_R/format_female.docx"),
    [CONTRACT_TYPES['ХР']]: path.join(OUTSIDE_PATH, "assets/assets_R/format_female.docx"),
    [CONTRACT_TYPES['Т']]: path.join(OUTSIDE_PATH, "assets/assets_T/format_female.docx"),
  },
};

module.exports = { WORD_SAMPLE_PATHS };
