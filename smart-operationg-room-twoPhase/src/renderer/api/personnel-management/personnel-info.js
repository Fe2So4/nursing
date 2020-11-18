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

// 获取护士列表
const reqGetNurListUrl = `${config.default.api.baseURL}/ocis/portfolio/getUserBaseInfoList`
export const reqGetNurList = (obj) => {
  return request({
    url: reqGetNurListUrl,
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

// 公务员信息添加
const reqAddWorkerInfotUrl = `${config.default.api.baseURL}/ocis/portfolio/addWorkerInfo`
export const reqAddWorkerInfot = (obj) => {
  return request({
    url: reqAddWorkerInfotUrl,
    method: 'post',
    data: obj
  })
}
// 公务员信息修改
const reqUpdateWorkerInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/updateWorkerInfo`
export const reqUpdateWorkerInfo = (obj) => {
  return request({
    url: reqUpdateWorkerInfoUrl,
    method: 'post',
    data: obj
  })
}

// 公务员信息删除
const reqDeleteWorkerInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteWorkerInfo`
export const reqDeleteWorkerInfo = (obj) => {
  return request({
    url: reqDeleteWorkerInfoUrl,
    method: 'post',
    data: obj
  })
}
