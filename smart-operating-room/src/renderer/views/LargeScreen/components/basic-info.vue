<template>
  <div class="basic-info">
    <info-list
      :list="historyList"
      title="病史摘要"
      item-status="0"
      state="inspect"
    />
    <info-list
      :list="adviceList"
      title="有效医嘱"
      item-status="0"
      state="inspect"
    />
    <info-list
      :list="testList"
      title="化验报告/危急值"
      item-status="1"
      state="test"
    />
    <info-list
      :list="inspectList"
      title="检查报告"
      item-status="1"
      state="inspect"
    />
    <info-list
      :list="basicInfoList"
      title="术中带药"
      item-status="0"
      state="inspect"
    />
    <info-list
      :list="basicInfoList"
      title="抗生素用药"
      item-status="0"
      state="inspect"
    />
  </div>
</template>

<script>
import InfoList from './info-list'
import request from '@/utils/request'
import {mapState} from 'vuex'
import $bus from '@/utils/busScreen'
import moment from 'moment'
import {getMedicalAdvice, getMedicalHistory, getInspectReport, getTestReport} from '@/api/large-screen'
export default {
  name: 'BasicInfo',
  data () {
    return {
      basicInfoList: [{time: '10:00', label: '血常规,全血'}, {time: '11:00', label: 'T.B.NK,全血'}],
      emptyList: [],
      adviceList: [], // 有效医嘱
      historyList: [], // 病史摘要
      inspectList: [], // 检查报告
      testList: [] // 检验报告
    }
  },
  components: {
    InfoList
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  methods: {
    getMedicalAdvice () {
      request({
        method: 'get',
        url: getMedicalAdvice + '/' + this.patientInfo.cureNo
      }).then(res => {
        this.adviceList = res.data.data
      })
    },
    getMedicalHistory () {
      request({
        method: 'get',
        url: getMedicalHistory + '/' + this.patientInfo.cureNo
      }).then(res => {
        this.historyList = res.data.data
      })
    },
    getInspectReportData () {
      request({
        url: getInspectReport + '/' + this.patientInfo.cureNo,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        data.forEach(item => {
          item.label = item.studyClassName
          item.time = moment(item.studyOperateDateTime).format('YYYY-MM-DD')
        })
        this.inspectList = data
      })
    },
    getTestReportData () {
      request({
        method: 'get',
        url: getTestReport + '/' + this.patientInfo.cureNo
      }).then(res => {
        let data = res.data.data
        data.forEach(item => {
          item.label = item.observationTypeName
          item.time = moment(item.reportDateTime).format('YYYY-MM-DD')
          // item.laboratoryReportDetails.forEach(_item => {
          // })
        })
        this.testList = data
      })
    }
  },
  mounted () {
    this.getMedicalAdvice()
    this.getMedicalHistory()
    this.getInspectReportData()
    this.getTestReportData()
    $bus.$on('getMedicalAdvice', this.getMedicalAdvice)
    $bus.$on('getMedicalHistory', this.getMedicalHistory)
    $bus.$on('getInspectReport', this.getInspectReport)
    $bus.$on('getTestReport', this.getTestReport)
  },
  beforeDestroy () {
    $bus.$off('getMedicalAdvice')
    $bus.$off('getMedicalHistory')
    $bus.$off('getInspectReport')
    $bus.$off('getTestReport')
  }
}
</script>

<style lang="scss" scoped>
  .basic-info{
    display: flex;
    height: 100%;
  }
</style>
