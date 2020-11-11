<template>
  <div class="basic-dictionary-maintain">
    <div class="bdm-table">
      <vxe-table
        align="center"
        :data="tableData"
        size="mini"
        height="100%"
      >
        <vxe-table-column
          field="name"
          title="字典项编号"
        />
        <vxe-table-column
          field="sex"
          title="字典项名称"
        />
        <vxe-table-column
          field="age"
          title="操作"
        >
          <template>
            <el-button type="text">
              编辑
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="bdm-option">
      <el-button
        type="primary"
        size="mini"
      >
        导出EXCEL
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicDictionaryMaintain',
  data () {
    return {
      tableData: [{name: '5a65da', sex: 'asdas'}]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .basic-dictionary-maintain{
    display: flex;
    height: calc(100% - 24px);
    flex-direction: column;
    .bdm-table{
      flex: 1;
    }
    .bdm-option{
      padding:20px 20px 240px 0;
      text-align: right;
    }
  }
</style>
