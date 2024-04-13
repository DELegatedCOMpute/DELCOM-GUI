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
    delegateJob: (
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
    ) => ipcRenderer.invoke('delegateJob', workerId, filePaths, opts),
    leaveWorkForce: () => ipcRenderer.invoke('leaveWorkForce'),
    openFile: () => ipcRenderer.invoke('openFile'),
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
