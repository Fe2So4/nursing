import request from '@/utils/request'
const config = require('@/config/url.js')

// 获取楼层列表
const reqcareLoginUrl = `${config.default.api.baseURL}/ocis/login/careLogin`
export const login = (obj) => {
  return request({
    url: reqcareLoginUrl,
    method: 'post',
    data: obj
  })
}
