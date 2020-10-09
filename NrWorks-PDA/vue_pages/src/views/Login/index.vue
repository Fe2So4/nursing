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
      progress: 0
    }
  },
  methods: {
    onSubmit (values) {
      this.$router.push('/home')
    },
    // createFilePath () {
    //   var _this = this
    //   console.log('执行createFilePath')
    //   window.resolveLocalFileSystemURI(cordova.file.externalDataDirectory,
    //     function (fs) {
    //       console.log('成功createFilePath')
    //       fs.root.getFile(
    //         _this.fileName, // 创建的文件名
    //         {create: true, exclusive: true},
    //         // create :创建新文件，exclusive: 文件已存在时抛出异常
    //         function (fileEntry) {
    //           _this.downloadFile(fileEntry)
    //         },
    //         // 失败回调
    //         function (err) {
    //           fs.getFile(
    //             _this.fileName,
    //             {create: false},
    //             function (fileEntry) {
    //               _this.preView(fileEntry)
    //             },
    //             function (err) {
    //               _this.$notify('读取文件失败')
    //             }
    //           )
    //         }
    //       )
    //     },
    //     function (error) {
    //       console.log('失败createFilePath')
    //       _this.$notify('进入文件系统失败')
    //     }
    //   )
    // },
    downloadFile2 () {
      var fileTransfer = new FileTransfer()
      // 下载地址;
      var source = 'http://47.103.105.200/PDA/pda.apk'
      var target = '/sdcard/Download/pda.apk'
      var trustAllHosts = true
      var options = {}
      function successCallback (entry) {} ;
      function errorCallback (error) {};
      fileTransfer.download(source, target, successCallback, errorCallback, trustAllHosts, options)
      fileTransfer.onprogress = function (progressEvent) {
        if (progressEvent.lengthComputable) {
          // $ionicLoading.show({
          //   template: '已经下载：' + Math.floor((progressEvent.loaded / progressEvent.total) * 100) + '%'
          // })
          this.progress = '已经下载' + Math.floor((progressEvent.loaded / progressEvent.total) * 100) + '%'
        }
      }
    },
    downloadFile () {
      var url = 'http://47.103.105.200/PDA/pda.apk'
      var fileTransfer = new FileTransfer()
      this.$notify('调用')
      fileTransfer.download(
        url,
        cordova.file.dataDirectory + 'pda.apk'
      ).then((entry) => {
        cordova.plugins.fileOpener2.open(entry.toURL(),
          'application/vnd.android.package-archive')
          .then(() => {
            console.log('File is opened')
          })
          .catch(e => {
            console.log('Error openening file', e)
          })
      },
      (error) => {
        alert(JSON.stringify(error))
      })
      var oProgressNum = document.getElementById('num')
      fileTransfer.onProgress((event) => {
        let num = Math.ceil(event.loaded / event.total * 100)
        if (num === 100) {
          oProgressNum.innerHTML = '下载完成'
        } else {
          oProgressNum.innerHTML = '下载进度:' + num + '%'
        }
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
            this.downloadFile2()
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
