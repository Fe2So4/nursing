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
          <template>
            <el-button type="text">
              查看
            </el-button>
            <span class="option-line">|</span>
            <el-button type="text">
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
  </div>
</template>

<script>
export default {
  name: 'AttendanceMaintenance',
  data () {
    return {
      search_select: '0', // 选中的
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
      ]
    }
  }
}
</script>

<style scoped lang="scss">
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

  }
  .btm-btn {
    margin-top: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

</style>
