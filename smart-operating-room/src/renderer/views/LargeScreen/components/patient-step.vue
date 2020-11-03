<template>
  <div class="patient-step">
    <el-steps
      :active="2"
      align-center
    >
      <el-step
        :title="item.title"
        :status="item.status"
        v-for="item in stepList"
        :key="item.title"
      >
        <template slot="description">
          <p>{{ item.time }}</p>
          <p>{{ item.mins }}</p>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import {getPatientStep} from '@/api/large-screen'
import request from '@/utils/request'
import {mapState} from 'vuex'
import $bus from '@/utils/busScreen'
export default {
  name: 'PatientStep',
  data () {
    return {
      stepList: [
        {
          title: '手术通知单',
          time: '12:23',
          mins: '',
          status: 'success'
        },
        {
          title: '工勤人员接单',
          time: '12:23',
          mins: '(15Mins)',
          status: 'success'
        },
        {
          title: '病房交接',
          time: '12:23',
          mins: '(34Mins)',
          status: 'error'
        },
        {
          title: '进手术室',
          time: '13:23',
          mins: '(18Mins)',
          status: 'success'
        },
        {
          title: 'Sign In',
          time: '13:23',
          mins: '',
          status: 'success'
        },
        {
          title: 'Time Out',
          time: '14:23',
          mins: '',
          status: 'success'
        },
        {
          title: 'Sign Out',
          time: '13:23',
          mins: '',
          status: 'wait'
        },
        {
          title: '出手术室',
          time: '13:23',
          mins: '',
          status: 'wait'
        },
        {
          title: '回病房',
          time: '13:23',
          mins: '',
          status: 'wait'
        }
      ]
    }
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  methods: {
    getStepList () {
      request({
        method: 'get',
        url: getPatientStep + `/${this.patientInfo.cureNo}/${this.patientInfo.hospitalNo}`
      }).then(res => {
        console.log(res.data.data)
      })
    }
  },
  mounted () {
    this.getStepList()
    $bus.$on('getStepList', this.getStepList)
  },
  beforeDestroy () {
    $bus.$off('getStepList')
  }
}
</script>

<style scoped lang="scss">
  .patient-step{
    background: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    padding: 15px 0 13px 0;
  }
</style>
