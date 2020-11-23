const config = require('@/config/url.js')

// 查询设备信息---根据房间号分组
export const getDeviceData = `${config.default.api.baseURL}/ocis/equipment/groupEquipmentByRoom`

// 根据类型获取字典
