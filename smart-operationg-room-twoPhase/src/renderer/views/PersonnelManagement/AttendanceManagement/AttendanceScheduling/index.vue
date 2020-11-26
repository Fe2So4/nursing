<template>
  <!-- 排班结果展示 -->
  <div class="attendance-scheduling-container">
    <div class="container-header">
      <span class="day-title">{{ dayTitle }}</span>
      <el-date-picker
        style="border:none"
        v-model="dateValue"
        type="week"
        format="yyyy 第 WW 周"
      />
      <div style="position: absolute;right: 20px;">
        <el-button
          size="mini"
          type="info"
          plain
        >
          导出Excel
        </el-button>
      </div>
    </div>

    <div class="container-table">
      <vxe-table
        size="mini"
        height="auto"
        auto-resize
        stripe
        ref="xTable"
        class="mytable-scrollbar"
        highlight-current-row
        highlight-hover-row
        align="center"
        :data="showTableList"
      >
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
        />
        <vxe-table-column
          field="week2.weekClassName"
          :title="weekList[1].weekTimeName"
        />
        <vxe-table-column
          field="week3.weekClassName"
          :title="weekList[2].weekTimeName"
        />
        <vxe-table-column
          field="week4.weekClassName"
          :title="weekList[3].weekTimeName"
        />
        <vxe-table-column
          field="week5.weekClassName"
          :title="weekList[4].weekTimeName"
        />
        <vxe-table-column
          field="week6.weekClassName"
          :title="weekList[5].weekTimeName"
        />
        <vxe-table-column
          field="week7.weekClassName"
          :title="weekList[6].weekTimeName"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceSheduling',
  data () {
    return {
      dateValue: '',
      nowDay: '',
      dayList: [''],
      dayTitle: '2020年第43周',
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

      tableList: [

      ],
      showTableList: []
    }
  },
  mounted () {
    let a = new Date()
    this.nowDay = this.utilsGetNowDay(a)
    this.dayTitle = this.utilsGetWeek(a)
    this.getTableList()
  },
  methods: {
    getTableList () {
      let obj = {
        selectTime: this.nowDay
      }
      this.$store.dispatch('ReqGetPersonnelScheduling', obj).then(res => {
        if (res.data.code === 200) {
          this.weekList = res.data.data[0].week
          this.tableList = res.data.data[1].userData

          // console.log(this.weekList, 'weekList')
          console.log(this.tableList, 'tableList')

          let arr = []
          this.tableList.forEach(item => {
            console.log(item)
            let obj = {
              userCode: item.userCode,
              userName: item.userName,
              week1: {
                id: '',
                weekClassName: ''
              },
              week2: {
                id: '',
                weekClassName: ''
              },
              week3: {
                id: '',
                weekClassName: ''
              },
              week4: {
                id: '',
                weekClassName: ''
              },
              week5: {
                id: '',
                weekClassName: ''
              },
              week6: {
                id: '',
                weekClassName: ''
              },
              week7: {
                id: '',
                weekClassName: ''
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
  },
  watch: {
    'dateValue': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.nowDay = this.utilsGetNowDay(newVal)
        this.getTableList()
        this.dayTitle = this.utilsGetWeek(newVal)
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
.attendance-scheduling-container {
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
    padding-top: 20px;
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
    flex: 9;
  }
}
</style>
