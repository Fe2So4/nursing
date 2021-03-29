<template>
  <div class="login" ref="login">
    <div class="login-box">
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
        <div class="notice">账户登录</div>
        <div class="underline"></div>
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            type="text"
            label=""
            style="border: 1px solid #8496b6"
            left-icon="user-o"
            placeholder="请输入用户名"
          />
          <!-- :rules="[{ required: true, message: '请填写用户名' }]" -->
          <van-field
            v-model="password"
            type="password"
            name="密码"
            icon-prefix="my-icon"
            left-icon="mima"
            style="border: 1px solid #8496b6"
            label=""
            placeholder="请输入密码"
          />
          <!-- :rules="[{ required: true, message: '请填写密码' }]" -->
          <van-checkbox v-model="isRemember" shape="square"
            >记住我</van-checkbox
          >
          <div class="login-submit">
            <van-button block type="info" native-type="submit">
              登 录
            </van-button>
          </div>
        </van-form>
      </div>
      <div class="copyright">
        <p>复旦大学附属华山医院</p>
        <p>©{{ time }}蓝想数科版权所有</p>
        <p>Dandelion智慧手术中心临床护理信息系统 v1.0.0</p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
import request from '@/utils/request'
import moment from 'moment'
import logo from '@/assets/login-logo.png'
import { getOpePeople } from '@/api/device-package'
import { mapActions } from 'vuex'
import {
  setUserToken,
  setCurrentAccount,
  getCurrentAccount,
  clearCurrentAccount
} from '../../utils/storage'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      // version: '',
      // newVersion: '2.0.0',
      // oldVersion: '1.0.0',
      // fileName: 'PDA',
      // path: '',
      time: moment(new Date()),
      // progress: 0,
      imgUrl: logo,
      isRemember: false
    }
  },
  created () {
    this.getAccount()
  },
  methods: {
    ...mapActions('Patient', ['setOpePeopleInfo']),
    getOpePeople () {
      return request({
        method: 'get',
        url: getOpePeople
      }).then((res) => {
        this.setOpePeopleInfo(res.data.data)
      })
    },
    // 获取当前用户名和密码
    getAccount () {
      // 从缓存中获取
      let res = getCurrentAccount()
      if (res) {
        let obj = JSON.parse(res)
        this.username = obj.username
        this.password = obj.password
        this.isRemember = obj.isRemember
      }
    },
    // 存储用户名和密码
    storageAccount () {
      let obj = JSON.stringify({
        username: this.username,
        password: this.password,
        isRemember: this.isRemember
      })
      setCurrentAccount(obj)
    },
    onSubmit () {
      if (this.username === '') {
        this.$notify('用户名不能为空')
        return
      }
      if (this.password === '') {
        this.$notify('密码不能为空')
        return
      }
      this.login().then(
        (res) => {
          setUserToken(res.data.data)
          if (this.isRemember) {
            this.storageAccount()
          } else {
            clearCurrentAccount()
          }
          return this.getOpePeople()
        }
      ).then(
        () => {
          this.$router.push('/home')
        },
        e => {
          this.$notify(e.message)
        }
      )
    },
    login () {
      return request({
        url: login,
        method: 'post',
        data: {
          loginName: this.username,
          loginPwd: this.password
        }
      }).then(
        res => {
          if (res.data && res.data.code === '0') {
            return res
          } else {
            return Promise.reject(new Error('登录失败，请检查登录信息'))
          }
        },
        e => {
          return Promise.reject(new Error('网络错误，请稍后尝试'))
        }
      )
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
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: url("../../assets/login-bg.png") no-repeat center;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  // height: 1280px;
  // min-height: 1280px;
}
.login-box {
  padding: 0 65px;
  height: 100%;
  display: flex;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  // justify-content: center;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  // z-index: 666;
  .login-content {
    background: #ffffff;
    overflow: hidden;
    z-index: 999;
    // margin-top: 218px;
    box-shadow: 15px 15px 19px 2px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 0 46px;
    .title {
      display: flex;
      margin-top: 100px;
      .title-left {
        margin-left: 35px;
        margin-right: 25px;
        width: 58px;
        height: 86px;
      }
      .title-right {
        flex: 1;
        p {
          font-weight: bold;
          font-size: 30px;
          color: #ffffff;
          text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
          background: linear-gradient(0deg, #165ae5 0%, #7dc1ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          &:last-child {
            font-size: 36px;
          }
        }
      }
    }
    .notice {
      text-align: center;
      color: #9c9c9c;
      font-weight: bold;
      font-size: 32px;
      margin-top: 35px;
      margin-bottom: 10px;
    }
    .underline {
      width: 110px;
      height: 4px;
      background: #0078ff;
      border-radius: 2px;
      margin: 0 auto;
    }
    .van-form {
      margin-top: 20px;
      .van-field {
        line-height: 70px;
        padding-top: 0;
        padding-bottom: 0;
        &:nth-child(2) {
          margin-top: 36px;
        }
      }
      .van-checkbox {
        margin-top: 20px;
        /deep/ .van-checkbox__icon {
          height: 30px;
          line-height: 30px;
          i {
            height: 30px;
            width: 30px;
            line-height: 30px;
            // border:1PX solid #8396B6 /*no*/
            border: 1px solid #8396b6;
          }
        }
        /deep/ .van-checkbox__label {
          line-height: 30px;
          font-size: 24px;
        }
      }
      /deep/ .van-field__left-icon {
        // width: 25px;
        // height: 30px;
        height: 70px;
        i {
          font-size: 30px;
          color: #9da6b0;
        }
      }
      /deep/ .van-field__control {
        font-size: 30px;
        color: #9da6b1;
      }
      .login-submit {
        margin: 40px 0 70px 0;
      }
      .van-button {
        // margin-top: 20px;
        width: 100%;
        line-height: 80px;
        height: 80px;
        font-size: 40px;
      }
    }
  }
  .copyright {
    position: absolute;
    bottom: 37px;
    left: 0;
    right: 0;
    text-align: center;
    p {
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.75;
      &:nth-child(2) {
        margin: 12px 0;
      }
    }
  }
}
</style>
