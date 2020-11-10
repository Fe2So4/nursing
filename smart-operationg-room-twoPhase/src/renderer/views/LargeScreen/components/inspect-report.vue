<template>
  <div class="inspect-report">
    <div>
      <h3>检查部位：</h3>
      <div style="color:#3890F7;">
        {{ item.studySubClassName === '' ? '-' : item.studySubClassName }}
      </div>
    </div>
    <div>
      <h3>检查项目：</h3>
      <div
        class="inspect-color"
        style="color:#3890F7;"
      >
        {{ item.itemName === '' ? '-' : item.itemName }}
      </div>
    </div>
    <div>
      <h3>检查所见：</h3>
      <div class="inspect-color">
        {{ item.imagingFindings === '' ? '-' : item.imagingFindings }}
      </div>
    </div>
    <div>
      <h3>检查结论：</h3>
      <div class="inspect-color">
        {{ item.studyConclusion === '' ? '-' : item.studyConclusion }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestReport',
  data () {
    return {

    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .inspect-report{
    padding:0 10px;
    font-size: 16px;
    border-bottom:1px solid #E9ECF4;
    h3{
      color: #919398;
      font-size: 16px;
      font-weight:lighter;
    }
    .inspect-color{
      color:#444444;
      word-break:break-all;
    }
  }
</style>
