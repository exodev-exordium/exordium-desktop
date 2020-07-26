import { BrowserWindow } from 'electron-acrylic-window';
import { app, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 750,
    height: 600,
    frame: false,
    transparent: true,
    vibrancy: 'light',
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {

    // devtools messes with the vibrancy
    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Enables Vibrancy on Windows 10
  //win.setVibrancy();

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
  });

  return win;
}

try {

  app.allowRendererProcessReuse = true;

  app.on('ready', () => {
    setTimeout(createWindow, 400);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
