# nurse-works-pda
护理一期PDA
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

## 项目结构
```
project
|-- vue_pages vue 相关页面
    |-- src
        |-- views
            |-- Demo 扫码demo
            |-- DeviceBasicList 一般器械包
            |-- DeviceSpecialList 特殊器械包
            |-- HandoverRecord ?
            |-- Home 主页
            |-- Login 登录
            |-- PatientHome 患者首页
            |-- Record2 护理记录单二
            |-- Record3 护理记录单三
            |-- SignIn SignIn
            |-- SignOut SignOut
            |-- TimeOut TimeOut
            |-- Transfer 转运交接
            |-- TransferHandover ？
|-- www vue打包好的静态资源存放位置
```

## 注意事项

- 使用ES5语法，ES6+会导致兼容性问题
- 打包流程
  - vue_pages `npm run build`
  - project `cordova build android`

