import request from '@/utils/request'
const config = require('@/config/url.js')

const ReqNursingDocumentTable = `${config.default.api.baseURL}/ocis/pathology/getPathologyByConditions`
export const reqNursingDocumentTable = (obj) => {
  return request({
    url: ReqNursingDocumentTable,
    method: 'post',
    data: obj
  })
}
