const { ipcRenderer } = require('electron')
ipcRenderer.on('print-page-ready-reply', (e, html, css, options) => {
  const styleLink = document.createElement('link')
  styleLink.rel = 'stylesheet'
  styleLink.type = 'text/css'
  styleLink.href = css
  document.head.append(styleLink)
  document.getElementById('printContent').innerHTML = html
  const title = document.querySelector('title')
  title.innerText = '打印' + Date.now()
  styleLink.onload = () => {
    setTimeout(() => {
      ipcRenderer.send('print-content', options)
    })
  }
})
ipcRenderer.send('print-page-ready')
