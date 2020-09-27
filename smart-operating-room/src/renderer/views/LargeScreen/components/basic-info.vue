<template>
  <div class="basic-info">
    <info-list :list="emptyList" title='病史摘要'></info-list>
    <info-list :list="basicInfoList" title="有效医嘱"></info-list>
    <info-list :list="basicInfoList" title="化验报告/危急值"></info-list>
    <info-list :list="basicInfoList" title="检查报告"></info-list>
    <info-list :list="emptyList" title="术中带药"></info-list>
    <info-list :list="emptyList" title="抗生素用药"></info-list>
  </div>
</template>

<script>
import InfoList from '@/components/InfoList/info-list'
export default {
  name: 'BasicInfo',
  data () {
    return {
      basicInfoList: [{time: '10:00', label: '血常规,全血'}, {time: '11:00', label: 'T.B.NK,全血'}],
      emptyList: []
    }
  },
  components: {
    InfoList
  }
}
</script>

<style lang="scss" scoped>
  .basic-info{
    display: flex;
    height: 100%;
  }
</style>>
