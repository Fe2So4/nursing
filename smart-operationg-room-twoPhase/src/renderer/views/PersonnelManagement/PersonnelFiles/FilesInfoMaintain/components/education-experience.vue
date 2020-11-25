<template>
  <div class="education-experience">
    <div class="ee-table">
      <div class="title">
        何时何月何校发给毕业证书（中专以上学历）
        <el-button
          type="text"
          size="mini"
          icon="el-icon-plus"
          @click="addItemList"
        >
          新增
        </el-button>
      </div>
      <div class="ee-table-content">
        <vxe-table
          align="center"
          :data="educationInfo"
          size="mini"
          height="100%"
          auto-resize
          border
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        >
          <vxe-table-column
            field="educateEndTime"
            title="截止时间"
            :edit-render="{}"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                size="mini"
                v-model="row.educateEndTime"
                type="date"
                format="yyyy-MM-dd"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.educateEndTime, 'YYYY-MM-DD') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="schoolGraduation"
            title="毕业院校"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.schoolGraduation"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="education"
            title="学历"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.education"
                size="mini"
              >
                <el-option
                  v-for="item in originalEducateBack"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeName"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ row.education }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="degree"
            title="学位"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.degree"
                size="mini"
              >
                <el-option
                  v-for="item in degreeList"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeName"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ row.degree }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="learningForm"
            title="学习形式（全日制、夜大等）"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.learningForm"
                size="mini"
              >
                <el-option
                  v-for="item in learningFormList"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeName"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ row.learningForm }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                size="mini"
                @click="handeledit(row)"
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
        @click="updataUserEducation"
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
          label="教育开始时间"
        >
          <el-date-picker
            size="mini"
            clearable
            v-model="form.educateStartTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="教育结束时间"
        >
          <el-date-picker
            clearable
            size="mini"
            v-model="form.educateEndTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="毕业院校"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="form.schoolGraduation"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="学历"
        >
          <el-select
            clearable
            style="width:220px"
            v-model="form.education"
            size="mini"
          >
            <el-option
              v-for="item in originalEducateBack"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="学位"
        >
          <el-select
            clearable
            style="width:220px"
            v-model="form.degree"
            size="mini"
          >
            <el-option
              v-for="item in degreeList"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="学习形式"
        >
          <el-select
            clearable
            style="width:220px"
            v-model="form.learningForm"
            size="mini"
          >
            <el-option
              v-for="item in learningFormList"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
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
  name: 'EducationExperience',
  data () {
    return {
      form: {
        educationInfo: [],
        educateStartTime: '',
        educateEndTime: '',
        education: '',
        degree: '',
        learningForm: '',
        schoolGraduation: '',
        userCode: ''
      },
      dialogVisible: false,
      list: [{label: '测试1', value: '1'}, {label: '测试2', value: '2'}],
      originalEducateBack: [],
      degreeList: [],
      learningFormList: []
    }
  },
  props: {
    educationInfo: {
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
  mounted () {
    this.getSelectList('010')
    this.getSelectList('014')
    this.getSelectList('015')
  },
  methods: {
    // 点击返回
    goback () {
      this.$emit('gotoBack')
    },
    formatDate (date, format) {
      console.log(date)
      return moment(date).format(format)
    },
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
    // 点击新增列表
    addItemList () {
      this.dialogVisible = true
      this.form = {
        educateStartTime: '',
        educateEndTime: '',
        education: '',
        degree: '',
        learningForm: '',
        schoolGraduation: '',
        userCode: '',
        isDeleted: 0
      }
      this.dialogVisible = true
    },
    // 点击保存新增列表
    saveDialogForm () {
      if (this.IsEmpty(this.form.educateStartTime)) {
        this.$alert('教育开始时间不能为空')
        return false
      }
      if (this.IsEmpty(this.form.educateEndTime)) {
        this.$alert('教育结束时间不能为空')
        return false
      }
      if (this.IsEmpty(this.form.schoolGraduation)) {
        this.$alert('毕业学校不能为空')
        return false
      }
      if (this.IsEmpty(this.form.degree)) {
        this.$alert('学位不能为空')
        return false
      }
      if (this.IsEmpty(this.form.education)) {
        this.$alert('学历不能为空')
        return false
      }
      if (this.IsEmpty(this.form.learningForm)) {
        this.$alert('学习形式不能为空')
        return false
      }
      let obj = [this.form]
      this.form.userCode = this.userCode
      this.$store.dispatch('ReqaddUserEducationInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '添加成功')
          this.dialogVisible = false
          this.$emit('getEducationInfo')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击删除
    handeledit (row) {
      console.log(row)
      this.$confirm('是否删除当前教育经历', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let arr = [row.id]
            let obj = {
              idList: arr
            }
            this.$store.dispatch('ReqdeleteUserEducationInfo', obj).then(res => {
              if (res.data.code === 200) {
                this.openToast('success', '删除成功')
                this.$emit('getEducationInfo')
              } else {
                this.openToast('error', res.data.msg)
              }
            })
          } else {

          }
        }
      })
    },
    // 保存用户教育经历
    updataUserEducation () {
      this.$store.dispatch('RequpdateUserEducationInfo', this.educationInfo).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '保存成功')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: num
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          if (num === '010') {
            this.originalEducateBack = res.data.data
          } else if (num === '014') {
            this.degreeList = res.data.data
          } else if (num === '015') {
            this.learningFormList = res.data.data
          }
        } else {
          this.openToast('error', res.data.msg)
        }
      })
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
  .education-experience{
    font-size: 14px;
    display: flex;
    height: 100%;
    flex-direction: column;
    .ee-table{
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
      .ee-table-content{
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
