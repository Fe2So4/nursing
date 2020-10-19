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

// 获取内容列表
const reqOperationOrdersUrl = `${config.default.api.baseURL}/ocis/sendOrder/getSchuduleOrderInfo`
export const reqOperationOrders = (obj) => {
  return request({
    url: reqOperationOrdersUrl + `/${obj.data}`,
    method: 'post'
  })
}
