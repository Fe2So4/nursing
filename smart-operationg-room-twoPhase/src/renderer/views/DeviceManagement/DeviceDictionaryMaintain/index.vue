<template>
  <div class="device-dictionary-maintain">
    <div class="dg-left">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >
          <span :class="!data.isChild ? 'tree-parent-title' : ''">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <div class="dg-right">
      <div class="dg-r-top">
        <el-form
          :inline="true"
          size="mini"
        >
          <el-form-item label="">
            <el-button
              type="info"
              plain
              @click="handleAdd"
            >
              新 增
            </el-button>
          </el-form-item>
          <el-form-item
            label=""
          >
            <el-button
              type="info"
              plain
            >
              清 空
            </el-button>
          </el-form-item>
          <el-form-item
            label=""
          >
            <el-button
              type="info"
              plain
            >
              保 存
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="dg-r-table">
        <vxe-table
          align="center"
          :data="tableData"
          size="mini"
          height="auto"
          auto-resize
          stripe
        >
          <vxe-table-column
            field="sort"
            title="序号"
          />
          <vxe-table-column
            field="age1"
            title="设备位置"
          />
          <vxe-table-column
            title="操作"
          >
            <template>
              <el-button type="text">
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <AddPosition
      :add-visible="addVisible"
      :dialog-title="dialogTitle"
      @handleClose="handleAdd"
    />
    <AddName
      :add-visible="addNameVisible"
      :dialog-title="dialogTitle"
      @handleClose="handleAdd"
    />
  </div>
</template>

<script>
import AddPosition from './components/add-position'
import AddName from './components/add-name'
export default {
  name: 'DeviceDictionaryMaintain',
  data () {
    return {
      form: {
        value: ''
      },
      addVisible: false,
      addNameVisible: false,
      data: [{id: '1',
        label: '设备组套维护',
        isChild: false,
        children: [{
          id: '1-1',
          label: '设备位置',
          isChild: true }, {
          id: '1-2',
          label: '设备名称',
          isChild: true }]}],
      tableData: [{name: 'd'}],
      dialogTitle: '新增设备位置信息'
    }
  },
  components: {
    AddPosition, AddName
  },
  methods: {
    handleAdd (param = 0) {
      this.addVisible = !this.addVisible
      // if (param === 1) {
      //   this.dialogTitle = '新增组套'
      // } else if (param === 2) {
      //   this.dialogTitle = '编辑组套'
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  .device-dictionary-maintain{
    display: flex;
    height: 100%;
    justify-content: space-between;
    .dg-left{
      width: 14%;
      // padding-top: 10px;
      box-sizing: border-box;
      background: #fff;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      /deep/ .el-tree-node__content{
        display: flex;
        justify-content: space-between;
        margin-top: 10px !important;
      }
      /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
        background: #D6DCE8 !important;
      }
      .custom-tree-node{
        display: flex;
        flex: 1;
        justify-content: space-between;
        font-size: 14px;
        color: #444444;
        .tree-option{
          color: #3377FF;
          padding-right: 20px;
          i{
            cursor: pointer;
          }
        }
        .tree-parent-title{
          color: #333333 !important;
        }
      }
    }
    .dg-right{
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      .dg-r-top{
        background: #fff;
        padding: 20px 30px 0 20px;
        box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
        border-radius: 5px;
        .el-form{
          text-align: right;
          .el-form-item{
            margin-bottom:20px;
            .el-input{
              min-width: 300px;
            }
          }
        }
      }
      .dg-r-table{
        flex: 1;
        background: #fff;
        margin-top: 10px;
        box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
        border-radius: 5px;
        overflow: hidden;
        .el-button{
          vertical-align: middle;
          &:nth-last-child(1){
            color:#FF5454;
          }
        }
      }
    }
  }
</style>
