let api
if (process.env.NODE_ENV === 'production') {
  /// 生产环境api接口地址
  api = {
    // baseURL: 'http://47.103.105.200:5090'
    // baseURL: 'http://192.168.1.106:5090'
    baseURL: 'http://192.168.1.58:2080'
  }
} else {
  // 本地测试用这个
  api = {
    // baseURL: 'http://192.168.1.58:2080'
    // baseURL: 'http://192.168.1.118:5090'
    // baseURL: 'http://192.168.1.106:5090'
    // baseURL: 'http://192.168.1.106:2080'
    baseURL: 'http://192.168.1.80:2080'
  }
}

const config = {
  api: api
}
export default config
