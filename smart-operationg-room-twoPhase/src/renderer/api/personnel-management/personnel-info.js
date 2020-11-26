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
    method: 'post',
    params: obj
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

// 添加业务分组信息
const reqAddTransactionGroupUrl = `${config.default.api.baseURL}/ocis/portfolio/addTransactionGroup`
export const reqAddTransactionGroup = (obj) => {
  return request({
    url: reqAddTransactionGroupUrl,
    method: 'post',
    data: obj
  })
}
// 删除业务分组信息
const reqDeleteTransactionGroupUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteTransactionGroup`
export const reqDeleteTransactionGroup = (obj) => {
  return request({
    url: reqDeleteTransactionGroupUrl,
    method: 'post',
    params: obj
  })
}
// 修改业务分组信息
const reqUpdateTransactionGroupUrl = `${config.default.api.baseURL}/ocis/portfolio/addTransactionGroupDetails`
export const reqUpdateTransactionGroup = (obj) => {
  return request({
    url: reqUpdateTransactionGroupUrl,
    method: 'post',
    data: obj
  })
}

// 删除业务分组护士信息
const reqDeleteTransactionGroupDetailsUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteTransactionGroupDetails`
export const reqDeleteTransactionGroupDetails = (obj) => {
  return request({
    url: reqDeleteTransactionGroupDetailsUrl,
    method: 'post',
    data: obj
  })
}

// 修改业务分组详情信息
const reqUpdateTransactionGroupDetailsUrl = `${config.default.api.baseURL}/ocis/portfolio/updateTransactionGroup`
export const reqUpdateTransactionGroupDetails = (obj) => {
  return request({
    url: reqUpdateTransactionGroupDetailsUrl,
    method: 'post',
    data: obj
  })
}

// 用户信息教育经历查询
const reqGetUserEducationInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/getUserEducationInfo`
export const reqGetUserEducationInfo = (obj) => {
  return request({
    url: reqGetUserEducationInfoUrl + `/${obj.userCode}`,
    method: 'get'
  })
}
// 职称任聘经历查询
const reqGetUserAppointInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/getUserAppointInfo`
export const reqGetUserAppointInfo = (obj) => {
  return request({
    url: reqGetUserAppointInfoUrl + `/${obj.userCode}`,
    method: 'get'
  })
}
// 科室轮转经历查询
const reqGetUserDeptTurnInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/getUserDeptTurnInfo`
export const reqGetUserDeptTurnInfo = (obj) => {
  return request({
    url: reqGetUserDeptTurnInfoUrl + `/${obj.userCode}`,
    method: 'get'
  })
}
// 手术科室轮转经历查询
const reqGetUserOperDeptTurnInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/getUserOperDeptTurnInfo`
export const reqGetUserOperDeptTurnInfo = (obj) => {
  return request({
    url: reqGetUserOperDeptTurnInfoUrl + `/${obj.userCode}`,
    method: 'get'
  })
}
// 训经历查询
const reqgetUserTrainInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/getUserTrainInfo`
export const reqgetUserTrainInfo = (obj) => {
  return request({
    url: reqgetUserTrainInfoUrl + `/${obj.userCode}`,
    method: 'get'
  })
}
// 用户基本信息更新
const requpdateUserBaseInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/updateUserBaseInfo`
export const requpdateUserBaseInfo = (obj) => {
  return request({
    url: requpdateUserBaseInfoUrl,
    method: 'post',
    data: obj
  })
}
// 用户教育经历添加
const reqaddUserEducationInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/addUserEducationInfo`
export const reqaddUserEducationInfo = (obj) => {
  return request({
    url: reqaddUserEducationInfoUrl,
    method: 'post',
    data: obj
  })
}
// 用户教育经历删除
const reqdeleteUserEducationInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteUserEducationInfo`
export const reqdeleteUserEducationInfo = (obj) => {
  return request({
    url: reqdeleteUserEducationInfoUrl,
    method: 'post',
    data: obj
  })
}
// 用户教育经历更新
const requpdateUserEducationInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/updateUserEducationInfo`
export const requpdateUserEducationInfo = (obj) => {
  return request({
    url: requpdateUserEducationInfoUrl,
    method: 'post',
    data: obj
  })
}
// 职称任聘经历添加
const reqaddUserAppointInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/addUserAppointInfo`
export const reqaddUserAppointInfo = (obj) => {
  return request({
    url: reqaddUserAppointInfoUrl,
    method: 'post',
    data: obj
  })
}
// 职称任聘经历删除
const reqdeleteUserAppointInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteUserAppointInfo`
export const reqdeleteUserAppointInfo = (obj) => {
  return request({
    url: reqdeleteUserAppointInfoUrl,
    method: 'post',
    data: obj
  })
}
// 职称任聘经历更新
const requpdateUserAppointInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/updateUserAppointInfo`
export const requpdateUserAppointInfo = (obj) => {
  return request({
    url: requpdateUserAppointInfoUrl,
    method: 'post',
    data: obj
  })
}
// 科室轮转经历添加
const reqaddUserDeptTurnInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/addUserDeptTurnInfo`
export const reqaddUserDeptTurnInfo = (obj) => {
  return request({
    url: reqaddUserDeptTurnInfoUrl,
    method: 'post',
    data: obj
  })
}
// 科室轮转经历删除
const reqdeleteUserDeptTurnInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteUserDeptTurnInfo`
export const reqdeleteUserDeptTurnInfo = (obj) => {
  return request({
    url: reqdeleteUserDeptTurnInfoUrl,
    method: 'post',
    data: obj
  })
}
// 手术科室轮转经历添加
const reqaddUserOperDeptTurnInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/addUserOperDeptTurnInfo`
export const reqaddUserOperDeptTurnInfo = (obj) => {
  return request({
    url: reqaddUserOperDeptTurnInfoUrl,
    method: 'post',
    data: obj
  })
}
// 手术科室轮转经历删除
const reqdeleteUserOperDeptTurnInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteUserOperDeptTurnInfo`
export const reqdeleteUserOperDeptTurnInfo = (obj) => {
  return request({
    url: reqdeleteUserOperDeptTurnInfoUrl,
    method: 'post',
    data: obj
  })
}
// 科室轮转经历更新
const requpdateUserDeptTurnInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/updateUserDeptTurnInfo`
export const requpdateUserDeptTurnInfo = (obj) => {
  return request({
    url: requpdateUserDeptTurnInfoUrl,
    method: 'post',
    data: obj
  })
}
// 手术科室轮转经历更新
const requpdateUserOperDeptTurnInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/updateUserOperDeptTurnInfo`
export const requpdateUserOperDeptTurnInfo = (obj) => {
  return request({
    url: requpdateUserOperDeptTurnInfoUrl,
    method: 'post',
    data: obj
  })
}
// 培训经历添加
const reqaddUserTrainInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/addUserTrainInfo`
export const reqaddUserTrainInfo = (obj) => {
  return request({
    url: reqaddUserTrainInfoUrl,
    method: 'post',
    data: obj
  })
}
// 培训经历删除
const reqdeleteUserTrainInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteUserTrainInfo`
export const reqdeleteUserTrainInfo = (obj) => {
  return request({
    url: reqdeleteUserTrainInfoUrl,
    method: 'post',
    data: obj
  })
}

// 培训经历更新
const requpdateUserTrainInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/updateUserTrainInfo`
export const requpdateUserTrainInfo = (obj) => {
  return request({
    url: requpdateUserTrainInfoUrl,
    method: 'post',
    data: obj
  })
}
