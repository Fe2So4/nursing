import axios from 'axios'
import { Message } from 'element-ui'
// import { getUserToken } from './storage'

const request = axios.create()
// 添加一个请求拦截器
request.defaults.timeout = 6000
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // const token = getUserToken()
  // console.log(token)
  // if (token) {
  //   config.headers.Authorization = token // 将token放到请求头发送给服务器
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  if (process.env.NODE_ENV === 'development') {
    // 对响应错误做点什么
    console.log(error.message)
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      Message({
        type: 'error',
        message: '网络连接失败，请稍后再试',
        showClose: true
      })
      return Promise.reject(error) // reject这个错误信息
    } else {
      Message({
        type: 'error',
        message: JSON.stringify(error, '', 2),
        showClose: true
      })
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  } else {
    return Promise.reject(new Error('网络错误，请稍后尝试'))
  }
})
export default request
