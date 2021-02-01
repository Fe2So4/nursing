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
          <el-button
            type="primary"
            v-if="item.title==='手术结束'"
            size="mini"
            @click="handleStop"
          >
            结束
          </el-button>
          <p v-else>
            {{ item.mins }}
          </p>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import {getPatientStep, stopOperation} from '@/api/large-screen'
import request from '@/utils/request2'
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
          title: '手术结束',
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
        url: getPatientStep + `/${this.patientInfo.cureNo}/${this.patientInfo.hospitalNo}/${this.patientInfo.operSchNo}`
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
          this.stepList[7].time = data.operatingEndTime !== '' ? moment(data.operatingEndTime).format('HH:mm') : ''
          this.stepList[7].status = data.operatingEndTime === '' ? '0' : '2'
          this.stepList[8].time = data.outOperroomTime !== '' ? moment(data.outOperroomTime).format('HH:mm') : ''
          this.stepList[8].status = data.outOperroomState
          this.stepList[9].time = data.backRoomTime !== '' ? moment(data.backRoomTime).format('HH:mm') : ''
          this.stepList[9].status = data.backRoomState
        }
      })
    },
    handleStop () {
      request({
        method: 'post',
        url: stopOperation,
        data: {
          cureNo: this.patientInfo.cureNo,
          hospitalNo: this.patientInfo.hospitalNo,
          operSchNo: this.patientInfo.operSchNo,
          operatingEndTime: moment(new Date()).format('YYYY-MM-DD HH:mm')
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({message: '手术结束成功', type: 'success', showClose: true})
        } else {
          this.$message({message: res.data.msg, type: 'error', showClose: true})
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
@import '@/styles/themes';
  .patient-step{
    @include theme-property('background-color',background_color_primary);
    // box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    @include theme-property('box-shadow',box_color_shadow);
    border-radius: 5px;
    padding: 15px 0 13px 0;
    /deep/ .el-step__head{
      &.is-success{
        color:#388FF7;
        border-color:#388FF7;
        // @include theme-property('color',font_color_success);
        // @include theme-property('border-color',font_color_success);
      }
      &.is-wait{
        border-color: #C7C9CD;
        @include theme-property('border-color',font_color_wait);
        @include theme-property('color',font_color_wait);
        .el-step__line{
          background-color: #C7C9CD;
        }
      }
    }
    /deep/ .el-step__title{
      &.is-success{
        @include theme-property('color',font_color_secondary);
      }
      &.is-error{
        color:#444444;
      }
    }
    /deep/ .el-step__description{
      p{
        min-height: 20px;
      }
      &.is-success{
        @include theme-property('color',font_color_success);
        p{
          &:last-child{
            @include theme-property('color',font_color_value);
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
    }
    /deep/ .el-step__line{
      background-color:#388FF7;
    }
    /deep/ .el-button{
      @include theme-property('background-color',font_color_primary);
      @include theme-property('border-color',font_color_primary);
    }
  }
</style>
