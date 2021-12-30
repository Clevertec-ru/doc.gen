const { BrowserWindow } = require("electron");

const createMainWindow = (preloadPath = "", mainTemplatePath = "", isDev = false) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("./templates/index.html");

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
};

module.exports = {
  createMainWindow,
};
