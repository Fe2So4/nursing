<template>
  <div

    v-show="false"
  >
    <div
      style="width:824px;"
      id="NursingStaffBilling"
    >
      <div>
        <div style="font-weight:700">
          药品类
        </div>
        <table
          style="width: 100%;
        text-align: center;"
        >
          <thead>
            <tr>
              <th>序号</th>
              <th>收费项目</th>
              <th>规格</th>
              <th>单位</th>
              <th>单价</th>
              <th>数量</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in childrenTable.drugCharges"
              :key="index"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ item.chargeName }}
              </td>
              <td>
                {{ item.specifications }}
              </td>
              <td>
                {{ item.unit }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                {{ item.count }}
              </td>
              <td>
                {{ item.totalPrice }}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="text-align:end;margin-right:40px;margin-top:20px">
          <span style="font-weight:700">药品类合计</span>
          <span>{{ childrenTable.totalDrugPrice }}</span>
        </div>
      </div>
      <div style="margin-top:40px">
        <div style="font-weight:700">
          非药品类
        </div>
        <table
          style="width: 100%;
        text-align: center;"
        >
          <thead>
            <tr>
              <th>序号</th>
              <th>收费项目</th>
              <th>规格</th>
              <th>单位</th>
              <th>单价</th>
              <th>数量</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in childrenTable.nonDrugCharges"
              :key="index"
            >
              <td>
                {{ index + 1 }}
              </td>
              <td>
                {{ item.chargeName }}
              </td>
              <td>
                {{ item.specifications }}
              </td>
              <td>
                {{ item.unit }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                {{ item.count }}
              </td>
              <td>
                {{ item.totalPrice }}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="text-align:end;margin-right:40px;margin-top:20px">
          <span style="font-weight:700">非药品类合计</span>
          <span>{{ childrenTable.totalNonDrugPrice }}</span>
        </div>
        <div style="text-align:end;margin-right:40px;margin-top:10px">
          <span style="font-weight:700">药品类+非药品类合计</span>
          <span>{{ childrenTable.totalPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
export default {
  name: 'NursingStaffBillingDayin',
  props: {
    childrenTable: {
      type: Object,
      require: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('NursingStaffBilling').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      ipcRenderer.send('printChannel', printHtml, 'NursingStaffBilling.css', options)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
