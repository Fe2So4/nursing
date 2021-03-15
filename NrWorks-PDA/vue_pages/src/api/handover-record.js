import config from '../config/url-config'

export const submitRecord = `${config.api.baseURL}/ocis/forwardingReport/patientForwarding` // old
// 数据回显
export const getRecord = `${config.api.baseURL}/ocis/forwardingReport/forwardingReportInfo`

export const submitRoom = `${config.api.baseURL}/ocis/forwardingReport/storageForawrdingWardHandOver`
export const submitInOpeRoom = `${config.api.baseURL}/ocis/forwardingReport/storageInOperRoomForwarding`
export const submitInPacu = `${config.api.baseURL}/ocis/forwardingReport/storageInPacuForwarding`
export const submitOutOpeRoom = `${config.api.baseURL}/ocis/forwardingReport/storageOutOperRoomForwarding`
export const submitOutPacu = `${config.api.baseURL}/ocis/forwardingReport/storageOutPacuForwarding`
export const submitPatRoom = `${config.api.baseURL}/ocis/forwardingReport/storagePatRoomGet`
// 转运记录单状态
export const handoverStep = `${config.api.baseURL}/ocis/forwardingReport/getPatfordingState`

// 获取转运交接扫码状态
export const getHandoverCodeStatus = `${config.api.baseURL}/ocis/forwardingReport/getForwardingScan`

// 转运交接扫码存储
export const saveHandoverCodeStatus = `${config.api.baseURL}/ocis/forwardingReport/saveForwardingScan`

// 已接单改成已完成
export const changeApplyStatus = `${config.api.baseURL}/ocis/receivingorders/updateOrderstatus`

// 转运交接单存储进手术室缓冲区
export const storagePointBuffer = `${config.api.baseURL}/ocis/forwardingReport/storagePointBuffer`
