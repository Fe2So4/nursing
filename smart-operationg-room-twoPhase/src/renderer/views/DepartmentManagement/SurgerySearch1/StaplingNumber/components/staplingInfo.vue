<template>
  <div class="staplingInfo-container">
    <div class="container-userInfo">
      <table
        class="userInfo-table"
        style="width:100%"
      >
        <thead />
        <tbody>
          <tr>
            <td>
              <span class="user-title">病人编号:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">病人姓名:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">出生日期:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">年龄:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">性别:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">身份证号:</span>
              <span>657126</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="user-title">科室:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">病房:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">病床:</span>
              <span>657126</span>
            </td>
            <td colspan="2">
              <span class="user-title">付款方式:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">病人来源:</span>
              <span>657126</span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <span class="user-title">手术名称:</span>
              <span>657126</span>
            </td>

            <td>
              <span class="user-title">手术日期:</span>
              <span>657126</span>
            </td>
            <td colspan="2">
              <span class="user-title">主刀医生:</span>
              <span>657126</span>
            </td>
            <td>
              <span class="user-title">执行科室:</span>
              <span>657126</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-scrollbar style="height:100%">
      <div class="container-staplingList">
        <div
          class="list-info"
          v-for="(item,index) in 4"
          :key="index"
        >
          <div class="info-title">
            <div>
              <span>厂家:</span>
              <span style="color:#66B1FF;font-weight:700">威客</span>
            </div>
            <div style="margin-left:40px">
              <span>单位:</span>
              <span style="color:#66B1FF;font-weight:700">上海均真贸易有限公司</span>
            </div>
            <div style="margin-left:40px">
              <span>供货人:</span>
              <span style="color:#66B1FF;font-weight:700">福林送</span>
            </div>
          </div>
          <div
            class="info-table"
          >
            <vxe-table
              align="center"
              :data="tableData"
              class="mytable-scrollbar"
              size="mini"
              height="auto"
              auto-resize
              stripe
            >
              <vxe-table-column
                type="seq"
                title="序号"
              />
              <vxe-table-column
                field="sex"
                title="型号"
              />
              <vxe-table-column
                field="no"
                title="品名"
              />
              <vxe-table-column
                field="age1"
                title="批号与有效日期"
              />
            </vxe-table>
          </div>
        </div>
        <div style="text-align:center;margin-top:10px">
          <el-button
            size="mini"
            type="info"
            plain
          >
            打 印
          </el-button>
          <el-button
            @click="handleGoback"
            size="mini"
            type="primary"
          >
            返 回
          </el-button>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}]
    }
  },
  methods: {
    // 点击返回
    handleGoback () {
      this.$emit('handleChangeType')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.staplingInfo-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .container-userInfo {
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    background-color: #fff;
    padding: 0px 0px 0px 20px;
    flex:1;
    display: flex;
    align-items: center;
    .userInfo-table {
      td {
        height: 30px;
        font-size: 14px;
        .user-title {
          font-weight: 700;
          text-align: right;
          display: inline-block;
          width: 70px;
        }
      }
    }
  }
  .container-staplingList {
    padding: 10px;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    background-color: #fff;
    margin-top: 10px;
    flex:4;
    .list-info {
      font-size: 14px;
      padding: 10px;
      // border: 1px solid #000;
      .info-title {
        display: flex;
      }
      .info-table {
        margin-top: 10px;
      }
    }
  }
}
</style>
