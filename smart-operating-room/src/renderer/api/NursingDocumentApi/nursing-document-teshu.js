import request from '@/utils/request'
const config = require('@/config/url.js')

const reqNursingDocumentTeShuUrl = `${config.default.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeSpecial`
export const reqNursingDocumentTeShu = (obj) => {
  return request({
    url: reqNursingDocumentTeShuUrl + `/${obj.hospitalNo}` + `/${obj.cureNo}`,
    method: 'get'
  })
}
