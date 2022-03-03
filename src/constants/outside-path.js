const path = require("path");
const { app } = require("electron");

const OUTSIDE_PATH = path.join(app.getAppPath(), "../");

module.exports = { OUTSIDE_PATH };
