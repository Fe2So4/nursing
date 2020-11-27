<template>
  <!-- 手术接病人时间查询 -->
  <div class="nursing-recieive-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item
            label="开始时间"
          >
            <el-date-picker
              style="width:178px"
              v-model="form.startTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.endTime"
              style="width:178px"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label=" ">
            <el-button
              type="primary"
              @click="handleAddDevice"
            >
              查 询
            </el-button>
            <el-button
              type="info"
              plain
              @click="handleAddDevice"
            >
              导 出
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="dr-table">
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
          field="no"
          title="手术日期"
        />
        <vxe-table-column
          field="age1"
          title="手术间"
        />
        <vxe-table-column
          field="age2"
          title="术序"
        />
        <vxe-table-column
          field="age2"
          title="住院号"
        />
        <vxe-table-column
          field="age2"
          title="床号"
        />
        <vxe-table-column
          field="age2"
          title="患者姓名"
        />
        <vxe-table-column
          field="age2"
          title="性别"
        />
        <vxe-table-column
          field="age2"
          title="病区"
        />
        <vxe-table-column
          field="age2"
          title="手术名称"
        />
        <vxe-table-column
          field="age2"
          title="手术医生"
        />
        <vxe-table-column
          field="age2"
          title="巡回护士"
        />
        <vxe-table-column
          field="age2"
          title="洗手护士"
        />
        <vxe-table-column
          field="age2"
          title="接病人时间"
        />
        <vxe-table-column
          field="age2"
          title="入手术间时间"
        />
        <vxe-table-column
          field="age2"
          title="接病人时长"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NursingReceiveSearch',
  data () {
    return {
      form: {
        startTime: '',
        endTime: '',
        input: ''
      },
      radio: '',
      addVisible: false,
      codeVisible: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tableData: [{sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
        {sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'}]
    }
  },
  mounted () {
    this.getNewTime()
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.startTime = this.utilsGetNewDate()
      this.form.endTime = this.utilsGetNewDate()
    },
    handleShow () {
      this.codeVisible = true
    },
    handleCloseAddDialog () {
      this.addVisible = false
    },
    handleAddDevice () {
      this.addVisible = true
    },
    handleCloseCode () {
      this.codeVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .nursing-recieive-search{
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-top{
      padding: 20px 30px 0 40px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      .dr-top-left{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .el-form{
          /deep/.el-form-item{
          margin-bottom: 10px;
          .el-select{
            max-width: 178px;
          }
        }
        }

      }
      .dr-top-right{
        display: flex;
        .el-form {
          .el-form-item{
          margin-bottom: 10px;
          .el-select{
            max-width: 178px;
          }
        }
        }
      }
    }
    .dr-table{
      flex: 1;
      // max-height: calc(100% - 202px);
      margin-top: 10px;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      overflow: hidden;
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
    .dr-pagination{
      margin-top: 10px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
    }
  }
</style>
