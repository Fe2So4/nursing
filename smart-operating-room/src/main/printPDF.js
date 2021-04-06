// 新建导出窗口
import {BrowserWindow, dialog, ipcMain} from 'electron'
import Path from 'path'
const fs = require('fs')
const printPagePDFURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9088/static/printPDF.html`
  : Path.join(__dirname, '/static/printPDF.html')
const printPDFWindows = new Map()
const createPrintPDFWindow = (html,
  css,
  options) => {
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

  printPDFWindows.set(newPrintPDFWindow, {
    html,
    css,
    options
  })
  return newPrintPDFWindow
}
// let printPDFHtml = ''
// let cssFilePDFName = ''
// let printPDFWin = null
// let printPDFOptions = null
ipcMain.on('printpdfChannel', (e, html, css, options) => {
  createPrintPDFWindow(html,
    css,
    options)
})

ipcMain.on('print-page-ready-test', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  const {html, css, options} = printPDFWindows.get(win)
  e.reply('print-page-ready-reply-test', html, css, options)
})

ipcMain.on('did-finish-load', (e, options, fileName) => {
  const dir = dialog.showSaveDialogSync({ defaultPath: `${fileName}.pdf`, showsTagField: false })

  e.sender.printToPDF({}, (error, data) => {
    if (error) throw error // 写文件
    fs.writeFileSync(dir, data)
    if (e.sender) {
      BrowserWindow.fromWebContents(e.sender).close()
    }
  })

// const options = { silent: true, landscape: true }
})
