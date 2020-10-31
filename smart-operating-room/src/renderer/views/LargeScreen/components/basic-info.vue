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
      :list="basicInfoList"
      title="化验报告/危急值"
      item-status="1"
      state="test"
    />
    <info-list
      :list="basicInfoList"
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
import {getMedicalAdvice, getMedicalHistory} from '@/api/large-screen'
export default {
  name: 'BasicInfo',
  data () {
    return {
      basicInfoList: [{time: '10:00', label: '血常规,全血'}, {time: '11:00', label: 'T.B.NK,全血'}],
      emptyList: [],
      adviceList: [], // 有效医嘱
      historyList: [] // 病史摘要
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
    }
  },
  mounted () {
    this.getMedicalAdvice()
    this.getMedicalHistory()
  }
}
</script>

<style lang="scss" scoped>
  .basic-info{
    display: flex;
    height: 100%;
  }
</style>
