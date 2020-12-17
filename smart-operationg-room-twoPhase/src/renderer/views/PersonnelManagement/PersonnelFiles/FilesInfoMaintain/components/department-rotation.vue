<template>
  <div
    class="department-rotation"
  >
    <div class="dr-table">
      <div class="title">
        科室轮转情况
        <el-button
          style="color:#333333"
          type="text"
          size="mini"
          icon="el-icon-plus"
          @click="addkeshiItem"
        >
          新增
        </el-button>
      </div>
      <div class="dr-table-content">
        <vxe-table
          align="center"
          :data="userDeptTurn"
          size="mini"
          auto-resize
          height="250"
          border
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        >
          <vxe-table-column
            field="deptTurnStartTime"
            title="起止时间"
            :edit-render="{}"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                size="mini"
                v-model="row.randomTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="changeData(row)"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate2(row.deptTurnStartTime,row.deptTurnEndTime, 'YYYY-MM-DD') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="deptTurnDepartment"
            title="单位"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input v-model="scope.row.deptTurnDepartment" />
            </template>
            <template v-slot="{ row }">
              {{ row.deptTurnDepartment }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="deptName"
            title="科室"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.deptName"
                size="mini"
              >
                <el-option
                  v-for="item in deptList"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeName"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ row.deptName }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="remark"
            title="备注"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.remark"
              />
            </template>
            <template v-slot="{ row }">
              {{ row.remark }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                type="text"
                size="mini"
                style="color: #FF5454;"
                @click="handlekeshiEdit(row)"
              >
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <div class="dr-table">
      <div class="title">
        手术室科室轮转情况
        <el-button
          style="color:#333333"
          type="text"
          size="mini"
          icon="el-icon-plus"
          @click="addkeshiItem1"
        >
          新增
        </el-button>
      </div>
      <div class="dr-table-content">
        <vxe-table
          align="center"
          :data="userOperDeptTurn"
          size="mini"
          height="250"
          auto-resize
          border
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        >
          <vxe-table-column
            field="specialistTourTime"
            title="专科巡回时间"
            :edit-render="{}"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                size="mini"
                v-model="row.specialistTourTime"
                type="date"
                format="yyyy-MM-dd"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.specialistTourTime, 'YYYY-MM-DD') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="specialistItinerantWork"
            title="专科巡回工作"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.specialistItinerantWork"
              />
            </template>
            <template v-slot="{row}">
              {{ row.specialistItinerantWork }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="specialistWashTime"
            title="专科洗手时间"
            :edit-render="{}"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                size="mini"
                v-model="row.specialistWashTime"
                type="date"
                format="yyyy-MM-dd"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.specialistWashTime, 'YYYY-MM-DD') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="specialistWashWork"
            title="专科洗手工作"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.specialistWashWork"
              />
            </template>
            <template v-slot="{row}">
              {{ row.specialistWashWork }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="remark"
            title="备注"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.remark"
              />
            </template>
            <template v-slot="{row}">
              {{ row.remark }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                style="color: #FF5454;"
                type="text"
                size="mini"
                @click="handleshousuEdit(row)"
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
        @click="saveTwo"
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
      title="科室轮转-新增"
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
          label="轮转开始时间"
        >
          <el-date-picker
            size="mini"
            clearable
            v-model="keshiForm.deptTurnStartTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="轮转结束时间"
        >
          <el-date-picker
            clearable
            size="mini"
            v-model="keshiForm.deptTurnEndTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="科室轮转单位"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="keshiForm.deptTurnDepartment"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="科室名称"
        >
          <el-select
            clearable
            style="width:220px"
            v-model="keshiForm.deptName"
            size="mini"
          >
            <el-option
              v-for="item in deptList"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.typeName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="keshiForm.remark"
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
    <el-dialog
      title="手术科室轮转-新增"
      :visible.sync="dialogVisible1"
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
          label="专科巡回时间"
        >
          <el-date-picker
            size="mini"
            clearable
            v-model="shousuForm.specialistTourTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item
          class="bitianxiang"
          label="专科巡回工作"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="shousuForm.specialistItinerantWork"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="专科洗手时间"
        >
          <el-date-picker
            clearable
            size="mini"
            v-model="shousuForm.specialistWashTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          class="bitianxiang"
          label="专科洗手工作"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="shousuForm.specialistWashWork"
          />
        </el-form-item>
        <el-form-item
          label="备注"
        >
          <el-input
            style="width:220px"
            clearable
            v-model="shousuForm.remark"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="dialogVisible1 = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="saveDialogshousuForm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import XEUtils from 'xe-utils'
export default {
  name: 'DepartmentRotation',
  data () {
    return {
      keshiForm: {
        deptTurnStartTime: '',
        deptTurnEndTime: '',
        deptTurnDepartment: '',
        deptName: '',
        remark: '',
        userCode: ''
      },
      shousuForm: {
        specialistTourTime: '',
        specialistItinerantWork: '',
        specialistWashTime: '',
        specialistWashWork: '',
        remark: '',
        userCode: ''

      },
      dialogVisible: false,
      dialogVisible1: false,

      deptList: [],
      tableData: [{endTime: '', xuexiao: '', xueli: '1', xuewei: '1', xxxs: '1'}],
      list: [{label: '测试1', value: '1'}, {label: '测试2', value: '2'}]
    }
  },
  props: {
    userDeptTurn: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    userOperDeptTurn: {
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
    this.getSelectList('011')
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
    changeData (row) {
      row.deptTurnStartTime = row.randomTime[0]
      row.deptTurnEndTime = row.randomTime[1]
    },
    // 点击新增科室轮转
    addkeshiItem () {
      this.keshiForm = {
        deptTurnStartTime: '',
        deptTurnEndTime: '',
        deptTurnDepartment: '',
        deptName: '',
        remark: '',
        userCode: ''
      }

      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 保存轮转科室
    saveDialogForm () {
      if (this.IsEmpty(this.keshiForm.deptTurnStartTime)) {
        this.$alert('科室轮转开始时间不能为空')
        return false
      }
      if (this.IsEmpty(this.keshiForm.deptTurnEndTime)) {
        this.$alert('科室轮转结束时间不能为空')
        return false
      }
      if (this.IsEmpty(this.keshiForm.deptTurnDepartment)) {
        this.$alert('科室轮转单位不能为空')
        return false
      }
      if (this.IsEmpty(this.keshiForm.deptName)) {
        this.$alert('科室名称不能为空')
        return false
      }
      let obj = [this.keshiForm]
      this.keshiForm.userCode = this.userCode
      this.$store.dispatch('ReqaddUserDeptTurnInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '添加成功')
          this.dialogVisible = false
          this.$emit('getUserDeptTurnInfo')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击轮转删除
    handlekeshiEdit (row) {
      this.$confirm('是否删除当前科室轮转信息', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let arr = [row.id]
            let obj = {
              idList: arr
            }
            this.$store.dispatch('ReqdeleteUserDeptTurnInfo', obj).then(res => {
              if (res.data.code === 200) {
                this.openToast('success', '删除成功')
                this.$emit('getUserDeptTurnInfo')
              } else {
                this.openToast('error', res.data.msg)
              }
            })
          } else {

          }
        }
      })
    },
    // 点击手术科室轮转
    addkeshiItem1 () {
      this.shousuForm = {
        remark: '',
        specialistItinerantWork: '',
        specialistTourTime: '',
        specialistWashTime: '',
        specialistWashWork: '',
        userCode: ''
      }
      this.dialogVisible1 = true
    },
    saveDialogshousuForm () {
      if (this.IsEmpty(this.shousuForm.specialistTourTime)) {
        this.$alert('专科巡回时间不能为空')
        return false
      }
      if (this.IsEmpty(this.shousuForm.specialistItinerantWork)) {
        this.$alert('专科巡回工作不能为空')
        return false
      }
      if (this.IsEmpty(this.shousuForm.specialistWashTime)) {
        this.$alert('专科洗手时间不能为空')
        return false
      }
      if (this.IsEmpty(this.shousuForm.specialistWashWork)) {
        this.$alert('专科洗手工作不能为空')
        return false
      }
      let obj = [this.shousuForm]
      this.shousuForm.userCode = this.userCode
      this.$store.dispatch('ReqaddUserOperDeptTurnInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '添加成功')
          this.dialogVisible1 = false
          this.$emit('getUserOperDeptTurnInfo')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击手术室轮转删除
    handleshousuEdit (row) {
      this.$confirm('是否删除当前手术科室轮转信息', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let arr = [row.id]
            let obj = {
              idList: arr
            }
            this.$store.dispatch('ReqdeleteUserOperDeptTurnInfo', obj).then(res => {
              if (res.data.code === 200) {
                this.openToast('success', '删除成功')
                this.$emit('getUserOperDeptTurnInfo')
              } else {
                this.openToast('error', res.data.msg)
              }
            })
          } else {

          }
        }
      })
    },
    // 点击保存修改两个
    saveTwo () {
      this.updatakeshi()
      this.updatashoushu()
    },
    // 更新科室轮转
    updatakeshi () {
      this.$store.dispatch('RequpdateUserDeptTurnInfo', this.userDeptTurn).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '科室轮转保存成功')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 更新手术科室轮转
    updatashoushu () {
      this.$store.dispatch('RequpdateUserOperDeptTurnInfo', this.userOperDeptTurn).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '手术科室保存成功')
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: num
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          if (num === '011') {
            this.deptList = res.data.data
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
  .department-rotation{
    font-size: 14px;
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-table{
      flex: 1;
      display: flex;
      flex-direction: column;
      .title{
        font-weight: 600;
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
