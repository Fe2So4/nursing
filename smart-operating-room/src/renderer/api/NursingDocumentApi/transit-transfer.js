import request from '@/utils/request'
const config = require('@/config/url.js')
const reqTransitTransferUrl = `${config.default.api.baseURL}/ocis/forwardingReport/forwardingReport`

export const reqTransitTransfer = (obj) => {
  return request({
    url: reqTransitTransferUrl,
    method: 'get',
    params: obj
  })
}
