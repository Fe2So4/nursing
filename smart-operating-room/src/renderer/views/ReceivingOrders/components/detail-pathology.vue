<template>
  <div class="detail-pathology">
    <div class="dp-title-top">
      <span>术中冰冻详情 - </span>
      <span class="dp-value">{{ selectRow.orderState === '0' ? '未接单' : '进行中' }}</span>
    </div>
    <el-row>
      <el-col :span="8">
        <span>患者：</span>
        <span class="dp-value">{{ selectRow.patientName }}</span>
      </el-col>
      <el-col :span="8">
        <span>性别：</span>
        <span class="dp-value">{{ selectRow.patientGender | formatGender }}</span>
      </el-col>
      <el-col :span="8">
        <span>年龄：</span>
        <span class="dp-value">{{ selectRow.patientAge }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <span>住院号：</span>
        <span class="dp-value">{{ selectRow.hospitalNo }}</span>
      </el-col>
      <el-col :span="8">
        <span>床位：</span>
        <span class="dp-value">{{ selectRow.bedNo }}</span>
      </el-col>
    </el-row>
    <p>
      <el-input
        ref="inputs"
        v-model="codeInput"
        :placeholder="optas"
      />
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
          <el-col><span>位置：</span><span class="dp-value">{{ selectRow.floor }}号楼手术室{{ selectRow.roomNo }}</span></el-col>
        </el-row>
        <el-row>
          <el-col><span>创建时间：</span><span class="dp-value">{{ selectRow.creatTime }}</span></el-col>
        </el-row>
        <el-row>
          <el-col><span>固定液：</span><span class="dp-value">{{ selectRow.fixed }}</span></el-col>
        </el-row>
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
          title="开单申请"
        >
          <template slot="description">
            <div class="time">
              {{ selectRow.orderApplyTime }}
            </div>
            <div>{{ selectRow.checkName === '' ? '-': selectRow.checkName }}</div>
          </template>
        </el-step>
        <el-step title="工勤人员接单">
          <template slot="description">
            <div class="time">
              {{ selectRow.specificTime }}
            </div>
            <div v-show="exitType === '1'? true : false">
              <span class="name">{{ selectRow.workerName }}</span>
              <span class="cancel">点"取消接单"按钮，再扫码即可取消接单</span>
            </div>
          </template>
        </el-step>
      </el-steps>
      <p
        style="border:none"
      >
        <el-button @click="exitJiedan">
          取消接单
        </el-button>
      </p>
    </div>
  </div>
</template>

<script>
import {changeReceiveOrderList} from '@/api/receiving-orders'
import request from '@/utils/request'
import Bus from '@/utils/bus.js'
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
      timearr: [0, 0],
      optas: '',
      codeInput: '',
      hiddenVisible: false,
      exitType: '2'
    }
  },
  methods: {
    handleHidden () {
      this.hiddenVisible = !this.hiddenVisible
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
        console.log(this.selectRow.workerCode, this.workCode)
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
        Bus.$emit('shuaxinPatient', '3')
      })
    },
    // 自动聚焦
    changfouce () {
      this.$nextTick((x) => { // 正确写法
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
  .detail-pathology{
    font-size:18px;
    color:#92949A;
    padding: 0 20px;
    .dp-value{
      color:#444444;
    }
    .dp-title-top{
      position: relative;
      width: calc(100% + 40px);
      left: -20px;
      text-indent: 20px;
      line-height: 60px;
      border-bottom:1px solid #E1E1E1;
      margin-bottom:20px;
    }
    p{
      text-align: center;
      height: 40px;
      background: #FFFFFF;
      font-size: 16px;
      line-height: 40px;
      border: 1px solid #E4E4E4;
      border-radius: 5px;
      margin:25px 0;
    }
    .dp-info{
      border: 1px solid #E0E0E0;
      border-radius: 5px;
      .dp-title{
        cursor: pointer;
        padding-left: 10px;
        background: #E0E0E0;
        height: 40px;
        line-height: 40px;
        span{
          display: inline-block;
          color: #444444;
          &:first-child{
            background: #FF617F;
            color: #FFFFFF;
            line-height: 30px;
            border-radius: 5px;
            padding: 0 9px;
            margin-right: 4px;
          }
        }
      }
      .dp-content{
        padding-left: 20px;
        line-height: 36px;
        padding-bottom: 40px;
        span{
          display: inline-block;
          &:first-child{
            width: 90px;
            text-align: right;
          }
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
</style>
