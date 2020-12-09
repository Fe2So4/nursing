<template>
  <el-dialog
    :close-on-click-modal="false"
    title="请假审批"
    :visible.sync="approvalVisible"
    width="400px"
    :before-close="handleClose"
  >
    <el-form
      class="form"
      size="mini"
      label-width="120px"
    >
      <el-form-item label="请假人员:">
        <el-input
          placeholder="请输入姓名"
          v-model="form.userName"
        />
      </el-form-item>
      <el-form-item
        label="请假类型:"
      >
        <el-select
          v-model="form.leaveType"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="开始日期"
      >
        <el-date-picker
          style="width:178px"
          v-model="form.startDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="结束日期"
      >
        <el-date-picker
          style="width:178px"
          v-model="form.endDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="请假天数:"
      >
        <el-select
          v-model="form.leaveType"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="何时离开:"
      >
        <el-select
          v-model="form.leaveType"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="请假原因:">
        <el-input
          placeholder="请输入姓名"
          v-model="form.userName"
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
      >保 存</el-button>

      <el-button
        type="primary"
        size="mini"
      >请假查询</el-button>
      <el-button
        @click="handleClose"
        size="mini"
      >取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      form: {
        userName: '',
        leaveType: 0
      },
      options: [{label: '提前走', value: 0}, {label: '准点走', value: 1}]
    }
  },
  props: {
    approvalVisible: {
      type: Boolean,
      defalut: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleSearchLeave')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input,.el-select {
  width: 178px;
}
</style>
