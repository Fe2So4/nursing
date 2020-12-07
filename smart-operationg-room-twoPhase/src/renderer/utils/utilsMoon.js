const utilsGetMoon = function () {
  let nowDate = new Date()
  let y = nowDate.getFullYear()
  let m = nowDate.getMonth() + 1
  if (m < 10) {
    m = '0' + m
  }
  return y + '-' + m
}
export default utilsGetMoon
