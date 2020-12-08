const config = require('@/config/url.js')

// 根据条件获取家属公告列表
export const getPatientList = `${config.default.api.baseURL}/ocis/protectwrit/getRelationNoticeList`
// 获取当日家属公告信息列表
export const getTodayCallList = `${config.default.api.baseURL}/ocis/protectwrit/getNowDayRelationNoticeList`
// 根据楼层和房间号组装当前家属公告信息发送模板
export const getCallTemplate = `${config.default.api.baseURL}/ocis/protectwrit/getRelationNoticeModule`
// 存储家属公告信息
export const saveRelationNotice = `${config.default.api.baseURL}/ocis/protectwrit/saveRelationNotice`
