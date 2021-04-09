const { ipcRenderer } = require('electron')
const keyframes = [{
  opacity: 1
}, {
  opacity: 0
}]
const options = {
  iterations: 1,
  delay: 1000,
  duration: 2000,
  easing: 'ease'
}
ipcRenderer.on('close-initial-window', () => {
  document.querySelector('.container').animate(keyframes, options)
  setTimeout(() => {
    ipcRenderer.send('close-initial-window')
  }, 3000)
})
