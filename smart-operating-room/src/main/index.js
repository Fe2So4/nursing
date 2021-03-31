'use strict'

import { app, BrowserWindow, ipcMain, dialog, Notification } from 'electron'
import { filePath as configJsonFilePath } from './ip'
const { autoUpdater } = require('electron-updater')
const Path = require('path')
const fs = require('fs')
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

// 新建打印窗口
const printPageURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9088/static/print.html`
  : Path.join(__dirname, '/static/print.html')
const printWindows = new Map()
const createPrintWindow = (html, css, options) => {
  let newPrintWindow = new BrowserWindow({
    show: false,
    // frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  newPrintWindow.loadURL(printPageURL)
  // loadURL(`file://${__dirname}/app/index.html`)
  newPrintWindow.once('ready-to-show', () => {
  // newPrintWindow.show()
  })

  newPrintWindow.on('closed', () => {
    printWindows.delete(newPrintWindow)
    newPrintWindow = null
  })

  printWindows.set(newPrintWindow, {
    html,
    css,
    options
  })
  return newPrintWindow
}
ipcMain.on('printChannel', (e, html, css, options) => {
  createPrintWindow(html, css, options)
})

ipcMain.on('print-page-ready', (e) => {
  console.log(e.sender)
  const win = BrowserWindow.fromWebContents(e.sender)
  const {html, css, options} = printWindows.get(win)
  e.reply('print-page-ready-reply', html, css, options)
})

ipcMain.on('print-content', (e, options) => {
  if (options) {
    e.sender.print(options, (success, errorType) => {
      if (!success) {
        dialog.showMessageBox(BrowserWindow.fromWebContents(e.sender), {
          type: 'info',
          title: '提示',
          message: '未完成打印'
        })
      } else {
        const notification = new Notification({
          title: '已发送至打印机，请等待打印'
        })
        notification.show()
      }
    })
  } else {
    e.sender.print()
  }
// const options = { silent: true, landscape: true }
})

// 新建导出窗口
const printPagePDFURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9088/static/printPDF.html`
  : Path.join(__dirname, '/static/printPDF.html')
const printPDFWindows = new Set()
const createPrintPDFWindow = () => {
  let newPrintPDFWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  newPrintPDFWindow.loadURL(printPagePDFURL)
  // loadURL(`file://${__dirname}/app/index.html`)
  newPrintPDFWindow.once('ready-to-show', () => {
  // newPrintWindow.show()
  })

  newPrintPDFWindow.on('closed', () => {
    printPDFWindows.delete(newPrintPDFWindow)
    newPrintPDFWindow = null
  })

  printPDFWindows.add(newPrintPDFWindow)
  return newPrintPDFWindow
}
let printPDFHtml = ''
let cssFilePDFName = ''
let printPDFWin = null
let printPDFOptions = null
ipcMain.on('printpdfChannel', (e, html, css, options) => {
  printPDFWin = createPrintPDFWindow()
  printPDFHtml = html
  cssFilePDFName = css
  printPDFOptions = options
})

ipcMain.on('print-page-ready-test', (e) => {
  e.reply('print-page-ready-reply-test', printPDFHtml, cssFilePDFName, printPDFOptions)
})

ipcMain.on('did-finish-load', (e, options, a) => {
  console.log('A', a)
  var filename = a + '.pdf'
  var dir = dialog.showSaveDialogSync({ defaultPath: filename, showsTagField: false })

  printPDFWin.webContents.printToPDF({}, (error, data) => {
    if (error) throw error // 写文件
    fs.writeFileSync(dir, data)
    if (printPDFWin) {
      printPDFWin.close()
    }
  })

// const options = { silent: true, landscape: true }
})

// 监听配置文件修改
const chokidar = require('chokidar')
const watcher = chokidar.watch(configJsonFilePath)
watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`)
  mainWindow.reload()
})
