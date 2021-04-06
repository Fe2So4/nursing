// 新建打印窗口
import {BrowserWindow, dialog, ipcMain, Notification} from 'electron'
import Path from 'path'

const printWindows = new Map()

const createPrintWindow = (html, options) => {
  let newPrintWindow = new BrowserWindow({
    show: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })
  const printPageURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9088/static/printDocuments.html`
    : Path.join(__dirname, '/static/printDocuments.html')
  newPrintWindow.loadURL(printPageURL)
  newPrintWindow.once('ready-to-show', () => {
    // newPrintWindow.show()
  })

  newPrintWindow.on('closed', () => {
    printWindows.delete(newPrintWindow)
    newPrintWindow = null
  })

  printWindows.set(newPrintWindow, {
    html,
    options
  })
  return newPrintWindow
}

// 打印任务队列
const printTaskQueue = []
let timer
// 执行打印任务
const startPrint = () => {
  const step = () => {
    if (printTaskQueue.length) {
      const task = printTaskQueue.shift()
      task()
      timer = setTimeout(() => {
        step()
      }, 1000)
    } else {
      clearTimeout(timer)
      timer = null
    }
  }
  if (timer) return
  step()
}

ipcMain.on('printDocument', (e, html, options) => {
  createPrintWindow(html, options)
})

ipcMain.on('print-documents-ready', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  const {html, options} = printWindows.get(win)
  e.reply('print-documents-ready-reply', html, options)
})

ipcMain.on('print-content-document', (e, options) => {
  const task = () => {
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
        BrowserWindow.fromWebContents(e.sender).close()
      })
    } else {
      e.sender.print()
    }
  }
  printTaskQueue.push(task)
  startPrint()
})
