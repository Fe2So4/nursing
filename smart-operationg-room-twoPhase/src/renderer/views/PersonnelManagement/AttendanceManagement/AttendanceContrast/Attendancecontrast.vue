<template>
  <div class="attendance-contarst-container">
    <div class="container-left">
      <div class="left-top">
        <div class="contarst-title">
          业务分组
        </div>
        <div class="contarst-content">
          <el-radio-group v-model="topRadio">
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
          业务分组
        </div>
        <div class="contarst-content">
          <el-checkbox-group v-model="selectCheckList">
            <el-checkbox
              style="width:120px"
              :label="item.name"
              v-for="item in checkList"
              :key="item.label"
            />
          </el-checkbox-group>
        </div>
      </div>
      <div class="left-bottom">
        <vxe-table
          size="mini"
          height="450"
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
          />
        </vxe-table>
      </div>
    </div>
    <div class="container-right" />
  </div>
</template>

<script>
export default {
  name: 'AttendanceContrast',
  data () {
    return {
      topRadio: '0',
      topRadioList: [
        {
          label: '0',
          name: '徐汇院区护士组'
        },
        {
          label: '1',
          name: '徐汇院区护士组'
        },
        {
          label: '2',
          name: '徐汇院区护士组'
        },
        {
          label: '3',
          name: '徐汇院区护士组'
        }, {
          label: '4',
          name: '徐汇院区护士组'
        }, {
          label: '5',
          name: '徐汇院区护士组'
        },
        {
          label: '6',
          name: '徐汇院区护士组'
        }
      ],
      checkList: [
        {
          label: '0',
          name: '徐汇院区护士'
        },
        {
          label: '1',
          name: '徐汇院区护士'
        },
        {
          label: '2',
          name: '徐汇院区护士'
        },
        {
          label: '3',
          name: '徐汇院区护士'
        }, {
          label: '4',
          name: '徐汇院护士'
        }, {
          label: '5',
          name: '徐区护士'
        },
        {
          label: '6',
          name: '徐护士'
        },
        {
          label: '0',
          name: '徐汇院区护士'
        },
        {
          label: '1',
          name: '徐汇院区护士'
        },
        {
          label: '2',
          name: '徐汇院区护士'
        },
        {
          label: '3',
          name: '徐汇院区护士'
        }, {
          label: '4',
          name: '徐汇院护士'
        }, {
          label: '5',
          name: '徐区护士'
        },
        {
          label: '6',
          name: '徐护士'
        }
      ],
      selectCheckList: ['周末加班']
    }
  },
  methods: {

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
      padding: 10px;
    }
  }
  .container-right {
    background-color: #fff;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 5px;
    margin-left: 20px;
    flex: 5;
  }
}
</style>
