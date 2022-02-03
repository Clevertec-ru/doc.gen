const { BrowserWindow } = require("electron");

const createMainWindow = (preloadPath = "", mainTemplatePath = "", isDev = false) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    fullscreen: false,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile(mainTemplatePath);
  mainWindow.setMenu(null);

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
};

module.exports = {
  createMainWindow,
};
