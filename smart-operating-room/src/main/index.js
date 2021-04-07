'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { filePath as configJsonFilePath } from './ip'
import './print'
import './printPDF'
import './printDocuments'
const { autoUpdater } = require('electron-updater')
const Path = require('path')
const feedUrl = 'http://128.0.18.38:8080/nursing/smartnursing'
// const feedUrl = 'http://128.0.18.38:8080/nursing/largescreen'
// const feedUrl = 'http://128.0.18.38:8080/nursing/orderscreen'
// const feedUrl = 'http://localhost:9088/build'
// import '../renderer/store'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let updateWindow
let mainWindow
let initialWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9088`
  : `file://${__dirname}/index.html`

const os = require('os')
const isWin7 = os.release().startsWith('6.1')
// win7 下关闭硬件加速
if (isWin7) app.disableHardwareAcceleration()
function createUpdateWindow () {
  updateWindow = new BrowserWindow({
    width: 400,
    height: 80,
    frame: false,
    center: true,
    resizable: false,
    movable: false,
    transparent: true,
    focusable: false,
    alwaysOnTop: true,
    webPreferences: {
      devTools: false,
      preload: Path.resolve(__static, './update/update.js')
    }
  })
  updateWindow.loadURL(Path.resolve(__static, './update/index.html'))
}
function createInitialWindow () {
  initialWindow = new BrowserWindow({
    width: 880,
    height: 560,
    frame: false,
    center: true,
    resizable: false,
    movable: true,
    transparent: true,
    focusable: false,
    alwaysOnTop: true,
    webPreferences: {
      devTools: false,
      preload: Path.resolve(__static, './loading/preload.js')
    }
  })
  initialWindow.loadURL(Path.resolve(__static, './loading/index.html'))
}
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 560,
    useContentSize: true,
    width: 880,
    // movable: false,
    webPreferences: {
      // webSecurity: false, // 官方建议不要禁用
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus()
      })
      mainWindow.webContents.openDevTools()
    })
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // ipcMain.on('login-window', () => {
  //   mainWindow.maximize()
  // })
}

ipcMain.on('update', (e, arg) => {
  checkForUpdates()
})
const checkForUpdates = () => {
  // 执行更新检查
  if (process.env.NODE_ENV === 'development') {
    // 调试环境必须主动设置当前版本，electron-update有bug会去取electron的版本,而不是app的版本
    autoUpdater.currentVersion = '1.0.3'
    autoUpdater.updateConfigPath = Path.join(__dirname, '../../build/win-unpacked/resources/app-update.yml')
  } else {
    // autoUpdater.updateConfigPath = Path.join(__filename, '../../build/win-unpacked/resources/app-update.yml')
  }
  autoUpdater.autoDownload = false
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedUrl)
  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on('error', function (message) {
    console.log('执行更新错误')
    sendUpdateMessage('error', message)
    createInitialWindow()
    createWindow()
  })
  autoUpdater.on('checking-for-update', function (message) {
    // sendUpdateMessage('checking-for-update', message)
    console.log(message, 'update_dyw_dyw')
    // if (!message) {
    //   createInitialWindow()
    //   createWindow()
    // }
  })
  autoUpdater.on('update-available', function (message) {
    // sendUpdateMessage('update-available', message)
    console.log(message, 'update_dyw')
    createUpdateWindow()
  })
  autoUpdater.on('update-not-available', function (message) {
    console.log(message, 'update_dyw_ava')
    createInitialWindow()
    createWindow()
    // sendUpdateMessage('update-not-available', message)
  })

  autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage('download-progress', progressObj)
  })

  ipcMain.on('downloadUpdate', () => {
    // 下载
    autoUpdater.downloadUpdate()
    // 更新下载进度事件
  })
  // 更新下载完成事件
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    sendUpdateMessage('isUpdateNow')
    ipcMain.on('updateNow', (e, arg) => {
      autoUpdater.quitAndInstall(false, true)
    })
  })

  // 执行自动更新检查
  autoUpdater.checkForUpdates()
}
// checkForUpdates();
// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage (message, data) {
  // console.log(message)
  if (updateWindow) {
    updateWindow.webContents.send('message', { message, data })
  }
}

// 处理只能有一个客户端的问题
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
      mainWindow.show()
    }
  })
}

app.on('ready', () => {
  // createWindow()
  checkForUpdates()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
ipcMain.once('open-main', () => {
  initialWindow.webContents.send('close-initial-window')
  mainWindow.show()
})

ipcMain.once('close-initial-window', () => {
  initialWindow.destroy()
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})
app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

// 监听配置文件修改
const chokidar = require('chokidar')
const watcher = chokidar.watch(configJsonFilePath)
watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`)
  mainWindow.reload()
})
