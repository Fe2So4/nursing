<template>
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
              v-model="form.input"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="form.input"
              style="width:178px"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="病区">
            <el-select
              v-model="form.input"
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
          <el-form-item label="手术状态">
            <el-select
              v-model="form.input"
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
          <el-form-item label="住院号">
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="病床号"
          >
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="病人姓名"
          >
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="手术名称"
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
            label="主刀医师"
          >
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="洗手护士"
          >
            <el-input v-model="form.input" />
          </el-form-item>
          <el-form-item
            v-show="showType"
            label="巡回护士"
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
    <div class="dr-table">
      <div class="dr-table-top">
        <div
          :key="index"
          v-for="(item,index) in 4"
          class="dr-table-top-item"
        >
          <div class="item-left">
            所属科室:
          </div>
          <div class="item-right">
            <div
              class="item-right-context"
              :key="index"
              v-for="(item,index) in 20"
            >
              <span>
                <span class="context-title">普外科</span>
                <span>(20)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
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
            title="日间手术"
          />
          <vxe-table-column
            field="age1"
            title="房间"
          />
          <vxe-table-column
            field="age1"
            title="术序"
          />

          <vxe-table-column
            field="age2"
            title="床号"
          />
          <vxe-table-column
            field="age3"
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
            title="住院号"
          />
          <vxe-table-column
            field="age3"
            title="所属科室"
          />

          <vxe-table-column
            field="age3"
            title="手术名称"
          />

          <vxe-table-column
            field="age3"
            title="主刀医生"
          />
          <vxe-table-column
            field="age3"
            title="洗手护士"
          />
          <vxe-table-column
            field="age3"
            title="巡回护士"
          />
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NursingRecordSearch',
  data () {
    return {
      showType: false,
      form: {
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

  methods: {
    // 点击图标切换显示
    handleChangeIcon () {
      this.showType = !this.showType
    },
    // 点击查询查询数据
    handleSearchTableList () {
      this.addVisible = true
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
