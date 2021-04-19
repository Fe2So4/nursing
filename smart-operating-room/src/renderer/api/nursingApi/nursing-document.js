import request from '@/utils/request'
const config = require('@/config/url.js')

const ReqNursingDocumentTable = `${config.default.api.baseURL}/ocis/pathology/getPathologyByConditions`
// FTP上传路径
export const ftpUploadPDF = `${config.default.api.baseURL}/ocis/nursingRecord/ftpUploadPDF`
export const reqNursingDocumentTable = (obj) => {
  return request({
    url: ReqNursingDocumentTable,
    method: 'post',
    data: obj
  })
}
