<template>
  <div class="device-dictionary-maintain">
    <div class="dg-left">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        @node-click="handleTreeClick"
        highlight-current
        ref="tree"
        :current-node-key="defaultActive"
        :expand-on-click-node="false"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node }"
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
            <!-- <el-button
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
            </el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="dg-r-table">
        <vxe-table
          align="center"
          :data="tableData"
          size="mini"
          height="100%"
          auto-resize
          stripe
        >
          <vxe-table-column
            field="sort"
            title="序号"
            type="seq"
          />
          <vxe-table-column
            field="name"
            v-if="defaultActive==='position'"
            title="设备位置"
          />
          <vxe-table-column
            field="name"
            v-if="defaultActive==='name'"
            title="设备名称"
          />
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                @click="handleDelete(row.id)"
              >
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <AddPosition
      v-if="addVisible"
      :add-visible="addVisible"
      :dialog-title="dialogTitle"
      :edit-data="editData"
      @handleClose="handleAdd"
      @getPositionData="getPositionData"
    />
    <AddName
      v-if="addNameVisible"
      :add-visible="addNameVisible"
      :dialog-title="dialogTitle"
      @handleClose="handleAdd"
      :edit-data="editData"
      @getNameData="getNameData"
    />
  </div>
</template>

<script>
import AddPosition from './components/add-position'
import AddName from './components/add-name'
import {getDict, deleteDict} from '@/api/device'
import request from '@/utils/request'
export default {
  name: 'DeviceDictionaryMaintain',
  data () {
    return {
      form: {
        value: ''
      },
      defaultActive: 'position',
      addVisible: false,
      addNameVisible: false,
      editData: {},
      data: [{
        id: '1',
        label: '设备组套维护',
        isChild: false,
        disabled: true,
        children: [{
          id: 'position',
          label: '设备位置',
          isChild: true }, {
          id: 'name',
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
      if (this.defaultActive === 'position') {
        this.addVisible = !this.addVisible
        this.dialogTitle = '新增设备位置信息'
        this.editData = {}
      } else {
        this.addNameVisible = !this.addNameVisible
        this.dialogTitle = '新增设备名称信息'
        this.editData = {}
      }
    },
    handleEdit (row) {
      if (this.defaultActive === 'position') {
        this.addVisible = !this.addVisible
        this.dialogTitle = '修改设备名称信息'
        this.editData = row
      } else {
        this.addNameVisible = !this.addNameVisible
        this.dialogTitle = '修改设备名称信息'
        this.editData = row
      }
    },
    handleDelete (id) {
      request(
        {
          url: deleteDict + '/' + id,
          method: 'get'
        }
      ).then(res => {
        if (res.data.code === 200) {
          this.$message({message: '删除成功', type: 'success'})
          if (this.defaultActive === 'position') {
            this.getPositionData()
          } else {
            this.getNameData()
          }
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      })
    },
    handleTreeClick (nodeObj) {
      this.defaultActive = nodeObj.id
      if (nodeObj.id === 'position') {
        this.getPositionData()
      } else {
        this.getNameData()
      }
    },
    getPositionData () {
      request({
        url: getDict + '/' + 'POSITION',
        method: 'get'
      }).then(res => {
        this.tableData = res.data.data
      })
    },
    getNameData () {
      request({
        url: getDict + '/' + 'NAME',
        method: 'get'
      }).then(res => {
        this.tableData = res.data.data
      })
    }
  },
  created () {
    this.getPositionData()
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.$refs.tree.setCurrentKey(this.data[0].children[0].id)
    // })
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
      min-width: 200px;
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
        width: 100%;
        height: 100%;
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
