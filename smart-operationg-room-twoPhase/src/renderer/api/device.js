const config = require('@/config/url.js')

// 获取患者基本信息
export const getDeviceData = `${config.default.api.baseURL}/ocis/equipment/groupEquipmentByRoom`
