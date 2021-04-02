const { ipcRenderer } = require('electron')
ipcRenderer.on('print-page-ready-reply', (e, html, css, options) => {
  let link = document.querySelector('link')
  link.href = css
  document.getElementById('printContent').innerHTML = html
  const title = document.querySelector('title')
  title.innerText = '打印' + Date.now()
  setTimeout(() => {
    ipcRenderer.send('print-content', options)
  })
})
ipcRenderer.send('print-page-ready')
