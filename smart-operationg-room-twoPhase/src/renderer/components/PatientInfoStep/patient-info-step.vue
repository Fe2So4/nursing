<template>
  <div class="patient-info-step">
    <div class="pt-info">
      <div class="pt-info-left">
        3号楼05室
      </div>
      <div class="pt-info-right">
        <el-row>
          <el-col :span="4">
            <span class="label">患者：</span>
            <span>撸啊死    女    74岁</span>
            <!-- 四个空格 -->
          </el-col>
          <el-col :span="12">
            <span>
              <span
                class="label"
                style="width:110px;"
              >住院/门诊号：</span>
              <span>656821 妇科 1050n</span>
            </span>
          </el-col>
          <el-col :span="4">
            <span class="label">急诊择期：</span>
            <span>择期 自费</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="label">日期：</span>
            <span style="color:#F83838;">2020-09-28</span>
            <!-- 四个空格 -->
          </el-col>
          <el-col :span="20">
            <span>
              <span
                class="label"
                style="width:110px;"
              >已行：</span>
              <span>改良子宫根治性切除术+双附件切除术+大网膜切除术+复杂肠粘连松解术+盆腔肿块切除术（女性...</span>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="label">术者：</span>
            <span>杨杰</span>
            <!-- 四个空格 -->
          </el-col>
          <el-col :span="6">
            <span>
              <span
                class="label"
                style="width:110px;"
              >洗手护士：</span>
              <span>朱敏</span>
            </span>
          </el-col>
          <el-col :span="6">
            <span>
              <span class="label">巡回护士：</span>
              <span>朱敏</span>
            </span>
          </el-col>
          <el-col :span="4">
            <span class="label">麻醉医师：</span>
            <span>方怡交</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="pt-step">
      <el-steps
        :active="2"
        align-center
      >
        <el-step
          :title="item.label"
          v-for="(item,index) in stepList"
          :key="index"
          :description="item.time"
          :status="item.status"
        />
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientInfoStep',
  data () {
    return {
      stepList: [
        {
          label: '到达手术室',
          time: '12:23',
          status: 'success'
        },
        {
          label: '入手术间',
          time: '12:23',
          status: 'success'
        },
        {
          label: '麻醉开始',
          time: '12:23',
          status: 'success'
        },
        {
          label: '手术结束',
          time: '12:23',
          status: 'error'
        },
        {
          label: '麻醉结束',
          time: '12:23',
          status: 'error'
        },
        {
          label: '出手术间',
          time: '12:23',
          status: 'wait'
        },
        {
          label: '出手术室',
          time: '12:23',
          status: 'error'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .patient-info-step{
    margin-bottom: 10px;
    .pt-info{
      display: flex;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      .pt-info-left{
        width: 140px;
        box-sizing: border-box;
        border-right: 1px solid #E8E8E8;
        text-align: center;
        line-height: 120px;
        color: #3377FF;
        font-size: 20px;
        font-weight: bold;
      }
      .pt-info-right{
        flex: 1;
        padding: 15px 0 15px 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #444444;
        font-weight: 600;
        span{
          display: inline-block;
        }
        .label{
          color: #91949A;
          text-align: right;
        }
        .value{

        }
      }
    }
    .pt-step{
      // height: 110px;
      margin-top: 10px;
      padding: 16px 0;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
    }
  }
</style>
