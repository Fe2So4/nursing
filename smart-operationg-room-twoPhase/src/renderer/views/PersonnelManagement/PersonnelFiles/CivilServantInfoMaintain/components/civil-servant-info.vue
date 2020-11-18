<template>
  <div class="civil-servant-info">
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
        <el-form-item label="工号">
          <el-input
            v-if="dialogTitle.includes('新增')"
            placeholder="新增工号由后台自动带出"
            readonly
            v-model="form.workerCode"
          />
          <el-input
            v-else
            readonly
            v-model="form.workerCode"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="姓名"
        >
          <el-input v-model="form.workerName" />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="职务"
        >
          <el-input v-model="form.workerDuty" />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="编号"
        >
          <el-input
            readonly
            placeholder="编号由后台自动带出"
            v-model="form.workerNumber"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="科室"
        >
          <el-input v-model="form.workerDept" />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="所属院区"
        >
          <el-select v-model="form.subordinateCampus">
            <el-option
              v-for="item in yuanquList"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="入职日期"
        >
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.workStartTime"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="工种"
        >
          <el-select v-model="form.workType">
            <el-option
              v-for="item in deptList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="状态"
        >
          <el-select v-model="form.workerState">
            <el-option
              v-for="item in depstatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
  data () {
    return {
      // form: {
      //   id: null,
      //   workerName: '',
      //   subordinateCampus: '',
      //   workStartTime: '',
      //   workType: '',
      //   workerCode: '',
      //   workerDept: '',
      //   workerNumber: '',
      //   workerState: '',
      //   workerDuty: ''

      // },
      yuanquList: [
        {
          typeName: '徐汇院区',
          id: 0
        }
      ],
      deptList: [
        {
          label: '长期',
          value: 1
        }, {
          label: '临时',
          value: 2
        }
      ],
      depstatus: [
        {
          label: '在职',
          value: 1
        },
        {
          label: '离职',
          value: 2
        },
        {
          label: '停用',
          value: 3
        }
      ]
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    dialogTitle: {
      type: String,
      required: false,
      default: ''
    },
    form: {
      type: Object,
      required: false,
      default () {
        return {
          id: null,
          workerName: '',
          subordinateCampus: '',
          workStartTime: '',
          workType: '',
          workerCode: '',
          workerDept: '',
          workerNumber: '',
          workerState: '',
          workerDuty: ''

        }
      }
    }
  },
  methods: {
    // 点击保存
    save () {
      if (this.IsEmpty(this.form.workerName)) {
        this.$alert('姓名不能为空')
        return false
      }
      if (this.IsEmpty(this.form.subordinateCampus)) {
        this.$alert('院区不能为空')
        return false
      }
      if (this.IsEmpty(this.form.workStartTime)) {
        this.$alert('入职日期不能为空')
        return false
      }
      if (this.IsEmpty(this.form.workType)) {
        this.$alert('工种不能为空')
        return false
      }
      if (this.IsEmpty(this.form.workerDept)) {
        this.$alert('科室不能为空')
        return false
      }
      // if (this.IsEmpty(this.form.workerNumber)) {
      //   this.$alert('编号不能为空')
      //   return false
      // }
      if (this.IsEmpty(this.form.workerState)) {
        this.$alert('状态不能为空')
        return false
      }
      if (this.IsEmpty(this.form.workerDuty)) {
        this.$alert('职务不能为空')
        return false
      }

      if (this.dialogTitle.includes('新增')) {
        this.$emit('saveAddItem', this.form)
      } else {
        console.log(111)
        this.$emit('upDataItem', this.form)
      }
    },
    handleClose () {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__header {
  border-bottom: 1px solid #EBEBEB;
  padding: 10px 20px 10px;
}
/deep/.el-dialog__title {
  font-size: 16px;
  font-weight: 600;
}
/deep/ .el-dialog__headerbtn {
  top: 15px;
}
  .civil-servant-info{
    .el-form{
      .el-input,.el-select{
        width: 200px;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 200px;
      }
    }
  }

/deep/.el-form-item.bitianxiang:not(.is-no-asterisk)>.el-form-item__label:before{
  content:'*'!important;
  color:#f56c6c !important;
  margin-right:4px !important;
}
</style>
