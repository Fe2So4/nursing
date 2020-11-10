export const startSpeak = (text) => {
  var msg = new SpeechSynthesisUtterance(text)
  // msg.rate = 4 播放语速
  // msg.pitch = 10 音调高低
  // msg.text = "播放文本"
  // msg.volume = 0.5 播放音量
  // 暂停
  // window.speechSynthesis.pause();
  // 继续
  // window.speechSynthesis.resume();
  window.speechSynthesis.speak(msg)
}
export const pauseSpeak = () => {
  // 暂停
  window.speechSynthesis.pause()
}

export const resumeSpeak = () => {
  // 继续
  window.speechSynthesis.resume()
}

export const cancelSpeak = () => {
  // 停止
  window.speechSynthesis.cancel()
}
