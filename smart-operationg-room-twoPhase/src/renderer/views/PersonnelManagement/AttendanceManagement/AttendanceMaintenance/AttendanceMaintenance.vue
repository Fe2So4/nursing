<template>
  <div class="attendance-maintenance-container">
    <el-select
      style="width:154px"
      v-model="search_select"
      placeholder="请选择"
      size="mini"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="container-table">
      <vxe-table
        size="mini"
        height="600"
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
          title="班次名称"
        />
        <vxe-table-column
          field="sex"
          title="状态"
        />
        <vxe-table-column
          field="age"
          title="一段开始时间"
        />
        <vxe-table-column
          field="age"
          title="一段结束时间"
        />
        <vxe-table-column
          field="age"
          title="二段开始时间"
        />
        <vxe-table-column
          field="age"
          title="二段结束时间"
        />
        <vxe-table-column
          field="age"
          title="操作"
        >
          <template v-slot="{row}">
            <el-button type="text">
              启用 {{ row.age }}
            </el-button>
            <span class="option-line">|</span>
            <el-button
              @click="changeRowInfo(row)"
              type="text"
            >
              编辑
            </el-button>
            <span class="option-line">|</span>
            <el-button type="text">
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="btm-btn">
      <el-button
        size="mini"
        type="primary"
      >
        添加
      </el-button>
      <el-button
        style="margin-left:40px"
        size="mini"
        type="info"
        plain
      >
        保存
      </el-button>
    </div>
    <el-dialog
      :close-on-click-modal="false"

      title="班次时段-编辑"
      :visible.sync="dialogVisible"
      width="55%"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <div class="content-select context-div">
          <div class="select-left left-div">
            班次选择
          </div>
          <div class="select-right right-div">
            <el-radio-group v-model="radio">
              <el-radio
                style="width:210px"
                v-for="item in radioList"
                :key="item.label"
                :label="item.label"
              >
                {{ item.name }}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="content-name context-div">
          <div class="name-left left-div">
            名称
          </div>
          <div class="name-right right-div">
            123
          </div>
        </div>
        <div class="content-one context-div">
          <div class="one-left left-div">
            一阶段 (S)
          </div>
          <div class="one-right right-div">
            <div style="width:120px;display:flex">
              <el-input
                size="mini"
                type="text"
                v-model="dialog_one.start"
              />
            </div>
            <span style="width:60px;margin-left:60px;margin-right:10px">
              一阶段(E)
            </span>
            <div style="width:120px;display:flex">
              <el-input
                size="mini"
                type="text"
                v-model="dialog_one.end"
              />
            </div>
          </div>
        </div>
        <div class="content-two context-div">
          <div class="two-left left-div">
            二阶段 (S)
          </div>
          <div class="two-right right-div">
            <div style="width:120px;display:flex">
              <el-input
                size="mini"
                type="text"
                v-model="dialog_two.start"
              />
            </div>
            <span style="width:60px;margin-left:60px;margin-right:10px">
              二阶段(E)
            </span>
            <div style="width:120px;display:flex">
              <el-input
                size="mini"
                type="text"
                v-model="dialog_two.end"
              />
            </div>
          </div>
        </div>
        <div class="content-instruction context-div">
          <div class="instructions-left left-div">
            说明
          </div>
          <div class="instructions-right right-div">
            <div style="width: 100%;padding-right: 10px;">
              <el-input
                size="mini"
                type="text"
                v-model="instructions"
              />
            </div>
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AttendanceMaintenance',
  data () {
    return {
      dialogVisible: false, // dialog是否显示
      search_select: '0', // 选中的
      select_row: {}, // 选中的数据
      instructions: '', // 说明
      dialog_one: {
        start: '',
        end: ''
      },
      dialog_two: {
        start: '',
        end: ''
      },
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
      ],
      radio: '3',
      radioList: [
        {
          label: '0',
          name: '7点rwarrwrw半'
        },
        {
          label: '1',
          name: '7点半'
        },
        {
          label: '2',
          name: '7点半'
        },
        {
          label: '3',
          name: '7点半'
        },
        {
          label: '4',
          name: '7点半'
        },
        {
          label: '5',
          name: '7点半'
        },
        {
          label: '6',
          name: '7点半'
        },
        {
          label: '7',
          name: '7点半'
        },
        {
          label: '4',
          name: '7点半'
        },
        {
          label: '5',
          name: '7点半'
        },
        {
          label: '6',
          name: '7点半'
        },
        {
          label: '7',
          name: '7点半'
        },
        {
          label: '4',
          name: '7点半asdfgdadasdh'
        },
        {
          label: '5',
          name: '7点半'
        },
        {
          label: '6',
          name: '7点半'
        },
        {
          label: '7',
          name: '7点半'
        },
        {
          label: '7',
          name: '7点半'
        }
      ]
    }
  },
  mounted () {

  },
  methods: {
    // dialog
    handleClose () {
      this.dialogVisible = false
    },
    // 点击编辑
    changeRowInfo (row) {
      this.dialogVisible = true
      this.select_row = row
    }
  }
}
</script>

<style scoped lang="scss">
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
/deep/ .vxe-button--content, .vxe-button--icon, .vxe-button--loading-icon {
  vertical-align: unset;
}
/deep/ .vxe-button.btnRed.type--button:not(.is--disabled):focus {
  border-color: #FF3232;
  box-shadow: 0 0 0.25em 0 #FF3232;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.attendance-maintenance-container {
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
  border-radius: 5px;
  .container-table {
    width: 100%;
    margin-top: 20px;
    .option-line{
      // vertical-align: middle;
      // font-size: 20px;
      display: inline-block;
    }
    .el-button{
      vertical-align: middle;
      &:nth-last-child(1){
        color:#FF5454;
      }
    }

  }
  .btm-btn {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
.context-div {
  line-height: 40px;
  display: flex;
  border: 1px solid #E8E8E8;
}
.left-div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-right: 1px solid #E8E8E8;
}
.right-div {
      display: flex;
  padding: 10px 0;
  padding-left: 10px;
  flex: 9
}
/deep/ .el-radio {
  margin-right: 10px;
}
/deep/ .el-radio__label {
  padding-left: 0px;
}
.dialog-content {
  .content-name, .content-two {
    background-color: #f9fafc;
  }
}
</style>
