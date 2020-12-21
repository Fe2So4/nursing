const config = require('@/config/url.js')

// 添加文书
export const saveRecord = `${config.default.api.baseURL}/ocis/protectwrit/addProtectWritContent`
// 查询文书
export const getRecord = `${config.default.api.baseURL}/ocis/protectwrit/getProtectWritContent`
// 修改文书
export const editRecord = `${config.default.api.baseURL}/ocis/protectwrit/updateProtectWritContent`

// 设备使用 删除设备使用信息
export const deleteDevice = `${config.default.api.baseURL}/ocis/protectwrit/delEquipmentUseById`

// 设备使用 根据设备编号获取设备
export const getDevice = `${config.default.api.baseURL}/ocis/protectwrit/getEquipmentByDeviceId`

// 设备使用 获取设备列表
export const getDeviceList = `${config.default.api.baseURL}/ocis/protectwrit/getEquipmentUseList`

// 设备使用 获取设备列表
export const addDevice = `${config.default.api.baseURL}/ocis/protectwrit/equipmentUsed`

// 送检标本 类型字典
export const sendSample = `${config.default.api.baseURL}/ocis/protectwrit/dictSample`

// 送检标本 批量删除送检标本
export const deleteSample = `${config.default.api.baseURL}/ocis/protectwrit/deleteSamples`

// 送检标本 获取送检标本
export const getSample = `${config.default.api.baseURL}/ocis/protectwrit/getSamples`

// 送检标本 新增送检标本
export const addSample = `${config.default.api.baseURL}/ocis/protectwrit/storageSamples`

// 实际名称核对 --删除
export const deleteRealName = `${config.default.api.baseURL}/ocis/protectwrit/deleteActualName`

// 实际名称核对 --获取
export const getRealName = `${config.default.api.baseURL}/ocis/protectwrit/getActualName`

// 实际名称核对 --存储更新
export const storageRealName = `${config.default.api.baseURL}/ocis/protectwrit/storageActualName`

// 护理情况 --获取
export const getNursingInfo = `${config.default.api.baseURL}/ocis/protectwrit/getNursingSituation`

// 护理情况 --存储
export const saveNursingInfo = `${config.default.api.baseURL}/ocis/protectwrit/storageNursingSituation`

// // 护理情况 --存储
// export const saveNursingInfo = `${config.default.api.baseURL}/ocis/protectwrit/storageNursingSituation`
