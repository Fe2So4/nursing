webpackJsonp([1],{"4ml/":function(e,n){},IjYx:function(e,n){},NHnr:function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=o("7+uW"),a={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var i=o("VU/8")({name:"App"},a,!1,function(e){o("mVEf")},null,null).exports,r=o("/ocq"),s={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"hello"},[e._v("\n  pda测试页面\n  "),o("p",[e._v("132345sada")]),e._v(" "),o("van-dialog",{attrs:{title:"标题","show-cancel-button":""},model:{value:e.show,callback:function(n){e.show=n},expression:"show"}},[o("p",[e._v("引入vant-UI组件库")])]),e._v(" "),o("van-grid",[o("van-grid-item",{attrs:{icon:"photo-o",text:"文字1"}}),e._v(" "),o("van-grid-item",{attrs:{icon:"photo-o",text:"文字2"}}),e._v(" "),o("van-grid-item",{attrs:{icon:"photo-o",text:"文字3"}}),e._v(" "),o("van-grid-item",{attrs:{icon:"photo-o",text:"文字4"}})],1),e._v(" "),o("van-button",{attrs:{type:"primary"},on:{click:e.handleShow}},[e._v("我是一个小按钮啊")])],1)},staticRenderFns:[]};var c=o("VU/8")({name:"HelloWorld",data:function(){return{show:!1,msg:"Welcome to Your Vue.js App"}},methods:{handleShow:function(){this.show=!0}}},s,!1,function(e){o("rH+x")},"data-v-341e54da",null).exports,l=o("mvHQ"),d=o.n(l),u={name:"Login",data:function(){return{username:"",password:"",version:"",newVersion:"2.0.0",oldVersion:"1.0.0",fileName:"PDA",path:"",progress:0,imgUrl:""}},methods:{onSubmit:function(e){this.$router.push("/home")},openFile:function(){cordova.plugins.fileOpener2.open("/sdcard/tencent/MicroMsg/Download/pda.apk","application/vnd.android.package-archive").then(function(){console.log("file is opened")}).catch(function(e){console.log("Error openening file",e)})},downloadFile:function(e){var n=encodeURI("http://47.103.105.200/PDA/pda.apk"),o=new FileTransfer;this.$notify("调用"),o.download(n,e,function(e){cordova.plugins.fileOpener2.open(e.toURL(),"application/vnd.android.package-archive").then(function(){console.log("File is opened")}).catch(function(e){console.log("Error openening file",e)})},function(e){alert(d()(e))},!0);var t=document.getElementById("num");o.onprogress=function(e){var n=Math.ceil(e.loaded/e.total*100);t.innerHTML=100===n?"下载完成":"下载进度:"+n+"%"}},createFilePath:function(){var e=this;window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(n){n.root.getFile("pda.apk",{create:!0,exclusive:!1},function(n){console.log(n),e.downloadFile(n.toURL())},function(e){console.log(e)})},function(e){console.log(e)})},downLoadImg:function(e){var n=this,o=new FileTransfer,t=encodeURI("http://avatar.csdn.net/7/E/0/1_michael_ouyang.jpg");o.download(t,e,function(e){n.imgUrl=e.toURL()},function(e){console.log("download error source "+e.source),console.log("download error target "+e.target),console.log("upload error code"+e.code)})},init:function(){var e=this;this.oldVersion!==this.newVersion&&this.$dialog.confirm({title:"标题",message:"检测到有最新更新，是否下载"}).then(function(){e.createFilePath()}).catch(function(){})}},created:function(){},mounted:function(){document.addEventListener("deviceready",function(){e.msg="cordova is ready",e.init()},!1);var e=this}},p={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"login"},[o("h3",[e._v("上海仝佥信息有限公司")]),e._v(" "),o("van-form",{on:{submit:e.onSubmit}},[o("van-field",{attrs:{name:"用户名",label:"用户名",placeholder:"用户名",rules:[{required:!0,message:"请填写用户名"}]},model:{value:e.username,callback:function(n){e.username=n},expression:"username"}}),e._v(" "),o("van-field",{attrs:{type:"password",name:"密码",label:"密码",placeholder:"密码",rules:[{required:!0,message:"请填写密码"}]},model:{value:e.password,callback:function(n){e.password=n},expression:"password"}}),e._v(" "),o("div",{staticStyle:{margin:"16px"}},[o("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[e._v("\n          提交\n        ")])],1)],1),e._v("\n    "+e._s(e.version)+"\n    "+e._s(e.path)+"\n    "),o("div",{attrs:{id:"num"}},[e._v(e._s(e.progress))]),e._v(" "),o("img",{attrs:{src:e.imgUrl,alt:""}}),e._v(" "),o("div",{staticClass:"copyright"},[e._v("\n      © 2011-2020 上海仝佥信息技术有限公司\n    ")])],1)},staticRenderFns:[]};var v=o("VU/8")(u,p,!1,function(e){o("IjYx")},"data-v-697d7b26",null).exports;t.a.use(r.a);var f=new r.a({routes:[{path:"/",redirect:"/login"},{path:"/home",name:"Home",component:c},{path:"/login",name:"Login",component:v}]}),m=(o("QKTF"),o("4ml/"),o("h2zT"),o("Fd2+"));t.a.use(m.b),t.a.use(m.a),t.a.use(m.e),t.a.use(m.f),t.a.use(m.d),t.a.use(m.c),t.a.use(m.g),t.a.config.productionTip=!1,new t.a({el:"#app",router:f,components:{App:i},template:"<App/>"})},h2zT:function(e,n){},mVEf:function(e,n){},"rH+x":function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.38fb27733614d355df26.js.map