import request from '@/utils/request'
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
// 获取当前患者手术状态
export const getPatientStep = `${config.default.api.baseURL}/ocis/operationScreen/getScreenOperState`

// 获取当前化验报告
export const getTestReport = `${config.default.api.baseURL}/ocis/basicInfo/getPatfordingState`

// 获取当前检查报告
export const getInspectReport = `${config.default.api.baseURL}/ocis/basicInfo/getInspectionReport`

// 获取术中带药
export const getMedecial = `${config.default.api.baseURL}/ocis/basicInfo/getIntraoperativeMedication`

// 获取生命体征
export const getSign = `${config.default.api.baseURL}/ocis/operationScreen/getMonitorData`

// 获取抗生素用药
export const getAntibiotic = `${config.default.api.baseURL}/ocis/basicInfo/getAntibiotic`

// 获取术中病理
export const getPathology = `${config.default.api.baseURL}/ocis/basicInfo/getIntraoperativeMedication`

// 获取楼层列表
export const floorList = `${config.default.api.baseURL}/ocis/dict/getFloor`

// 获取楼层列表
const floorListUrl = `${config.default.api.baseURL}/ocis/dict/getFloor`
export const reqfloorList = () => {
  return request({
    url: floorListUrl,
    method: 'get'
  })
}

// 获取房间列表
const getRoomByFloorUrl = `${config.default.api.baseURL}/ocis/dict/getRoomByFloor`
export const reqGetRoomByFloor = (data) => {
  return request({
    url: getRoomByFloorUrl,
    method: 'get',
    params: data
  })
}
