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
      <el-row>
        <el-col :span="8">
          患者信息：<span class="value">{{ patientBasicInfo.patientName }} {{ patientBasicInfo.patientAge }}岁 {{ patientBasicInfo.wardName }}病区/{{ patientBasicInfo.bedNo }}床 {{ patientBasicInfo.hospitalNo }}</span>
        </el-col>
        <el-col :span="6">
          主刀医师：<span class="value">{{ patientBasicInfo.surgeon }}</span>
        </el-col>
        <el-col :span="6">
          麻醉医师：<span class="value">{{ patientBasicInfo.anes_doc }}</span>
        </el-col>
        <el-col
          :span="4"
          style="text-align:right;padding-right:20px;"
        >
          语音开关：<span class="value">
            <el-switch
              v-model="voiceSwitch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleChangeSwitch"
            />
          </span>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col :span="8">
          手术信息：<span class="value">{{ patientBasicInfo.operationName }} {{ patientInfo.anesMethodName }}</span>
        </el-col>
        <el-col :span="6">
          第一助手：<span class="value">{{ patientBasicInfo.opa_ssis_name1 }}</span>
        </el-col>
        <el-col :span="4">
          巡回护士：<span class="value">{{ patientBasicInfo.run_nurse_name1 }}</span>
        </el-col>
        <el-col :span="4">
          洗手护士：<span class="value">{{ patientBasicInfo.wash_nurse_name1 }}</span>
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
      :room-visible="roomVisible"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import ChangeRoom from './change-room'
import { mapActions, mapState } from 'vuex'
import request from '@/utils/request'
import {getPatientInfo} from '@/api/large-screen'
import $bus from '@/utils/busScreen'
export default {
  name: 'PatientCard',
  data () {
    return {
      roomVisible: false,
      voice: true,
      patientBasicInfo: {}
    }
  },
  components: {
    ChangeRoom
  },
  computed: {
    ...mapState('LargeScreen', ['voiceSwitch', 'patientInfo', 'currentRoom'])
  },
  mounted () {
    this.getPatientInfo()
    $bus.$on('getPatientInfo', this.getPatientInfo)
  },
  beforeDestroy () {
    $bus.$off('getPatientInfo')
  },
  methods: {
    ...mapActions('LargeScreen', ['setVoiceSwitch']),
    handleChangeRoom () {
      this.roomVisible = true
    },
    getPatientInfo () {
      if (this.patientInfo.cureNo) {
        request({
          url: getPatientInfo,
          method: 'post',
          params: {
            cureNo: this.patientInfo.cureNo
          }
        }).then(res => {
          this.patientBasicInfo = res.data.data
        })
      }
    },
    handleClose () {
      this.roomVisible = false
    },
    handleShowStep () {
      this.$emit('handleShowStep')
    },
    handleChangeSwitch () {
      this.setVoiceSwitch()
    }
  }
}
</script>

<style scoped lang="scss">
  .patient-card{
    height: 110px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    display: flex;
    .left{
      overflow:hidden;
      text-align: center;
      // float: left;
      .card{
        width: 160px;
        margin:10px;
        height: 90px;
        background: #E9EDF7;
        border: 2px solid #CDD7F1;
        border-radius: 10px;
        color: #3377FF;
        line-height: 90px;
        font-size: 40px;
        font-weight: bold;
        position: relative;
        cursor: pointer;
        i{
          position: absolute;
          right: 10px;
          bottom: 10px;
          border-bottom: 10px solid #7F99BC;
          border-left: 10px solid transparent;
        }
      }
    }
    .right{
      // float: left;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #91949A;
      .value{
        color:#444444;
      }
      .pc-option{
        position: absolute;
        cursor: pointer;
        right: 10px;
        bottom: -10px;
        height: 20px;
        font-size: 14px;
        background: #ffff;
        width: 20px;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        border:1px solid #91949a;
      }
    }
  }
</style>
