<template>
  <div class="attendance-contarst-container">
    <div class="container-left">
      <div class="left-top">
        <div class="contarst-title">
          业务分组
        </div>
        <div class="contarst-content">
          <el-radio-group
            v-model="topRadio"
            @change="changeBusiness"
          >
            <el-radio
              style="width:160px;margin-top:5px"
              v-for="item in topRadioList"
              :key="item.label"
              :label="item.label"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="left-content">
        <div class="contarst-title">
          班次名称
        </div>
        <div class="contarst-content">
          <el-checkbox-group
            v-model="selectCheckList"
            @change="changeShift"
          >
            <el-checkbox
              style="width:120px"
              :label="item.typeName"
              v-for="item in checkList"
              :key="item.typeName"
            />
          </el-checkbox-group>
        </div>
      </div>
      <div class="left-bottom">
        <vxe-table
          size="mini"
          height="420"
          stripe
          ref="xTable"
          class="mytable-scrollbar"

          align="center"
          :data="selectTableList"
        >
          <vxe-table-column
            field="order"
            title="班次顺序"
            width="100"
          />
          <vxe-table-column
            field="name"
            title="业务分组"
          />
          <vxe-table-column
            field="sex"
            title="班次名称"
          />
          <vxe-table-column
            field="age"
            title="操作"
          >
            <template v-slot="{row}">
              <el-button
                style="color:#3377FF;font-size:16px;"
                @click="changeRowInfo('1',row)"
                type="text"
              >
                <i class="el-icon-top" />
              </el-button>
              <span class="option-line" />
              <el-button
                @click="changeRowInfo('2',row)"
                style="color:#74A2FF;font-size:16px"
                type="text"
              >
                <i class="el-icon-bottom" />
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <div style="width:100%;text-align:center;margin-top:5px">
          <el-button
            @click="getBottomTableList"
            type="primary"
            size="mini"
          >
            保 存
          </el-button>
        </div>
      </div>
    </div>
    <div class="container-right">
      <vxe-table
        size="mini"
        height="100%"
        stripe
        ref="xTable"
        class="mytable-scrollbar"
        highlight-current-row
        highlight-hover-row
        align="center"
        :data="rightTableList"
      >
        <vxe-table-column
          type="seq"
          title="序号"
          width="100"
        />
        <vxe-table-column
          width="180px"
          field="name"
          title="业务分组"
        />
        <vxe-table-column
          field="sex"
          title="班次顺序"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceContrast',
  data () {
    return {
      businessName: '',
      topRadio: '',
      topRadioList: [
        {
          label: '0',
          name: '徐汇院区护士组0'
        },
        {
          label: '1',
          name: '徐汇院区护士组1'
        },
        {
          label: '2',
          name: '徐汇院区护士组2'
        }
      ],
      checkList: [

      ],
      selectCheckList: [],
      selectTableList: [

      ],
      rightTableList: [

      ]
    }
  },
  mounted () {
    this.getSelectList()
  },
  methods: {
    changeBusiness () {
      this.selectCheckList = []
      this.selectTableList = []
      this.topRadioList.forEach(item => {
        if (item.label === this.topRadio) {
          this.businessName = item.name
        }
      })
    },
    changeShift () {
      if (this.IsEmpty(this.businessName)) {
        this.$alert('请先选择业务分组')
        this.selectCheckList = []
        return false
      }
      this.selectTableList = []
      this.selectCheckList.forEach((item, index) => {
        let obj = {
          index: index,
          order: index + 1,
          name: this.businessName,
          sex: item
        }
        this.selectTableList.push(obj)
      })
    },
    changeRowInfo (type, row) {
      // 点击向上
      if (type === '1') {
        this.upGo(row.index)
      } else { // 点击向下
        this.downGo(row.index)
      }
    },
    upGo (index) {
      if (index !== 0) {
        this.selectCheckList[index] = this.selectCheckList.splice(index - 1, 1, this.selectCheckList[index])[0]
      } else {
        this.selectCheckList.push(this.selectCheckList.shift())
      }
      this.changeShift()
    },
    downGo (index) {
      console.log(index, this.selectCheckList.length - 1)
      if (index !== this.selectCheckList.length - 1) {
        this.selectCheckList[index] = this.selectCheckList.splice(index + 1, 1, this.selectCheckList[index])[0]
      } else {
        this.selectCheckList.unshift(this.selectCheckList.splice(index, 1)[0])
      }
      this.changeShift()
    },
    // 获取下拉框数据字典
    getSelectList () {
      let obj = {
        belongSerialNumber: '006'
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          this.checkList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    getBottomTableList () {}
  },
  watch: {
    // 'topRadio': function (newVal, oldVal) {
    //   this.getBottomTableList()
    // }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-scrollbar__wrap{
  overflow-x: hidden !important;
}
/deep/ .el-checkbox {
  margin-right: 0px;
}
/deep/ .vxe-cell--title {
  color: #000;
}
/deep/ .vxe-table .vxe-table--border-line {
  border: none;
}
.attendance-contarst-container {
  width:100%;
  height: 100%;
  display: flex;
  .container-left {
    flex: 3;
    display: flex;
    flex-direction: column;
    .left-top {
      background-color: #fff;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      padding: 10px;
      min-height: 90px;
      display: flex;
      flex-direction: column;
      .contarst-title {
        flex: 3;
        color: #333333;
        font-weight: Bold;
        font-size: 14px;
      }
      .contarst-content {
        display: flex;
        align-items: center;
        flex: 6;
      }
    }
    .left-content {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      margin-top: 20px;
      padding: 10px;
      min-height: 230px;
      .contarst-title {
        flex: 1;
        color: #333333;
        font-weight: Bold;
        font-size: 14px;
      }
      .contarst-content {
        // display: flex;
        // align-items: center;
        flex: 9;
      }
    }
    .left-bottom {
      background-color: #fff;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      // height: 580px;
      flex: 1;
      margin-top: 20px;
      // padding: 10px;
    }
  }
  .container-right {
    background-color: #fff;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 5px;
    margin-left: 20px;
    flex: 5;
    // padding: 20px 20px;/* */
    // box-sizing: border-box;
  }
}
</style>
