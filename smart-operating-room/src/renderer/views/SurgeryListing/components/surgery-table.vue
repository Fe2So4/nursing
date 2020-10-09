<template>
  <div class="continuous-table">
    <div class="table-conten">
      <vxe-table
        highlight-current-row
        ref="xTable"
        class="mytable-scrollbar"
        height="100%"
        border="none"
        :data="tableData"
        @current-change="currentChangeEvent"
      >
        <vxe-table-column
          type="seq"
          width="60"
        />
        <vxe-table-column
          field="name"
          title="日期"
          width="120"
        />
        <vxe-table-column
          field="role"
          title="房间号"
          width="80"
        />
        <vxe-table-column
          field="sex"
          title="手术序号"
          width="90"
        />
        <vxe-table-column
          field="age"
          title="病人信息"
          width="130"
        />
        <vxe-table-column
          width="260"
          title="每台手术必须清洁物品"
        >
          <template>
            <vxe-checkbox-group v-model="value12">
              <vxe-checkbox
                label="1"
                content="手术床"
              />
              <vxe-checkbox
                label="2"
                content="吸引器"
              />
              <vxe-checkbox
                label="3"
                content="麻醉车"
              />
              <vxe-checkbox
                label="4"
                content="输液架"
              />
              <vxe-checkbox
                label="5"
                content="地面"
              />
            </vxe-checkbox-group>
          </template>
        </vxe-table-column>
        <vxe-table-colgroup
          title="手术时使用过的需"
        >
          <vxe-table-column
            field="age"
            title="要清洁的消毒物品"
            width="220"
          >
            <template>
              <vxe-checkbox-group v-model="value12">
                <vxe-checkbox
                  label="1"
                  content="手术台车"
                />
                <vxe-checkbox
                  label="2"
                  content="设备仪器"
                />
                <vxe-checkbox
                  label="3"
                  content="体位垫"
                />
              </vxe-checkbox-group>
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-colgroup
          title="每台手术后需要"
        >
          <vxe-table-column
            field="age"
            width="260"
            title="重点清洁消毒物品"
          >
            <template>
              <vxe-checkbox-group v-model="value12">
                <vxe-checkbox
                  label="1"
                  content="电脑"
                />
                <vxe-checkbox
                  label="2"
                  content="踩脚凳"
                />
                <vxe-checkbox
                  label="3"
                  content="垃圾桶"
                />
                <vxe-checkbox
                  label="4"
                  content="电源开关"
                />
                <vxe-checkbox
                  label="5"
                  content="手术门"
                />
                <vxe-checkbox
                  label="6"
                  content="凳子"
                />
              </vxe-checkbox-group>
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-colgroup
          title="如果有污染"
        >
          <vxe-table-column
            field="age"
            width="180"
            title="及时清洁消毒"
          >
            <template>
              <vxe-checkbox-group v-model="value12">
                <vxe-checkbox
                  label="1"
                  content="地面"
                />
                <vxe-checkbox
                  label="2"
                  content="墙面"
                />
              </vxe-checkbox-group>
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>

        <vxe-table-column
          field="age"
          width="120"
          title="进手术室时间"
        />
        <vxe-table-column
          field="age"
          width="120"
          title="出手术室时间"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurgeryTable',
  data () {
    return {
      tableData: [
        { id: 10001, name: '2020-19-21', role: '602', sex: '1', age: '696371-严效兰', address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: '2020-9-21', role: '602', sex: '1', age: '696371-严效兰', address: 'Guangzhou' },
        { id: 10003, name: '2020-9-21', role: '602', sex: '1', age: '696371-严效兰', address: 'Shanghai' },
        { id: 10004, name: '2020-9-21', role: '602', sex: '1 ', age: '696371-严效兰', address: 'Shanghai' },
        { id: 10001, name: '2020-9-21', role: '602', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: '2020-9-21', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: '2020-9-21', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' },
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }

      ],
      value12: []
    }
  },
  methods: {
    // 获取高亮行
    getCurrentEvent () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
    },
    currentChangeEvent ({ row }) {
      console.log('行选中事件')
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .table-conten .vxe-table .vxe-body--row.row--current {
    background-color:#D6DCE8 !important;
}

.continuous-table {
    height: 100%;
    padding-left: 20px;
    background-color: #fff;
    width: 100%;
    .table-conten {
      height: 100%;
    }
}
/deep/ .vxe-checkbox {
  margin-left: 10px;
}
/deep/ .col--group {
  padding-bottom: 0 !important;
}
/deep/ .vxe-header--column.col_33 {
  padding-top: 0 !important;
}
/deep/ .vxe-header--column.col_35 {
  padding-top: 0 !important;
}
/deep/ .vxe-header--column.col_37 {
  padding-top: 0 !important;
}
/deep/ .vxe-header--column.col_34 .vxe-cell {
  text-indent: 5px;
}
/deep/ .vxe-header--column.col_36 .vxe-cell {
  text-indent: 5px;
}
</style>
