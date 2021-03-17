<template>
  <div class="patient-card clearfix">
    <div class="left">
      <div
        class="card"
        @click="handleChangeRoom"
      >
        {{ currentRoom }}
        <i />
      </div>
    </div>
    <div
      class="right"
      v-if="patientInfo.cureNo"
    >
      <el-row style="text-align:right">
        <el-button
          @click="yanzhen"
          style="margin-right:20px;margin-button:10px"
          size="mini"
          type="danger"
        >
          终止手术
        </el-button>
      </el-row>
      <el-row>
        <el-col :span="8">
          患者信息：<span class="value">
            {{ patientBasicInfo.patientName }}
            {{ patientBasicInfo.patientAge }}岁
            {{ patientBasicInfo.wardName }}/{{ patientBasicInfo.bedNo }}床
            {{ patientBasicInfo.hospitalNo }}</span>
        </el-col>
        <el-col :span="6">
          主刀医师：<span class="value">{{ patientBasicInfo.surgeon }}</span>
        </el-col>
        <el-col :span="6">
          麻醉医师：<span class="value">{{ patientBasicInfo.anesDoc }}</span>
        </el-col>
        <el-col
          :span="4"
          style="text-align: right; padding-right: 20px"
        >
          语音开关：<span class="value">
            <el-switch
              v-model="voiceSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </span>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="8">
          手术信息：<span
            class="value"
          >{{ patientBasicInfo.operationName }}
            {{ patientBasicInfo.anesMethodName }}</span>
        </el-col>
        <el-col :span="6">
          第一助手：<span class="value">{{
            patientBasicInfo.opaSsisName1
          }}</span>
        </el-col>
        <el-col :span="4">
          巡回护士：<span class="value">{{
            patientBasicInfo.runNurseName1
          }}</span>
        </el-col>
        <el-col :span="4">
          洗手护士：<span class="value">{{
            patientBasicInfo.washNurseName1
          }}</span>
        </el-col>
        <el-col
          :span="2"
          style="text-align: right; padding-right: 20px"
        >
          <span
            class="security-voice"
            :class="voiceIcon"
            @click="handleSpeak"
          />
          <span
            class="security-voice el-icon-turn-off-microphone"
            @click="handleStopSpeak"
          />
        </el-col>
      </el-row>
      <div
        class="pc-option"
        @click="handleShowStep"
      >
        <i class="el-icon-bottom" />
      </div>
    </div>
    <change-room
      :room-visible.sync="roomVisible"
      @handleClose="handleClose"
    />
    <el-dialog
      append-to-body
      title="用户身份验证"
      :visible.sync="dialogVisible"
      width="520px"
      top="30vh"
      :before-close="handleCloseShousu"
    >
      <div class="dialog-div">
        <span class="dialog-div-title">手术室用户验证</span>
        <el-form
          class="dialog-div-form"
          ref="form"
          :rules="rules"
          size="mini"
          :model="form"
          label-width="60px"
          hide-required-asterisk
        >
          <el-form-item
            prop="username"
            label="用户名"
          >
            <el-input
              prefix-icon="el-icon-s-custom"
              placeholder="请输入用户名"
              v-model="form.username"
            />
          </el-form-item>
          <el-form-item
            prop="password"
            style="marginTop:20px"
            label="密码"
          >
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="form.password"
              @keydown.native="enter"
              show-password
            />
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-btn">
          <vxe-button
            class="btn"
            size="mini"
            status="my-purple"
            @click="yishilogin"
          >
            验 证
          </vxe-button>
          <vxe-button
            class="btn"
            size="mini mgl30"
            status="my-purple"
            @click="dialogVisible = false"
          >
            取 消
          </vxe-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqcheckSendDoctorScreen } from '@/api/login'
import ChangeRoom from './change-room'
import { mapActions, mapState } from 'vuex'
import request from '@/utils/request2'
import { getPatientInfo, terminateOper } from '@/api/large-screen'
import $bus from '@/utils/busScreen'
import { startSpeak, cancelSpeak } from '@/utils/voiceSpeak'
import { getCurrentRoom } from '@/utils/storage'
export default {
  name: 'PatientCard',
  data () {
    var changeUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    var changePassWord = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: changeUserName, trigger: 'blur' }],
        password: [{ validator: changePassWord, trigger: 'blur' }]
      },

      dialogVisible: false,
      roomVisible: false,
      voice: true,
      interval: null,
      patientBasicInfo: {},
      voiceIcon: 'el-icon-microphone',
      voiceSwitch: true
    }
  },
  components: {
    ChangeRoom
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo', 'currentRoom'])
  },
  created () {
    this.getCurrentRoomFromStorage()
  },
  mounted () {
    this.getPatientInfo()
    $bus.$on('getPatientInfo', this.getPatientInfo)
  },
  beforeDestroy () {
    $bus.$off('getPatientInfo')
    this.interval = null
  },
  methods: {
    ...mapActions('LargeScreen', ['setCurrentRoom']),
    // 终止手术用户验证
    yanzhen () {
      this.form.username = ''
      this.form.password = ''
      this.dialogVisible = true
    },
    enter (e) {
      if (e.keyCode === 13) {
        this.yishilogin()
      }
    },
    yishilogin () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let obj = {
            loginName: this.form.username,
            password: this.form.password
          }
          reqcheckSendDoctorScreen(obj).then(res => {
            if (res.data.code === 200) {
              this.$confirm('此操作将终止该手术, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
              }).then(() => {
                this.stopTerminateOper()
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消终止'
                })
              })
            } else {
              this.openToast('error', '验证医师错误,请重试')
              this.form.username = ''
              this.form.password = ''
            }
            this.dialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    stopTerminateOper () {
      request({
        url: terminateOper + '/' + this.patientInfo.operSchNo + '/' + this.form.username,
        method: 'get'
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '终止成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '终止失败!'
          })
        }
      })
    },
    handleCloseShousu (done) {
      this.dialogVisible = false
      // done()
    },
    handleChangeRoom () {
      // if (!this.currentRoom) {
      this.roomVisible = true
      // }
    },
    handleStopSpeak () {
      cancelSpeak()
    },
    getCurrentRoomFromStorage () {
      let room = getCurrentRoom()
      if (room) {
        this.setCurrentRoom(room)
      }
    },
    getPatientInfo () {
      if (this.patientInfo.cureNo) {
        request({
          url: getPatientInfo,
          method: 'post',
          params: {
            cureNo: this.patientInfo.cureNo,
            operSchNo: this.patientInfo.operSchNo
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.patientBasicInfo = res.data.data
            if (this.voiceSwitch) {
              this.handleSpeak()
            }
            // 大屏启动后10秒刷新一次数据
            this.intervalRefresh()
          }
        })
      }
    },
    handleSpeak () {
      let text = `患者：${this.patientBasicInfo.patientName},${this.patientBasicInfo.patientAge}岁,${this.patientBasicInfo.wardName}病区,${this.patientBasicInfo.bedNo}床,住院号：${this.patientBasicInfo.hospitalNo} 
            手术名称：${this.patientBasicInfo.operationName},麻醉方式：${this.patientBasicInfo.anesMethodName},主刀医师：${this.patientBasicInfo.surgeon},麻醉医师：${this.patientBasicInfo.anesDoc} 
            第一助手：${this.patientBasicInfo.opaSsisName1},洗手护士：${this.patientBasicInfo.washNurseName1},巡回护士：${this.patientBasicInfo.runNurseName1}`
      startSpeak(text)
    },
    intervalRefresh () {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(() => {
        // 有效遗嘱
        $bus.$emit('getMedicalAdvice')
        // 病史摘要
        $bus.$emit('getMedicalHistory')
        // 检查报告
        $bus.$emit('getInspectReport')
        // 检验报告
        $bus.$emit('getTestReport')
        // 术中带药
        $bus.$emit('getMedecial')
        // 抗生素用药
        $bus.$emit('getAntibiotic')
        // 生命体征
        $bus.$emit('getSignData')
        // 术中病理
        $bus.$emit('getPathology')
      }, 10000)
    },
    handleClose () {
      this.roomVisible = false
    },
    handleShowStep () {
      this.$emit('handleShowStep')
    }
    // handleChangeSwitch () {
    //   this.setVoiceSwitch()
    // }
  }
}
</script>

<style scoped lang="scss">
  @import '@/styles/themes';
.patient-card {
  height: 110px;
  position: relative;
  // background: #ffffff;
  @include theme-property('background-color',background_color_primary);
  @include theme-property('box-shadow',box_color_shadow);
  border-radius: 5px;
  display: flex;
  .security-voice {
    // position: absolute;
    // right: 0;
    // top: 0;
    // bottom: 0;
    // margin: auto;
    // line-height: 58px;
    font-size: 20px;
    &::before {
      cursor: pointer;
    }
  }
  .left {
    overflow: hidden;
    text-align: center;
    // float: left;
    .card {
      width: 160px;
      margin: 10px;
      height: 90px;
      @include theme-property('background-color',background_color_card);
      border: 2px solid;
      @include theme-property('border-color',border_color_card);
      border-radius: 10px;
      @include theme-property('color',font_color_primary);
      line-height: 90px;
      font-size: 40px;
      font-weight: bold;
      position: relative;
      cursor: pointer;
      i {
        position: absolute;
        right: 10px;
        bottom: 10px;
        border-bottom: 10px solid;
        @include theme-property('border-bottom-color',background_color_triangle);
        border-left: 10px solid transparent;
      }
    }
  }
  .right {
    // float: left;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include theme-property('color',font_color_secondary);
    .value {
      @include theme-property('color',font_color_value);
    }
    .pc-option {
      position: absolute;
      cursor: pointer;
      right: 10px;
      bottom: -20px;
      height: 20px;
      font-size: 14px;
      background: #ffff;
      width: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      border: 1px solid #91949a;
    }
  }
}
.dialog-div {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .dialog-div-title {
    color: #303133;
    font-weight: 600;
    font-size: 24px;
  }
  .dialog-div-form {
    width: 65%;
    margin-top: 30px;
  }
}
</style>
