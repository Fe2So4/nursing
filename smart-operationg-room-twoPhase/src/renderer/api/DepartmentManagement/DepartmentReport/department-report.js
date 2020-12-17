import request from '@/utils/request'
const config = require('@/config/url.js')

// 根据类型获取基础字典 DEPARTMENT:科室 ,CHARGCATEGORY:计费类别
const reqgetDictByTypeUrl = `${config.default.api.baseURL}/ocis/operCharge/getDictByType`
export const reqgetDictByType = (obj) => {
  return request({
    url: reqgetDictByTypeUrl + `/${obj.type}`,
    method: 'get'
  })
}

// 按科室统计手术收费
const reqstatisOperChargeByDeptUrl = `${config.default.api.baseURL}/ocis/departmentReport/statisOperChargeByDept`
export const reqstatisOperChargeByDept = (obj) => {
  return request({
    url: reqstatisOperChargeByDeptUrl + `/${obj.date}`,
    method: 'get'
  })
}
// 按护士统计手术数量
const reqstatisOperCountByNurseUrl = `${config.default.api.baseURL}/ocis/departmentReport/statisOperCountByNurse`
export const reqstatisOperCountByNurse = (obj) => {
  return request({
    url: reqstatisOperCountByNurseUrl + `/${obj.date}`,
    method: 'get'
  })
}
// 按科室统计手术数量
const reqstatisOperCountByDeptUrl = `${config.default.api.baseURL}/ocis/departmentReport/statisOperCountByDept`
export const reqstatisOperCountByDept = (obj) => {
  return request({
    url: reqstatisOperCountByDeptUrl + `/${obj.date}`,
    method: 'get'
  })
}
// 按主刀医生统计手术数量
const reqstatisOperCountBySurgeonUrl = `${config.default.api.baseURL}/ocis/departmentReport/statisOperCountBySurgeon`
export const reqstatisOperCountBySurgeon = (obj) => {
  return request({
    url: reqstatisOperCountBySurgeonUrl + `/${obj.date}`,
    method: 'get'
  })
}

// 护理人员计费统计
const reqstatisNurseChargeUrl = `${config.default.api.baseURL}/ocis/departmentReport/statisNurseCharge`
export const reqstatisNurseCharge = (obj) => {
  return request({
    url: reqstatisNurseChargeUrl,
    method: 'post',
    data: obj
  })
}

// 护理人员计费统计详情
const reqstatisNurseChargeDetailUrl = `${config.default.api.baseURL}/ocis/departmentReport/statisNurseChargeDetail`
export const reqstatisNurseChargeDetail = (obj) => {
  return request({
    url: reqstatisNurseChargeDetailUrl,
    method: 'post',
    data: obj
  })
}

// 科室人员休假统计
const reqstatisLeaveUrl = `${config.default.api.baseURL}/ocis/departmentReport/statisLeave`
export const reqstatisLeave = (obj) => {
  return request({
    url: reqstatisLeaveUrl,
    method: 'post',
    data: obj
  })
}

// 房间设备使用登记
const reqroomEquipmentUseRegisUrl = `${config.default.api.baseURL}/ocis/departmentReport/roomEquipmentUseRegis`
export const reqroomEquipmentUseRegis = (obj) => {
  return request({
    url: reqroomEquipmentUseRegisUrl,
    method: 'post',
    data: obj
  })
}

// 医疗设备使用统计
const reqequipmentUseStatisUrl = `${config.default.api.baseURL}/ocis/departmentReport/equipmentUseStatis`
export const reqequipmentUseStatis = (obj) => {
  return request({
    url: reqequipmentUseStatisUrl + `/${obj.date}`,
    method: 'get'
  })
}
