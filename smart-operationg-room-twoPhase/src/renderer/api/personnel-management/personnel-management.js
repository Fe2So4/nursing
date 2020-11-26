import request from '@/utils/request'
const config = require('@/config/url.js')
// 查询日常人员排班列表
const reqGetPersonnelSchedulingUrl = `${config.default.api.baseURL}/ocis/portfolio/getPersonnelScheduling`
export const reqGetPersonnelScheduling = (obj) => {
  return request({
    url: reqGetPersonnelSchedulingUrl,
    method: 'post',
    params: obj
  })
}

// 获取日常人员数据字典
const reqgetBaseDictDetailListUrl = `${config.default.api.baseURL}/ocis/dictInfo/getBaseDictDetailList`
export const reqgetBaseDictDetailList = (obj) => {
  return request({
    url: reqgetBaseDictDetailListUrl + `/${obj.belongSerialNumber}`,
    method: 'get'
  })
}

// 日常人员排班信息修改
const reqUpdatePersionScheduleUrl = `${config.default.api.baseURL}/ocis/portfolio/updatePersionSchedule`
export const reqUpdatePersionSchedule = (obj) => {
  return request({
    url: reqUpdatePersionScheduleUrl,
    method: 'post',
    data: obj
  })
}

// 班次时段维护
const reqGetClassTimeInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/getClassTimeInfo`
export const reqGetClassTimeInfo = (obj) => {
  return request({
    url: reqGetClassTimeInfoUrl + `/${obj.userStete}`,
    method: 'get'
  })
}

// 班次时段维护删除
const reqDeleteClassTimeInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteClassTimeInfo`
export const reqDeleteClassTimeInfo = (obj) => {
  return request({
    url: reqDeleteClassTimeInfoUrl,
    method: 'post',
    data: obj
  })
}

// 班次时段维护新增
const reqaddClassTimeInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/addClassTimeInfo`
export const reqaddClassTimeInfo = (obj) => {
  return request({
    url: reqaddClassTimeInfoUrl,
    method: 'post',
    data: obj
  })
}

// 班次时段维护修改
const reqUpdateClassTimeInfoUrl = `${config.default.api.baseURL}/ocis/portfolio/updateClassTimeInfo`
export const reqUpdateClassTimeInfo = (obj) => {
  return request({
    url: reqUpdateClassTimeInfoUrl,
    method: 'post',
    data: obj
  })
}

// 业务分组管理数据获取
const reqGetTransactionGroupShowUrl = `${config.default.api.baseURL}/ocis/portfolio/getTransactionGroupShow`
export const reqGetTransactionGroupShow = () => {
  return request({
    url: reqGetTransactionGroupShowUrl,
    method: 'get'
  })
}
// 获取护士列表
const reqGetNurseDicttwoUrl = `${config.default.api.baseURL}/ocis/dictInfo/getNurseDict`
export const reqGetNurseDicttwo = () => {
  return request({
    url: reqGetNurseDicttwoUrl,
    method: 'get'
  })
}
// 获取业务分组带教班次信息对照列表
const reqGetTransactionGroupTeachResultUrl = `${config.default.api.baseURL}/ocis/portfolio/getTransactionGroupTeachResult`
export const reqGetTransactionGroupTeachResult = () => {
  return request({
    url: reqGetTransactionGroupTeachResultUrl,
    method: 'get'
  })
}
// 业务分组带教信息查询
const reqgetTransactionGroupUrl = `${config.default.api.baseURL}/ocis/portfolio/getTransactionGroup`
export const reqgetTransactionGroup = () => {
  return request({
    url: reqgetTransactionGroupUrl,
    method: 'get'
  })
}

// 根据id获取业务分组带教班次信息
const reqGetTransactionGroupTeachUrl = `${config.default.api.baseURL}/ocis/portfolio/getTransactionGroupTeach`
export const reqGetTransactionGroupTeach = (obj) => {
  return request({
    url: reqGetTransactionGroupTeachUrl + `/${obj.id}`,
    method: 'get'
  })
}
// 添加业务分组带教班次信息
const reqAddTransactionGroupTeachUrl = `${config.default.api.baseURL}/ocis/portfolio/addTransactionGroupTeach`
export const reqAddTransactionGroupTeach = (obj) => {
  return request({
    url: reqAddTransactionGroupTeachUrl,
    method: 'post',
    data: obj
  })
}

// 删除业务分组带教班次信息
const reqDeleteTransactionGroupTeachUrl = `${config.default.api.baseURL}/ocis/portfolio/deleteTransactionGroupTeach`
export const reqDeleteTransactionGroupTeach = (obj) => {
  return request({
    url: reqDeleteTransactionGroupTeachUrl,
    method: 'post',
    data: obj
  })
}
// 修改业务分组带教班次信息
const reqUpdateTransactionGroupTeachUrl = `${config.default.api.baseURL}/ocis/portfolio/updateTransactionGroupTeach`
export const reqUpdateTransactionGroupTeach = (obj) => {
  return request({
    url: reqUpdateTransactionGroupTeachUrl,
    method: 'post',
    data: obj
  })
}

// 查询基础字典分类信息列表
const reqGetBaseDictCategoryListUrl = `${config.default.api.baseURL}/ocis/dictInfo/getBaseDictCategoryList`
export const reqGetBaseDictCategoryList = () => {
  return request({
    url: reqGetBaseDictCategoryListUrl,
    method: 'get'
  })
}

// 新增基础字典分类信息列表
const reqAddBaseDictDetailListUrl = `${config.default.api.baseURL}/ocis/dictInfo/addBaseDictDetailList`
export const reqAddBaseDictDetailList = (obj) => {
  return request({
    url: reqAddBaseDictDetailListUrl,
    method: 'post',
    data: obj
  })
}
// 修改基础字典分类信息列表
const reqUpdateBaseDictDetailListUrl = `${config.default.api.baseURL}/ocis/dictInfo/updateBaseDictDetailList`
export const reqUpdateBaseDictDetailList = (obj) => {
  return request({
    url: reqUpdateBaseDictDetailListUrl,
    method: 'post',
    data: obj
  })
}
// 删除基础字典分类信息列表
const reqDeleteBaseDictDetailUrl = `${config.default.api.baseURL}/ocis/dictInfo/deleteBaseDictDetail`
export const reqDeleteBaseDictDetail = (obj) => {
  return request({
    url: reqDeleteBaseDictDetailUrl,
    method: 'post',
    data: obj
  })
}
