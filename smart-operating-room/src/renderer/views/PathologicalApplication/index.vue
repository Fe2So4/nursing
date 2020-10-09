<template>
<!-- 护理单据 -->
  <div class="paContainer">
    <div class="user-info">
      <user-info />
    </div>
    <div class="pathology-type">
      <sub-pathological />
    </div>
    <div class="pathology-list">
      <pathological-table />
    </div>
  </div>
</template>

<script>
import UserInfo from './components/user-info'
import SubPathological from './components/sub-pathological'
import PathologicalTable from './components/pathological-table'
export default {
  name: 'PathologicalApplication',
  data () {
    return {

    }
  },
  components: {
    UserInfo,
    SubPathological,
    PathologicalTable
  }
}
</script>

<style scoped lang="scss">
.paContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    .user-info {
        flex:1
    }
    .pathology-type {
        margin-top: 20px;
        flex:2
    }
    .pathology-list {
        margin-top: 20px;
        flex:4
    }
}
</style>
