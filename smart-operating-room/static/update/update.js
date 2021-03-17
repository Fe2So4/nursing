const { ipcRenderer } = require('electron')
ipcRenderer.send('downloadUpdate')
// 注意："download-progress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
ipcRenderer.on('message', (event, { message, data }) => {
  if (message === 'download-progress') {
    var oProcess = document.querySelector('.percent')
    oProcess.innerHTML = Math.trunc(data.percent) + '%' || 0
    if (Math.trunc(data.percent) === 100) {
    }
  } else if (message === 'isUpdateNow') {
    ipcRenderer.send('updateNow')
  } else if (message === 'error') {
    // this.downloadError = true
  }
})
console.log(123)
