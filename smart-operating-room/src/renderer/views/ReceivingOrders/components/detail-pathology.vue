<template>
  <div class="detail-pathology">
    <div class="dp-title-top">
      <span>术中冰冻详情 - </span>
      <span class="dp-value">未接单</span>
    </div>
    <el-row>
      <el-col :span="8">
        <span>患者：</span>
        <span class="dp-value">沈云根</span>
      </el-col>
      <el-col :span="8">
        <span>性别：</span>
        <span class="dp-value">女</span>
      </el-col>
      <el-col :span="8">
        <span>年龄：</span>
        <span class="dp-value">67岁</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <span>住院号：</span>
        <span class="dp-value">91008283</span>
      </el-col>
      <el-col :span="8">
        <span>床位：</span>
        <span class="dp-value">26床</span>
      </el-col>
    </el-row>
    <p>
      扫描工勤人员二维码，进行接单...
    </p>
    <div class="dp-info">
      <div
        class="dp-title"
        @click="handleHidden"
      >
        <span>术中冰冻</span>
        <span>房间号：707</span>
      </div>
      <div
        class="dp-content"
        v-show="!hiddenVisible"
      >
        <el-row>
          <el-col><span>位置：</span><span class="dp-value">6号楼手术室806</span></el-col>
        </el-row>
        <el-row>
          <el-col><span>创建时间：</span><span class="dp-value">2020-08-24 09:25</span></el-col>
        </el-row>
        <el-row>
          <el-col><span>固定液：</span><span class="dp-value">-</span></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailPathology',
  data () {
    return {
      hiddenVisible: false
    }
  },
  methods: {
    handleHidden () {
      this.hiddenVisible = !this.hiddenVisible
    }
  }
}
</script>

<style scoped lang="scss">
  .detail-pathology{
    font-size:18px;
    color:#92949A;
    padding: 0 20px;
    .dp-value{
      color:#444444;
    }
    .dp-title-top{
      position: relative;
      width: calc(100% + 40px);
      left: -20px;
      text-indent: 20px;
      line-height: 60px;
      border-bottom:1px solid #E1E1E1;
      margin-bottom:20px;
    }
    p{
      text-align: center;
      height: 40px;
      background: #FFFFFF;
      font-size: 16px;
      line-height: 40px;
      border: 1px solid #E4E4E4;
      border-radius: 5px;
      margin:25px 0;
    }
    .dp-info{
      border: 1px solid #E0E0E0;
      border-radius: 5px;
      .dp-title{
        cursor: pointer;
        padding-left: 10px;
        background: #E0E0E0;
        height: 40px;
        line-height: 40px;
        span{
          display: inline-block;
          color: #444444;
          &:first-child{
            background: #FF617F;
            color: #FFFFFF;
            line-height: 30px;
            border-radius: 5px;
            padding: 0 9px;
            margin-right: 4px;
          }
        }
      }
      .dp-content{
        padding-left: 20px;
        line-height: 36px;
        padding-bottom: 40px;
        span{
          display: inline-block;
          &:first-child{
            width: 90px;
            text-align: right;
          }
        }
      }
    }
  }
</style>
