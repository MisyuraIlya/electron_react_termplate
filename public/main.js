const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { handleTodoFormSubmission } = require('./handlers/core');

const isDev =  !app.isPackaged

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'remoter',
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if(isDev){
    mainWindow.webContents.openDevTools();
  }

};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});



ipcMain.on('submit:todoForm', handleTodoFormSubmission);