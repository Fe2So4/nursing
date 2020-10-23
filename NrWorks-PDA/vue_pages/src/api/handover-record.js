import config from '../config/url-config'
export const submitRecord = `${config.api.baseURL}/ocis/forwardingReport/patientForwarding`
// 数据回显
export const getRecord = `${config.api.baseURL}/ocis/forwardingReport/forwardingReportInfo`
