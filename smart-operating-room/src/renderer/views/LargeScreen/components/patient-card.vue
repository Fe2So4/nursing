<template>
  <div class="patient-card clearfix">
    <div class="left">
      <div class="card" @click="handleChangeRoom">
        {{ currentRoom }}
        <i />
      </div>
    </div>
    <div class="right" v-if="patientInfo.cureNo">
      <el-row>
        <el-col :span="8">
          患者信息：<span class="value">
            {{ patientBasicInfo.patientName }}
            {{ patientBasicInfo.patientAge }}岁
            {{ patientBasicInfo.wardName }}/{{ patientBasicInfo.bedNo }}床
            {{ patientBasicInfo.hospitalNo }}</span
          >
        </el-col>
        <el-col :span="6">
          主刀医师：<span class="value">{{ patientBasicInfo.surgeon }}</span>
        </el-col>
        <el-col :span="6">
          麻醉医师：<span class="value">{{ patientBasicInfo.anesDoc }}</span>
        </el-col>
        <el-col :span="4" style="text-align: right; padding-right: 20px">
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
          手术信息：<span class="value"
            >{{ patientBasicInfo.operationName }}
            {{ patientBasicInfo.anesMethodName }}</span
          >
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
        <el-col :span="2" style="text-align: right; padding-right: 20px">
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
      <div class="pc-option" @click="handleShowStep">
        <i class="el-icon-bottom" />
      </div>
    </div>
    <change-room :room-visible="roomVisible" @handleClose="handleClose" />
  </div>
</template>

<script>
import ChangeRoom from "./change-room";
import { mapActions, mapState } from "vuex";
import request from "@/utils/request2";
import { getPatientInfo } from "@/api/large-screen";
import $bus from "@/utils/busScreen";
import { startSpeak, cancelSpeak } from "@/utils/voiceSpeak";
import { getCurrentRoom } from "@/utils/storage";
export default {
  name: "PatientCard",
  data() {
    return {
      roomVisible: false,
      voice: true,
      interval: null,
      patientBasicInfo: {},
      voiceIcon: "el-icon-microphone",
      voiceSwitch: true,
    };
  },
  components: {
    ChangeRoom,
  },
  computed: {
    ...mapState("LargeScreen", ["patientInfo", "currentRoom"]),
  },
  created() {
    this.getCurrentRoomFromStorage();
  },
  mounted() {
    this.getPatientInfo();
    $bus.$on("getPatientInfo", this.getPatientInfo);
  },
  beforeDestroy() {
    $bus.$off("getPatientInfo");
    this.interval = null;
  },
  methods: {
    ...mapActions("LargeScreen", ["setCurrentRoom"]),
    handleChangeRoom() {
      // if (!this.currentRoom) {
      this.roomVisible = true;
      // }
    },
    handleStopSpeak() {
      cancelSpeak();
    },
    getCurrentRoomFromStorage() {
      let room = getCurrentRoom();
      if (room) {
        this.setCurrentRoom(room);
      }
    },
    getPatientInfo() {
      if (this.patientInfo.cureNo) {
        request({
          url: getPatientInfo,
          method: "post",
          params: {
            cureNo: this.patientInfo.cureNo,
          },
        }).then((res) => {
          if (res.data.code === 200) {
            this.patientBasicInfo = res.data.data;
            if (this.voiceSwitch) {
              this.handleSpeak();
            }
            // 大屏启动后10秒刷新一次数据
            this.intervalRefresh();
          }
        });
      }
    },
    handleSpeak() {
      let text = `患者：${this.patientBasicInfo.patientName},${this.patientBasicInfo.patientAge}岁,${this.patientBasicInfo.wardName}病区,${this.patientBasicInfo.bedNo}床,住院号：${this.patientBasicInfo.hospitalNo} 
            手术名称：${this.patientBasicInfo.operationName},麻醉方式：${this.patientBasicInfo.anesMethodName},主刀医师：${this.patientBasicInfo.surgeon},麻醉医师：${this.patientBasicInfo.anesDoc} 
            第一助手：${this.patientBasicInfo.opaSsisName1},洗手护士：${this.patientBasicInfo.washNurseName1},巡回护士：${this.patientBasicInfo.runNurseName1}`;
      startSpeak(text);
    },
    intervalRefresh() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        // 有效遗嘱
        $bus.$emit("getMedicalAdvice");
        // 病史摘要
        $bus.$emit("getMedicalHistory");
        // 检查报告
        $bus.$emit("getInspectReport");
        // 检验报告
        $bus.$emit("getTestReport");
        // 术中带药
        $bus.$emit("getMedecial");
        // 抗生素用药
        $bus.$emit("getAntibiotic");
        // 生命体征
        $bus.$emit("getSignData");
        // 术中病理
        $bus.$emit("getPathology");
      }, 10000);
    },
    handleClose() {
      this.roomVisible = false;
    },
    handleShowStep() {
      this.$emit("handleShowStep");
    },
    // handleChangeSwitch () {
    //   this.setVoiceSwitch()
    // }
  },
};
</script>

<style scoped lang="scss">
.patient-card {
  height: 110px;
  position: relative;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
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
      background: #e9edf7;
      border: 2px solid #cdd7f1;
      border-radius: 10px;
      color: #3377ff;
      line-height: 90px;
      font-size: 40px;
      font-weight: bold;
      position: relative;
      cursor: pointer;
      i {
        position: absolute;
        right: 10px;
        bottom: 10px;
        border-bottom: 10px solid #7f99bc;
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
    color: #91949a;
    .value {
      color: #444444;
    }
    .pc-option {
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
      border: 1px solid #91949a;
    }
  }
}
</style>
