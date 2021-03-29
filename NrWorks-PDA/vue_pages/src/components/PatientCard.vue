<template>
  <div class="patient-card">
    <div :class="{'content':true,'radius':radius}">
      <div class="left">
        <span>{{ patientInfo.roomNo }}</span>
      </div>
      <div class="right">
        <p>
          <span>{{ patientInfo.patientName }}</span
          ><span>{{ patientInfo.bedNo }}床</span
          ><span>{{ patientInfo.hospitalNo }}</span>
        </p>
        <p>
          主刀/麻醉<span class="patient-value"
            >{{ patientInfo.surgeon }}/{{ patientInfo.anesDoc }}</span
          >
        </p>
        <p>
          巡回/洗手<span class="patient-value"
            >{{
              patientInfo.runNurseName === "" ? "-" : patientInfo.runNurseName
            }}/{{
              patientInfo.washNurseName === "" ? "-" : patientInfo.washNurseName
            }}</span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // patient: {}
    }
  },
  props: {
    radius: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('Patient', ['patientInfo'])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "@/themes/_handle.scss";
.patient-card {
  padding: 15px 20px;
  .content {
    @include background_color("bg_home");
    display: flex;
    height: 194px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px 10px 0 0;
    box-sizing: border-box;
    overflow: hidden;
    &.radius{
      border-radius: 10px;
    }
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 140px;
        height: 80px;
        @include background_color("bg_room");
        box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
        border-radius: 0px 40px 40px 0px;
        line-height: 80px;
        text-align: center;
        font-size: 42px;
        font-weight: bold;
        color: #ffffff;
      }
    }
    .right {
      flex: 1;
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        font-size: 26px;
        @include font_color("bg_popup_option");
        .patient-value {
          @include font_color("bg_popup_title");
        }
        &:nth-child(1) {
          font-size: 30px;
          @include font_color("bg_popup_title");
          span {
            margin-right: 60px;
          }
        }
        &:nth-child(2) {
          margin: 30px 0;
          span {
            margin-left: 60px;
            &:first-child {
              margin-right: 30px;
            }
          }
        }
        &:nth-child(3) {
          span {
            margin-left: 60px;
          }
        }
      }
    }
  }
  .operation-info {
    @include background_color("bg_home");
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 184px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 10px 10px;
    box-sizing: border-box;
    padding-left: 32px;
    &.radius{
      border-radius: 10px;
    }
    p {
      // text-indent: 32px;
      font-size: 30px;
      &:first-child {
        display: flex;
        span {
          flex: 1;
        }
      }
      &:nth-child(2) {
        margin: 20px 0;
      }
      .label {
        color: #7f7f7f;
        display: inline-block;
        text-align: left;
        // text-indent: unset !important;
        width: 140px;
      }
      .value {
        color: #2e2e2e;
      }
    }
  }
}
</style>
