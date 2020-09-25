<template>
  <div class="pathology-list">
    <div class="pl-left"><span>术中病理</span></div>
    <div class="pl-right">
      <p>
        <span>
          <i class="el-icon-female" :class="{'female':ptData.gender==='女','male':ptData.gender==='男'}"></i>
          <span class="pt-info">{{ptData.name}}</span>
          <span class="pt-info">{{ptData.gender}}</span>
          <span class="pt-info">{{ptData.bed}}</span>
        </span>
        <span style="color:#444444;font-weight:bold;">{{ptData.room}}</span>
      </p>
      <p><span class="pt-info">{{ptData.locate}}</span><span>{{ptData.opeDoc}}</span></p>
      <p>接单时间：{{ptData.time1}}</p>
      <p>到达时间：{{ptData.time2}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'PathologyList',
  data(){
    return{

    }
  },
  props:{
    ptData:{
      type:Object,
      required:true
    }
  }
}
</script>

<style lang="scss" scoped>
 .pathology-list{
    height: 100%;
    // display: flex;
    .pl-left{
      width: 36px;
      float: left;
      height: 100%;
      text-align: center;
      background: #FF617F;
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
      i{
        &.female{
          color:#FF6687
        }
        &.male{
          color:#3478FF;
        }
      }
      p{
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .pt-info{
          color:#3890F8;
        }
        &:first-child{
          font-size: 18px;
          display: flex;
          justify-content: space-between;
        }
        &:nth-child(2){
          font-size: 18px;
          color: #444444;
          display: flex;
          justify-content: space-between;
          span{
            &:last-child{
              color:#3478FF;
              font-size: 16px;
            }
          }
        }
        &:nth-child(3){
          font-size: 16px;
          color:#929498;
          text-align: right;
        }
        &:nth-child(4){
          text-align: right;
          font-size: 16px;
          color:#929498;
        }
      }
    }
  }
</style>>
