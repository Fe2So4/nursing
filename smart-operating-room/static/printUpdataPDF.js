const { ipcRenderer } = require('electron')
ipcRenderer.on('print-updataPDF-ready-reply', (e, html) => {
  document.getElementById('printContent').innerHTML = html
  const title = document.querySelector('title')
  title.innerText = '打印' + Date.now()
  setTimeout(() => {
    ipcRenderer.send('print-printPdf-document')
  })
})
ipcRenderer.send('print-updataPDF-ready')
