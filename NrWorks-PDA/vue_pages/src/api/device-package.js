import config from '../config/url-config'
export const getPackage = `${config.api.baseURL}/ocis/pdaScann/padScanPackageInfo`
// 转运交接单数据回显--普通
export const getPackageData = `${config.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeOrdinary`
// 转运交接单数据保存--普通
export const savePackageData = `${config.api.baseURL}/ocis/nursingRecord/saveNuringRecordThreeOrdinary`

// 转运交接单数据回显--特殊
export const getPackageDataSpecial = `${config.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeSpecial`
// 转运交接单数据保存--特殊
export const savePackageDataSpecial = `${config.api.baseURL}/ocis/nursingRecord/saveNuringRecordThreeSpecial`
// 获取操作人
export const getOpePeople = `${config.api.baseURL}/ocis/pdaScann/getUserCodeAndName`
// 获取器械清点进度
export const getDeviceStep = `${config.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeProgres`

// 获取清点状态 2021-03-25
export const getSaftyCheckState = `${config.api.baseURL}/ocis/pdaScann/getSaftyCheckState`
