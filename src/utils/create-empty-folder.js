const fs = require("fs");
const path = require("path");

/**
 * Создаёт папку новую папку *( рекурсивно )*. Или при необходимости удаляет лишние файлы
 * @param {String} folderPath Путь, где будет создана папка
 */
const createEmptyFolder = (folderPath = null) => {
  if (!folderPath) {
    throw new Error("folder path is empty");
  }

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });

    return;
  }

  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    fs.unlinkSync(path.join(folderPath, file));
  }
};

module.exports = { createEmptyFolder };
