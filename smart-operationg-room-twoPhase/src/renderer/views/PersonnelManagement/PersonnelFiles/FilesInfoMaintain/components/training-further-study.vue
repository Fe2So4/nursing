<template>
  <div class="training-further-study">
    <div class="trs-table">
      <div class="title">
        培训进修情况（>2个月）
        <el-button
          type="text"
          size="mini"
          icon="el-icon-plus"
        >
          新增
        </el-button>
      </div>
      <div class="trs-table-content">
        <vxe-table
          align="center"
          auto-resize
          :data="tableData"
          size="mini"
          height="100%"
          border
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        >
          <vxe-table-column
            field="endTime"
            title="起止时间"
            :edit-render="{}"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                size="mini"
                v-model="row.endTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.endTime, 'YYYY-MM-DD') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="xuexiao"
            title="培训进修情况"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.xuexiao"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="xuexiao"
            title="培训进修单位"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.xuexiao"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="xuexiao"
            title="获证情况"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input
                size="mini"
                v-model="scope.row.xuexiao"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="age"
            title="操作"
          >
            <template>
              <el-button
                type="text"
                size="mini"
              >
                删除
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <div class="option">
      <span>
        <el-button
          type="info"
          size="mini"
          plain
        >选择文件</el-button>
      </span>
      <span><el-button
        type="info"
        size="mini"
        plain
      >保 存</el-button><el-button
        type="info"
        size="mini"
        plain
      >返 回</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import XEUtils from 'xe-utils'
export default {
  name: 'TrainingFurtherStudy',
  data () {
    return {
      tableData: [{endTime: '', xuexiao: '', xueli: '1', xuewei: '1', xxxs: '1'}],
      list: [{label: '测试1', value: '1'}, {label: '测试2', value: '2'}]
    }
  },
  methods: {
    formatDate (date, format) {
      return moment(date).format(format)
    },
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    }
  }
}
</script>

<style lang="scss" scoped>
  .training-further-study{
    font-size: 14px;
    display: flex;
    height: 100%;
    flex-direction: column;
    .trs-table{
      flex: 1;
      display: flex;
      flex-direction: column;
      .title{
        background:#C5D3F1;
        color: #333333;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
        position: relative;
        .el-button{
          position: absolute;
          right: 40px;
          height: 30px;
        }
      }
      .trs-table-content{
        flex: 1;
        .el-button{
          color: #FF5454;
        }
      }
    }
    .option{
      display: flex;
      margin: 30px 0;
      justify-content: space-between;
      span{
        &:first-child{
          margin-left: 26px;
        }
        &:last-child{
          margin-right: 26px;
        }
      }
    }
  }
</style>
