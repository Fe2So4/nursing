import request from '@/utils/request'
const config = require('@/config/url.js')

// 多次手术查询
const reqgetTimesOperationsUrl = `${config.default.api.baseURL}/ocis/departmentReport/getTimesOperations`
export const reqgetTimesOperations = (obj) => {
  return request({
    url: reqgetTimesOperationsUrl + `/${obj.startTime}` + `/${obj.endTime}`,
    method: 'get'
  })
}

// 房间状态查询
const reqgetRoomStateUrl = `${config.default.api.baseURL}/ocis/departmentReport/getRoomState`
export const reqgetRoomState = (obj) => {
  return request({
    url: reqgetRoomStateUrl,
    method: 'post',
    params: obj
  })
}

// 每日房间结束时间查询
const reqgetEveryDayRoomEndTimeUrl = `${config.default.api.baseURL}/ocis/departmentReport/getEveryDayRoomEndTime`
export const reqgetEveryDayRoomEndTime = (obj) => {
  return request({
    url: reqgetEveryDayRoomEndTimeUrl + `/${obj.date}`,
    method: 'get'
  })
}

// 护理记录单查询
const reqgetNursingRecordSheetUrl = `${config.default.api.baseURL}/ocis/departmentReport/getNursingRecordSheet`
export const reqgetNursingRecordSheet = (obj) => {
  return request({
    url: reqgetNursingRecordSheetUrl,
    method: 'post',
    data: obj
  })
}

// 手术名称数量统计
const reqoperNameCountStatisUrl = `${config.default.api.baseURL}/ocis/dailyStatistics/operNameCountStatis`
export const reqoperNameCountStatis = (obj) => {
  return request({
    url: reqoperNameCountStatisUrl,
    method: 'post',
    data: obj
  })
}

// 手术间利用率统计
const reqoperRoomUseStatisUrl = `${config.default.api.baseURL}/ocis/dailyStatistics/operRoomUseStatis`
export const reqoperRoomUseStatis = (obj) => {
  return request({
    url: reqoperRoomUseStatisUrl,
    method: 'post',
    data: obj
  })
}

// 手术分级统计
const reqoperLevelStatisUrl = `${config.default.api.baseURL}/ocis/dailyStatistics/operLevelStatis`
export const reqoperLevelStatis = (obj) => {
  return request({
    url: reqoperLevelStatisUrl + `/${obj.date}`,
    method: 'get'
  })
}

// 收费项目统计手术计费
const reqoperChargeStatisUrl = `${config.default.api.baseURL}/ocis/dailyStatistics/operChargeStatis`
export const reqoperChargeStatis = (obj) => {
  return request({
    url: reqoperChargeStatisUrl,
    method: 'post',
    data: obj
  })
}

// 手术接台间隔时间查询
const reqgetOperationIntervalTimeUrl = `${config.default.api.baseURL}/ocis/departmentReport/getOperationIntervalTime`
export const reqgetOperationIntervalTime = (obj) => {
  return request({
    url: reqgetOperationIntervalTimeUrl + `/${obj.operationDate}`,
    method: 'get'
  })
}

// 手术状态查询
const reqgetoperationInfoStateUrl = `${config.default.api.baseURL}/ocis/departmentReport/getoperationInfoState`
export const reqgetoperationInfoState = (obj) => {
  return request({
    url: reqgetoperationInfoStateUrl,
    method: 'post',
    params: obj
  })
}

// 手术明细查询
const reqgetoperationInfoDetalUrl = `${config.default.api.baseURL}/ocis/departmentReport/getoperationInfoDetal`
export const reqgetoperationInfoDetal = (obj) => {
  return request({
    url: reqgetoperationInfoDetalUrl,
    method: 'post',
    params: obj
  })
}

// 手术明细查询导出
const reqdownloadOperationInfoDetalUrl = `${config.default.api.baseURL}/ocis/departmentReport/download/downloadOperationInfoDetal`
export const reqdownloadOperationInfoDetal = (obj) => {
  return request({
    url: reqdownloadOperationInfoDetalUrl,
    method: 'get',
    params: obj
  })
}

// 手术接病人时间查询
const reqoperationGetPatTimelUrl = `${config.default.api.baseURL}/ocis/departmentReport/operationGetPatTime`
export const reqoperationGetPatTimel = (obj) => {
  return request({
    url: reqoperationGetPatTimelUrl,
    method: 'post',
    data: obj
  })
}

// 一值班二值班
const reqdutyStatisticsUrl = `${config.default.api.baseURL}/ocis/dailyStatistics/dutyStatistics`
export const reqdutyStatistics = (obj) => {
  return request({
    url: reqdutyStatisticsUrl,
    method: 'post',
    data: obj
  })
}

// 手术术后信息查询
const reqgetAfteroperationInfoUrl = `${config.default.api.baseURL}/ocis/departmentReport/getAfteroperationInfo`
export const reqgetAfteroperationInfo = (obj) => {
  return request({
    url: reqgetAfteroperationInfoUrl,
    method: 'post',
    data: obj
  })
}

// 病区字典
const reqgetWardDictUrl = `${config.default.api.baseURL}/ocis/dictInfo/getWardDict`
export const reqgetWardDict = (obj) => {
  return request({
    url: reqgetWardDictUrl,
    method: 'get'
  })
}
