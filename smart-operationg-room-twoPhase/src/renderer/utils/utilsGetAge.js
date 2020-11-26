const Age = (status) => {
  var aDate = new Date()
  var thisYear = aDate.getFullYear()
  var bDate = new Date(status)
  var brith = bDate.getFullYear()
  var age = (thisYear - brith)
  return age
}
export default Age
