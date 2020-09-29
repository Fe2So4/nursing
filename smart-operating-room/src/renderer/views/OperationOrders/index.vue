<template>
  <div class="operation-orders">
    operation-orders
    <div
      id="qrCode"
      ref="qrCodeDiv"
    />
    <el-button @click="handleStart">
      播放
    </el-button>
    <el-button @click="handlePause">
      暂停
    </el-button>
    <el-button @click="handleResume">
      继续
    </el-button>
    <el-button @click="handleCancel">
      停止
    </el-button>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import {
  startSpeak,
  pauseSpeak,
  resumeSpeak,
  cancelSpeak
} from '@/utils/voiceSpeak'
export default {
  name: 'OperationOrders',
  data () {
    return {}
  },
  mounted: function () {
    this.$nextTick(function () {
      this.bindQRCode()
    })
  },
  methods: {
    bindQRCode () {
      // eslint-disable-next-line no-new
      new QRCode(this.$refs.qrCodeDiv, {
        text: '李炎飞真鸡儿帅',
        width: 200,
        height: 200,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
      })
    },
    handleStart () {
      startSpeak(
        '患者：付天英，8病区，泌尿科，12床；手术名称：右-输尿管镜下取石术-(软镜备球囊扩张)；手术医生：方祖军，郑捷，郑捷'
      )
    },
    handlePause () {
      pauseSpeak()
    },
    handleResume () {
      resumeSpeak()
    },
    handleCancel () {
      cancelSpeak()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
