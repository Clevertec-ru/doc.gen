const path = require("path");

const { OUTSIDE_PATH } = require("./outside-path");

const OUTPUT_DIRECTORY = path.join(OUTSIDE_PATH, "output");

module.exports = { OUTPUT_DIRECTORY };
