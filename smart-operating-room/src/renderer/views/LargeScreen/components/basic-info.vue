<template>
  <div class="basic-info">
    <info-list
      :list="emptyList"
      title="病史摘要"
      item-status="0"
      state="inspect"
    />
    <info-list
      :list="basicInfoList"
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
</style>
