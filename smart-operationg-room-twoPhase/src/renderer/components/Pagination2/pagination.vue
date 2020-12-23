<template>
  <div
    class="pagination"
    :style="{paddingTop:distance + 'px',paddingBottom:distance+'px'}"
  >
    <el-form
      :inline="true"
      size="mini"
    >
      <el-form-item>
        共 {{ childrenData.totalPages }} 条
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
          :current-page.sync="childrenData.currentPage"
          layout="prev, pager, next"
          :total="childrenData.totalPages"
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
          :max="childrenData.totalPages"
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
        return {

        }
      }
    },
    distance: {
      type: String,
      required: false,
      default: '40'
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
      this.pageSizeChange()
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
    display: flex;
    // height: 112px;
    overflow: hidden;
    justify-content: center;
    .el-form{
      .el-form-item{
        margin-bottom:unset;
      }
    }
  }
</style>
