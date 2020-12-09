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
// 登录成功获取信息
const reqgetLoginUserInfoUrl = `${config.default.api.baseURL}/ocis/dictInfo/getLoginUserInfo`
export const reqgetLoginUserInfo = (obj) => {
  return request({
    url: reqgetLoginUserInfoUrl,
    method: 'get'
  })
}
