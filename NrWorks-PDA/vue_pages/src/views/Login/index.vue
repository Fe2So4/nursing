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
      {{path}}
      <div id="num">{{progress}}</div>
      <img :src="imgUrl" alt="">
      <div class="copyright">
        © 2011-2020 上海仝佥信息技术有限公司
      </div>
  </div>
</template>

<script>
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
      imgUrl: ''
    }
  },
  methods: {
    onSubmit (values) {
      this.$router.push('/home')
    },
    openFile () {
      var url = '/sdcard/tencent/MicroMsg/Download/pda.apk'
      cordova.plugins.fileOpener2.open(url,
        'application/vnd.android.package-archive'
      ).then(() => {
        console.log('file is opened')
      }).catch(e => {
        console.log('Error openening file', e)
      })
    },
    downloadFile (fileUrl) {
      var url = encodeURI('http://47.103.105.200/PDA/pda.apk')
      // var url = encodeURI('https://lab.lanholding.com/pda.apk')
      var fileTransfer = new FileTransfer()
      this.$notify('调用')
      fileTransfer.download(
        url,
        fileUrl,
        function (entry) {
          // cordova.file.dataDirectory + 'pda.apk'
          cordova.plugins.fileOpener2.open(entry.toURL(),
            'application/vnd.android.package-archive')
            .then(() => {
              console.log('File is opened')
            })
            .catch(e => {
              console.log('Error openening file', e)
            })
        },
        function (error) {
          alert(JSON.stringify(error))
        },
        true
      )
      var oProgressNum = document.getElementById('num')
      fileTransfer.onprogress = function (event) {
        let num = Math.ceil(event.loaded / event.total * 100)
        if (num === 100) {
          oProgressNum.innerHTML = '下载完成'
        } else {
          oProgressNum.innerHTML = '下载进度:' + num + '%'
        }
      }
    },

    // 创建文件路径
    createFilePath: function () {
      var _this = this
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getFile('pda.apk', { create: true, exclusive: false }, function (fileEntry) {
          console.log(fileEntry)
          _this.path = fileEntry.toURL()
          // 调用fileTransfer插件，下载图片
          // _this.downLoadImg(fileEntry.toURL())
          _this.downloadFile(fileEntry.toURL())
        }, function (err) {
          console.log(err)
        })
      }, function (error) {
        console.log(error)
      })
    },
    init () {
      // cordova.getAppVersion.getVersionNumber().then((version)=> {
      // this.version = version
      if (this.oldVersion !== this.newVersion) {
        this.$dialog.confirm({
          title: '标题',
          message: '检测到有最新更新，是否下载'
        })
          .then(() => {
            this.createFilePath()
            // this.openFile()
          })
          .catch(() => {
          })
      }
      // })
    }
  },
  created () {
  },
  mounted () {
    document.addEventListener('deviceready', onDeviceReady, false)
    var me = this
    function onDeviceReady () {
      me.msg = 'cordova is ready'
      me.init()
    }
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
