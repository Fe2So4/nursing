<template>
  <div class="title-info">
    <div class="ti-table">
      <div class="title">
        职称任凭情况
        <el-button
          type="text"
          size="mini"
          icon="el-icon-plus"
          @click="addItem"
        >
          新增
        </el-button>
      </div>
      <div class="ti-table-content">
        <vxe-table
          align="center"
          auto-resize
          :data="userWork"
          size="mini"
          height="100%"
          border
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        >
          <vxe-table-column
            field="userJobName"
            title="职称"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.userJobName"
                size="mini"
              >
                <el-option
                  v-for="item in technologyList"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeName"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ row.userJobName }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="getAccessTime"
            title="资格取得时间"
            :edit-render="{}"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                size="mini"
                v-model="row.getAccessTime"
                type="date"
                format="yyyy-MM-dd"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.getAccessTime, 'YYYY-MM-DD') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="appointTime"
            title="聘任时间"
            :edit-render="{}"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                size="mini"
                v-model="row.appointTime"
                type="date"
                format="yyyy-MM-dd"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.appointTime, 'YYYY-MM-DD') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="desc"
            title="备注"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.desc"
              />
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
      <span>
        <el-button
          type="info"
          size="mini"
          plain
          @click="updataUserJob"
        >保 存</el-button>
        <el-button
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
          label="职称"
        >
          <el-select
            style="width:220px"
            v-model="form.userJobName"
            size="mini"
          >
            <el-option
              v-for="item in technologyList"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="资格取得时间"
        >
          <el-date-picker
            size="mini"
            clearable
            v-model="form.getAccessTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="任聘时间"
        >
          <el-date-picker
            clearable
            size="mini"
            v-model="form.appointTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          label="备注"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="form.desc"
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
  name: 'TitleInfo',
  data () {
    return {
      dialogVisible: false,
      form: {

      },
      tableData: [{endTime: '', xuexiao: '', xueli: '1', xuewei: '1', xxxs: '1'}],
      list: [{label: '测试1', value: '1'}, {label: '测试2', value: '2'}],
      technologyList: []
    }
  },
  props: {
    userWork: {
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
    this.getSelectList('005')
  },
  methods: {
    // 点击返回
    goback () {
      this.$emit('gotoBack')
    },
    formatDate (date, format) {
      return moment(date).format(format)
    },
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
    // 点击新增
    addItem () {
      this.form = {
        getAccessTime: '',
        isDeleted: 0,
        userJobName: '',
        appointTime: '',
        desc: '',
        userCode: ''
      }
      this.dialogVisible = true
    },
    // 点击弹出框确定
    saveDialogForm () {
      if (this.IsEmpty(this.form.userJobName)) {
        this.$alert('用户职称不能为空')
        return false
      }
      if (this.IsEmpty(this.form.getAccessTime)) {
        this.$alert('资格取得时间不能为空')
        return false
      }
      if (this.IsEmpty(this.form.appointTime)) {
        this.$alert('任聘时间不能为空')
        return false
      }
      let obj = [this.form]
      this.form.userCode = this.userCode
      this.$store.dispatch('ReqaddUserAppointInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '添加成功')
          this.dialogVisible = false
          this.$emit('getUserWork')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击删除
    handleEdit (row) {
      console.log(row)
      this.$confirm('是否删除当前职称', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let arr = [row.id]
            let obj = {
              idList: arr
            }
            this.$store.dispatch('ReqdeleteUserAppointInfo', obj).then(res => {
              if (res.data.code === 200) {
                this.openToast('success', '删除成功')
                this.$emit('getUserWork')
              } else {
                this.openToast('error', res.data.msg)
              }
            })
          } else {

          }
        }
      })
    },
    // 点击保存
    updataUserJob () {
      this.$store.dispatch('RequpdateUserAppointInfo', this.userWork).then(res => {
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
          if (num === '005') {
            this.technologyList = res.data.data
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
  .title-info{
    font-size: 14px;
    display: flex;
    height: 100%;
    flex-direction: column;
    .ti-table{
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
      .ti-table-content{
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
