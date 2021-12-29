const fs = require("fs");
const path = require("path");

const deleteFilesFromOutput = (outputDirectory = null) => {
  if (!outputDirectory) return;

  const files = fs.readdirSync(outputDirectory);

  for (const file of files) {
    fs.unlinkSync(path.join(outputDirectory, file));
    console.log(`file ${file} deleted`);
  }
};

module.exports = {
  deleteFilesFromOutput,
};
