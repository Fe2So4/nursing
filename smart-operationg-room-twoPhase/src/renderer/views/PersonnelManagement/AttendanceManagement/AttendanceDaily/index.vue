<template>
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
          style="width:140px;margin-right:15px"
          size="mini"
          type="text"
          v-model="codeOrName"
          placeholder="请输入姓名或工号"
        />
        <el-button
          size="mini"
          type="primary"
        >
          搜索
        </el-button>
        <el-button
          size="mini"
          type="info"
          plain
          style="color:#303133"
        >
          批量设置
        </el-button>
        <el-button
          size="mini"
          type="info"
          plain
          style="color:#303133"
        >
          保存
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
          field="name"
          title="姓名"
        />
        <vxe-table-column
          field="sex1"
          title="周一"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.sex1"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="sex2"
          title="周二"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.sex2"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="sex3"
          title="周三"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.sex3"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="sex4"
          title="周四"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.sex4"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="sex5"
          title="周五"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.sex5"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="sex6"
          title="周六"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.sex6"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="sex7"
          title="周日"
        >
          <template v-slot="{row}">
            <el-select
              style="width:154px;margin-right:20px"
              v-model="row.sex7"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in tableSelectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </vxe-table-column>
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
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' },
        { name: '1', sex1: '1', sex2: '2', sex3: '3', sex4: '4', sex5: '5', sex6: '6', sex7: '7' }
      ],
      // 表格内下拉框列表字典
      tableSelectList: [
        {
          label: '一值班',
          value: '1'
        },
        {
          label: '二值班',
          value: '2'
        },
        {
          label: '三值班',
          value: '3'
        },
        {
          label: '四值班',
          value: '4'
        },
        {
          label: '五值班',
          value: '5'
        },
        {
          label: '六值班',
          value: '6'
        },
        {
          label: '七值班',
          value: '7'
        }
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
    },
    // 全选
    selectAllEvent ({ checked, records }) {
      console.log(checked ? '所有勾选事件' : '所有取消事件', records)
    },
    // 点击选中
    selectChangeEvent ({ checked, records }) {
      console.log(checked ? '勾选事件' : '取消事件', records)
    },
    // 获取选中
    getSelectEvent () {
      let selectRecords = this.$refs.xTable1.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
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
