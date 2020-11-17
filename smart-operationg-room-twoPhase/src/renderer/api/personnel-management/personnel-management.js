import request from '@/utils/request'
const config = require('@/config/url.js')
// 查询日常人员排班列表
const reqGetPersonnelSchedulingUrl = `${config.default.api.baseURL}/ocis/portfolio/getPersonnelScheduling`
export const reqGetPersonnelScheduling = (obj) => {
  return request({
    url: reqGetPersonnelSchedulingUrl + `/${obj.selectTime}`,
    method: 'get'
  })
}

// 获取日常人员数据字典
const reqgetBaseDictDetailListUrl = `${config.default.api.baseURL}/ocis/dictInfo/getBaseDictDetailList`
export const reqgetBaseDictDetailList = (obj) => {
  return request({
    url: reqgetBaseDictDetailListUrl + `/${obj.belongSerialNumber}`,
    method: 'get'
  })
}

// 日常人员排班信息修改

const reqUpdatePersionScheduleUrl = `${config.default.api.baseURL}/ocis/portfolio/updatePersionSchedule`
export const reqUpdatePersionSchedule = (obj) => {
  return request({
    url: reqUpdatePersionScheduleUrl,
    method: 'post',
    data: obj
  })
}
