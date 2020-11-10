<template>
  <div class="test-report">
    <p><span>{{ item.observationNameCn }}</span><span>{{ item.observationNameEn }}</span></p>
    <p><span>{{ item.observationOriginalValue }}</span><span>{{ item.referenceRangeType }}/{{ item.observationValueUnit }}</span></p>
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
  .test-report{
    padding:0 10px;
    font-size: 16px;
    border-bottom:1px solid #E9ECF4;
    p{
      display: flex;
      color: #444444;
      justify-content: space-between;
      &:last-child{
        color:#919398;
      }
    }
  }
</style>
