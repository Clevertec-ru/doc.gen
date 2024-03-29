// Modules to control application life and create native browser window
const { app, ipcMain, dialog, shell } = require("electron");
const path = require("path");

const { createMainWindow } = require("./window");
const { WordContractGenerator } = require("./word-contract-generator");

const { OUTPUT_DIRECTORY } = require("./constants/output-directory");

const preloadPath = path.join(__dirname, "preload.js");
const mainTemplatePath = path.join(__dirname, "./templates/index.html");

app.whenReady().then(() => {
  const win = createMainWindow(preloadPath, mainTemplatePath, true);

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow(preloadPath, mainTemplatePath);
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  ipcMain.on("click-button", async () => {
    dialog
      .showOpenDialog({ properties: ["openFile"] })
      .then((file) => {
        const wordContractGenerator = new WordContractGenerator(OUTPUT_DIRECTORY, file.filePaths[0]);
        const generatedFilesInformation = wordContractGenerator.generateContractDocuments();

        win.webContents.send("generate-success", generatedFilesInformation);
      })
      .catch(() => {
        win.webContents.send("file-cancelled");
      });
  });

  ipcMain.on("open-result", async (event, filePath) => {
    shell.openPath(filePath);
  });
});
