import request from '@/utils/request'
const config = require('@/config/url.js')

const reqNursingDocumentJiChuUrl = `${config.default.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeOrdinary`
export const reqNursingDocumentJiChu = (obj) => {
  return request({
    url: reqNursingDocumentJiChuUrl + `/${obj.hospitalNo}` + `/${obj.cureNo}`,
    method: 'get'
  })
}
