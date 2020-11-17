import request from '@/utils/request'
const config = require('@/config/url.js')

const reqGetPersonnelSchedulingUrl = `${config.default.api.baseURL}/ocis/portfolio/getPersonnelScheduling`
export const reqGetPersonnelScheduling = (obj) => {
  return request({
    url: reqGetPersonnelSchedulingUrl + `/${obj.selectTime}`,
    method: 'get'
  })
}
