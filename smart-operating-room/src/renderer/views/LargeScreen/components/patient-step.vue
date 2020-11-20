<template>
  <div class="patient-step">
    <el-steps
      :active="2"
      align-center
    >
      <el-step
        :title="item.title"
        :status="item.status==='0' ? 'wait' : item.status === '2' ? 'success' : 'error'"
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
import moment from 'moment'
export default {
  name: 'PatientStep',
  data () {
    return {
      stepList: [
        {
          title: '手术通知单',
          time: '',
          mins: '',
          status: '0'
        },
        {
          title: '工勤人员接单',
          time: '',
          mins: '(15Mins)',
          status: '0'
        },
        {
          title: '病房交接',
          time: '',
          mins: '(34Mins)',
          status: '0'
        },
        {
          title: '进手术室',
          time: '',
          mins: '(18Mins)',
          status: '0'
        },
        {
          title: 'Sign In',
          time: '',
          mins: '',
          status: '0'
        },
        {
          title: 'Time Out',
          time: '',
          mins: '',
          status: '0'
        },
        {
          title: 'Sign Out',
          time: '',
          mins: '',
          status: '0'
        },
        {
          title: '出手术室',
          time: '',
          mins: '',
          status: '0'
        },
        {
          title: '回病房',
          time: '',
          mins: '',
          status: '0'
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
        let data = res.data.data
        if (Array.isArray(data)) {
        } else {
          this.stepList[0].time = data.operatingNoticeTime !== '' ? moment(data.operatingNoticeTime).format('HH:mm') : ''
          this.stepList[0].status = data.operatingNoticeTime === '' ? '0' : '2'
          this.stepList[1].time = data.workerGetOrderTime !== '' ? moment(data.workerGetOrderTime).format('HH:mm') : ''
          this.stepList[1].status = data.workerGetOrderTime === '' ? '0' : '2'
          this.stepList[2].time = data.wardHandoverTime !== '' ? moment(data.wardHandoverTime).format('HH:mm') : ''
          this.stepList[2].status = data.wardHandoverState
          this.stepList[3].time = data.inOperroomTime !== '' ? moment(data.inOperroomTime).format('HH:mm') : ''
          this.stepList[3].status = data.inOperroomState
          this.stepList[4].time = data.anesBeforeTime !== '' ? moment(data.anesBeforeTime).format('HH:mm') : ''
          this.stepList[4].status = data.anesBeforeState
          this.stepList[5].time = data.operBeforeTime !== '' ? moment(data.operBeforeTime).format('HH:mm') : ''
          this.stepList[5].status = data.operBeforeState
          this.stepList[6].time = data.leaveBeforeTime !== '' ? moment(data.leaveBeforeTime).format('HH:mm') : ''
          this.stepList[6].status = data.leaveBeforeState
          this.stepList[7].time = data.outOperroomTime !== '' ? moment(data.outOperroomTime).format('HH:mm') : ''
          this.stepList[7].status = data.outOperroomState
          this.stepList[8].time = data.backRoomTime !== '' ? moment(data.backRoomTime).format('HH:mm') : ''
          this.stepList[8].status = data.backRoomState
        }
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
    /deep/ .el-step__head{
      &.is-success{
        color:#388FF7;
        border-color:#388FF7;
      }
      &.is-wait{
        border-color: #C7C9CD;
        color: #C7C9CD;
        .el-step__line{
          background-color: #C7C9CD;
        }
      }
    }
    /deep/ .el-step__title{
      &.is-success{
        color:#444444;
      }
      &.is-error{
        color:#444444;
      }
    }
    /deep/ .el-step__description{
      &.is-success{
        color:#388FF7;
        p{
          &:last-child{
            color:#91949A;
          }
        }
      }
      &.is-error{
        // color:#388FF7;
        p{
          &:last-child{
            color:#91949A;
          }
        }
      }
      &.is-success{
        color:#388FF7;
        p{
          &:last-child{
            color:#91949A;
          }
        }
      }
    }
    /deep/ .el-step__line{
      background-color:#388FF7;
    }
  }
</style>
