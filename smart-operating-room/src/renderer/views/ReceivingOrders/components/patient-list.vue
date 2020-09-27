<template>
  <div class="patient-list clearfix">
    <div class="pl-left"><span>接送患者</span></div>
    <div class="pl-right">
      <p>
        <span>
          <i class="el-icon-female" :class="{'female':ptData.gender==='女','male':ptData.gender==='男'}"></i>
          <span class="pt-info">{{ptData.name}}</span>
          <span class="pt-info">{{ptData.area}}</span>
          <span class="pt-info">{{ptData.dept}}</span>
          <span class="pt-info">{{ptData.bed}}</span>
          <span class="pt-info">{{ptData.id}}</span>
        </span>
        <span style="color:#444444;font-weight:bold;">{{ptData.room}}</span>
      </p>
      <p>{{ptData.opeName}}</p>
      <p>手术医生：<span style="color:#08B147;">{{ptData.opeDoc}}</span></p>
      <p>巡回/洗手：<span style="color:#FF7623;">{{ptData.nurse}}</span></p>
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
  .patient-list{
    height: 100%;
    // display: flex;
    .pl-left{
      width: 36px;
      float: left;
      height: 100%;
      text-align: center;
      background: #3478FF;
      color: #ffffff;
      border-radius: 5px 0px 0px 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span{
        width: 15px;
      }
    }
    .pl-right{
      box-sizing: border-box;
      height: 100%;
      float: left;
      width: calc(100% - 36px);
      padding:5px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      p{
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:first-child{
          font-size: 18px;
          display: flex;
          justify-content: space-between;
          i{
            &.female{
              color:#FF6687
            }
            &.male{
              color:#3478FF;
            }
          }
          .pt-info{
            color:#3890F8;
          }
        }
        &:nth-child(2){
          font-size: 18px;
          color: #444444;
        }
        &:nth-child(3){
          font-size: 16px;
          color:#929498;
        }
        &:nth-child(4){
          font-size: 16px;
          color:#929498;
        }
      }
    }
  }
</style>