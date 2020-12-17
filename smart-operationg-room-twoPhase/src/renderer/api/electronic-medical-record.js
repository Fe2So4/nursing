const config = require('@/config/url.js')
// 电子病历，获取首页
export const getPatientList = `${config.default.api.baseURL}/ocis/protectwrit/getElectronicMedicalRecordList`
