const config = require('@/config/url.js')
// 获取订单列表
export const receiveOrderList = `${config.default.api.baseURL}/ocis/receivingorders/getAcceptOrderInfo`

// 获取楼层
export const floorList = `${config.default.api.baseURL}/ocis/dict/getFloor`

// 房间号
export const roomList = `${config.default.api.baseURL}/ocis/dict/getRoomByFloor`

// 接单取消接单
export const changeReceiveOrderList = `${config.default.api.baseURL}/ocis/receivingorders/updateOrderstatus`

// 打印提供手术通知单时间
export const getOperatingNoticeTime = `${config.default.api.baseURL}/ocis/operationScreen/operatingNoticeTime`
