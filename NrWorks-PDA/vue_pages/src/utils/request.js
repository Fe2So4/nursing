import axios from 'axios'
// import { getUserToken, removeUserToken } from '../utils/storage'
// import { getUserToken } from './storage'

const request = axios.create()
// 添加一个请求拦截器
// request.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // const token = getUserToken()
//   // if (token) {
//   //   config.headers.Authorization = token // 将token放到请求头发送给服务器
//   // }
//   // return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (process.env.NODE_ENV === 'development') {

  }
  return Promise.reject(error)
})
export default request
