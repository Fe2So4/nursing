<template>
  <div class="basic-info">
    <info-list
      :list="historyList"
      title="病史摘要"
      item-status="2"
      state="summary"
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
      :list="medicineList"
      title="术中带药"
      item-status="0"
      state="inspect"
    />
    <info-list
      :list="antibioticList"
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
import {getAntibiotic, getMedecial, getMedicalAdvice, getMedicalHistory, getInspectReport, getTestReport} from '@/api/large-screen'
export default {
  name: 'BasicInfo',
  data () {
    return {
      basicInfoList: [],
      emptyList: [],
      adviceList: [], // 有效医嘱
      historyList: [], // 病史摘要
      inspectList: [], // 检查报告
      testList: [], // 检验报告
      medicineList: [], // 术中带药
      antibioticList: [] // 抗生素带药
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
        let data = res.data.data
        data.forEach(item => {
          item.label = item.outDrugItemName
          item.type = item.interType
          item.perTime = item.dosagePerTime
          item.unit = item.minunit
          item.usage = item.usage
        })
        this.adviceList = data
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
    // 获取术中带药
    getMedecialData () {
      request({
        url: getMedecial + '/' + this.patientInfo.hospitalNo,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        data.forEach(item => {
          item.label = item.orderText
          item.type = item.frequency
          item.perTime = item.dosagePerTime
          item.unit = item.dosageUnit
          item.usage = item.administration
        })
        this.medicineList = data
      })
    },
    // 获取抗生素用药
    getAntibioticData () {
      request({
        url: getAntibiotic + '/' + this.patientInfo.hospitalNo,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        data.forEach(item => {
          item.label = item.orderText
          item.type = item.frequency
          item.perTime = item.dosagePerTime
          item.unit = item.dosageUnit
          item.usage = item.administration
        })
        this.antibioticList = data
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
    this.getMedecialData()
    this.getAntibioticData()
    $bus.$on('getMedicalAdvice', this.getMedicalAdvice)
    $bus.$on('getMedicalHistory', this.getMedicalHistory)
    $bus.$on('getInspectReport', this.getInspectReportData)
    $bus.$on('getTestReport', this.getTestReportData)
    $bus.$on('getMedecial', this.getMedecialData)
    $bus.$on('getAntibiotic', this.getAntibioticData)
  },
  beforeDestroy () {
    $bus.$off('getMedicalAdvice')
    $bus.$off('getMedicalHistory')
    $bus.$off('getInspectReport')
    $bus.$off('getTestReport')
    $bus.$off('getMedecial')
    $bus.$off('getAntibiotic')
  }
}
</script>

<style lang="scss" scoped>
  .basic-info{
    display: flex;
    height: 100%;
  }
</style>
