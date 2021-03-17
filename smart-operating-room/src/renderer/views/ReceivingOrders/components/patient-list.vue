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
              female: ptData.patientGender === '2',
              male: ptData.patientGender === '1'
            }"
          />
          <span class="pt-info">{{ ptData.patientName }}</span>
          <span class="pt-info">{{ ptData.wardName }}</span>
          <span class="pt-info">{{ ptData.deptName }}</span>
          <span class="pt-info">{{ ptData.bedNo }}床</span>
          <span class="pt-info">{{ ptData.hospitalNo }}</span>
        </span>
        <span class="room">{{ ptData.roomNo }}</span>
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
@import '@/styles/themes';
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
      max-width: 461px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      span{
        &.room{
          @include theme-property('color',font_color_value);
        }
      }
      &:first-child {
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        i {
          &.female {
            color: #ff6687 !important;
          }
          &.male {
            color: #3478ff !important;
          }
        }
        .pt-info {
          @include theme-property('color',font_color_order_pt);
        }
      }
      &:nth-child(2) {
        font-size: 18px;
        @include theme-property('color',font_color_value);
      }
      &:nth-child(3) {
        font-size: 16px;
        @include theme-property('color',font_color_secondary);
      }
      &:nth-child(4) {
        font-size: 16px;
        @include theme-property('color',font_color_secondary);
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
