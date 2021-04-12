<template>
  <div class="nursing-documentlist-header">
    <div class="title">
      <div class="name">
        {{ ListeningName }}
      </div>
      <div class="num">
        住院号:{{ ListeningNo }}
      </div>
    </div>
    <div class="btnList">
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
        @click="headerHandle('1')"
      >
        刷 新
      </vxe-button>
      <!--      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
        @click="headerHandle('2')"
      >
        打 印
      </vxe-button>-->
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
        @click="headerHandle('3')"
      >
        PDF
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
        @click="onSelectDocument"
      >
        打印文档
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
        @click="onhandleShowUpdata"
      >
        上传文档
      </vxe-button>
    </div>
    <DialogSelectDocument
      :visible="visibleSelectDocument"
      @closeVisible="closeVisible"
    />
    <HandleShowUpdata
      :visible="showUpdata"
      @closeShowUpdata="closeShowUpdata"
    />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import {ftpUploadPDF} from '@/api/nursingApi/nursing-document'
import Bus from '@/utils/bus.js'
import DialogSelectDocument from './DialogSelectDocument'
import HandleShowUpdata from './HandleShowUpdata'
import { getUserToken } from '@/utils/storage'
export default {
  name: 'NursingHeader',
  components: {DialogSelectDocument, HandleShowUpdata},
  data () {
    return {
      UserName: '',
      num: '',
      visibleSelectDocument: false,
      showUpdata: false
    }
  },

  computed: {
    // 获取用户姓名
    ListeningName () {
      return this.$store.state['nursing-document-list'].patientName
    },
    // 获取用住院号
    ListeningNo () {
      return this.$store.state['nursing-document-list'].hospitalNo
    },
    ListeningOperSchNo () {
      return this.$store.state['nursing-document-list'].operSchNo
    }
  },
  created () {
    // ftp上传
    ipcRenderer.on('reply', (e, data) => {
      this.utilsDebounce(() => {
        var xhr = new XMLHttpRequest()

        xhr.open(
          'POST',
          ftpUploadPDF +
          `/${this.ListeningOperSchNo}`
        )
        xhr.setRequestHeader('Authorization', getUserToken())

        xhr.overrideMimeType('application/octet-stream')
        // 直接发送二进制数据
        xhr.onreadystatechange = function (data) {
        // 判断是否服务器响应
          if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(data.currentTarget.response)
            if (res.code === 200) {
              console.log('上传成功')
              ipcRenderer.send('upLoadSuccess', '1')
            } else {
              console.log('上传失败')
              ipcRenderer.send('upLoadSuccess', '2')
            }
          }
        }
        if (xhr.sendAsBinary) {
          xhr.sendAsBinary(data)
        } else {
          xhr.send(data)
        }
      }, 1000)
      console.log(data)
    })
  },
  methods: {
    closeVisible () {
      this.visibleSelectDocument = false
    },
    closeShowUpdata () {
      this.showUpdata = false
    },
    headerHandle (type) {
      let path = this.$route.path
      console.log(path)

      if (type === '1') {
        if (path.includes('security-check')) {
          Bus.$emit('clickShuaXinSecurity', '1')
        } else if (path.includes('nursing-two')) {
          Bus.$emit('clickShuaXinTwo', '1')
        } else if (path.includes('nursing-jichu')) {
          Bus.$emit('clickShuaXinJiChu', '1')
        } else if (path.includes('nursing-teshu')) {
          Bus.$emit('clickShuaXinTeShu', '1')
        } else if (path.includes('nursing-transit-transfer')) {
          Bus.$emit('clickShuaXinTransit', '1')
        }
      } else if (type === '2') {
        if (path.includes('security-check')) {
          Bus.$emit('clickShuaXinSecurity', '2')
        } else if (path.includes('nursing-two')) {
          Bus.$emit('clickShuaXinTwo', '2')
        } else if (path.includes('nursing-jichu')) {
          Bus.$emit('clickShuaXinJiChu', '2')
        } else if (path.includes('nursing-teshu')) {
          Bus.$emit('clickShuaXinTeShu', '2')
        } else if (path.includes('nursing-transit-transfer')) {
          Bus.$emit('clickShuaXinTransit', '2')
        }
      } else {
        if (path.includes('security-check')) {
          Bus.$emit('clickShuaXinSecurity', '3')
        } else if (path.includes('nursing-two')) {
          Bus.$emit('clickShuaXinTwo', '3')
        } else if (path.includes('nursing-jichu')) {
          Bus.$emit('clickShuaXinJiChu', '3')
        } else if (path.includes('nursing-teshu')) {
          Bus.$emit('clickShuaXinTeShu', '3')
        } else if (path.includes('nursing-transit-transfer')) {
          Bus.$emit('clickShuaXinTransit', '3')
        }
      }
    },
    onSelectDocument () {
      this.visibleSelectDocument = true
    },
    onhandleShowUpdata () {
      this.showUpdata = true
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
  width: 90px;
  background-color: #eaeef7;
}
.nursing-documentlist-header {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 40px 0 20px;
  .title {
    min-width: 220px;
    display: flex;
    color: #444444;
    font-weight: 600;
    align-items: center;
    .num {
      margin-left: 20px;
    }
  }
  .btnList {
    display: flex;
    align-items: center;
  }
}
/deep/ .vxe-button--content,
.vxe-button--icon,
.vxe-button--loading-icon {
  vertical-align: unset;
}
</style>
