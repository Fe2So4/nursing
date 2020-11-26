<template>
  <div class="pagination">
    <el-form
      :inline="true"
      size="mini"
    >
      <el-form-item>
        共 {{ childrenData.total }} 条
      </el-form-item>
      <el-form-item>
        <el-select
          @change="pageSizeChange(pageSize)"
          v-model="pageSize"
          style="width:134px;"
        >
          <el-option
            v-for="item in pageList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-pagination
          :page-size="pageSize"

          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="childrenData.total"
        />
      </el-form-item>
      <el-form-item style="margin-right:unset;">
        前往
      </el-form-item>
      <el-form-item style="margin-right:unset;">
        <el-input-number
          :controls="false"
          v-model="gotoYe"
          @keyup.enter.native="gotoPage"
          style="width:64px;"
          :min="1"
          :max="childrenData.pages"
          label="描述文字"
        />
      </el-form-item>
      <el-form-item style="margin-right:unset;">
        页
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    childrenData: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      gotoYe: null,
      currentPage: 1,
      pageSize: 10,
      pageList: [{value: 10, label: '10条/页'}, {value: 20, label: '20条/页'}]
    }
  },
  methods: {
    pageSizeChange () {
      let obj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$emit('searchTableList', obj)
    },
    handleCurrentChange () {
      let obj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$emit('searchTableList', obj)
    },
    gotoPage () {
      this.currentPage = Number(this.gotoYe)
      this.handleCurrentChange()
    }

  }
}
</script>

<style lang="scss" scoped>
  .pagination{
    padding: 40px 0;
    display: flex;
    height: 112px;
    overflow: hidden;
    justify-content: center;
    .el-form{
      .el-form-item{
        margin-bottom:unset;
      }
    }
  }
</style>
