import request from '@/utils/request'
const config = require('@/config/url.js')

// 获取楼层列表
const reqstatisticalQueryrUrl = `${config.default.api.baseURL}/ocis/statisticalQuery/list`
export const reqstatisticalQueryr = (obj) => {
  return request({
    url: reqstatisticalQueryrUrl,
    method: 'post',
    data: obj
  })
}
