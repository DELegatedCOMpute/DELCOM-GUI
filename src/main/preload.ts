// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';
import { PathLike } from 'fs';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    getHardwareInfo: () => ipcRenderer.invoke('getHardwareInfo'),
    getWorkers: () => ipcRenderer.invoke('getWorkers'),
    joinWorkforce: () => ipcRenderer.invoke('joinWorkforce'),
    delegateJob: (workerId: string, filePaths: PathLike[]) =>
      ipcRenderer.invoke('delegateJob', workerId, filePaths),
    leaveWorkForce: () => ipcRenderer.invoke('leaveWorkForce'),
    openFile: () => ipcRenderer.invoke('openFile'),
    openFileDirectly: (path: PathLike) => {
      ipcRenderer.invoke('openFileDirectly', path);
    },
    onJobAssigned: (callback: (p: PathLike) => void) => {
      ipcRenderer.on('jobAssigned', (_event, p) => callback(p));
    },
    onFilesSent: (callback: () => void) => {
      ipcRenderer.on('filesSent', () => callback());
    },
    onJobDone: (callback: () => void) => {
      ipcRenderer.on('jobDone', () => callback());
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
