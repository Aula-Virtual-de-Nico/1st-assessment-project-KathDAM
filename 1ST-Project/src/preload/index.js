import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getList: () => ipcRenderer.invoke('store:get-list'),
  getTask: (taskId) => ipcRenderer.invoke('store:get-task', taskId),
  addTask: (task) => ipcRenderer.send('store:add-task', task),
  deleteTask: (task) => ipcRenderer.invoke('store:delete-task', task),
  updateTask: (task) => ipcRenderer.send('store:update-task', task),
  confirmTask: (task) => ipcRenderer.invoke('store:confirm-task', task)
} //Llamo al proceso principal, aqui es donde relleno

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
