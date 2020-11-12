<template>
  <div class="pagination">
    <el-form
      :inline="true"
      size="mini"
    >
      <el-form-item>
        共 400 条
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="pageList[0].value"
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
          layout="prev, pager, next"
          :total="50"
        />
      </el-form-item>
      <el-form-item style="margin-right:unset;">
        前往
      </el-form-item>
      <el-form-item style="margin-right:unset;">
        <el-input style="width:64px;" />
      </el-form-item>
      <el-form-item style="margin-right:unset;">
        页
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageList: [{value: '20', label: '20条/页'}, {value: '30', label: '30条/页'}]
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
