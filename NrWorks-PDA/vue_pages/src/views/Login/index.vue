<template>
  <div class="login">
    <h3>上海仝佥信息有限公司</h3>
    <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
      {{version}}
      <div class="copyright">
        © 2011-2020 上海仝佥信息技术有限公司
      </div>
  </div>
</template>

<script>
import {getVersion} from '../../utils/update'
export default {
  name:'Login',
  data() {
    return {
      username: '',
      password: '',
      version: '',
      newVersion: '2.0.0',
      oldVersion: '1.0.0'
    };
  },
  methods: {
    onSubmit(values) {
      this.$router.push('/home')
      console.log('submit', values);
    },
    createFilePath: function() {
        var _this = this;
       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
          fs.root.getFile("pda.apk", { create: true, exclusive: false }, function (fileEntry) {
              console.log(fileEntry);
              _this.downLoadImg(fileEntry.nativeURL);
              
          }, function(err) {
             console.log(err);
          });
       }, function(error) {
          console.log(error);
       });
    },
    // fileTransfer plugin
    downLoadImg: function(fileURL) {
       var _this = this;
       // 初始化FileTransfer对象
       var fileTransfer = new FileTransfer();
       // 服务器下载地址
       var uri = "http://47.103.105.200/PDA/pda.apk"
       // 调用download方法
       fileTransfer.download(
           uri,         //uri网络下载路径
           fileURL,      //url本地存储路径
           function(entry) {
              //  console.log("download complete: " + entry.toURL());
              //  _this.$$('myImage').src = entry.toURL();
           },
           function(error) {
               console.log("download error source " + error.source);
               console.log("download error target " + error.target);
               console.log("upload error code" + error.code);
           }
       );
    },
    init(){
      // cordova.getAppVersion.getVersionNumber().then((version)=> {
        // this.version = version
        if(this.oldVersion !== this.newVersion){
          this.$dialog.confirm({
            title: '标题',
            message: '检测到有最新更新，是否下载',
          })
            .then(() => {
              // on confirm
              this.createFilePath()
              // alert('confirm')
            })
            .catch(() => {
              // on cancel
            });
        }
      // })
    }
  },
  created(){
  },
  mounted(){
    document.addEventListener("deviceready", onDeviceReady, false);
    var me = this;
    function onDeviceReady() {
      me.msg="cordova is ready";
    }
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .login{
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 10px;
    position: relative;
    // background: url('../../assets/login_bg.jpg') repeat center;
    h3{
      font-size: 18px;
      color:#666;
      font-weight: lighter;
      text-align: center;
      margin-bottom: 50px;
    }
    .copyright{
      text-align: center;
      font-size: 14px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      line-height: 36px;
      margin: auto;
    }  
  }
</style>