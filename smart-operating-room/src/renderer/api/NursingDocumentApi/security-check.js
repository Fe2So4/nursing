import request from '@/utils/request'
const config = require('@/config/url.js')

const reqSecurityCheckUrl = `${config.default.api.baseURL}/ocis/nursingRecord/saveNuringRecordOne`
export const reqSecurityCheck = (obj) => {
  return request({
    url: reqSecurityCheckUrl + `/${obj.cureNo}` + `/${obj.hospitalNo}`,
    method: 'get'
  })
}
