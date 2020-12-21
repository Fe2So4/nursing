<template>
  <div class="detail-patient">
    <div class="dp-info-title">
      接送患者详情 {{ selectRow.patientName }} 患者位置 {{ selectRow.deptName }} {{ selectRow.wardName }}\{{ selectRow.bedNo }}\{{ selectRow.hospitalNo }}
    </div>
    <div class="dp-info-basic">
      <el-row>
        <el-col :span="3">
          <span>患者：</span>
          <span class="dp-value">{{ selectRow.patientName }}</span>
        </el-col>
        <el-col :span="3">
          <span>性别：</span>
          <span class="dp-value">{{ selectRow.patientGender | formatGender }}</span>
        </el-col>
        <el-col :span="3">
          <span>年龄：</span>
          <span class="dp-value">{{ selectRow.patientAge }}</span>
        </el-col>
        <el-col :span="3">
          <span>病区：</span>
          <span class="dp-value">{{ selectRow.wardName }}</span>
        </el-col>
        <el-col :span="4">
          <span>住院号：</span>
          <span class="dp-value">{{ selectRow.hospitalNo }}</span>
        </el-col>
        <el-col :span="3">
          <span>科室：</span>
          <span class="dp-value">{{ selectRow.deptName }}</span>
        </el-col>
        <el-col :span="3">
          <span>床位：</span>
          <span class="dp-value">{{ selectRow.bedNo }}</span>
        </el-col>
      </el-row>
      <!-- <p>
        <el-input
          ref="inputs"
          v-model="codeInput"
          :placeholder="optas"
        />
      </p> -->
      <p
        :class="{'code-input':true,'active':codeInputFocus}"
        @click="handleFocus"
      >
        <el-input
          ref="inputs"
          v-model="codeInput"
          :placeholder="optas"
          @blur="handleBlurCodeInput"
        />
        {{ optas }}
      <!-- <el-input
        ref="inputs"
        readonly
        v-model="codeInput"
        type="textarea"
        :placeholder="optas"
      /> -->
      </p>
    </div>
    <div class="dp-info-notice">
      <div
        class="dp-title"
        @click="handleHidden"
      >
        <span>手术通知单</span>
        <span>房间号：{{ selectRow.roomNo }}</span>
        <span>台次：{{ selectRow.sequenceNo }}</span>
        <span>拟手术时间：{{ selectRow.operateDate }}</span>
      </div>
      <div
        class="dp-content clearfix"
        v-show="!hiddenVisible"
      >
        <div class="dp-content-left">
          <div
            class="qrcode"
            ref="qrCodeDiv"
          />
        </div>
        <div class="dp-content-right">
          <el-row>
            <el-col :span="24">
              <span>诊断：</span><span class="dp-value">{{ selectRow.diagnose }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>主刀医师：</span><span class="dp-value">{{ selectRow.surgeon }}</span>
            </el-col>
            <el-col :span="10">
              <span>手术名称：</span><span class="dp-value">{{ selectRow.operationName }}-</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>第一助手：</span><span class="dp-value">{{ selectRow.opaSsisName1 || '-' }}</span>
            </el-col>
            <el-col :span="6">
              <span>第二助手：</span><span class="dp-value">{{ selectRow.opaSsisName2 || '-' }}</span>
            </el-col>
            <el-col :span="6">
              <span>第三助手：</span><span class="dp-value">{{ selectRow.opaSsisName3 || '-' }}</span>
            </el-col>
            <el-col :span="6">
              <span>第四助手：</span><span class="dp-value">{{ selectRow.opaSsisName4 || '-' }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>麻醉医师：</span><span class="dp-value">{{ selectRow.anesDoc }}</span>
            </el-col>
            <el-col :span="6">
              <span>麻醉方式：</span><span class="dp-value">{{ selectRow.anesMethod }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>备注：</span><span class="dp-value">-</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span>化验异常：</span><span class="dp-value">-</span>
            </el-col>
          </el-row>
        </div>
        <p>
          <el-button
            @click="dayin"
            class="el-icon-printer"
          >
            打印
          </el-button>
        </p>
      </div>
    </div>
    <div
      class="dp-info-step"
      v-if="selectRow.orderState === '1'"
    >
      <el-steps
        direction="vertical"
        :space="100"
      >
        <!-- :active="1" -->
        <el-step
          title="手术排班"
        />
        <el-step title="工勤人员接单">
          <template slot="description">
            <div class="time">
              {{ selectRow.specificTime }}
            </div>
            <div v-show="exitType === '1'? true : false">
              <span class="name">{{ selectRow.workerName }}</span>
              <span
                class="cancel"
              >点"取消接单"按钮，再扫码即可取消接单</span>
            </div>
          </template>
        </el-step>
      </el-steps>
      <p>
        <el-button @click="exitJiedan">
          取消接单
        </el-button>
      </p>
    </div>
    <div v-show="false">
      <PrintNotice
        :select-row="selectRow"
      />
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

import Bus from '@/utils/bus.js'
import PrintNotice from './print-notice'
import {changeReceiveOrderList} from '@/api/receiving-orders'
import request from '@/utils/request2'
export default {
  name: 'DetailPatient',
  props: {
    selectRow: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timearr: [0, 0],
      optas: '',
      hiddenVisible: false,
      codeInput: '',
      exitType: '2',
      workCode: '',
      codeInputFocus: true
    }
  },
  filters: {
    formatGender: function (value) {
      if (!value) return ''
      value = value.toString()
      if (value === '1') {
        return '男'
      } else {
        return '女'
      }
    }
  },
  methods: {
    dayin () {
      // selectRow.orderState
      console.log(this.selectRow.orderState)
      if (this.selectRow.orderState === 1 || this.selectRow.orderState === '1') {
        Bus.$emit('detail-patient', this.selectRow)
      } else {
        this.$alert('请先扫描工勤人员二维码进行接单')
        return false
      }
      // return false

      // this.utilsDebounce(() => { this.printCurrent() }, 1000)
    },
    handleFocus () {
      this.codeInputFocus = true
      this.$refs.inputs.focus()
    },
    handleBlurCodeInput () {
      this.codeInputFocus = false
    },
    handleHidden () {
      this.hiddenVisible = !this.hiddenVisible
    },
    bindQRCode () {
      let text = `OpsQRCode=${this.selectRow.cureNo},OpsSchNo=${this.selectRow.operSchNo}`
      // let text = '1010'
      // eslint-disable-next-line no-new
      new QRCode(this.$refs.qrCodeDiv, {
        text: text,
        width: 160,
        height: 160,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
      })
    },

    // 扫描二维码
    enterInput () {
      this.workCode = ''
      if (!this.codeInput.includes('=')) {
        this.$alert('请先扫描工勤人员二维码')
        return false
      }
      if (this.selectRow.orderState === '0') {
        this.workCode = this.codeInput.split('=')[1]

        this.changePatient(1)
      } else {
        if (this.exitType !== '1') {
          this.$alert('请先点击取消接单')
          return false
        }
        this.workCode = this.codeInput.split('=')[1]
        // this.selectRow.workerCode
        // this.workCode

        if (this.selectRow.workerCode !== this.workCode) {
          this.$alert('接单工勤人员与扫描人员工号不符,请确认后重试')
          return false
        }

        this.changePatient(0)
      }
    },
    changePatient (type) {
      request({
        url: changeReceiveOrderList,
        method: 'post',
        data: {
          code: this.workCode,
          orderId: this.selectRow.orderId,
          status: type
        }
      }).then(res => {
        if (res.data.code === 200) {
          // this.openToast('success', res.data.msg)
          // Bus.$emit('shuaxinPatient', '3')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    },
    // 取消接单
    exitJiedan () {
      this.exitType = '1'
      this.changfouce()
    },
    // 自动聚焦
    changfouce () {
      this.$nextTick((x) => { // 正确写法
        this.$refs.inputs.focus()
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.bindQRCode()
    })

    this.changfouce()
    if (this.selectRow.orderState === '1') {
      this.optas = '点击取消接单后，扫描工勤人员二维码，进行退单...'
    } else {
      this.optas = '获取焦点后，扫描工勤人员二维码，进行接单...'
    }
    console.log(this.selectRow)
  },
  watch: {
    'codeInput': function (newVal) {
      if (this.codeInput.length % 2 !== 0) {
        this.timearr[0] = new Date().getTime()
      } else {
        this.timearr[1] = new Date().getTime()
      }
      if (this.codeInput.length > 1 && Math.abs(this.timearr[1] - this.timearr[0]) > 40) {
        this.codeInput = ''
      }
      this.utilsDebounce(() => {
        setTimeout(() => {
          if (this.codeInput !== '') {
            this.enterInput()
          }
        }, 1000)
      }, 1000)
    }
  },
  components: {
    PrintNotice
  }
}
</script>

<style scoped lang="scss">
   .detail-patient{
    font-size:18px;
    color:#92949A;
    height: 100%;
    padding: 0 20px;
    // overflow-y: auto;
    background: #F3F5FA;
    .dp-value{
      color:#444444;
    }
    .dp-info-title{
      position: relative;
      left: -20px;
      width: calc(100% + 40px);
      height: 60px;
      background: linear-gradient(90deg, #666666, #303030);
      line-height: 60px;
      color: #ffffff;
      margin-bottom:20px;
      font-size: 16px;
      text-indent: 20px;
    }
    .dp-info-basic{
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 26, 51, 0.05);
      border-radius: 5px;
      padding:20px 20px 13px;
      p{
        // text-align: center;
        padding-right: 20px;
        text-indent: 10px;
        margin-top: 13px;
        height: 40px;
        background: #FFFFFF;
        font-size: 16px;
        line-height: 40px;
        // border: 1px solid #E4E4E4;
        border-radius: 5px;
      }
       .code-input{
        line-height: 40px;
        position: relative;
        border: 1px solid #E4E4E4;
        height: 40px;
        .el-input{
          position: absolute;
          z-index: -666;
          left: 0;
          top: 0;
        }
        &.active{
          border-color: rgb(64,153,240);
        }
    }
    }
    .dp-info-notice{
      border: 1px solid #E0E0E0;
      border-radius: 5px;
      // padding-bottom: 40px;
      margin:10px 0;
      background: #ffffff;
      .dp-title{
        cursor: pointer;
        padding-left: 10px;
        background: #E0E0E0;
        height: 40px;
        line-height: 40px;
        span{
          display: inline-block;
          color: #444444;
          margin-right: 14px;
          &:first-child{
            font-weight: bold;
          }
        }
      }
      .dp-content{
        padding-left: 20px;
        line-height: 36px;
        padding-bottom: 40px;
        .dp-content-left{
          float: left;
          margin-right: 60px;
          .qrcode{
            margin-top:20px;
          }
        }
        .dp-content-right{
          float: left;
          width: calc(100% - 220px);
          span{
            display: inline-block;
            &:first-child{
              width: 90px;
              text-align: right;
            }
          }
        }
      }
      p{
        text-align: center;
        .el-button{
          width: 114px;
          font-size: 18px;
          background: #E5E5E5;
          border: 1px solid #E5E5E5;
          &:before{
            color:#AAB6CC;
          }
        }
      }
    }
    .dp-info-step{
      background: #ffffff;
      position: relative;
      // height: 200px;
      padding:20px;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      p{
        text-align: center;
        margin-top: 10px;
      }
      .time{
        color:#444444;
        font-size: 18px;
        margin:10px 0;
      }
      .name{
        font-size: 18px;
        color:#444444;
      }
      .cancel{
        font-size: 18px;
        color:#3377FF;
      }
      /deep/ .el-step__title{
        font-size: 18px;
        line-height: 28px;
        &.is-wait{
          color: unset;
        }
      }
      /deep/ .el-step__line{
        top: 25px;
        left: 4px;
        background: #3377FF;
      }
      /deep/ .el-step__icon{
        background: #3377FF;
        width:10px;
        height: 10px;
        border: unset;
        .el-step__icon-inner{
          display: none;
        }
      }
      /deep/ .el-step.is-vertical .el-step__head{
        width: 10px;
      }
      /deep/ .el-button{
        font-size: 18px;
        background: #E5E5E5;
        border: 1px solid #E5E5E5;
      }
    }
  }
</style>
