<template>
  <div class="training-further-study">
    <div class="trs-table">
      <div class="title">
        培训进修情况（>2个月）
        <el-button
          type="text"
          size="mini"
          icon="el-icon-plus"
          @click="addItem"
        >
          新增
        </el-button>
      </div>
      <div class="trs-table-content">
        <vxe-table
          align="center"
          auto-resize
          :data="userTrainInfo"
          size="mini"
          height="100%"
          border
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        >
          <vxe-table-column
            field="endTime"
            title="起止时间"
            :edit-render="{}"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                size="mini"
                @change="changeData(row)"
                v-model="row.endTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate2(row.trainStartStart,row.trainStartEnd, 'YYYY-MM-DD') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="trainCondition"
            title="培训进修情况"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.trainCondition"
              />
            </template>
            <template v-slot="{row}">
              {{ row.trainCondition }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="trainUnit"
            title="培训进修单位"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.trainUnit"
              />
            </template>
            <template v-slot="{row}">
              {{ row.trainUnit }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="certificationStatus"
            title="获证情况"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.certificationStatus"
              />
            </template>
            <template v-slot="{row}">
              {{ row.trainUnit }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                size="mini"
                @click="handleEdit(row)"
              >
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <div class="option">
      <span>
        <el-button
          type="info"
          size="mini"
          plain
        >选择文件</el-button>
      </span>
      <span><el-button
        type="info"
        size="mini"
        plain
        @click="updataTable"
      >保 存</el-button><el-button
        v-show="loginType === 0"
        type="info"
        size="mini"
        plain
        @click="goback"
      >返 回</el-button>
      </span>
    </div>
    <el-dialog
      title="教育经历-新增"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        size="mini"
        label-width="180px"
      >
        <el-form-item
          class="bitianxiang"
          label="培训开始时间"
        >
          <el-date-picker
            size="mini"
            clearable
            v-model="form.trainStartStart"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="培训结束时间"
        >
          <el-date-picker
            clearable
            size="mini"
            v-model="form.trainStartEnd"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="培训进修单位"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="form.trainUnit"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="培训进修情况"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="form.trainCondition"
          />
        </el-form-item>
        <el-form-item
          label="获证情况"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="form.certificationStatus"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="saveDialogForm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import XEUtils from 'xe-utils'
export default {
  name: 'TrainingFurtherStudy',
  data () {
    return {
      form: {
        userCode: '',
        certificationStatus: '',
        trainStartStart: '',
        trainStartEnd: '',
        trainCondition: '',
        trainUnit: ''
      },
      dialogVisible: false,
      tableData: [{endTime: '', xuexiao: '', xueli: '1', xuewei: '1', xxxs: '1'}],
      list: [{label: '测试1', value: '1'}, {label: '测试2', value: '2'}]
    }
  },
  props: {
    userTrainInfo: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    userCode: {
      type: String,
      required: true,
      default: ''
    },
    loginType: {
      type: Number,
      required: false,
      default: 1
    }
  },
  methods: {
    // 点击返回
    goback () {
      this.$emit('gotoBack')
    },
    formatDate (date, format) {
      return moment(date).format(format)
    },
    formatDate2 (date1, data2, format) {
      return moment(date1).format(format) + '-' + moment(data2).format(format)
    },
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 点击新增
    addItem () {
      this.form = {
        userCode: '',
        certificationStatus: '',
        trainStartStart: '',
        trainStartEnd: '',
        trainCondition: '',
        trainUnit: ''
      }
      this.dialogVisible = true
    },
    // 保存弹出框确定
    saveDialogForm () {
      if (this.IsEmpty(this.form.trainStartStart)) {
        this.$alert('培训开始时间不能为空')
        return false
      }
      if (this.IsEmpty(this.form.trainStartEnd)) {
        this.$alert('培训结束时间不能为空')
        return false
      }
      if (this.IsEmpty(this.form.trainCondition)) {
        this.$alert('培训进修情况不能为空')
        return false
      }
      if (this.IsEmpty(this.form.trainUnit)) {
        this.$alert('培训进修单位不能为空')
        return false
      }
      let obj = [this.form]
      this.form.userCode = this.userCode
      this.$store.dispatch('ReqaddUserTrainInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '添加成功')
          this.dialogVisible = false
          this.$emit('getReqgetUserTrainInfo')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 删除
    handleEdit (row) {
      this.$confirm('是否删除当前培训情况', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let arr = [row.id]
            let obj = {
              idList: arr
            }
            this.$store.dispatch('ReqdeleteUserTrainInfo', obj).then(res => {
              if (res.data.code === 200) {
                this.openToast('success', '删除成功')
                this.$emit('getReqgetUserTrainInfo')
              } else {
                this.openToast('error', res.data.msg)
              }
            })
          } else {

          }
        }
      })
    },
    // 更新科室轮转
    updataTable () {
      this.$store.dispatch('RequpdateUserTrainInfo', this.userTrainInfo).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '培训情况保存成功')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 改变日期
    changeData (row) {
      row.trainStartStart = row.endTime[0]
      row.trainStartEnd = row.endTime[1]
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
  .training-further-study{
    font-size: 14px;
    display: flex;
    height: 100%;
    flex-direction: column;
    .trs-table{
      flex: 1;
      display: flex;
      flex-direction: column;
      .title{
        background:#C5D3F1;
        color: #333333;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        position: relative;
        .el-button{
          position: absolute;
          right: 40px;
          height: 30px;
        }
      }
      .trs-table-content{
        flex: 1;
        .el-button{
          color: #FF5454;
        }
      }
    }
    .option{
      display: flex;
      margin: 30px 0;
      justify-content: space-between;
      span{
        &:first-child{
          margin-left: 26px;
        }
        &:last-child{
          margin-right: 26px;
        }
      }
    }
  }
</style>
