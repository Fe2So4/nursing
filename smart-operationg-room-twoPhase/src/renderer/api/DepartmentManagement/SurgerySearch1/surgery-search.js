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

// 收费项目统计手术计费
const reqoperChargeStatisUrl = `${config.default.api.baseURL}/ocis/dailyStatistics/operChargeStatis`
export const reqoperChargeStatis = (obj) => {
  return request({
    url: reqoperChargeStatisUrl,
    method: 'post',
    data: obj
  })
}
