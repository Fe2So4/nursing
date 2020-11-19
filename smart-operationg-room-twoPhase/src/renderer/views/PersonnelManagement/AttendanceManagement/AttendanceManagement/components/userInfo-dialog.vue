<template>
  <div class="civil-servant-info">
    <el-dialog
      :close-on-click-modal="false"
      title="新增员工"
      :visible.sync="userDialogVisible"
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
            placeholder="选择名称后带出"
            readonly
            v-model="form.workerCode"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="姓名"
        >
          <el-select
            style="width:154px"
            v-model="form.workerCode"
            placeholder="请选择"
            size="mini"
            @change="changeSelect"
          >
            <el-option
              v-for="item in newNurList"
              :key="item.userCode"
              :label="item.userName"
              :value="item.userCode"
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
      form: {
        workerName: '',
        workerCode: ''
      },
      newNurList: []
    }
  },
  props: {
    userDialogVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    nurList: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    addItem: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  mounted () {

  },
  methods: {
    spliceItemList () {
      let addItemId = []
      let nurListId = []
      this.addItem.detailList.forEach(item => {
        addItemId.push(item.groupMemberCode)
      })
      this.nurList.forEach(item => {
        nurListId.push(item.userCode)
      })
      let _arr2Set = new Set(addItemId)
      let diff = nurListId.filter(item => !_arr2Set.has(item))

      this.newNurList = []
      this.nurList.forEach(item => {
        diff.forEach(v => {
          if (item.userCode === v) {
            this.newNurList.push(item)
          }
        })
      })
    },
    // 点击保存
    save () {
      let obj = {
        groupMemberCode: this.form.workerCode,
        groupMemberName: this.form.workerName,
        isGroupLeader: 0,
        transactionBelongCode: String(this.addItem.id),
        addItem: this.addItem
      }
      this.$emit('getAddNurList', obj)
    },
    changeSelect (val) {
      this.newNurList.forEach(item => {
        if (item.userCode === val) {
          this.form.workerName = item.userName
          return false
        }
      })
    },
    handleClose () {
      this.$emit('handleClose')
    }
  },
  watch: {
    'userDialogVisible': function (val) {
      if (val === true) {
        this.spliceItemList()
      } else {
        this.form.workerName = ''
        this.form.workerCode = ''
      }
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
