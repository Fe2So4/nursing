import request from '@/utils/request'
const config = require('@/config/url.js')

// 获取楼层列表
const reqgetFloorUrl = `${config.default.api.baseURL}/ocis/dict/getFloor`
export const reqgetFloor = () => {
  return request({
    url: reqgetFloorUrl,
    method: 'get'
  })
}
// 获取房间列表
const reqgetRoomByFloorUrl = `${config.default.api.baseURL}/ocis/dict/getRoomByFloor`
export const reqgetRoomByFloor = (obj) => {
  return request({
    url: reqgetRoomByFloorUrl,
    method: 'get',
    params: obj
  })
}
// 获取护士列表

const reqgetNurseDictUrl = `${config.default.api.baseURL}/ocis/dict/getNurseDict`
export const reqgetNurseDict = () => {
  return request({
    url: reqgetNurseDictUrl,
    method: 'get'
  })
}

// 获取内容列表
const reqOperationOrdersUrl = `${config.default.api.baseURL}/ocis/sendOrder/getSchuduleOrderInfo`
export const reqOperationOrders = (obj) => {
  return request({
    url: reqOperationOrdersUrl,
    method: 'post',
    params: obj
  })
}

// 修改派单信息接口
const reqchangeOperScheduleInfoUrl = `${config.default.api.baseURL}/ocis/sendOrder/changeOperScheduleInfo`
export const reqchangeOperScheduleInfo = (obj) => {
  return request({
    url: reqchangeOperScheduleInfoUrl,
    method: 'post',
    data: obj
  })
}

// 退单操作
const reqcancelOrderActionUrl = `${config.default.api.baseURL}/ocis/sendOrder/cancelOrderAction`
export const reqcancelOrderAction = (obj) => {
  return request({
    url: reqcancelOrderActionUrl,
    method: 'post',
    params: obj
  })
}

// 派单操作
const reqsendOrderActionUrl = `${config.default.api.baseURL}/ocis/sendOrder/sendOrderAction`
export const reqsendOrderAction = (obj) => {
  console.log(obj)
  return request({
    url: reqsendOrderActionUrl,
    method: 'post',
    params: obj
  })
}

// 同步排班信息
const reqsyncOperScheduleInfoUrl = `${config.default.api.baseURL}/ocis/sendOrder/syncOperScheduleInfo`
export const reqsyncOperScheduleInfo = (obj) => {
  console.log(obj)
  return request({
    url: reqsyncOperScheduleInfoUrl,
    method: 'post',
    params: obj
  })
}
