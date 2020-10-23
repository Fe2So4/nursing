import request from '@/utils/request'
import request2 from '@/utils/request2'
const config = require('@/config/url.js')

// 根据住院号获取信息
const reqUserInfoUrl = `${config.default.api.baseURL}/ocis/pathology/getPathologyReport`
export const reqUserInfo = (hospitalNo) => {
  return request({
    url: reqUserInfoUrl,
    method: 'get',
    params: hospitalNo
  })
}
// 根据病理号获取信息
const reqUserBiaobenUrl = `${config.default.api.baseURL}/ocis/pathology/getSampleByPathologyId`
export const reqBiaobenInfo = (pathologyId) => {
  return request({
    url: reqUserBiaobenUrl,
    method: 'get',
    params: pathologyId
  })
}

// 验证医师
const reqPathLoginUrl = `${config.default.api.baseURL}/ocis/login/careLogin`
export const pathologicalLogin = (obj) => {
  return request2({
    url: reqPathLoginUrl,
    method: 'post',
    data: obj
  })
}

// 提交标本
const reqsaveFastPathologicUrl = `${config.default.api.baseURL}/ocis/pathology/saveFastPathologic`
export const reqsaveFastPathologic = (obj) => {
  return request({
    url: reqsaveFastPathologicUrl,
    method: 'post',
    data: obj
  })
}

// 快速撤单
const reqdeleteFastPathologicUrl = `${config.default.api.baseURL}/ocis/pathology/deleteFastPathologic`
export const reqdeleteFastPathologic = (obj) => {
  return request({
    url: reqdeleteFastPathologicUrl + `/${obj.pathologyId}` + `/${obj.checkCode}`,
    method: 'get'
  })
}

// 病理派单
const reqsendPathologicOrderUrl = `${config.default.api.baseURL}/ocis/pathology/sendPathologicOrder`
export const reqsendPathologicOrder = (obj) => {
  return request({
    url: reqsendPathologicOrderUrl,
    method: 'post',
    data: obj
  })
}
