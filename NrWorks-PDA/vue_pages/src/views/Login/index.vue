<template>
  <div class="login">
    <!-- <h3>上海仝佥信息有限公司</h3> -->
    <div class="login-content">
      <div class="title">
        <div class="title-left">
          <van-image :src="imgUrl"></van-image>
        </div>
        <div class="title-right">
          <p>Dandelion 智慧手术中心</p>
          <p>手术室移动工作平台</p>
        </div>
      </div>
      <div class="notice">
        账户密码登录
      </div>
      <div class="underline"></div>
      <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label=""
            style="border: 1px solid #8496B6;"
            left-icon="user-o"
            placeholder="请输入用户名"
          />
            <!-- :rules="[{ required: true, message: '请填写用户名' }]" -->
          <van-field
            v-model="password"
            type="password"
            name="密码"
            left-icon="user-o"
            style="border: 1px solid #8496B6;"
            label=""
            placeholder="请输入密码"
          />
            <!-- :rules="[{ required: true, message: '请填写密码' }]" -->
          <van-checkbox v-model="checked" shape="square">记住我</van-checkbox>
          <div class="login-submit">
            <van-button block type="info" native-type="submit">
              登  录
            </van-button>
          </div>
        </van-form>
    </div>
    <div class="copyright">
      <p>复旦大学附属华山医院</p>
      <p>©2011-2020仝佥信息版权所有</p>
      <p>Dandelion智慧手术中心临床护理信息系统 v1.0.0</p>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/login-logo.png'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      version: '',
      newVersion: '2.0.0',
      oldVersion: '1.0.0',
      fileName: 'PDA',
      path: '',
      progress: 0,
      imgUrl: logo,
      checked: false
    }
  },
  methods: {
    onSubmit (values) {
      this.$router.push('/home')
      // this.$router.push('/signature')
    }
    // openFile () {
    //   var url = '/sdcard/tencent/MicroMsg/Download/pda.apk'
    //   cordova.plugins.fileOpener2.open(url,
    //     'application/vnd.android.package-archive'
    //   ).then(() => {
    //     console.log('file is opened')
    //   }).catch(e => {
    //     console.log('Error openening file', e)
    //   })
    // },
    // downloadFile (fileUrl) {
    //   var url = encodeURI('http://47.103.105.200/PDA/pda.apk')
    //   // var url = encodeURI('https://lab.lanholding.com/pda.apk')
    //   var fileTransfer = new FileTransfer()
    //   this.$notify('调用')
    //   fileTransfer.download(
    //     url,
    //     fileUrl,
    //     function (entry) {
    //       // cordova.file.dataDirectory + 'pda.apk'
    //       cordova.plugins.fileOpener2.open(entry.toURL(),
    //         'application/vnd.android.package-archive')
    //         .then(() => {
    //           console.log('File is opened')
    //         })
    //         .catch(e => {
    //           console.log('Error openening file', e)
    //         })
    //     },
    //     function (error) {
    //       alert(JSON.stringify(error))
    //     },
    //     true
    //   )
    //   var oProgressNum = document.getElementById('num')
    //   fileTransfer.onprogress = function (event) {
    //     let num = Math.ceil(event.loaded / event.total * 100)
    //     if (num === 100) {
    //       oProgressNum.innerHTML = '下载完成'
    //     } else {
    //       oProgressNum.innerHTML = '下载进度:' + num + '%'
    //     }
    //   }
    // },

    // // 创建文件路径
    // createFilePath: function () {
    //   var _this = this
    //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    //     fs.root.getFile('pda.apk', { create: true, exclusive: false }, function (fileEntry) {
    //       console.log(fileEntry)
    //       _this.path = fileEntry.toURL()
    //       // 调用fileTransfer插件，下载图片
    //       // _this.downLoadImg(fileEntry.toURL())
    //       _this.downloadFile(fileEntry.toURL())
    //     }, function (err) {
    //       console.log(err)
    //     })
    //   }, function (error) {
    //     console.log(error)
    //   })
    // },
    // init () {
    //   // cordova.getAppVersion.getVersionNumber().then((version)=> {
    //   // this.version = version
    //   if (this.oldVersion !== this.newVersion) {
    //     this.$dialog.confirm({
    //       title: '标题',
    //       message: '检测到有最新更新，是否下载'
    //     })
    //       .then(() => {
    //         this.createFilePath()
    //         // this.openFile()
    //       })
    //       .catch(() => {
    //       })
    //   }
    //   // })
    // }
  },
  created () {
  },
  mounted () {
    document.addEventListener('deviceready', onDeviceReady, false)
    function onDeviceReady () {
      console.log('console.log works well')
    }
    // document.addEventListener('deviceready', onDeviceReady, false)
    // var me = this
    // function onDeviceReady () {
    //   me.msg = 'cordova is ready'
    //   me.init()
    // }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    box-sizing: border-box;
    // justify-content: center;
    flex-direction: column;
    padding: 0 65px;
    position: relative;
    background: url('../../assets/login-bg.png') no-repeat center;
    background-size: 100% 100%;
    .login-content{
      background: #FFFFFF;
      overflow: hidden;
      margin-top: 218px;
      box-shadow: 15px 15px 19px 2px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      padding: 0 46px;
      .title{
        display: flex;
        margin-top: 100px;
        .title-left{
          margin-left: 35px;
          margin-right: 25px;
          width: 58px;
          height: 86px;
        }
        .title-right{
          flex: 1;
          p{
            font-weight: bold;
            font-size: 30px;
            color: #FFFFFF;
            text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
            background: linear-gradient(0deg, #165AE5 0%, #7DC1FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            &:last-child{
              font-size: 36px;
            }
          }
        }
      }
      .notice{
        text-align: center;
        color: #9C9C9C;
        font-weight: bold;
        font-size: 32px;
        margin-top: 35px;
        margin-bottom: 10px;
      }
      .underline{
        width: 110px;
        height: 4px;
        background: #0078FF;
        border-radius: 2px;
        margin: 0 auto;
      }
      .van-form{
        margin-top: 20px;
        .van-field{
          line-height: 70px;
          padding-top: 0 ;
          padding-bottom: 0 ;
          &:nth-child(2){
            margin-top: 36px;
          }
        }
        .van-checkbox{
          margin-top: 20px;
          /deep/ .van-checkbox__icon{
            height: 30px;
            line-height: 30px;
            i{
              height: 30px;
              width: 30px;
              line-height: 30px;
              // border:1PX solid #8396B6 /*no*/
              border:1PX solid #8396B6
            }
          }
          /deep/ .van-checkbox__label{
            line-height: 30px;
            font-size: 24px;
          }
        }
        /deep/ .van-field__left-icon{
          // width: 25px;
          // height: 30px;
          i{
            font-size: 30px;
          }
        }
        /deep/ .van-field__control{
          font-size: 30px;
          color: #9DA6B1;
        }
        .login-submit{
          margin: 40px 0 70px 0;
        }
        .van-button{
          // margin-top: 20px;
          width: 100%;
          line-height: 80px;
          height: 80px;
          font-size: 40px;
        }
      }
    }
    .copyright{
      position: absolute;
      bottom: 37px;
      left: 0;
      right: 0;
      text-align: center;
      p{
        font-size: 20px;
        font-weight: 400;
        color: #FFFFFF;
        opacity: 0.75;
        &:nth-child(2){
          margin: 12px 0;
        }
      }
    }
  }
</style>
