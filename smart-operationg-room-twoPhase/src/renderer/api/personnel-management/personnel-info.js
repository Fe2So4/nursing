import request from '@/utils/request'
const config = require('@/config/url.js')
// 用户基本信息查询
const reqGetUserBaseInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/getUserBaseInfo`
export const reqGetUserBaseInfo = (obj) => {
  return request({
    url: reqGetUserBaseInfoUrl + `/${obj.userCode}`,
    method: 'get'
  })
}

// 公务员信息列表查询
const reqGetWorkerInfoListUrl = `${config.default.api.baseURL}/ocis/portfolio/getWorkerInfoList`
export const reqGetWorkerInfoList = (obj) => {
  return request({
    url: reqGetWorkerInfoListUrl,
    method: 'get',
    params: obj
  })
}
