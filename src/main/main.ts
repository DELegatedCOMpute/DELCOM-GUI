/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import Electron, { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import os from 'os';
import { PathLike } from 'fs';
import Client from './delcom-client';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

client.init();

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.handle('getHardwareInfo', async () => {
  return {
    machineArch: os.machine(),
    ram: os.totalmem(),
    numCores: os.cpus().length,
    cores: os.cpus(),
  };
});

ipcMain.handle('getWorkers', async () => {
  return client.getWorkers();
});

ipcMain.handle('joinWorkforce', async () => {
  return client.getWorkers();
});

ipcMain.handle(
  'delegateJob',
  async (
    event: Electron.IpcMainInvokeEvent,
    workerId: string,
    filePaths: PathLike[],
    opts?:
      | {
          outDir?: PathLike | undefined;
          whenJobAssigned?: ((path: PathLike) => void) | undefined;
          whenFilesSent?: (() => void) | undefined;
          whenJobDone?: (() => void) | undefined;
        }
      | undefined,
  ) => {
    return client.delegateJob(workerId, filePaths, opts);
  },
);

ipcMain.handle('leaveWorkForce', async () => {
  return client.leaveWorkforce();
});

ipcMain.handle('openFile', async () => {
  return dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  // to install react developer tools, but was not working anyways - caused uneccessary warnings in out
  // if (isDebug) {
  //   await installExtensions();
  // }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
