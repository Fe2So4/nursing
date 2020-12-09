const config = require('@/config/url.js')

// 添加文书
export const saveRecord = `${config.default.api.baseURL}/ocis/protectwrit/addProtectWritContent`
// 查询文书
export const getRecord = `${config.default.api.baseURL}/ocis/protectwrit/getProtectWritContent`
// 修改文书
export const editRecord = `${config.default.api.baseURL}/ocis/protectwrit/updateProtectWritContent`
