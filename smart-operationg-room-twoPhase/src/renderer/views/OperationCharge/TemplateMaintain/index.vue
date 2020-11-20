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
        :data="data"
        node-key="id"
        highlight-current
        default-expand-all
        ref="tree"
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >
          <!-- slot-scope="{ node, data }" -->
          <span :class="data.children?'tree-parent-title':''">{{ node.label }}</span>
          <span
            v-if="data.children"
            class="tree-option"
          >
            <i
              class="el-icon-plus"
              @click="handleAdd(1)"
            />
          </span>
          <span
            v-if="!data.children"
            class="tree-option"
          >
            <!-- <i
              class="el-icon-plus"
              @click="handleAdd(2)"
            /> -->
            <i class="el-icon-minus" />
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
          />
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
      @handleClose="handleAdd"
    />
  </div>
</template>

<script>
import AddGroup from './components/add-group'
export default {
  name: 'TemplateMaintain',
  data () {
    return {
      form: {
        value: ''
      },
      filterText: '',
      addVisible: false,
      data: [{id: '1',
        label: '术中收费模块',
        isChild: false,
        children: [{
          id: '1-1',
          label: '徐汇院区手术室',
          isChild: false,
          children: [{
            id: '1-1-1',
            label: '大肠组套',
            isChild: true
          }]
        }, {
          id: '1-2',
          label: '肝脏外科',
          isChild: false,
          children: [] }, {
          id: '1-3',
          label: '头颈外科',
          isChild: false,
          children: [] }, {
          id: '1-4',
          label: '大肠外科',
          isChild: false,
          children: [] }]}],
      tableData: [{name: 'd'}],
      dialogTitle: '新增组套'
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
  methods: {
    handleAdd (param = 0) {
      this.addVisible = !this.addVisible
      if (param === 1) {
        this.dialogTitle = '新增组套'
      } else if (param === 2) {
        this.dialogTitle = '编辑组套'
      }
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
