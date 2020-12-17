<template>
  <div
    class="patient-card"
    :class="patientInfo.operTimeState==='术前'?'op-before':patientInfo.operTimeState==='术后'?'op-after':''"
  >
    <div
      class="pc-title"
      :class="patientInfo.operTimeState==='术前'?'op-before':patientInfo.operTimeState==='术后'?'op-after':''"
    >
      <span>
        <i
          class="line"
          :class="patientInfo.operTimeState==='术前'?'op-before':patientInfo.operTimeState==='术后'?'op-after':''"
        />
        <span :class="[patientInfo.patientGender === '男' ? 'el-icon-male avater' : 'el-icon-female avater']" />
        <!-- el-icon-female -->
        <span>{{ patientInfo.patientName }}</span>
      </span>
      <span>{{ patientInfo.patientAge }}岁</span>
    </div>
    <div class="pc-content">
      <p>
        <span>
          <span>{{ patientInfo.roomNo }}</span>
          <span>{{ patientInfo.deptName }}</span>
        </span>
        <span class="bedId">{{ patientInfo.bedNo }}床</span>
      </p>
      <p>{{ patientInfo.operationName }}</p>
      <p>{{ patientInfo.anesMethod }}</p>
      <p>
        <span>术者：{{ patientInfo.surgeon }}</span>
        <span>
          {{ patientInfo.hospitalNo }}
        </span>
      </p>
      <p>{{ patientInfo.operateDate }}</p>
      <p :class="patientInfo.operTimeState==='术前'?'op-before':patientInfo.operTimeState==='术后'?'op-after':''">
        {{ patientInfo.operTimeState }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientCard',
  data () {
    return {

    }
  },
  props: {
    patientInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .patient-card{
    background: #FFEFEF;
    width: 252px;
    float: left;
    border-radius: 5px;
    margin-right: 10px;
    box-sizing: border-box;
    border:1px solid #FFEFEF;
    &:hover{
      border: 1px solid #FF7B7B;
    }
    cursor: pointer;
    &.op-before{
      background: #EFF5FF;
      border:1px solid #EFF5FF;
    }
    &.op-after{
      background: #E3FCE8;
      border:1px solid #E3FCE8;
    }
    &.op-before:hover{
        border-color: #5595FF;
    }
    &.op-after:hover{
      border-color:#5FD275;
    }
    .pc-title{
      line-height: 40px;
      height: 40px;
      border-bottom:1px solid;
      border-color: #FFD8D8;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 0 5px;
      &.op-before{
        border-color: #D1DEF4;
      }
      &.op-after{
        border-color: #BFE3C7;
      }
      span{
        display: inline-block;
        vertical-align: middle;
        .avater{
          width: 20px;
          height: 20px;
          color: #3377FF;
          &:before{
            height: 100%;
            // font-size: 20px;
            // width: 100%;
          }
        }
        .line{
          display: inline-block;
          width: 4px;
          height: 30px;
          background: #FF7B7B;
          border-radius: 2px;
          vertical-align: middle;
          &.op-before{
            background: #5595FF;
          }
          &.op-after{
            background: #5FD275;
          }
        }
      }
    }
    .pc-content{
      color:#808080;
      padding: 0 10px;
      line-height: 32px;
      font-size: 14px;
      p{
        &:nth-child(1){
          display: flex;
          justify-content: space-between;
          .bedId{
            font-weight: 600;
            color: #333333;
          }
        }
        &:nth-child(2){
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        &:nth-last-child(1){
          text-align: right;
          color: #FF6161;
          font-weight: 600;
          &.op-before{
            color: #5595FF;
          }
          &.op-after{
            color: #5FD275;
          }
        }
        &:nth-last-child(3){
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
