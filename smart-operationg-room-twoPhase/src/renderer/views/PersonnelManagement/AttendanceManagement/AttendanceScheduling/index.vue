<template>
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
          style="color:#303133"
        >
          导出Excel
        </el-button>
      </div>
    </div>

    <div class="container-table">
      <vxe-table
        size="mini"
        :height="Wheight"
        stripe
        ref="xTable"
        class="mytable-scrollbar"
        highlight-current-row
        highlight-hover-row
        align="center"
        :data="tableList"
      >
        <vxe-table-column
          type="seq"
          title="序号"
          width="100"
        />
        <vxe-table-column
          field="name"
          title="姓名"
        />
        <vxe-table-column
          field="sex"
          title="周一"
        />
        <vxe-table-column
          field="age"
          title="周二"
        />
        <vxe-table-column
          field="age"
          title="周三"
        />
        <vxe-table-column
          field="age"
          title="周四"
        />
        <vxe-table-column
          field="age"
          title="周五"
        />
        <vxe-table-column
          field="age"
          title="周六"
        />
        <vxe-table-column
          field="age"
          title="周日"
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
      Wheight: 100,
      clientHeight: document.body.clientHeight,
      dateValue: '',
      dayTitle: '2020年第43周',
      tableList: [
        {name: '1', sex: '1', age: '2'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'},
        {name: '1', sex: '1', age: '1'}
      ]
    }
  },
  mounted () {
    // console.log(dom.offsetHeight - 40)
    this.changeHeight()
    let that = this
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.body.clientHeight
        that.clientHeight = window.clientHeight
      })()
    }
    let a = new Date()
    this.dayTitle = this.utilsGetWeek(a)
  },
  methods: {
    changeHeight () {
      let dom = document.getElementsByClassName('container-table')[0]
      this.Wheight = dom.offsetHeight
    }
  },
  watch: {
    'dateValue': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dayTitle = this.utilsGetWeek(newVal)
      }
    },
    clientHeight (newVal, oldVal) {
      this.changeHeight()
    }
  }
}
</script>

<style  scoped lang="scss">
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
