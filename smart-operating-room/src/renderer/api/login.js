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
const reqgetLoginUserInfoUrl = `${config.default.api.baseURL}/ocis/dict/getLoginUserInfo`
export const reqgetLoginUserInfo = (obj) => {
  return request({
    url: reqgetLoginUserInfoUrl,
    method: 'get'
  })
}

// 获取送检医师
const reqcheckSendDoctorUrl = `${config.default.api.baseURL}/ocis/dict/checkSendDoctor`
export const reqcheckSendDoctor = (obj) => {
  return request({
    url: reqcheckSendDoctorUrl,
    method: 'post',
    params: obj
  })
}

// 获取终止医师
const reqcheckSendDoctorScreenUrl = `${config.default.api.baseURL}/ocis/dict/screen/checkSendDoctorScreen`
export const reqcheckSendDoctorScreen = (obj) => {
  return request({
    url: reqcheckSendDoctorScreenUrl,
    method: 'post',
    params: obj
  })
}
