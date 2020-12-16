<template>
  <!-- 班次时段维护 -->
  <div class="attendance-maintenance-container">
    <div class="btm-btn">
      <div class="btm-btn">
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
      </div>
      <div>
        <el-button
          size="mini"
          type="primary"
          @click="addItem"
        >
          添加
        </el-button>
      </div>
    </div>
    <div class="container-table">
      <vxe-table
        size="mini"
        height="769"
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
          field="className"
          title="班次名称"
        />
        <vxe-table-column
          field="useState"
          title="状态"
        >
          <template v-slot="{row}">
            {{ row.useState === 1?'启用':'禁用' }}
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="firstStartTime"
          title="一段开始时间"
        />
        <vxe-table-column
          field="firstEndTime"
          title="一段结束时间"
        />
        <vxe-table-column
          field="secondStartTime"
          title="二段开始时间"
        />
        <vxe-table-column
          field="secondEndTime"
          title="二段结束时间"
        />
        <vxe-table-column
          title="操作"
        >
          <template v-slot="{row}">
            <el-button
              type="text"
              @click="changeListType(row)"
            >
              {{ row.useState === 1?'禁用':'启用' }}
            </el-button>
            <span class="option-line">|</span>
            <el-button
              @click="changeRowInfo(row)"
              type="text"
            >
              编辑
            </el-button>
            <span class="option-line">|</span>
            <el-button
              @click="delectListItem(row)"
              type="text"
            >
              删除
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>

    <el-dialog
      :close-on-click-modal="false"

      :title="dialogTitle"
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
            <el-radio-group v-model="select_row.className">
              <el-radio
                style="width:210px"
                v-for="item in radioList"
                :key="item.id"
                :label="item.typeName"
              >
                {{ item.typeName }}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="content-name context-div">
          <div class="name-left left-div">
            名称
          </div>
          <div class="name-right right-div">
            {{ select_row.className }}
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
                placeholder="输入格式 08:00"
                v-model="select_row.firstStartTime"
              />
            </div>
            <span style="width:60px;margin-left:60px;margin-right:10px">
              一阶段(E)
            </span>
            <div style="width:120px;display:flex">
              <el-input
                size="mini"
                type="text"
                placeholder="输入格式 12:00"
                v-model="select_row.firstEndTime"
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
                placeholder="输入格式 13:00"
                v-model="select_row.secondStartTime"
              />
            </div>
            <span style="width:60px;margin-left:60px;margin-right:10px">
              二阶段(E)
            </span>
            <div style="width:120px;display:flex">
              <el-input
                size="mini"
                type="text"
                placeholder="输入格式 18:00"
                v-model="select_row.secondEndTime"
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
                v-model="select_row.classDoc"
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
          @click="saveDio"
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
      dialogTitle: '',
      dialogType: '0',
      dialogVisible: false, // dialog是否显示
      search_select: '0', // 选中的
      select_row: {
        id: '',
        classDoc: '',
        className: '',
        firstStartTime: '',
        firstEndTime: '',
        secondStartTime: '',
        secondEndTime: '',
        useState: '1'
      }, // 选中的数据
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
          label: '禁用',
          value: '2'
        }
      ],
      tableList: [

      ],
      radioList: [

      ]
    }
  },
  mounted () {
    this.getTableList()
    this.getSelectList()
  },
  methods: {
    // 获取表格数据
    getTableList () {
      let obj = {
        userStete: this.search_select
      }
      this.$store.dispatch('ReqGetClassTimeInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.tableList = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },

    // dialog
    handleClose () {
      this.dialogVisible = false
    },
    // 点击启用或者禁用
    changeListType (row) {
      console.log(row)
      if (row.useState === 1) {
        row.useState = 2
      } else {
        row.useState = 1
      }
      this.dialogType = '1'
      this.select_row = JSON.parse(JSON.stringify(row))
      this.saveDio()
    },
    // 点击新增
    addItem () {
      this.dialogVisible = true
      this.dialogTitle = '班次时段-新增'
      this.dialogType = '0'
      this.select_row = {
        id: '',
        className: '',
        firstEndTime: '',
        firstStartTime: '',
        secondEndTime: '',
        secondStartTime: '',
        useState: 1,
        classDoc: ''
      }
    },
    // 点击编辑
    changeRowInfo (row) {
      this.dialogTitle = '班次时段-编辑'
      this.dialogType = '1'
      this.dialogVisible = true
      this.select_row = JSON.parse(JSON.stringify(row))
      console.log(this.select_row)
    },
    // 点击删除
    delectListItem (row) {
      let arr = [row.id]
      let obj = {
        idList: arr
      }
      this.$store.dispatch('ReqDeleteClassTimeInfo', obj).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.openToast('success', '删除成功')
          this.getTableList()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 弹出框点击确定
    saveDio () {
      console.log(this.select_row)
      if (this.IsEmpty(this.select_row.className)) {
        this.$alert('班次选择不能为空')
        return false
      }
      let obj = [{
        classDoc: this.select_row.classDoc,
        className: this.select_row.className,
        firstEndTime: this.select_row.firstEndTime,
        firstStartTime: this.select_row.firstStartTime,
        id: this.select_row.id,
        secondEndTime: this.select_row.secondEndTime,
        secondStartTime: this.select_row.secondStartTime,
        useState: this.select_row.useState
      }]
      if (this.dialogType === '0') {
        this.$store.dispatch('ReqaddClassTimeInfo', obj).then(res => {
          if (res.data.code === 200) {
            this.openToast('success', '添加成功')
          } else {
            this.openToast('error', res.data.msg)
          }
          this.dialogVisible = false
          this.getTableList()
        })
      } else {
        console.log(obj, 'obj')
        this.$store.dispatch('ReqUpdateClassTimeInfo', obj).then(res => {
          if (res.data.code === 200) {
            this.openToast('success', '修改成功')
          } else {
            this.openToast('error', res.data.msg)
          }
          this.dialogVisible = false
          this.getTableList()
        })
      }
    },
    // 获取下拉框数据字典
    getSelectList () {
      let obj = {
        belongSerialNumber: '006'
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          this.radioList = res.data.data
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
    'search_select': function (newVal, oldVal) {
      this.getTableList()
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
    display: flex;
    justify-content: space-between;
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
/deep/ .vxe-cell--title {
  color: #000;
}
.dialog-content {
  .content-name, .content-two {
    background-color: #f9fafc;
  }
}
</style>
