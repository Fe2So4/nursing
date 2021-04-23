const { ipcRenderer } = require('electron')
ipcRenderer.on('print-documents-ready-reply', (e, html, options) => {
  document.getElementById('printContent').innerHTML = html
  const title = document.querySelector('title')
  title.innerText = '打印' + Date.now()
  setTimeout(() => {
    ipcRenderer.send('print-content-document', options)
  })
})
ipcRenderer.send('print-documents-ready')
