var getWeek = function (str) {
  // str格式为yyy-mm-dd
  // 周日归到了本周
  var d = new Date(str)
  // var day = d.getDay()
  var originDate = d.getFullYear() + '-' + '01' + '-' + '01' + ' 00:00:00'
  var nowDate = d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) + ' 00:00:00'
  var nowStrapTime = (new Date(nowDate)).getTime()
  var originStrapTime = (new Date(originDate)).getTime()
  var originDay = ((new Date(originStrapTime)).getDay()) === 0 ? 7 : ((new Date(originStrapTime)).getDay())
  var nowDay = d.getDay() === 0 ? 7 : d.getDay()
  var weeks = 0
  var resultStrap = 0
  if (nowDay > originDay) {
    resultStrap = nowStrapTime - (nowDay - originDay) * 1000 * 3600 * 24 - originStrapTime
    if (resultStrap > 0) {
      weeks = (resultStrap / (3600 * 1000 * 24 * 7)) + 1
    } else {
      weeks = 1
    }
  } else {
    resultStrap = nowStrapTime + (originDay - nowDay) * 1000 * 3600 * 24 - originStrapTime
    weeks = (resultStrap / (3600 * 1000 * 24 * 7)) + 1
  }
  return (d.getFullYear() + '年第' + weeks + '周')
}
export default getWeek
