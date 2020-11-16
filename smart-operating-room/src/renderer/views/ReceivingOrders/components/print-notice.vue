<template>
  <div
    class="print-content"
    style="width:960px;height:800px"
    id="detail-patient"
  >
    <table
      style="width:880px;height:380px;margin:0 auto;border-collapse:collapse;text-align:center;font-size:18px"
    >
      <thead>
        <tr>
          <td
            colspan="10"
            style="text-align:center;height: 20px;
          font-weight:bold;font-size:30;"
          />
        </tr>

        <tr>
          <td
            colspan="10"
            style="text-align:center;height: 20px;
          font-weight:bold;font-size:30;"
          />
        </tr>
        <tr>
          <td
            colspan="10"
            style="text-align:center;height: 20px;
          font-weight:bold;font-size:24px;"
          >
            华山医院
          </td>
        </tr>

        <tr>
          <td
            colspan="10"
            style="text-align:center;height: 20px;
          font-weight:bold;font-size:24px;"
          >
            手术通知单
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="height:20px" />
        </tr>
        <tr>
          <td
            colspan="2"
            style="text-align:left;
          "
          >
            房间号: {{ selectRow.roomNo }}
          </td>
          <td
            style="text-align:left;
          bold;"
          >
            序号:{{ selectRow.sequenceNo }}
          </td>
          <td
            colspan="3"
            style="text-align:left;
          bold"
          >
            拟手术时间: {{ selectRow.operateDate }}
          </td>
        </tr>
        <tr>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;"
          >
            病人姓名
          </td>
          <td
            class="value"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.patientName }}
          </td>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            性别
          </td>
          <td
            class="value"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.patientGender | formatGender }}
          </td>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            年龄
          </td>
          <td
            class="value"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.patientAge }}
          </td>
        </tr>
        <tr>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;;border-left:1px solid #000"
          >
            诊断
          </td>
          <td
            colspan="5"
            class="value"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.diagnose }}
          </td>
        </tr>
        <tr>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;"
          >
            病区号
          </td>
          <td
            class="value"

            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.wardName }}{{ selectRow.deptName }}
          </td>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            床位号
          </td>
          <td
            class="value"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.bedNo }}
          </td>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            住院号
          </td>
          <td
            class="value"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.hospitalNo }}
          </td>
        </tr>
        <tr>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;"
          >
            手术名称
          </td>
          <td
            class="value"
            colspan="5"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.operationName }}
          </td>
        </tr>
        <tr>
          <td
            colspan="2"
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;"
          >
            主刀医生
          </td>

          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            第一助手
          </td>

          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            第二助手
          </td>

          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            第三助手
          </td>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            第四助手
          </td>
        </tr>
        <tr>
          <td
            colspan="2"
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;"
          >
            {{ selectRow.surgeon }}
          </td>

          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.opaSsisName1 || '-' }}
          </td>

          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.opaSsisName2 || '-' }}
          </td>

          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-bottom:1px solid #000"
          >
            {{ selectRow.opaSsisName3 || '-' }}
          </td>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-bottom:1px solid #000"
          >
            {{ selectRow.opaSsisName3 || '-' }}
          </td>
        </tr>
        <tr>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;"
          >
            麻醉方式
          </td>
          <td
            class="value"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.anesMethod }}
          </td>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            麻醉医师
          </td>
          <td
            class="value"

            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            {{ selectRow.anesDoc }}
          </td>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;"
          >
            备注
          </td>
          <td
            class="value"

            style="border-top:1px solid #000;border-right:1px solid #000;"
          >
            -
          </td>
        </tr>

        <tr>
          <td
            class="label"
            style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000;border-bottom:1px solid #000"
          >
            化验异常
          </td>
          <td
            class="value"
            colspan="5"
            style="border-top:1px solid #000;border-right:1px solid #000;border-bottom:1px solid #000"
          >
            -
          </td>
        </tr>
      </tbody>
    </table>
    <div style="width:100%;textAlign:center">
      <div
        style="display: flex;
    justifyContent: center;
    marginTop: 30px;"
        class="qrcode"
        ref="qrCodeDiv"
      />
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import Bus from '@/utils/bus.js'
import {getOperatingNoticeTime} from '@/api/receiving-orders'
import request from '@/utils/request'
import {ipcRenderer} from 'electron'
export default {
  data () {
    return {

    }
  },
  props: {
    selectRow: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 打印手术通知单时间
    getOperatingTime () {
      request({
        url: getOperatingNoticeTime,
        method: 'post',
        params: {
          cureNo: this.selectRow.cureNo,
          hospitalNo: this.selectRow.hospitalNo
        }

      }

      ).then(res => {
        if (res.data.code === 200) {

        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('detail-patient').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      ipcRenderer.send('printChannel', printHtml, 'detail-patient.css', options)
    },
    bindQRCode () {
      let text = `OpsQRCode = ${this.selectRow.cureNo},OpsSchNo=${this.selectRow.operSchNo}`
      // eslint-disable-next-line no-new
      new QRCode(this.$refs.qrCodeDiv, {
        text: text,
        width: 200,
        height: 200,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.bindQRCode()
    })
    Bus.$on('detail-patient', res => {
      this.utilsDebounce(() => {
        this.getOperatingTime()
        this.printCurrent()
      }, 1000)
    })
  },
  filters: {
    formatGender: function (value) {
      if (!value) return ''
      value = value.toString()
      if (value === '1') {
        return '男'
      } else {
        return '女'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
   .print-content{
      background: #E3E3E3;
      height: 100%;
      min-height: 800px;
      margin:0 auto;
      width: 960px;
      // box-shadow: 1px 20px 45px 5px rgba(0, 0, 0, 0.5);
      border-radius: 5px 5px 0px 0px;
      color: #202020;
      h3{
        text-align: center;
      }
      .label{
        // color:#CFD9E5
      }
      .value{
        // color:#9AA3D4;
        min-width: 50px;
      }
      .el-row{
        margin-bottom:10px;
        // padding: 0 0 5px 0;
        &:first-child{
          margin:unset ;
        }
        .el-col{
          display: flex;
          margin-right: 20px;
          span{
            display: inline-block;
            padding: 2px;
            &:last-child{
              margin-left: 5px;
              border-bottom: 1px solid #fff;
              text-align: left;
              text-indent:5px;
              flex: 1;
            }
          }
        }
      }
    }
</style>>
