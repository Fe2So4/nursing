<template>
  <div class="patient-info-step">
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
    .pt-step{
      // height: 110px;
      // margin-top: 10px;
      padding: 16px 0;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
    }
  }
</style>
