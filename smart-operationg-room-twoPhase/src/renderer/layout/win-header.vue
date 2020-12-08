<template>
  <div
    class="layout-header"
  >
    <div
      class="left"
      @click="backRouter"
    >
      <img
        src="../assets/logo-tq.png"
        alt=""
      >
      <span>Dandelion 智慧手术中心<i />临床护理</span>
    </div>

    <div class="right">
      <div class="userInfo">
        <span>
          <i class="el-icon-user-solid" />
          {{ '万富贵' }}
        </span>
        <span
          class="leave"
          @click="dialogVisible = true"
        >
          <i class="el-icon-edit" />
          我要请假</span>
      </div>

      <div class="caozuo">
        <Operation />
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="请假申请"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form
        class="form"
        size="mini"
        label-width="120px"
      >
        <el-form-item label="请假人员:">
          <el-input
            placeholder="请输入姓名"
            v-model="form.userName"
          />
        </el-form-item>
        <el-form-item
          label="请假类型:"
        >
          <el-select
            v-model="form.leaveType"
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
        </el-form-item>
        <el-form-item
          label="开始日期"
        >
          <el-date-picker
            style="width:178px"
            v-model="form.startDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item
          label="结束日期"
        >
          <el-date-picker
            style="width:178px"
            v-model="form.endDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item
          label="请假天数:"
        >
          <el-select
            v-model="form.leaveType"
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
        </el-form-item>
        <el-form-item
          label="何时离开:"
        >
          <el-select
            v-model="form.leaveType"
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
        </el-form-item>
        <el-form-item label="请假原因:">
          <el-input
            placeholder="请输入姓名"
            v-model="form.userName"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
        >保 存</el-button>

        <el-button
          @click="gotoSearch"
          type="primary"
          size="mini"
        >请假查询</el-button>
        <el-button
          @click="handleClose"
          size="mini"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Operation from '@/components/win-operation'

export default {
  data () {
    return {
      form: {
        userName: '',
        leaveType: 0
      },
      dialogVisible: false,
      options: [{label: '提前走', value: 0}, {label: '准点走', value: 1}]

    }
  },
  methods: {
    handleChange (param) {
      switch (param) {
        case 1:
          this.$router.push('/home/large-screen')
          break
        case 2:
          this.$router.push('/home/receiving-orders')
          break
        case 3:
          this.$router.push('/home/client-operation-orders')
      }
    },
    handleClose () {
      this.dialogVisible = false
    },
    // 跳转请假查询
    gotoSearch () {
      this.handleClose()
      this.$router.push('/personnel/search-leave')
    },
    backRouter () {
      this.$router.push('/index-tab')
    }
  },
  components: {
    Operation
  },
  mounted () {
  },
  destroyed () {
  }

}
</script>

<style lang="scss" scoped>
  .layout-header{
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #666666, #303030);
    color: #fff;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    .left{
      cursor: pointer;
      font-size: 20px;
      img{
        vertical-align: middle;
      }
      span{
        margin-left:19px;
        i{
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          vertical-align: middle;
          background: #fff;
          margin:0 4px;
        }
      }
    }
    .right{
      position: relative;
      display: flex;
      font-size: 16px;
      margin-right: 21px;
      .userInfo {
        font-size: 14px;
        margin-right: 150px;
        .leave {
          cursor: pointer;
          margin-left: 20px;
          &:hover {
            font-size: 15px;
          }
        }
      }
      .caozuo {
        position: absolute;
        // top: -15px;
        right: 0;
      }
    }
    .form {
      .el-input {
        width: 178px;
      }
      .el-select {
        width: 178px;
      }

    }
  }
</style>>
