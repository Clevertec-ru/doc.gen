const path = require("path");
const { app } = require("electron");

const WORD_SAMPLE_PATH = path.join(app.getAppPath(), "./assets/format.docx");

module.exports = {
  WORD_SAMPLE_PATH,
};
