import request from '@/utils/request'
import noTimeRequest from '@/utils/noTimeRequest'

const config = require('@/config/url.js')

// 获取楼层列表
const reqgetFloorUrl = `${config.default.api.baseURL}/ocis/dict/getFloor`
export const reqgetFloor = () => {
  return request({
    url: reqgetFloorUrl,
    method: 'get'
  })
}
// 记忆楼层

const reqSaveNurseFloorUrl = `${config.default.api.baseURL}/ocis/sendOrder/saveNurseFloor`
export const reqSaveNurseFloor = (obj) => {
  return request({
    url: reqSaveNurseFloorUrl,
    method: 'get',
    params: obj
  })
}
// 获取记忆楼层
const reqgetNurseFloorUrl = `${config.default.api.baseURL}/ocis/sendOrder/getNurseFloor`
export const reqgetNurseFloor = () => {
  return request({
    url: reqgetNurseFloorUrl,
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

// 获取退单列表
const reqCancelOrderInfoUrl = `${config.default.api.baseURL}/ocis/sendOrder/getCancelOrderInfo`
export const reqCancelOrderInfo = (obj) => {
  return request({
    url: reqCancelOrderInfoUrl,
    method: 'post',
    params: obj
  })
}
// 获取退单列表
const reqBackCancelOrderUrl = `${config.default.api.baseURL}/ocis/sendOrder/backCancelOrder`
export const reqBackCancelOrder = (obj) => {
  return request({
    url: reqBackCancelOrderUrl,
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

// 已派单退单操作
const reqapplicationForRefundUrl = `${config.default.api.baseURL}/ocis/sendOrder/applicationForRefund`
export const reqapplicationForRefund = (obj) => {
  return request({
    url: reqapplicationForRefundUrl,
    method: 'post',
    params: obj
  })
}

// 派单操作
const reqsendOrderActionUrl = `${config.default.api.baseURL}/ocis/sendOrder/sendOrderAction`
export const reqsendOrderAction = (obj) => {
  return request({
    url: reqsendOrderActionUrl,
    method: 'post',
    params: obj
  })
}

// 派单前判断是否重复派单
const reqrepeatOrderMsgTipsUrl = `${config.default.api.baseURL}/ocis/sendOrder/repeatOrderMsgTips`
export const reqrepeatOrderMsgTips = (obj) => {
  return request({
    url: reqrepeatOrderMsgTipsUrl + `/${obj.cureNo}` + `/${obj.hospitalNo}`,
    method: 'get'
  })
}
// 同步排班信息
const reqsyncOperScheduleInfoUrl = `${config.default.api.baseURL}/ocis/sendOrder/syncOperScheduleInfo`
export const reqsyncOperScheduleInfo = (obj) => {
  return noTimeRequest({
    url: reqsyncOperScheduleInfoUrl,
    method: 'post',
    params: obj
  })
}

// 导出Excel
export const exportCouponList = `${config.default.api.baseURL}/ocis/statisticalQuery/download/exportCouponList`
export const exportExcel = (obj) => {
  return noTimeRequest({
    url: exportCouponList,
    method: 'get',
    params: obj
  })
}
