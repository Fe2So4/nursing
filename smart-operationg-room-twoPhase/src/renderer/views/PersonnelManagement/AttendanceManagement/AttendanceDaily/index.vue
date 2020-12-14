<template>
  <!-- 人员排班日常维护 -->
  <div class="attendance-daily-container">
    <div class="container-header">
      <span class="day-title">{{ dayTitle }}</span>
      <el-date-picker
        style="border:none"
        v-model="dateValue"
        type="week"
        format="yyyy 第 WW 周"
      />
      <div style="position: absolute;right: 20px;">
        <el-input
          clearable
          style="width:180px;margin-right:15px"
          size="mini"
          type="text"
          v-model="codeOrName"
          placeholder="请输入姓名或工号"
        />
        <el-button
          size="mini"
          type="primary"
          @click="getTableList"
        >
          搜 索
        </el-button>
        <el-button
          size="mini"
          type="info"
          plain

          @click="batchSet"
        >
          批量设置
        </el-button>
        <el-button
          size="mini"
          type="info"
          plain

          @click="save"
        >
          保 存
        </el-button>
      </div>
    </div>

    <div class="container-table">
      <vxe-table
        size="mini"
        height="auto"
        auto-resize
        stripe
        ref="xTable1"
        class="mytable-scrollbar"
        highlight-current-row
        highlight-hover-row
        align="center"
        :data="showTableList"
        @checkbox-all="selectAllEvent"
        @checkbox-change="selectChangeEvent"
      >
        >
        <vxe-table-column
          type="checkbox"
          width="60"
        />
        <vxe-table-column
          type="seq"
          title="序号"
          width="100"
        />
        <vxe-table-column
          field="userName"
          title="姓名"
        />
        <vxe-table-column
          field="week1.weekClassName"
          :title="weekList[0].weekTimeName"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.week1.weekClassName"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="week2.weekClassName"
          :title="weekList[1].weekTimeName"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.week2.weekClassName"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="week3.weekClassName"
          :title="weekList[2].weekTimeName"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.week3.weekClassName"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="week4.weekClassName"
          :title="weekList[3].weekTimeName"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.week4.weekClassName"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="week5.weekClassName"
          :title="weekList[4].weekTimeName"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.week5.weekClassName"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="week6.weekClassName"
          :title="weekList[5].weekTimeName"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.week6.weekClassName"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="week7.weekClassName"
          :title="weekList[6].weekTimeName"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.week7.weekClassName"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.typeName"
                :label="item.typeName"
                :value="item.typeName"
              />
            </el-select>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="批量设置"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div>
        <ul style="display:flex;justify-content: space-around">
          <li
            style="width:154px;text-align:center"
            v-for="item in weekList"
            :key="item.weekTime"
          >
            {{ item.weekTimeName }}
          </li>
        </ul>
        <ul style="display:flex;justify-content: space-around;margin-top:30px">
          <li
            v-for="(item,index) in weekList"
            :key="item.weekTime"
          >
            <el-select
              style="width:154px"
              v-model="batchSetSelect[index]"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="v in tableSelectList"
                :key="v.typeName"
                :label="v.typeName"
                :value="v.typeName"
              />
            </el-select>
          </li>
        </ul>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="handleClose"
        >取 消</el-button>
        <el-button
          style="margin-left:30px"
          size="mini"
          type="primary"
          @click="saveBatch"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AttendanceSheduling',
  data () {
    return {
      dialogVisible: false,
      batchSetSelect: ['', '', '', '', '', '', ''],
      dateValue: '',
      nowDay: '',
      dayTitle: '2020年第43周',
      search_select: '0',
      codeOrName: '',
      // 下拉框列表
      options: [
        {
          label: '全部',
          value: '0'
        },
        {
          label: '启用',
          value: '1'
        },
        {
          label: '停用',
          value: '2'
        },
        {
          label: '删除',
          value: '3'
        }
      ],
      tableList: [

      ],
      showTableList: [],
      weekList: [{
        'weekTime': '2020-11-09',
        'weekTimeName': '周一(11/09)'
      },
      {
        'weekTime': '2020-11-10',
        'weekTimeName': '周二(11/10)'
      },
      {
        'weekTime': '2020-11-11',
        'weekTimeName': '周三(11/11)'
      },
      {
        'weekTime': '2020-11-12',
        'weekTimeName': '周四(11/12)'
      },
      {
        'weekTime': '2020-11-13',
        'weekTimeName': '周五(11/13)'
      },
      {
        'weekTime': '2020-11-14',
        'weekTimeName': '周六(11/14)'
      },
      {
        'weekTime': '2020-11-15',
        'weekTimeName': '周日(11/15)'
      }],
      // 表格内下拉框列表字典
      tableSelectList: [

      ],
      selectRecords: [] // 表格选中列表
    }
  },
  mounted () {
    let a = new Date()
    this.nowDay = this.utilsGetNowDay(a)
    this.dayTitle = this.utilsGetWeek(a)

    this.getSelectList()
    this.getTableList()
  },
  methods: {
    // 获取展示列表数据
    getTableList () {
      let obj = {
        selectTime: this.nowDay,
        name: this.codeOrName || ''
      }
      this.$store.dispatch('ReqGetPersonnelScheduling', obj).then(res => {
        if (res.data.code === 200) {
          this.weekList = res.data.data[0].week
          this.tableList = res.data.data[1].userData

          let arr = []
          this.tableList.forEach(item => {
            let obj = {
              userCode: item.userCode,
              userName: item.userName,
              week1: {
                id: '',
                weekClassName: '',
                weekTime: this.weekList[0].weekTime
              },
              week2: {
                id: '',
                weekClassName: '',
                weekTime: this.weekList[1].weekTime
              },
              week3: {
                id: '',
                weekClassName: '',
                weekTime: this.weekList[2].weekTime
              },
              week4: {
                id: '',
                weekClassName: '',
                weekTime: this.weekList[3].weekTime
              },
              week5: {
                id: '',
                weekClassName: '',
                weekTime: this.weekList[4].weekTime
              },
              week6: {
                id: '',
                weekClassName: '',
                weekTime: this.weekList[5].weekTime
              },
              week7: {
                id: '',
                weekClassName: '',
                weekTime: this.weekList[6].weekTime
              }
            }

            item.list.forEach(v => {
              if (v.weekTimeName.includes('一')) {
                obj.week1.id = v.id
                obj.week1.weekClassName = v.weekClassName

                return false
              }
              if (v.weekTimeName.includes('二')) {
                obj.week2.id = v.id
                obj.week2.weekClassName = v.weekClassName

                return false
              }
              if (v.weekTimeName.includes('三')) {
                obj.week3.id = v.id
                obj.week3.weekClassName = v.weekClassName

                return false
              }
              if (v.weekTimeName.includes('四')) {
                obj.week4.id = v.id
                obj.week4.weekClassName = v.weekClassName

                return false
              }
              if (v.weekTimeName.includes('五')) {
                obj.week5.id = v.id
                obj.week5.weekClassName = v.weekClassName

                return false
              }
              if (v.weekTimeName.includes('六')) {
                obj.week6.id = v.id
                obj.week6.weekClassName = v.weekClassName

                return false
              }
              if (v.weekTimeName.includes('日')) {
                obj.week7.id = v.id
                obj.week7.weekClassName = v.weekClassName

                return false
              }
            })
            arr.push(obj)
          })
          this.showTableList = arr
          console.log(this.showTableList)
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 获取下拉框数据字典
    getSelectList () {
      let obj = {
        belongSerialNumber: '006'
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          this.tableSelectList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击批量设置
    batchSet () {
      if (this.IsEmpty(this.selectRecords)) {
        this.$alert('请先勾选需要设置的数据')
        return false
      }
      this.dialogVisible = true
    },
    // 点击批量设置弹窗保存
    saveBatch () {
      this.selectRecords.forEach((item, index) => {
        item.week1.weekClassName = this.batchSetSelect[0]
        item.week2.weekClassName = this.batchSetSelect[1]
        item.week3.weekClassName = this.batchSetSelect[2]
        item.week4.weekClassName = this.batchSetSelect[3]
        item.week5.weekClassName = this.batchSetSelect[4]
        item.week6.weekClassName = this.batchSetSelect[5]
        item.week7.weekClassName = this.batchSetSelect[6]
      })
      this.dialogVisible = false
    },
    // 点击保存按钮
    save () {
      console.log(this.showTableList)
      let arr = []
      let weekMap = ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7']
      this.showTableList.forEach(item => {
        weekMap.forEach(week => {
          if (item[week].weekClassName) {
            let obj = {
              userCode: item.userCode,
              userName: item.userName
            }
            obj.weekClassName = item[week].weekClassName
            obj.id = item[week].id
            obj.weekTime = item[week].weekTime
            arr.push(obj)
          }
        })
      })
      this.$store.dispatch('ReqUpdatePersionSchedule', arr).then(res => {
        if (res.data.code === 200) {
          this.openToast('success', '保存成功')
          this.getTableList()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 全选
    selectAllEvent ({ checked, records }) {
      this.selectRecords = records
    },
    // 点击选中
    selectChangeEvent ({ checked, records }) {
      this.selectRecords = records
    },
    handleClose () {
      this.batchSetSelect = ['', '', '', '', '', '', '']
      this.dialogVisible = false
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
  },

  watch: {
    'dateValue': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        let a = new Date(newVal)
        this.nowDay = this.utilsGetNowDay(a)
        this.dayTitle = this.utilsGetWeek(newVal)
        this.getTableList()
      }
    }
  }
}
</script>

<style  scoped lang="scss">
@import '@/styles/scrollbar.scss';
/deep/ .el-input--prefix .el-input__inner {
  color: transparent;
  border: none;
}
/deep/ .el-input__suffix-inner .el-icon-circle-close {
  display: none;
}
/deep/.el-input__icon.el-icon-date {
  cursor: pointer;
  font-size: 18px;
  color: #3377FF;
}
/deep/ .vxe-cell--title {
  color: #000;
}
/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width:30px !important
}
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
.dialog-footer {
  display: flex;
  justify-content: center;
}
.attendance-daily-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
  border-radius: 5px;
  .container-header {
    flex: 1;
    position: relative;
    // padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .day-title {
      color: #333;
      font-size: 14px;
      font-weight: bold;
      font-family: Microsoft YaHei;
    }
  }
  .container-table{
    flex: 12;
  }
}
</style>
