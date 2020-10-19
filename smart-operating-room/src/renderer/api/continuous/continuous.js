import request from '@/utils/request'
const config = require('@/config/url.js')

// 获取连台手术数据列表
const reqcontinuousOperationUrl = `${config.default.api.baseURL}/ocis/continuousOperation/list`
export const reqcontinuousOperation = (obj) => {
  return request({
    url: reqcontinuousOperationUrl,
    method: 'post',
    data: obj
  })
}
