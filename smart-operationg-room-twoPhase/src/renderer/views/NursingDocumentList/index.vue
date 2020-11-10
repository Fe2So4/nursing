<template>
  <div class="nursing-document-list">
    <div class="leftNav">
      <leftNav />
    </div>
    <div class="content">
      <nursing-header />
      <el-scrollbar class="scrollbarWenben">
        <div class="content-wenben">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import leftNav from './components/left-nav'
import nursingHeader from './components/header'
export default {
  name: 'NursingDocumentList',
  data () {
    return {
      rowData: {}
    }
  },
  mounted () {
    this.rowData = this.$route.query.row
    console.log(this.rowData)
  },
  components: {
    leftNav,
    nursingHeader
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden !important;
}
.scrollbarWenben {
  height: calc(100% - 70px);
  width:100%
}
.nursing-document-list {
  min-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
}
.leftNav {
  width: 180px;
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  .content-wenben {
    height: 100%;
    display: flex;
    padding-top: 20px;
    justify-content: center;
    align-items: center;
  }
}
</style>
