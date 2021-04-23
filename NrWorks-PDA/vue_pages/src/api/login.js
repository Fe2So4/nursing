import config from '../config/url-config'
export const login = `${config.api.baseURL}/ocis/login/careLogin`

// 校验登录
export const checkSendDoctor = `${config.api.baseURL}/ocis/dict/checkSendDoctor`

// 获取当前登录人
export const getLoginUserInfo = `${config.api.baseURL}/ocis/dict/getLoginUserInfo`
