<template>
  <div class="info-list">
    <span class="info-left">{{ title }}</span>
    <span class="info-right">
      <IsSelect :myselect="myselect" />
      <!-- <span>是</span>
        <IsSelect :myselect="myselect" />
      <span>否</span>
      <IsSelect :myselect="!myselect" /> -->
    </span>
  </div>
</template>

<script>
// import IsSelect from './isSelect'
import IsSelect from './testItem'
export default {
  name: 'InfoList',
  props: ['title', 'myselect'],
  data () {
    return {

    }
  },
  components: {
    IsSelect
  }
}
</script>

<style scoped lang="scss">
.info-list {
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    .info-left {
      flex: 1;
      padding-left: 3px;
    }
    .info-right {
      padding: 1px;
    }
  }
</style>
