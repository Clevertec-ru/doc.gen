const path = require("path");
const { app } = require("electron");

const OUTPUT_DIRECTORY = path.join(app.getAppPath(), "../output");

module.exports = {
  OUTPUT_DIRECTORY,
};
