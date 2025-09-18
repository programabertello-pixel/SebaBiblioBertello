const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', { submitActivation: (p) => ipcRenderer.invoke('activation:submit', p), booksList: () => ipcRenderer.invoke('books:list'), usersList: () => ipcRenderer.invoke('users:list'), createLoan: (p) => ipcRenderer.invoke('loan:create', p), returnLoan: (id) => ipcRenderer.invoke('loan:return', id) });
