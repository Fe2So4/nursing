<template>
  <!-- 吻合器使用登记统计 -->
  <div class="nursing-record-search">
    <div class="dr-top">
      <div class="dr-top-left">
        <el-form
          label-width="80px"
          :inline="true"
          size="mini"
        >
          <el-form-item
            label="开始日期"
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
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="form.endTime"
              style="width:178px"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="住院号">
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item label="床号">
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item label="患者姓名">
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="吻合器"
          >
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="所属科室"
          >
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="手术房间"
          >
            <el-input v-model="form.input" />
          </el-form-item>
        </el-form>
      </div>

      <div class="dr-top-right">
        <el-form
          :inline="true"
          size="mini"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSearchTableList"
            >
              查 询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="info"
              plain
            >
              导 出
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="top-icon"
        @click="handleChangeIcon"
      >
        <i
          v-show="showType"
          class="el-icon-arrow-up"
        />
        <i
          v-show="!showType"
          class="el-icon-arrow-down"
        />
      </div>
    </div>
    <div
      class="dr-table"
      v-if="infoType"
    >
      <div class="dr-table-bottom">
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
            title="手术日期"
          />
          <vxe-table-column
            field="no"
            title="手术间号"
          />
          <vxe-table-column
            field="age1"
            title="住院号"
          />
          <vxe-table-column
            field="age1"
            title="床号"
          />

          <vxe-table-column
            field="age2"
            title="姓名"
          />
          <vxe-table-column
            field="age3"
            title="性别"
          />
          <vxe-table-column
            field="age3"
            title="年龄"
          />
          <vxe-table-column
            field="age3"
            title="吻合器"
          />
          <vxe-table-column
            field="age3"
            title="型号"
          />
          <vxe-table-column
            field="age3"
            title="厂家"
          />

          <vxe-table-column
            field="age3"
            title="供货单位"
          />

          <vxe-table-column
            field="age3"
            title="供货人"
          />
          <vxe-table-column
            field="age3"
            title="数量"
          />
          <vxe-table-column
            field="age3"
            title="收费名称"
          />
        </vxe-table>
      </div>
    </div>
    <div
      class="dr-table"
      v-else
    >
      <StaplingInfo @handleChangeType="handleChangeType" />
    </div>
  </div>
</template>

<script>
import StaplingInfo from './components/staplingInfo'
export default {
  name: 'NursingRecordSearch',
  data () {
    return {
      infoType: true,
      showType: false,
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
      tableData: [{sort: '1', no: '显示器 | 5007949'}, {sort: '2', no: '显示器 | 5007949 | TYPE 2202 摄像主机 | 7844053 | 3DV-190 光源主机 | 78408'},
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
  components: {
    StaplingInfo
  },
  methods: {
    // 获取当前时间
    getNewTime () {
      this.form.startTime = this.utilsGetNewDate()
      this.form.endTime = this.utilsGetNewDate()
    },
    // 点击图标切换显示
    handleChangeIcon () {
      this.showType = !this.showType
    },
    // 点击查询查询数据
    handleSearchTableList () {
      this.addVisible = true
    },
    // 切换列表
    handleChangeType () {
      this.infoType = !this.infoType
    }
  }
}
</script>

<style lang="scss" scoped>
  .nursing-record-search{
    display: flex;
    height: 100%;
    flex-direction: column;
    .dr-top{
      position: relative;
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
          margin-bottom: 15px;
          .el-select{
            max-width: 178px;
          }
        }
        }

      }
      .dr-top-right{
        margin-right: 40px;
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
      .top-icon {
        cursor: pointer;
        font-weight: bold;
        color: #4E91FF;
        border:2px solid #4E91FF;
        text-align: center;
        line-height: 20px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        right: 30px;
        bottom: 15px;
      }
    }
    .dr-table{
      flex: 1;
      display: flex;
      flex-direction: column;
      // max-height: calc(100% - 202px);
      margin-top: 10px;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      overflow: hidden;
      .dr-table-top {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: #fff;
        .dr-table-top-item {
          display: flex;
          .item-left {
            width: 100px;
            font-size: 14px;
            color: #333333;
          }
          .item-right {
            display: flex;
            flex-wrap: wrap;
            .item-right-context {
              margin-left: 20px;
              span {
                font-size: 14px;
              }
              .context-title {
                cursor: pointer;
                color: #2474F8;
              }
            }
          }
        }
      }
      .dr-table-bottom {
        flex: 1;
      }
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
