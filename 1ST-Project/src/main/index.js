import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron' //aqui se modifica tambien
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import { TaskManager } from './TaskManager'

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Register events
const store = new TaskManager({ name: 'app-data' })

ipcMain.handle('store:get-list', async () => {
  try {
    const list = await store.getList()
    mainWindow.send('list-updated', list)
  } catch (error) {
    console.error(error)
  }
})

// GET TASK (ID)
ipcMain.handle('store:get-task', async (event, taskId) => {
  return await store.getItem(taskId)
})

// ADD TASK
ipcMain.on('store:add-task', (event, task) => {
  mainWindow.send('list-updated', store.addItem(task))
})

// DELETE TASK
ipcMain.handle('store:delete-task', async (event, task) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'warning',
    title: `Borrar ${task.name}`,
    message: `¿Borrar '${task.name}' de la lista?`,
    buttons: ['Cancelar', 'BORRAR'],
    cancelId: 0,
    defaultId: 1
  })

  if (result.response === 1) {
    console.log('Borrando', item)
    mainWindow.send('list-updated', store.deleteTask(task))
    return true
  }
})

// UPDATE TASK
ipcMain.on('store:update-task', (event, task) => {
  mainWindow.send('list-updated', store.updateTask(task))
})

// CONFIRM TASK
ipcMain.handle('store:confirm-task', async (event, task) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'question',
    title: `Hay cambios sin guardar`,
    message: `¿Seguro que deseas descartar los cambios?`,
    detail: 'Se perderán los cambios realizados en el producto.',
    buttons: ['Cancelar', 'Guardar', 'Descartar'],
    cancelId: 0,
    defaultId: 2
  })

  switch (result.response) {
    case 0:
      return 'cancel'
    case 1:
      mainWindow.send('list-updated', store.updateTask(task))
      return 'save'
    case 2:
      return 'discard'
  }
})