const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendEmail: (emailData) => ipcRenderer.invoke('send-email', emailData)
});
