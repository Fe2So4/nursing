# smart-operating-room

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```
# 目录列表
```
|-- .electron-vue
|-- build
|-- dev-tools
|-- dist
|-- node_modules
|-- src
|   |-- main
|   |   |-- index.dev.js
|   |   |-- index.js
|   |   |-- ip.js
|   |   |-- print.js
|   |-- renderer
|   |   |-- api
|   |   |-- assets
|   |   |-- components
|   |   |-- config
|   |   |-- layout
|   |   |-- router
|   |   |-- routerLargeScreen 术中大屏路由配置
|   |   |-- routerOrderScreen 接单大屏路由配置
|   |   |-- store
|   |   |-- styles
|   |   |-- utils
|   |   |-- views
|   |   |   |-- ContinuousSurgery 连台手术
|   |   |   |-- LargeScreen 术中大屏
|   |   |   |-- Login 登录
|   |   |   |-- NursingDocument 护理记录
|   |   |   |-- NursingDocumentList 护理记录-护理文书
|   |   |   |-- OperationOrders
|   |   |   |-- PathologicalApplication 病理申请
|   |   |   |-- ReceivingOrders
|   |   |   |-- StatisticalQuery
|   |   |   |-- StatisticalQueryRunning
|   |   |   |-- SurgeryListing
|   |   |-- App.vue
|   |   |-- main.js
|   |   |-- mainLargeScreen.js
|   |   |-- mainOrderScreen.js
|   |-- index.ejs
|-- static
|-- test
|-- .babelrc
|-- .eslintignore
|-- .eslintrc.js
|-- .gitignore
|-- .travis.yml
|-- appveyor.yml
|-- electron.builder.config.largeScreen.js
|-- electron.builder.config.orderScreen.js
|-- electron.builder.config.smartNursing.js
|-- package.js
|-- package-lock.js
|-- README.md
# LargeScreen --术中大屏
# OperationOrders --手术派单
# ReceivingOders --接单中心

```
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
