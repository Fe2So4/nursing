const config = require('@/config/url.js')

// 查询设备信息---根据房间号分组
export const getDeviceData = `${config.default.api.baseURL}/ocis/equipment/groupEquipmentByRoom`

// 根据类型获取字典
export const getDict = `${config.default.api.baseURL}/ocis/equipment/getEquipmentDictByType`

// 医疗设备数据删除
export const deleteDeviceByNo = `${config.default.api.baseURL}/ocis/equipment/delEquipmentById`

// 新增设备字典
export const addDict = `${config.default.api.baseURL}/ocis/equipment/saveEquipmentDict`

// 删除设备字典
export const deleteDict = `${config.default.api.baseURL}/ocis/equipment/delEquipmentDictById`

// 修改设备位置
export const changePosition = `${config.default.api.baseURL}/ocis/equipment/updateEquipmentPosition`

// 设备登记单条数据回显
export const deviceRegisterData = `${config.default.api.baseURL}/ocis/equipment/getEquipmentById`

// 设备登记列表查询
export const getDeviceRegisterList = `${config.default.api.baseURL}/ocis/equipment/getEquipmentList`

// 设备登记保存
export const submitDeviceRegister = `${config.default.api.baseURL}/ocis/equipment/saveEquipment`

// 设备组套查询-组套id
export const getDeviceGroupById = `${config.default.api.baseURL}/ocis/equipment/getByGroupNo`

// 新增设备到组套
export const addDeviceToGroup = `${config.default.api.baseURL}/ocis/equipment/saveEquipmentGroup`

// 根据设备编号获取设备信息
export const getDeviceInfoByDeviceNo = `${config.default.api.baseURL}/ocis/equipment/getByDeviceNo`
