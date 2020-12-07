<template>
  <div class="emergency-day">
    <div class="option">
      <el-form
        size="mini"
        :inline="true"
      >
        <el-form-item label="日期：">
          <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
          />
          <!-- <el-date-picker></el-date-picker> -->
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="input"
            placeholder="输入住院号、床号、姓名回车快速定位"
          />
        </el-form-item>
        <el-form-item>
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fc-content">
      <div class="fc-content-left">
        <vxe-table
          stripe
          align="center"
          :data="tableData"
          highlight-hover-row
          @cell-click="cellClickEvent"
          size="mini"
          class="mytable-scrollbar"
          height="100%"
          auto-resize
        >
          <vxe-table-column
            type="seq"
            title="手术间"
          />
          <vxe-table-column
            field="userName"
            title="患者姓名"
          />
          <vxe-table-column
            field="userName"
            title="住院号"
          />
          <vxe-table-column
            field="userName"
            title="床号"
          />
          <vxe-table-column
            field="userName"
            title="手术名称"
          />
          <vxe-table-column
            field="userName"
            title="主刀"
          />
          <vxe-table-column
            field="userName"
            title="手术类型"
          />
          <vxe-table-column
            field="userName"
            title="操作"
          >
            <template>
              <el-button type="text">
                排班手术间
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FamilyCall',
  data () {
    return {
      select: '',
      time: '',
      input: '',
      tableData: [{userName: ''}],
      num: 1
    }
  },
  methods: {
    cellClickEvent () {

    }
  }
}
</script>

<style lang="scss" scoped>
.emergency-day{
  height: 100%;
  .option{
    padding-top: 18px;
    padding-left: 20px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    overflow: hidden;
  }
  .fc-content{
    margin-top: 10px;
    height: calc(100% - 75px);
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    display: flex;
    .fc-content-left{
      background: #FFFFFF;
      height: 100%;
      flex: 1;
      margin-right: 10px;
    }
  }
}
</style>
