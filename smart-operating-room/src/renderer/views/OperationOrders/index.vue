<template>
  <!-- <div class="operation-orders">
    operation-orders
    <div id="qrCode" ref="qrCodeDiv"></div>
    <el-button @click="handleStart">播放</el-button>
    <el-button @click="handlePause">暂停</el-button>
    <el-button @click="handleResume">继续</el-button>
    <el-button @click="handleCancel">停止</el-button>
  </div> -->

  <div class="container">
    <div class="header">
      <OperationHeader
        ref="OperationHeader"
        @changeRadio="changeRadio"
        @changeItem="changeItem"
      />
    </div>
    <div class="content">
      <OperationContent ref="OperationContent" />
    </div>
  </div>
</template>

<script>
// import QRCode from 'qrcodejs2'
// import {startSpeak, pauseSpeak, resumeSpeak, cancelSpeak} from '@/utils/voiceSpeak'
import OperationHeader from './components/operation-header'
import OperationContent from './components/operation-content'
export default {
  name: 'OperationOrders',
  data () {
    return {}
  },
  components: {
    OperationHeader,
    OperationContent
  },
  mounted: function () {
    // this.$nextTick(function () {
    //   this.bindQRCode()
    // })
  },
  methods: {
    // bindQRCode: function () {
    //   new QRCode(this.$refs.qrCodeDiv, {
    //     text: '李炎飞真鸡儿帅',
    //     width: 200,
    //     height: 200,
    //     colorDark: '#333333', // 二维码颜色
    //     colorLight: '#ffffff', // 二维码背景色
    //     correctLevel: QRCode.CorrectLevel.L// 容错率，L/M/H
    //   })
    // },
    // handleStart () {
    //   startSpeak('患者：付天英，8病区，泌尿科，12床；手术名称：右-输尿管镜下取石术-(软镜备球囊扩张)；手术医生：方祖军，郑捷，郑捷')
    // },
    // handlePause () {
    //   pauseSpeak()
    // },
    // handleResume () {
    //   resumeSpeak()
    // },
    // handleCancel () {
    //   cancelSpeak()
    // }

    // 点击修改或退单
    changeItem (data) {
      console.log(data)
      this.$nextTick(() => {
        let selectItem = this.$refs.OperationContent.isSelectItem
        console.log(selectItem)
        if (selectItem[0].floor === '') {
          this.$message.warning('请先选中一条数据')
          return false
        }
        if (data.type === 1) {
          this.$refs.OperationContent.exitDialogShow(data.isSend)
        } else if (data.type === 2) {
          this.$refs.OperationContent.changeDialogShow()
        } else {
          // this.$refs.OperationContent.cancleDialogShow()
        }
      })
    },
    // 修改派单状态radio
    changeRadio (val) {
      this.$refs.OperationContent.clearSelect(val)
    }
  }
}
</script>

<style scoped lang="scss">
@import './../../styles/scrollrow.scss';
.container {
  width: 100%;
  min-width: 1080px;
  height: 100%;
}
.content {
  height: calc(100% - 100px);
  margin-top: 20px;
}

/deep/ .vxe-button.size--mini.type--button:hover {
  background-color: #3377ff;
  color: #ffffff;
}
/deep/ .vxe-button--content,
.vxe-button--icon,
.vxe-button--loading-icon {
  vertical-align: unset;
}
</style>
