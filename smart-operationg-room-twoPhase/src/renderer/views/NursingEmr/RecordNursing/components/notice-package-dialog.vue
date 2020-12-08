<template>
  <div class="notice-package-dialog">
    <el-dialog
      title="通知补发包"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div class="content">
        <div class="content-search">
          <el-select
            clearable
            v-model="select"
            size="mini"
          >
            <el-option
              label="12"
              value="12"
            >
              12
            </el-option>
          </el-select>
        </div>
        <div>
          <vxe-table
            stripe
            align="center"
            :data="tableData"
            highlight-hover-row
            size="mini"
            class="mytable-scrollbar"
            height="300px"
            auto-resize
          >
            <vxe-table-column
              type="seq"
              title="是否加急"
            />
            <vxe-table-column
              field="userName"
              title="器械包"
            />
            <vxe-table-column
              field="userName"
              title="补发数"
            >
              <template v-slot="{row}">
                <el-input v-model="row.userName" />
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="userName"
              title="操作"
            >
              <!-- <template v-slot="{row}"> -->
              <template>
                <el-button type="primary">
                  删除
                </el-button>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <div class="option">
          <el-button
            size="mini"
            type="primary"
          >
            更新器械包
          </el-button>
          <el-button
            size="mini"
            type="primary"
          >
            发送
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleClose"
          >
            取消
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NoticePackageDialog',
  data () {
    return {
      select: '',
      tableData: []
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>
  .notice-package-dialog{
    text-align: left;
    .content-search{
      display: flex;
      padding-bottom: 10px;
      .el-select{
        flex: 0.8;
      }
    }
    .option{
      text-align: center;
      padding-top: 10px;
    }
  }
</style>
