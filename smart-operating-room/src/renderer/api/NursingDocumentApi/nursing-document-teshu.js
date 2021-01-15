import request from '@/utils/request'
const config = require('@/config/url.js')

const reqNursingDocumentTeShuUrl = `${config.default.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeSpecial`
export const reqNursingDocumentTeShu = (obj) => {
  console.log(obj)
  return request({
    url: reqNursingDocumentTeShuUrl + `/${obj.hospitalNo}` + `/${obj.cureNo}` + `/${obj.operSchNo}`,
    method: 'get'
  })
}
