<template>
  <div class="login">
    <div class="content clearfix">
      <div class="left">
        <p>Dandelion智慧手术中心</p>
        <p />
        <p>
          <!-- 围手术期临床信息系统 -->
          <span>智能护理</span>
          <span>v1.0.0</span>
        </p>
        <img
          src="../../assets/welcome.png"
          alt
        >
      </div>
      <div class="right">
        <div class="form-icon">
          <img
            src="../../assets/dandelion.png"
            alt
          >
        </div>
        <div class="title">
          账 户 登 录
        </div>
        <div class="line" />
        <el-form
          :rules="rules"
          ref="form"
          :model="form"
          hide-required-asterisk
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-s-custom"
              v-model="form.username"
              @keydown.enter.native="handleInputPass"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              ref="password"
              v-model="form.password"
              @keydown.native="enter"
              show-password
            />
          </el-form-item>
        </el-form>
        <div class="option clearfix">
          <div
            class="button"
            @click="login"
          >
            确定
          </div>
          <div
            class="button"
            @click="close"
          >
            取消
          </div>
        </div>
      </div>
      <div class="copyright">
        Copyright©{{ copyrightTime }}蓝想健康版权所有
      </div>
      <div
        class="close"
        style="-webkit-app-region: drag"
      >
        <i
          class="el-icon-minus"
          @click="mini"
          style="-webkit-app-region: no-drag"
        />
        <i
          class="el-icon-close"
          @click="close"
          style="-webkit-app-region: no-drag"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { login, reqgetLoginUserInfo } from '@/api/login'
// import request from '@/utils/request'
import { setUserToken } from '../../utils/storage'
import moment from 'moment'
import {ipcRenderer} from 'electron'
const { BrowserWindow } = require('electron').remote

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请正确填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请正确填写密码', trigger: 'blur' }
        ]
      },
      copyrightTime: moment(new Date()).format('YYYY')
    }
  },
  mounted () {
    ipcRenderer.send('open-main')
    console.log('success-更新成功')
    document.addEventListener('keyup', this.keyUpListener)
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.keyUpListener)
  },
  created () {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      win.unmaximize()
    }
  },
  methods: {
    keyUpListener (e) {
      if (e.keyCode === 112) {
        this.$electron.ipcRenderer.send('open-config-file')
      }
    },
    jumpHome () {},
    handleInputPass () {
      let pass = this.$refs.password
      pass.focus()
    },
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let obj = {
            loginName: this.form.username,
            loginPwd: this.form.password
          }
          login(obj).then((res) => {
            if (res.data.code === '0') {
              setUserToken(res.data.data)
              reqgetLoginUserInfo().then((res) => {
                if (res.data.code === 200) {
                  let obj = {
                    userName: res.data.data.userName,
                    userCode: res.data.data.userCode
                  }
                  this.$store.commit('SAVE_LOGIN_USERINFO', obj)
                  localStorage.setItem('userName', obj.userName)
                  localStorage.setItem('userCode', obj.userCode)
                }
              }).then(
                () => {
                  const win = BrowserWindow.getFocusedWindow()
                  win.maximize()
                  return this.$router.push('/home')
                }
              )
            } else {
              this.$message({ type: 'error', message: res.data.message })
            }
          })
        } else {
          return false
        }
      })
    },
    enter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    close () {
      localStorage.removeItem('userName')
      const win = BrowserWindow.getFocusedWindow()
      win.close()
    },
    mini () {
      const win = BrowserWindow.getFocusedWindow()
      win.minimize()
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 560px;
  width: 880px;
  position: relative;
  // height: 100%;
  // width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/login_bg.png") center no-repeat;
  .content {
    width: 610px;
    z-index: 1;
    height: 350px;
    .left {
      float: left;
      width: 290px;
      height: 100%;
      p {
        margin: 0;
        font-weight: bold;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        // text-shadow:2px 3px 1px rgba(0, 0, 0, 0.8);
        &:first-child {
          background: linear-gradient(
            0deg,
            rgba(0, 94, 210, 1) 0%,
            rgba(178, 218, 255, 1) 100%
          );
          background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }
        span {
          font-size: 12px;
          font-weight: bold;
          color: #3cadff;
          &:nth-child(1) {
            font-weight: bold;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
            background: linear-gradient(
              0deg,
              rgba(0, 94, 210, 1) 0%,
              rgba(178, 218, 255, 1) 100%
            );
            background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
          }
        }
        &:nth-child(2) {
          width: 20px;
          height: 2px;
          background: rgba(19, 118, 230, 1);
          // box-shadow:0px 3px 4px 0px rgba(0, 0, 0, 0.6);
        }
      }
      img {
        width: 310px;
        height: 220px;
      }
    }
    .right {
      float: right;
      width: 320px;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      box-shadow: 14px 14px 19px 1px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      position: relative;
      .form-icon {
        position: absolute;
        left: 70px;
        top: 35px;
      }
      .title {
        color: #0078ff;
        margin-top: 40px;
        text-align: center;
        line-height: 30px;
        font-weight: bold;
      }
      .line {
        width: 60px;
        height: 2px;
        background: #0078ff;
        border-radius: 1px;
        margin: 0 auto;
        margin-bottom: 40px;
      }
      .el-form {
        padding: 0 20px;
        .el-form-item {
          margin: 0 0 20px 0;
          &:last-child {
            margin: 0;
          }
        }
      }
      .option {
        margin-top: 40px;
        .button {
          width: 130px;
          margin-left: 20px;
          height: 30px;
          line-height: 30px;
          display: block;
          float: left;
          text-align: center;
          background: #0078ff;
          color: #fff;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .copyright {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      font-size: 12px;
      margin: auto;
      color: #e9e9e9;
      opacity: 0.75;
      text-align: center;
    }
    .close {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 666;
      padding-top: 10px;
      padding-right: 10px;
      left: 0;
      text-align: right;
      i {
        font-size: 14px;
        display: inline-block;
        color: #0094ff;
        cursor: pointer;
      }
    }
  }
  /deep/ .el-input .el-input__inner {
    background-color: #fff;
    border: 1px solid #aebdd6;
    color: #9da6b0;
  }
}
</style>
