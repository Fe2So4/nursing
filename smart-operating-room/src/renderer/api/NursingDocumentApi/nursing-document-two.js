import request from '@/utils/request'
const config = require('@/config/url.js')

const reqNursingDocumentTwoUrl = `${config.default.api.baseURL}/ocis/nursingRecord/getNuringRecordTwo`
export const reqNursingDocumentTwo = (obj) => {
  return request({
    url: reqNursingDocumentTwoUrl + `/${obj.hospitalNo}` + `/${obj.cureNo}`,
    method: 'get'
  })
}
