<template>
  <div class="template-maintain">
    <div class="dg-left">
      <div class="tree-search">
        <el-input
          size="mini"
          placeholder="搜索模板"
          v-model="filterText"
          suffix-icon="el-icon-search"
        />
      </div>
      <el-tree
        :data="treeData"
        node-key="id"
        highlight-current
        default-expand-all
        ref="tree"
        :props="treeProps"
        @node-click="handleTreeClick"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >
          <span :class="data.child?'tree-parent-title':''">{{ node.label }}</span>
          <span
            v-if="data.level"
            class="tree-option"
          >
            <i
              class="el-icon-plus"
              @click="handleAdd(data)"
            />
          </span>
          <span
            v-if="!data.level"
            class="tree-option"
          >
            <!-- <i
              class="el-icon-plus"
              @click="handleAdd(2)"
            /> -->
            <i
              class="el-icon-minus"
              @click="handleDeleteTree(data.id)"
            />
          </span>
        </span>
      </el-tree>
    </div>
    <div class="dg-right">
      <div class="dg-r-top">
        <el-form
          :inline="true"
          size="mini"
        >
          <!-- <el-form-item label="">
            <el-input
              v-model="form.value"
              placeholder="扫描或者手动输入设备序列号"
            />
          </el-form-item> -->
          <el-form-item label="">
            <el-button
              type="info"
              plain
              @click="handleAddItem"
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
          ref="xTable"
        >
          <vxe-table-column
            field="sort"
            title="序号"
          />
          <vxe-table-column
            field="sex"
            title="类别"
          />
          <vxe-table-column
            field="sex"
            title="类别名称"
          />
          <vxe-table-column
            field="no"
            title="项目编码"
          />
          <vxe-table-column
            field="no"
            title="项目名称"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.name"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="age1"
            title="规格"
          />
          <vxe-table-column
            field="age1"
            title="单位"
          />
          <vxe-table-column
            field="age2"
            title="用量"
          >
            <template v-slot="{ row }">
              <el-input-number
                size="mini"
                v-model="row.age"
                :controls="false"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="age1"
            title="单价(元)"
          />
          <vxe-table-column
            field="age2"
            title="费用(元)"
          />
          <vxe-table-column
            field="age1"
            title="排序号"
          >
            <template v-slot="{ row }">
              <el-input-number
                size="mini"
                v-model="row.age"
                :controls="false"
              />
            </template>
          </vxe-table-column>
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
    <AddGroup
      :add-visible="addVisible"
      :dialog-title="dialogTitle"
      :tree-data="treeObj"
      @getTreeData="getTreeData"
      @handleClose="handleCloseTreeDialog"
    />
  </div>
</template>

<script>
import AddGroup from './components/add-group'
import request from '@/utils/request'
import {getTreeData, deleteTreeNode, addTemplateDetail, getDictCharge} from '@/api/charge'
export default {
  name: 'TemplateMaintain',
  data () {
    return {
      form: {
        value: ''
      },
      treeProps: {
        label: 'name',
        children: 'child'
      },
      filterText: '',
      addVisible: false,
      treeData: [],
      tableData: [{name: 'd'}],
      dialogTitle: '新增模板',
      treeObj: {},
      defaultActive: '',
      categoryList: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  components: {
    AddGroup
  },
  created () {
    this.getTreeData()
    this.getChargeCategoryList()
  },
  methods: {
    getTreeData () {
      request({
        url: getTreeData,
        method: 'get'
      }).then(res => {
        let data = res.data.data
        data.forEach(item => {
          item.level = 'first'
          item.child.forEach(_item => {
            _item.level = 'second'
          })
        })
        this.treeData = data
      })
    },
    handleSave () {
      request({
        method: 'post',
        url: addTemplateDetail,
        data: {

        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$emit({type: 'success', message: '保存成功'})
        } else {
          this.$emit({type: 'error', message: res.data.msg})
        }
      })
    },
    getChargeCategoryList () {
      request(
        {
          url: getDictCharge + '/' + 'CHARGCATEGORY',
          method: 'get'
        }
      ).then(res => {
        this.categoryList = res.data.data
      })
    },
    handleAddItem () {
      let record = {
        // deviceNo: '',
        // dictNameId: data.dictNameId,
        // dictPositionId: data.dictPositionId,
        // groupId: data.groupId,
        // model: data.model,
        // name: data.name,
        // position: data.position,
        // serialNo: data.serialNo,
        // sort: data.sort
      }
      this.$refs.xTable.insertAt(record)
    },
    handleCloseTreeDialog () {
      this.addVisible = false
    },
    handleTreeClick (nodeObj) {
      this.defaultActive = nodeObj.id
      // this.getDeviceGroupData()
    },
    handleDeleteTree (id) {
      request({
        method: 'get',
        url: deleteTreeNode + '/' + id
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({type: 'success', message: '删除成功'})
          this.getTreeData()
        } else {
          this.$message({type: 'error', message: res.data.msg})
        }
      })
    },
    handleAdd (param) {
      this.addVisible = true
      this.treeObj = param
      console.log(param)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
  .template-maintain{
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
      .tree-search{
        padding: 10px 10px 0;
        /deep/ .el-input__prefix{
          color: #3377FF;
        }
        /deep/.el-input__suffix{
          color: #3377FF;
        }
      }
      /deep/ .el-tree-node__content{
        display: flex;
        margin-top: 10px !important;
        justify-content: space-between;
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
        &.tree-parent-title{
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
        padding: 20px 0 0 20px;
        box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
        border-radius: 5px;
        .el-form{
          text-align: right;
          padding-right: 30px;
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
