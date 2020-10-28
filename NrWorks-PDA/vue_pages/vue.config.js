const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  // outputDir: 'dist',
  // publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 32, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成20rem  750 * 1280
            propList: ['*'],
            selectorBlackList: []
          })
        ]
      }
    }
  }
}
