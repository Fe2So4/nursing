<template>
  <div class="real-nursing-check">
    <div class="option">
      <el-button
        type="primary"
        size="mini"
      >
        解 锁
      </el-button>
    </div>
    <div class="content">
      <div>
        <el-form
          size="mini"
          :inline="true"
        >
          <el-form-item
            label="主刀医生："
            style="margin-top:unset;"
          >
            <el-input v-model="form.doc" />
          </el-form-item>
        </el-form>
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="姓名"
          />
          <vxe-table-column
            field="userName"
            title="工号"
          />
          <vxe-table-column
            field="userName"
            title="所属部门"
          />
          <vxe-table-column
            field="userName"
            title="交接班"
          />
          <vxe-table-column
            field="userName"
            title=""
          />
          <vxe-table-column
            field="specifications"
            title="操作"
          />
        </vxe-table>
      </div>
      <div>
        <el-form
          size="mini"
          :inline="true"
        >
          <el-form-item label="辅刀一助：">
            <el-input v-model="form.doc" />
          </el-form-item>
        </el-form>
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="姓名"
          />
          <vxe-table-column
            field="userName"
            title="工号"
          />
          <vxe-table-column
            field="userName"
            title="所属部门"
          />
          <vxe-table-column
            field="userName"
            title="交接班"
          />
          <vxe-table-column
            field="userName"
            title=""
          />
          <vxe-table-column
            field="specifications"
            title="操作"
          />
        </vxe-table>
      </div>
      <div>
        <el-form
          size="mini"
          :inline="true"
        >
          <el-form-item label="辅刀二助：">
            <el-input v-model="form.doc" />
          </el-form-item>
        </el-form>
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="姓名"
          />
          <vxe-table-column
            field="userName"
            title="工号"
          />
          <vxe-table-column
            field="userName"
            title="所属部门"
          />
          <vxe-table-column
            field="userName"
            title="交接班"
          />
          <vxe-table-column
            field="userName"
            title=""
          />
          <vxe-table-column
            field="specifications"
            title="操作"
          />
        </vxe-table>
      </div>
      <div>
        <el-form
          size="mini"
          :inline="true"
        >
          <el-form-item label="器械护士：">
            <el-input v-model="form.doc" />
          </el-form-item>
          <el-form-item>
            若是带教老师请勾选
          </el-form-item>
        </el-form>
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="姓名"
          />
          <vxe-table-column
            field="userName"
            title="工号"
          />
          <vxe-table-column
            field="userName"
            title="所属部门"
          />
          <vxe-table-column
            field="userName"
            title="交接班"
          />
          <vxe-table-column
            field="userName"
            title="是否带教"
          />
          <vxe-table-column
            field="specifications"
            title="操作"
          />
        </vxe-table>
      </div>
      <div>
        <el-form
          size="mini"
          :inline="true"
        >
          <el-form-item label="巡回护士：">
            <el-input v-model="form.doc" />
          </el-form-item>
          <el-form-item>
            若是带教老师请勾选
          </el-form-item>
        </el-form>
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="姓名"
          />
          <vxe-table-column
            field="userName"
            title="工号"
          />
          <vxe-table-column
            field="userName"
            title="所属部门"
          />
          <vxe-table-column
            field="userName"
            title="交接班"
          />
          <vxe-table-column
            field="userName"
            title="是否带教"
          />
          <vxe-table-column
            field="specifications"
            title="操作"
          />
        </vxe-table>
      </div>
      <div>
        <el-form
          size="mini"
          :inline="true"
        >
          <el-form-item label="体外人员：">
            <el-input v-model="form.doc" />
          </el-form-item>
          <el-form-item>
            若是带教老师请勾选
          </el-form-item>
        </el-form>
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="姓名"
          />
          <vxe-table-column
            field="userName"
            title="工号"
          />
          <vxe-table-column
            field="userName"
            title="所属部门"
          />
          <vxe-table-column
            field="userName"
            title="交接班"
          />
          <vxe-table-column
            field="userName"
            title="是否带教"
          />
          <vxe-table-column
            field="specifications"
            title="操作"
          />
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NursingInfo',
  data () {
    return {
      form: {
        doc: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .real-nursing-check{
    height: 100%;
    .option{
      text-align: right;
      padding-right: 20px;
      padding-bottom: 20px;
    }
    .content{
      height: calc(100% - 48px);
      overflow-y: scroll;
      padding-bottom: 20px;
      .el-form{
        display: flex;
        justify-content: space-between;
        .el-form-item{
          margin: 10px 0;
        }
      }
    }
  }
</style>
