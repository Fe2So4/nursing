<template>
  <div class="transfer-handover">
    <van-nav-bar
      title="手术室接送患者"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="提交"
    >
    </van-nav-bar>
    <div class="patient-card">
      <div class="content">
        <span>{{ patientInfo.patientName }}</span>
        <span>{{ patientInfo.wardName }}病区</span>
        <span>{{ patientInfo.deptName }}</span>
        <span>{{ patientInfo.cureNo }}</span>
      </div>
    </div>
    <div class="list">
      <van-cell-group>
        <van-cell title="接患者" class="cell-title"> </van-cell>
        <van-cell
          title="病房交接"
          :value="step.patForwardingRoomState === '0' ? '[转运交接单]' : step.patForwardingRoomState === '1' ? '[转运交接单]' : ''"
          @click="handleJump(0, '病房交接')"
        >
          <template #right-icon v-if="step.patForwardingRoomState === '2'">
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
        <van-cell
          title="进缓冲区"
          :value="step.pointBufferState === '0' ? '[转运交接单]' : step.pointBufferState === '1' ? '[转运交接单]' : ''"
          @click="handleJump(1, '进缓冲区')"
        >
          <template #right-icon v-if="step.pointBufferState === '2'">
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
        <van-cell
          title="进手术室"
          :value="step.pointInRoomState === '0' ? '[转运交接单]' : step.pointInRoomState === '1' ? '[转运交接单]' : ''"
          @click="handleJump(1, '进手术室')"
        >
          <template #right-icon v-if="step.pointInRoomState === '2'">
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
        <van-cell title="送患者" class="cell-title"> </van-cell>
        <van-cell
          title="出手术室"
          :value="step.pointOutRoomState === '0' ? '[转运交接单]' : step.pointOutRoomState === '1' ? '[转运交接单]' : ''"
          @click="handleJump(1, '出手术室')"
        >
          <template #right-icon v-if="step.pointOutRoomState === '2'">
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
        <van-cell
          title="进PACU"
          :value="step.pointPacuState === '0' ? '[转运交接单]' : step.pointPacuState === '1' ? '[转运交接单]' : ''"
          @click="handleJump(1, '进PACU')"
        >
          <template #right-icon v-if="step.pointPacuState === '2'">
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
        <van-cell
          title="出PACU"
          :value="step.outPacuState === '0' ? '[转运交接单]' : step.outPacuState === '1' ? '[转运交接单]' : ''"
          @click="handleJump(1, '出PACU')"
        >
          <template #right-icon v-if="step.outPacuState === '2'">
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
        <van-cell
          title="病房收治"
          :value="step.patRoomState === '0' ? '[转运交接单]' : step.patRoomState === '1' ? '[转运交接单]' : ''"
          @click="handleJump(2, '病房收治')"
        >
          <template #right-icon v-if="step.patRoomState === '2'">
            <van-icon name="checked" color="#30C76C"></van-icon>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { handoverStep } from '@/api/handover-record'
import { mapState } from 'vuex'
export default {
  name: 'TransferHandover',
  data () {
    return {
      checked: true,
      input: '',
      showFullSkin: false,
      visible: false,
      step: {
        outPacuState: '0',
        patForwardingRoomState: '0',
        patRoomState: '0',
        pointInRoomState: '0',
        pointOutRoomState: '0',
        pointPacuState: '0'
      }
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  components: {},
  created () {
    this.getStep()
  },
  mounted () {},
  methods: {
    onClickLeft () {
      this.$router.push('/patient-home')
    },
    getStep () {
      request({
        url:
          handoverStep +
          `/${this.patientInfo.hospitalNo}/${this.patientInfo.cureNo}/${this.patientInfo.operSchNo}`,
        method: 'get'
      }).then((res) => {
        this.step = res.data.data
      })
    },
    onClickRight () {},
    handleJump (type, title) {
      this.$router.push({ path: 'transfer', query: { type, title } })
    },
    handleChange () {
      this.showFullSkin = !this.showFullSkin
    },
    handleShowSignature () {
      this.visible = true
    },
    handleCloseSignature () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/themes/_handle.scss";
.transfer-handover {
  height: 100%;
  .van-nav-bar {
    height: 100px;
    background: linear-gradient(90deg, #666666, #303030);
    /deep/ .van-nav-bar__title {
      font-size: 34px;
      line-height: 100px;
    }
    /deep/ .van-nav-bar__text {
      font-size: 30px;
    }
    /deep/ .van-icon-arrow-left {
      font-size: 36px;
    }
  }
  .patient-card {
    padding: 15px 20px;
    .content {
      @include background_color("bg_home");
      height: 90px;
      line-height: 90px;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      @include font_color("bg_popup_title");
      font-size: 30px;
      span {
        margin-left: 24px;
      }
    }
  }
  .list {
    height: calc(100% - 220px);
    @include background_color("bg_cell");
    // overflow-y: auto;
  }
  .van-cell {
    line-height: 90px;
    color: #2e2e2e;
    font-size: 30px;
    padding-top: unset;
    padding-bottom: unset;
    &::after {
      border-color: #e2e2e2;
    }
    .first-cell {
      flex: unset;
    }
    .left-title {
      flex: unset;
    }
    .right-value {
      .van-field {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    &.cell-title {
      background: #e8e8e8;
      line-height: 80px;
    }
    .van-cell__value {
      span {
        color: #ff4343;
      }
    }
  }
  .van-cell-group {
    // background: #ffffff;
    &:after {
      border-bottom: unset;
    }
    // &:last-child{
    //   // margin-top: 15px;
    //   margin-bottom: 15px;
    //   .van-cell{
    //     .van-cell__value{
    //       color: #7F7F7F;
    //     }
    //     .sign-title{
    //       color: #32db64;
    //     }
    //   }
    // }
  }
}
</style>
