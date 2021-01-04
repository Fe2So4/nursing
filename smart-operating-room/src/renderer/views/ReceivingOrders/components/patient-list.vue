<template>
  <div class="patient-list clearfix">
    <div class="pl-left">
      <span>接送患者</span>
    </div>
    <div class="pl-right">
      <p>
        <span>
          <i
            class="el-icon-female"
            :class="{
              female: ptData.patientGender === '女',
              male: ptData.patientGender === '男'
            }"
          />
          <span class="pt-info">{{ ptData.patientName }}</span>
          <span class="pt-info">{{ ptData.wardName }}</span>
          <span class="pt-info">{{ ptData.deptName }}</span>
          <span class="pt-info">{{ ptData.bedNo }}床</span>
          <span class="pt-info">{{ ptData.hospitalNo }}</span>
        </span>
        <span style="color:#444444;font-weight:bold;">{{ ptData.roomNo }}</span>
      </p>
      <p>{{ ptData.operationName }}</p>
      <p>
        手术医生：<span style="color:#08B147;font-weight:600;">{{
          ptData.surgeon
        }}</span>
      </p>
      <p>
        <span><span>巡回/洗手：</span><span
          style="color:#FF7623;font-weight:600;"
        >{{ ptData.washNurseName }}/{{ ptData.runNurseName }}</span></span><span v-if="ptData.orderState !== '0'">{{ ptData.workerName }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientList',
  props: {
    ptData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.patient-list {
  height: 100%;
  // width: 100%;
  overflow: hidden;
  display: flex;
  .pl-left {
    width: 36px;
    // float: left;
    height: 100%;
    text-align: center;
    background: #3478ff;
    color: #ffffff;
    border-radius: 5px 0px 0px 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      width: 15px;
    }
  }
  .pl-right {
    box-sizing: border-box;
    height: 100%;
    flex: 1 1 auto;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      // width: 100%;
      max-width: 512px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      &:first-child {
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        i {
          &.female {
            color: #ff6687;
          }
          &.male {
            color: #3478ff;
          }
        }
        .pt-info {
          color: #3890f8;
        }
      }
      &:nth-child(2) {
        font-size: 18px;
        color: #444444;
      }
      &:nth-child(3) {
        font-size: 16px;
        color: #929498;
      }
      &:nth-child(4) {
        font-size: 16px;
        color: #929498;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
