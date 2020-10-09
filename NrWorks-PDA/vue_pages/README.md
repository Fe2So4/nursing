# nurse-works-pda

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 签名
# 生成密钥库
keytool -genkeypair -alias pda.keystore -keyalg RSA -validity 4000 -keystore pda.keystore
jarsigner -verbose -keystore pda.keystore -signedjar pda.apk app-release-unsigned.apk pda.keystore

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
