const config = require('@/config/url.js')
// 获取患者基本信息
export const getPatientInfo = `${config.default.api.baseURL}/ocis/pdaScann/getUserInfoByCureNo`
// 查询signin信息
export const getSignInInfo = `${config.default.api.baseURL}/ocis/securitycheck/getAnesSaftyCheck`
// 查询timeout信息
export const getTimeOutInfo = `${config.default.api.baseURL}/ocis/securitycheck/getbeforeOperSaftyCheck`
// 查询signout信息
export const getSignOutInfo = `${config.default.api.baseURL}/ocis/securitycheck/getbeforeLeaveSaftyCheck`
// 器械清点 -- 普通
export const getOrdinaryData = `${config.default.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeOrdinary`
// 器械清点 -- 特殊
export const getSpecialData = `${config.default.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeSpecial`
// 获取护理记录单二数据
export const getRecord2Data = `${config.default.api.baseURL}/ocis/nursingRecord/nuringRecordTwoInfo`
// 获取有效医嘱
export const getMedicalAdvice = `${config.default.api.baseURL}/ocis/operationScreen/GetEffectiveConstituent`
// 获取病史摘要
export const getMedicalHistory = `${config.default.api.baseURL}/ocis/operationScreen/getPatientGuide`
