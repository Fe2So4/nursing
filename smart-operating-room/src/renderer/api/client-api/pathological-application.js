import request from '@/utils/request'
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
