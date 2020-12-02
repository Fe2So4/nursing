// import request from '@/utils/request'
const config = require('@/config/url.js')
// 模板维护 获取模板树
export const getTreeData = `${config.default.api.baseURL}/ocis/operCharge/getChargeTemplate`

// 新增模板树节点
export const addTreeData = `${config.default.api.baseURL}/ocis/operCharge/saveChargeTemplateTree`

// 删除模板树节点
export const deleteTreeNode = `${config.default.api.baseURL}/ocis/operCharge/delChargeTemplate`

// 新增模板详情
export const addTemplateDetail = `${config.default.api.baseURL}/ocis/operCharge/saveChargeTemplateDetail`

// 计费审核删除收费项目
export const deleteChargeItem = `${config.default.api.baseURL}/ocis/operCharge/delChargeById`

// 计费审核 获取病人详情
export const getPatientDetail = `${config.default.api.baseURL}/ocis/operCharge/getPatientDetail`

// 计费审核 获取病人列表
export const getPatientList = `${config.default.api.baseURL}/ocis/operCharge/getPatientList`

// 计费审核 保存/修改 收费项目
export const saveChargeItem = `${config.default.api.baseURL}/ocis/operCharge/saveChargeExamine`

// 限制耗材药品计费 新增/修改限制耗材
export const saveConsumablesDrug = `${config.default.api.baseURL}/ocis/operCharge/saveConsumablesDrug`

// 限制耗材药品计费 分页获取耗材列表
export const getConsumablesDrugData = `${config.default.api.baseURL}/ocis/operCharge/getConsumablesDrugList`

// 限制耗材-导出excel
export const exportExcel = `${config.default.api.baseURL}/ocis/operCharge/download/downloadConsumablesDrugList`

// 手术计费获取字典
export const getDictCharge = `${config.default.api.baseURL}/ocis/operCharge/getDictByType`

// 关键字获取计费项列表
export const getChargeItemNameList = `${config.default.api.baseURL}/ocis/operCharge/queryCharge`

// 限制耗材
// export const exportExcel = `${config.default.api.baseURL}/ocis/operCharge/download/downloadConsumablesDrugList`
