<template>
  <!-- 护理单据 -->
  <el-scrollbar style="height:100%;width:100%">
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
  </el-scrollbar>
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
@import './../../styles/scrollrow.scss';
.paContainer {
    display: flex;
    width: 100%;
    min-width: 1200px;
    flex-direction: column;
    .user-info {
        box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
        border-radius: 5px;
        flex:1
    }
    .pathology-type {
        box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
        border-radius: 5px;
        margin-top: 20px;
        flex:2
    }
    .pathology-list {
        box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
        border-radius: 5px;
        margin-top: 20px;
        flex:4
    }
}
/deep/ .vxe-button.size--mini.type--button:hover {
  background-color: #3377FF;
  color: #FFFFFF;
}
/deep/ .vxe-button--content, .vxe-button--icon, .vxe-button--loading-icon {
  vertical-align: unset;
}
</style>
