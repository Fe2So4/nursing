<template>
  <div class="basic-dictionary-maintain">
    <div
      v-show="showFlag"
      class="maintain-container"
    >
      <div
        class="bdm-table"
      >
        <vxe-table
          class="mytable-scrollbar"
          align="center"
          :data="tableData"
          size="mini"
          height="100%"
        >
          <vxe-table-column
            field="serialNumber"
            title="字典项编号"
          />
          <vxe-table-column
            field="dictTypeName"
            title="字典项名称"
          />
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                @click="showDiv(row)"
              >
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
    <div
      v-show="!showFlag"
      class="maintain-item"
    >
      <div class="bdm-table">
        <vxe-table
          class="mytable-scrollbar"
          align="center"
          :data="tableChildData"
          size="mini"
          height="100%"
        >
          <vxe-table-column
            type="seq"
            title="序号"
            width="100"
          />
          <vxe-table-column
            field="typeName"
            title="人员类别名称"
          />
          <vxe-table-column
            field="typeName"
            title="说明"
          />
          <vxe-table-column

            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                @click="showDiv(row)"
              >
                编辑
              </el-button>
              <el-button
                class="redFont"
                type="text"
                @click="showDiv(row)"
              >
                删除
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
          返回
        </el-button>
        <el-button

          type="primary"
          size="mini"
        >
          新增
        </el-button>
        <el-button

          type="primary"
          size="mini"
        >
          导出EXCEL
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicDictionaryMaintain',
  data () {
    return {
      showFlag: true,
      tableData: [],
      tableChildData: [],
      belongSerialNumber: ''
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    // 获取表格数据
    getTableList () {
      this.$store.dispatch('ReqGetBaseDictCategoryList').then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击编辑
    showDiv (row) {
      this.getSelectList(row.serialNumber)
      this.showFlag = false
    },
    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: '005'
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          this.tableChildData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .basic-dictionary-maintain{
    width: 100%;
    height: 100%;
    .maintain-container {
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
    .maintain-item {
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
  }
.redFont{
  color:#FF5454;
}
</style>
