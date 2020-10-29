import config from '../config/url-config'
export const getPatientInfo = `${config.api.baseURL}/ocis/dict/getPatientAndOperInfo`
// 绑定患者推送到术中大屏
export const bindingPatPushScreen = `${config.api.baseURL}/ocis/pdaScann/bindingPatPushScreen`
