import config from '../config/url-config'
export const getPatientInfo = `${config.api.baseURL}/ocis/dict/getPatientAndOperInfo`

// 绑定患者推送到术中大屏
export const bindingPatPushScreen = `${config.api.baseURL}/ocis/pdaScann/bindingPatPushScreen`

// 进入手术室,出手术室，进入诱导室，出诱导室
export const joinOperationRoom = `${config.api.baseURL}/ocis/forwardingReport/saveTimeNode`

// 手术是否执行
export const execOperation = `${config.api.baseURL}/ocis/forwardingReport/insertOpeIsExcute`

// 获取房间号
export const getRoomNo = `${config.api.baseURL}/ocis/receivingorders/getRoomNo`

// 修改房间号
export const updateRoomNo = `${config.api.baseURL}/ocis/receivingorders/updateRoomNo`
