import request from '@/utils/request'
const config = require('@/config/url.js')
const reqTransitTransferUrl = `${config.default.api.baseURL}/ocis/forwardingReport/forwardingReportInfo`

export const reqTransitTransfer = (obj) => {
  return request({
    url: reqTransitTransferUrl + `/${obj.hospitalNo}` + `/${obj.cureNo}` + `/${obj.operSchNo}`,
    method: 'get'
  })
}
