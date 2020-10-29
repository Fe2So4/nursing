const config = require('@/config/url.js')
export const receiveOrderList = `${config.default.api.baseURL}/ocis/receivingorders/getAcceptOrderInfo`
export const floorList = `${config.default.api.baseURL}/ocis/dict/getFloor`
export const roomList = `${config.default.api.baseURL}/ocis/dict/getRoomByFloor`
export const changeReceiveOrderList = `${config.default.api.baseURL}/ocis/receivingorders/updateOrderstatus`
