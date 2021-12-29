import fs from "fs";
import path from "path";

export const deleteFilesFromOutput = (outputDirectory = null) => {
  if (!outputDirectory) return;

  const files = fs.readdirSync(outputDirectory);

  for (const file of files) {
    fs.unlinkSync(path.join(outputDirectory, file));
    console.log(`file ${file} deleted`);
  }
};
