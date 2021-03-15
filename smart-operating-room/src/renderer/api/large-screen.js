import request from '@/utils/request'
const config = require('@/config/url.js')

// 获取患者基本信息
export const getPatientInfo = `${config.default.api.baseURL}/ocis/pdaScann/getUserInfoByCureNoScreen`
// 查询signin信息
export const getSignInInfo = `${config.default.api.baseURL}/ocis/securitycheck/getAnesSaftyCheckScreen`
// 查询timeout信息
export const getTimeOutInfo = `${config.default.api.baseURL}/ocis/securitycheck/getbeforeOperSaftyCheckScreen`
// 查询signout信息
export const getSignOutInfo = `${config.default.api.baseURL}/ocis/securitycheck/getbeforeLeaveSaftyCheckScreen`
// 器械清点 -- 普通
export const getOrdinaryData = `${config.default.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeOrdinaryScreen`
// 器械清点 -- 特殊
export const getSpecialData = `${config.default.api.baseURL}/ocis/nursingRecord/getNuringRecordThreeSpecialScreen`
// 获取护理记录单二数据
export const getRecord2Data = `${config.default.api.baseURL}/ocis/nursingRecord/nuringRecordTwoInfoScreen`
// 获取有效医嘱
export const getMedicalAdvice = `${config.default.api.baseURL}/ocis/operationScreen/GetEffectiveConstituentScreen`
// 获取病史摘要
export const getMedicalHistory = `${config.default.api.baseURL}/ocis/operationScreen/getPatientGuideScreen`
// 获取当前患者手术状态
export const getPatientStep = `${config.default.api.baseURL}/ocis/operationScreen/getScreenOperStateScreen`

// 获取当前化验报告
export const getTestReport = `${config.default.api.baseURL}/ocis/basicInfo/getPatfordingStateScreen`

// 获取当前检查报告
export const getInspectReport = `${config.default.api.baseURL}/ocis/basicInfo/getInspectionReportScreen`

// 获取术中带药
export const getMedecial = `${config.default.api.baseURL}/ocis/basicInfo/getIntraoperativeMedicationScreen`

// 获取生命体征
export const getSign = `${config.default.api.baseURL}/ocis/operationScreen/getMonitorDataScreen`

// 获取抗生素用药
export const getAntibiotic = `${config.default.api.baseURL}/ocis/basicInfo/getAntibioticScreen`

// 获取术中病理
export const getPathology = `${config.default.api.baseURL}/ocis/getIntraoperativePathologyScreen`

// 获取楼层列表
export const floorList = `${config.default.api.baseURL}/ocis/dict/getFloorScreen`

// 获取患者历史记录
export const getPatientHistoryRecord = `${config.default.api.baseURL}/ocis/pdaScann/getBingdingHistory`

// 手术结束
export const stopOperation = `${config.default.api.baseURL}/ocis/forwardingReport/saveTimeNodeScreen`

// 获取楼层列表
const floorListUrl = `${config.default.api.baseURL}/ocis/dict/getFloorScreen`
export const reqfloorList = () => {
  return request({
    url: floorListUrl,
    method: 'get'
  })
}

// 获取房间列表
const getRoomByFloorUrl = `${config.default.api.baseURL}/ocis/dict/getRoomByFloorScreen`
export const reqGetRoomByFloor = (data) => {
  return request({
    url: getRoomByFloorUrl,
    method: 'get',
    params: data
  })
}

// 终止手术
export const terminateOper = `${config.default.api.baseURL}/ocis/operationScreen/terminateOper`
