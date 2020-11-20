<template>
  <div class="pathology-report">
    <el-dialog
      title="病理报告"
      :visible.sync="reportVisible"
      :before-close="handleClose"
    >
      <div
        id="pathology-report"
        ref="pathology-report"
      >
        <table
          style="width:100%;"
          cellspacing="0"
        >
          <tr>
            <td
              colspan="8"
              style="text-align:center;font-size:20px;font-weight:bold;"
            >
              术中冰冻病理报告
            </td>
          </tr>
          <tr>
            <td
              colspan="4"
              style="font-size:16px;"
            >
              病理号：19-05920-冰冻1
            </td>
            <td
              colspan="4"
              style="text-align:right;font-size:16px;"
            >
              报告医生：杜尊过
            </td>
          </tr>
          <tr>
            <td style="border:1px solid #000000;text-align:center;line-height:60px;font-size:16px;">
              姓名
            </td>
            <td style="border:1px solid #000000;border-left:unset;text-align:center;line-height:60px;font-size:16px;">
              陈爱云
            </td>
            <td style="border:1px solid #000000;border-left:unset;text-align:center;line-height:60px;font-size:16px;">
              性别
            </td>
            <td style="border:1px solid #000000;border-left:unset;text-align:center;line-height:60px;font-size:16px;">
              男
            </td>
            <td style="border:1px solid #000000;border-left:unset;text-align:center;line-height:60px;font-size:16px;">
              年龄
            </td>
            <td style="border:1px solid #000000;border-left:unset;text-align:center;line-height:60px;font-size:16px;">
              30岁
            </td>
            <td style="border:1px solid #000000;border-left:unset;text-align:center;line-height:60px;font-size:16px;">
              住院号
            </td>
            <td style="border:1px solid #000000;border-left:unset;text-align:center;line-height:60px;font-size:16px;">
              123456
            </td>
          </tr>
          <tr>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;border-left:1px solid #000000;">
              病区
            </td>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;">
              16病区
            </td>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;">
              送检医院
            </td>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;">
              本院
            </td>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;">
              送检医生
            </td>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;">
              8081
            </td>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;">
              收到日期
            </td>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;">
              2019-12-11 15:01
            </td>
          </tr>
          <tr>
            <td style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;border-left:1px solid #000000;">
              冰冻病理诊断
            </td>
            <td
              colspan="7"
              style="font-size:16px;line-height:60px;border-right:1px solid #000000;text-align:center;border-bottom:1px solid #000000;"
            >
              转移性啊啊啊
            </td>
          </tr>
        </table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="mini"
          @click="handlePrint"
        >打 印</el-button>
        <el-button
          @click="handleClose"
          size="mini"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
export default {
  data () {
    return {

    }
  },
  props: {
    reportVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handlePrint () {
      this.$nextTick(() => {
        const printHtml = document.getElementById('pathology-report').outerHTML
        const options = { silent: false }
        // options = JSON.stringify(options)
        ipcRenderer.send('printChannel', printHtml, 'pathology-report.css', options)
        this.$emit('handleClose')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pathology-report{

  }
</style>
