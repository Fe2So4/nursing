let api
if (process.env.NODE_ENV === 'production') {
  /// 生产环境api接口地址
  api = {
    // baseURL: 'http://47.103.105.200:5090'
    baseURL: 'http://192.168.1.106:5090',
    // baseURL: 'http://128.0.18.38:5090',
    socketURL: 'http://192.168.1.106:5099'
    // baseURL: 'http://192.168.1.58:5090'
  }
} else {
  // 本地测试用这个
  api = {
    baseURL: 'http://192.168.1.106:5090',
    socketURL: 'http://192.168.1.106:5099'
    // baseURL: 'http://192.168.1.118:5090'
    // baseURL: 'http://192.168.1.106:5090'
  }
}

const config = {
  api: api
}
export default config
