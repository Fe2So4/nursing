const utilsGetNewDate = function () {
  let nowDate = new Date()
  let y = nowDate.getFullYear()
  let m = nowDate.getMonth() + 1
  if (m < 10) {
    m = '0' + m
  }
  let d = nowDate.getDate()
  if (d < 10) {
    d = '0' + d
  }
  return y + '-' + m + '-' + d
}
export default utilsGetNewDate
