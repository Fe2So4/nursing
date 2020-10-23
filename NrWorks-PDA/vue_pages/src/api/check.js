import config from '../config/url-config'
export const submitSignIn = `${config.api.baseURL}/ocis/securitycheck/beforeAnesSaftyCheck`
export const getSignIn = `${config.api.baseURL}/ocis/securitycheck/getAnesSaftyCheck`

export const submitSignOut = `${config.api.baseURL}/ocis/securitycheck/beforeLeaveSaftyCheck`
export const getSignOut = `${config.api.baseURL}/ocis/securitycheck/getbeforeLeaveSaftyCheck`

export const submitTimeout = `${config.api.baseURL}/ocis/securitycheck/beforeOperSaftyCheck`
export const getTimeout = `${config.api.baseURL}/ocis/securitycheck/getbeforeOperSaftyCheck`
