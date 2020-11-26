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
          height="auto"
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
            field="detailDesc"
            title="说明"
          />
          <vxe-table-column

            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                @click="changeInfo(row)"
              >
                编辑
              </el-button>
              <el-button
                class="redFont"
                type="text"
                @click="handleEdit(row)"
              >
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="bdm-option">
        <el-button
          @click="goBack"
          type="primary"
          size="mini"
        >
          返回
        </el-button>
        <el-button
          @click="addBaseDictDetail"
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
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form
        size="mini"
        :inline="true"
        label-width="80px"
      >
        <el-form-item
          class="bitianxiang"
          label="项目名称"
        >
          <el-input
            placeholder="请输入项目详细类型名称"
            v-model="form.typeName"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="说明"
        >
          <el-input
            v-model="form.detailDesc"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="save"
        >保 存</el-button>
        <el-button
          @click="handleClose"
          size="mini"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BasicDictionaryMaintain',
  data () {
    return {
      dialogTitle: '',
      dialogVisible: false,
      form: {
        typeName: '',
        detailDesc: ''
      },
      showFlag: true,
      tableData: [],
      tableChildData: [],
      belongSerialNumber: '',
      selectRow: {},
      selectItemRow: {}
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
      this.selectRow = row
      this.getSelectList(row.serialNumber)
      this.showFlag = false
    },
    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: num
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          this.tableChildData = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击新增项目
    addBaseDictDetail () {
      this.form.typeName = ''
      this.form.detailDesc = ''
      this.dialogTitle = '项目名称-新增'
      this.dialogVisible = true
    },
    // 点击编辑项目
    changeInfo (row) {
      this.dialogTitle = '项目名称-修改'
      this.selectItemRow = row
      this.form.typeName = row.typeName
      this.form.detailDesc = row.detailDesc
      this.dialogVisible = true
    },
    // 点击返回
    goBack () {
      this.showFlag = true
    },
    // 保存新增或者修改
    save () {
      console.log(this.selectRow)
      if (this.dialogTitle.includes('新增')) {
        let arr = []
        let obj = {
          belongSerialNumber: this.selectRow.serialNumber,
          typeName: this.form.typeName,
          detailDesc: this.form.detailDesc
        }
        arr.push(obj)
        this.$store.dispatch('ReqAddBaseDictDetailList', arr).then(res => {
          if (res.data.code === 200) {
            this.openToast('success', '添加成功')
            this.getSelectList(this.selectRow.serialNumber)
          } else {
            this.openToast('error', res.data.msg)
          }
          this.dialogVisible = false
        })
      } else {
        let arr = []
        let obj = {
          id: this.selectItemRow.id,
          isDeleted: this.selectItemRow.isDeleted,
          belongSerialNumber: this.selectRow.serialNumber,
          typeName: this.form.typeName,
          detailDesc: this.form.detailDesc
        }
        arr.push(obj)
        this.$store.dispatch('ReqUpdateBaseDictDetailList', arr).then(res => {
          if (res.data.code === 200) {
            this.openToast('success', '修改成功')
            this.getSelectList(this.selectRow.serialNumber)
          } else {
            this.openToast('error', res.data.msg)
          }
          this.dialogVisible = false
        })
      }
    },
    handleEdit (row) {
      this.$confirm('是否删除当前项目分组', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let arr = [row.id]

            this.$store.dispatch('ReqDeleteBaseDictDetail', arr).then(res => {
              if (res.data.code === 200) {
                this.openToast('success', '删除成功')
                this.getSelectList(this.selectRow.serialNumber)
              } else {
                this.openToast('error', res.data.code)
              }
            })
          } else {

          }
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
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
/deep/.el-form-item.bitianxiang:not(.is-no-asterisk)>.el-form-item__label:before{
  content:'*'!important;
  color:#f56c6c !important;
  margin-right:4px !important;
}
</style>
