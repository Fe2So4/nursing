const config = require('@/config/url.js')
// 获取订单列表
export const receiveOrderList = `${config.default.api.baseURL}/ocis/receivingorders/getAcceptOrderInfoScreen`

// 获取楼层
export const floorList = `${config.default.api.baseURL}/ocis/dict/getFloorScreen`

// 房间号
export const roomList = `${config.default.api.baseURL}/ocis/dict/getRoomByFloorScreen`

// 接单取消接单
export const changeReceiveOrderList = `${config.default.api.baseURL}/ocis/receivingorders/updateOrderstatusScreen`

// 打印提供手术通知单时间
export const getOperatingNoticeTime = `${config.default.api.baseURL}/ocis/operationScreen/operatingNoticeTimeScreen`

// 打印保存打印状态
export const reqUpdatePrintStatus = `${config.default.api.baseURL}/ocis/receivingorders/updatePrintStatus`
