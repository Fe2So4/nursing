<template>
  <div class="pathology-list">
    <div class="pl-left">
      <span>术</span>
      <span>中</span>
      <span>病</span>
      <span>理</span>
      <i>(冰冻)</i>
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
          <span class="pt-info">{{ ptData.bedNo }}床</span>
        </span>
        <span style="color:#444444;font-weight:bold;">{{ ptData.roomNo }}</span>
      </p>
      <p>
        <span
          class="pt-info"
        >{{ ptData.floor }}号楼手术室{{ ptData.roomNo }}</span>
      </p>
      <p>
        <span
          v-if="ptData.orderState === '1' || ptData.orderState === '2'"
        >工勤人员：{{ ptData.workerName }}</span>
      </p>
      <p v-if="ptData.orderState === '1'">
        <span>接单时间：{{ ptData.updateTime }}</span>
      </p>
      <div
        v-if="ptData.orderState === '2'"
        style="font-size: 12px"
      >
        <div>
          <span style="color:#929498">接单时间：{{ ptData.updateTime }}</span>
        </div>
        <div>
          <span style="color:#929498">到达时间：{{ ptData.endTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PathologyList',
  data () {
    return {}
  },
  props: {
    ptData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.pathology-list {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  .pl-left {
    width: 36px;
    // float: left;
    height: 100%;
    text-align: center;
    background: #ff617f;
    color: #ffffff;
    border-radius: 5px 0px 0px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 8px 0;
    span {
      width: 15px;
      display: block;
      line-height: 16px;
      font-size: 16px;
      font-weight: 600;
    }
    i {
      font-size: 12px;
      font-style: normal;
      display: block;
      line-height: 12px;
      font-weight: 600;
    }
  }
  .pl-right {
    box-sizing: border-box;
    height: 100%;
    // float: left;
    flex: 1;
    overflow: hidden;
    // width: calc(100% - 36px);
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    i {
      &.female {
        color: #ff6687;
      }
      &.male {
        color: #3478ff;
      }
    }
    p {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .pt-info {
        color: #3890f8;
      }
      &:first-child {
        font-size: 18px;
        display: flex;
        justify-content: space-between;
      }
      &:nth-child(2) {
        font-size: 18px;
        color: #444444;
        display: flex;
        justify-content: space-between;
        span {
          &:last-child {
            color: #3478ff;
            font-size: 16px;
          }
        }
      }
      &:nth-child(3) {
        font-size: 16px;
        color: #929498;
        // text-align: right;
        display: flex;
        justify-content: space-between;
      }
      &:nth-child(4) {
        // text-align: right;
        font-size: 16px;
        color: #929498;
      }
    }
  }
}</style
>>
