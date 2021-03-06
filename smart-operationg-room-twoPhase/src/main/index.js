'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'

const Path = require('path')
const fs = require('fs')

// import '../renderer/store'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9088`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    // useContentSize: true,
    width: 1000,
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

app.on('ready', createWindow)

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
const printWindows = new Set()
const createPrintWindow = () => {
  let newPrintWindow = new BrowserWindow({
    show: true,
    frame: false,
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

  printWindows.add(newPrintWindow)
  return newPrintWindow
}
let printHtml = ''
let cssFileName = ''
let printWin = null
let printOptions = null
ipcMain.on('printChannel', (e, html, css, options) => {
  printWin = createPrintWindow()
  printHtml = html
  cssFileName = css
  printOptions = options
})

ipcMain.on('print-page-ready', (e) => {
  e.reply('print-page-ready-reply', printHtml, cssFileName, printOptions)
})

ipcMain.on('print-content', (e, options) => {
  console.log(e, options)
  if (options) {
    printWin.webContents.print(options)
  } else {
    printWin.webContents.print()
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
  })

// const options = { silent: true, landscape: true }
})

ipcMain.on('download', (evt, args) => {
  const url = JSON.parse(args)
  const downloadUrl = url.downloadUrl
  console.log(downloadUrl)
  mainWindow.webContents.downloadURL(downloadUrl)
})
