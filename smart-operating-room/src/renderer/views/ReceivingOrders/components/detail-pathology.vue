<template>
  <div class="detail-pathology">
    <div class="dp-title-top">
      <span>术中冰冻详情 - </span>
      <span class="dp-value">{{
        selectRow.orderState === '0' ? '未接单' : '进行中'
      }}</span>
    </div>
    <el-row>
      <el-col :span="8">
        <span class="dp-title-span">患者：</span>
        <span class="dp-value">{{ selectRow.patientName }}</span>
      </el-col>
      <el-col :span="8">
        <span class="dp-title-span">性别：</span>
        <span class="dp-value">{{
          selectRow.patientGender | formatGender
        }}</span>
      </el-col>
      <el-col :span="8">
        <span class="dp-title-span">年龄：</span>
        <span class="dp-value">{{ selectRow.patientAge }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <span class="dp-title-span">住院号：</span>
        <span class="dp-value">{{ selectRow.hospitalNo }}</span>
      </el-col>
      <el-col :span="8">
        <span class="dp-title-span">床位：</span>
        <span class="dp-value">{{ selectRow.bedNo }}</span>
      </el-col>
    </el-row>
    <p
      v-if="selectRow.orderState !== '3'"
      :class="{ 'code-input': true, active: codeInputFocus }"
      @click="handleFocus"
    >
      <el-input
        type="password"
        ref="inputs"
        @keyup.enter.native="enterInput"
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
    <div class="dp-info">
      <div
        class="dp-title"
        @click="handleHidden"
      >
        <span>术中冰冻</span>
        <span>房间号：{{ selectRow.roomNo }}</span>
      </div>
      <div
        class="dp-content"
        v-show="!hiddenVisible"
      >
        <el-row>
          <el-col>
            <span>位置：</span><span
              class="dp-value"
            >{{ selectRow.floor }}号楼手术室{{ selectRow.roomNo }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>创建时间：</span><span class="dp-value">{{ selectRow.creatTime }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>固定液：</span><span class="dp-value">{{ selectRow.fixed }}</span>
          </el-col>
        </el-row>
        <p
          v-if="selectRow.orderState === '1' || selectRow.orderState === 1 || selectRow.orderState === '3'"
        >
          <el-button
            @click="gotoThree"
            class="el-icon-printer"
          >
            打印
          </el-button>
        </p>
      </div>
    </div>
    <div
      class="dp-info-step"
      v-if="selectRow.orderState === '1' || selectRow.orderState === 1"
    >
      <el-steps
        direction="vertical"
        :space="100"
      >
        <!-- :active="1" -->
        <el-step title="开单申请">
          <template slot="description">
            <div class="time">
              {{ selectRow.orderApplyTime }}
            </div>
            <div>
              {{ selectRow.checkName === '' ? '-' : selectRow.checkName }}
            </div>
          </template>
        </el-step>
        <el-step title="工勤人员接单">
          <template slot="description">
            <div class="time">
              {{ selectRow.specificTime }}
            </div>
            <div v-show="exitType === '1' ? true : false">
              <span class="name">{{ selectRow.workerName }}</span>
              <span class="cancel">点"取消接单"按钮，再扫码即可取消接单</span>
            </div>
          </template>
        </el-step>
      </el-steps>
      <p style="border:none">
        <el-button @click="exitJiedan">
          取消接单
        </el-button>
      </p>
    </div>
  </div>
</template>

<script>
import { changeReceiveOrderList } from '@/api/receiving-orders'
import request from '@/utils/request2'
// import Bus from '@/utils/bus.js'
export default {
  name: 'DetailPathology',
  props: {
    selectRow: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      startTime: 0,
      endTime: 0,
      timearr: [0, 0],
      optas: '',
      codeInput: '',
      hiddenVisible: false,
      exitType: '2',
      codeInputFocus: true
    }
  },
  methods: {
    handleHidden () {
      this.hiddenVisible = !this.hiddenVisible
    },
    handleFocus () {
      this.codeInputFocus = true
      this.$refs.inputs.focus()
    },
    handleBlurCodeInput () {
      this.codeInputFocus = false
    },
    gotoThree () {
      // 打印时打开第三方页面
      const {
        orderId
      } = this.selectRow
      if (+this.selectRow.orderState === 1 && orderId) {
        const url = `http://128.0.16.55:8009/Inspection/PrintSpecimenByPidxNew?type=worker&pid=${orderId}`
        this.$electron.shell.openExternal(url)
      } else {
        this.$alert('请先扫描工勤人员二维码进行接单')
      }
    },
    // 取消接单
    exitJiedan () {
      this.exitType = '1'
      this.changfouce()
    },
    // 扫描二维码
    enterInput () {
      this.workCode = ''
      if (!this.codeInput.includes('=')) {
        this.$alert('请先扫描工勤人员二维码')
        this.codeInput = ''
        return false
      }
      if (this.selectRow.orderState === '0') {
        this.startTime = new Date().getTime()
        this.workCode = this.codeInput.split('=')[1]

        this.changePatient(1)
      } else {
        this.workCode = this.codeInput.split('=')[1]
        if (this.selectRow.workerCode !== this.workCode) {
          this.$alert('接单工勤人员与扫描人员工号不符,请确认后重试')
          this.codeInput = ''
          return false
        }
        if (this.exitType !== '1') {
          this.endTime = new Date().getTime()
          if (this.endTime - this.startTime < 5000) {
            this.openToast('warning', '接单与入缓冲区时间间隔小于5秒,请重试')
            return false
          } else {
            this.changePatient(3)
          }
          return false
        }

        this.changePatient(0)
      }
    },
    changePatient (type) {
      this.codeInput = ''
      request({
        url: changeReceiveOrderList,
        method: 'post',
        data: {
          code: this.workCode,
          orderId: this.selectRow.orderId,
          status: type
        }
      }).then(res => {
        // Bus.$emit('shuaxinPatient', '3')
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
    // 自动聚焦
    changfouce () {
      this.$nextTick(x => {
        // 正确写法
        this.codeInputFocus = true
        this.$refs.inputs.focus()
      })
    }
  },
  mounted () {
    this.changfouce()
    if (this.selectRow.orderState === '1') {
      this.optas = '点击取消接单后，扫描工勤人员二维码，进行退单...'
    } else {
      this.optas = '扫描工勤人员二维码，进行接单...'
    }
  },
  // watch: {
  //   codeInput: function (newVal) {
  //     if (this.codeInput.length % 2 !== 0) {
  //       this.timearr[0] = new Date().getTime()
  //     } else {
  //       this.timearr[1] = new Date().getTime()
  //     }
  //     if (
  //       this.codeInput.length > 1 &&
  //       Math.abs(this.timearr[1] - this.timearr[0]) > 40
  //     ) {
  //       this.codeInput = ''
  //     }
  //     this.utilsDebounce(() => {
  //       setTimeout(() => {
  //         if (this.codeInput !== '') {
  //           this.enterInput()
  //         }
  //       }, 1000)
  //     }, 1000)
  //   }
  // },
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
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/themes';
.detail-pathology {
  font-size: 18px;
  color: #92949a;
  padding: 0 20px;
  @include theme-property('background-color',background_color_receive);
  .dp-value {
    @include theme-property('color',font_color_value);
  }
  .dp-title-span{
    @include theme-property('color',font_color_secondary);
  }
  .dp-title-top {
    position: relative;
    width: calc(100% + 40px);
    left: -20px;
    text-indent: 20px;
    line-height: 60px;
    border-bottom: 1px solid;
    @include theme-property('border-color',border_color_drawer);
    margin-bottom: 20px;
  }
  p {
    text-align: center;
    // height: 40px;
    background: #ffffff;
    font-size: 16px;
    border-radius: 5px;
    margin: 25px 0;
  }
  .code-input {
    @include theme-property('background-color',background_color_input);
    line-height: 40px;
    position: relative;
    border: 1px solid;
    @include theme-property('border-color',border_color_input);
    height: 40px;
    .el-input {
      position: absolute;
      z-index: -666;
      left: 0;
      top: 0;
    }
    &.active {
      border-color: rgb(64, 153, 240) !important;
    }
  }
  .dp-info {
    border: 1px solid;
    border-radius: 5px;
    @include theme-property('border-color',border_color_drawer);
    @include theme-property('background-color',background_color_dp_info);
    .dp-title {
      cursor: pointer;
      padding-left: 10px;
      background: #e0e0e0;
      height: 40px;
      line-height: 40px;
      span {
        display: inline-block;
        color: #444444;
        &:first-child {
          background: #ff617f;
          color: #ffffff;
          line-height: 30px;
          border-radius: 5px;
          padding: 0 9px;
          margin-right: 4px;
        }
      }
    }
    .dp-content {
      padding-left: 20px;
      line-height: 36px;
      padding-bottom: 40px;
      span {
        display: inline-block;
        &:first-child {
          width: 90px;
          text-align: right;
        }
      }
      p {
        margin-bottom: unset;
        border: unset;
        // position: relative;
        .el-button {
          width: 114px;
          font-size: 18px;
          background: #e5e5e5;
          border: 1px solid #e5e5e5;
          &:before {
            color: #aab6cc;
          }
        }
      }
    }
  }
}

.dp-info-step {
  background: #ffffff;
  position: relative;
  // height: 200px;
  padding: 20px;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  p {
    text-align: center;
    margin-top: 10px;
  }
  .time {
    color: #444444;
    font-size: 18px;
    margin: 10px 0;
  }
  .name {
    font-size: 18px;
    color: #444444;
  }
  .cancel {
    font-size: 18px;
    color: #3377ff;
  }
  /deep/ .el-step__title {
    font-size: 18px;
    line-height: 28px;
    &.is-wait {
      color: unset;
    }
  }
  /deep/ .el-step__line {
    top: 25px;
    left: 4px;
    background: #3377ff;
  }
  /deep/ .el-step__icon {
    background: #3377ff;
    width: 10px;
    height: 10px;
    border: unset;
    .el-step__icon-inner {
      display: none;
    }
  }
  /deep/ .el-step.is-vertical .el-step__head {
    width: 10px;
  }
  /deep/ .el-button {
    font-size: 18px;
    background: #e5e5e5;
    border: 1px solid #e5e5e5;
  }
}
</style>
