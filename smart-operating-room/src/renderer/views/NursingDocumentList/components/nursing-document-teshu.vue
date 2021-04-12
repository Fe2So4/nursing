<template>
  <div
    class="nursing-teshu-container"
    id="nursing-document-teshu"
  >
    <div class="nursing-top">
      <div class="wenben-content-info mgt10">
        <div class="info-content-container">
          <div class="context1">
            <table
              border="0"
              style="border-collapse:collapse;"
            >
              <thead style="display: table-header-group;">
                <tr>
                  <th
                    colspan="9"
                    style="border: none"
                  >
                    <div class="container-title">
                      复旦大学附属华山医院
                    </div>
                    <div class="wenben-content-info">
                      <div class="info-content-title">
                        手术病人护理记录单(三)
                      </div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th
                    colspan="9"
                    style="border: none"
                  >
                    <div class="context1">
                      <span class="input-div ">
                        <span>手术日期</span>
                        <div class="input-div-context-120">
                          {{ form.operateDate }}
                        </div>
                      </span>
                      <span class="input-div">
                        <span>姓名</span>
                        <div class="input-div-context-120">
                          {{ form.patientName }}
                        </div>
                      </span>
                      <span class="input-div">
                        <span>住院号</span>
                        <div class="input-div-context-120">
                          {{ form.hospitalNo }}
                        </div>
                      </span>
                      <span class="input-div">
                        <span>病床号</span>
                        <div class="input-div-context-120">
                          {{ form.bedNo }}
                        </div>
                      </span>
                    </div>
                    <div class="context1 mgt20">
                      <span class="input-div ">
                        <span>术前诊断</span>
                        <div
                          class="input-div-context-long"
                          style="textAlign:center"
                        >
                          {{ form.diagnosis }}
                        </div>
                      </span>
                    </div>
                    <div class="context1">
                      <span>特殊器械清点记录</span>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th rowspan="2">
                    <div style="textAlign:right">
                      时间
                    </div>
                    <div class="row-line" />
                    <div style="textAlign:left">
                      评估
                    </div>
                  </th>
                  <th rowspan="2">
                    <div>手术前数量</div>
                  </th>
                  <th colspan="4">
                    术中添加数
                  </th>
                  <th rowspan="2">
                    体腔关闭前数量
                  </th>
                  <th rowspan="2">
                    所有体腔关闭后数量
                  </th>
                  <th rowspan="2">
                    皮肤缝合后数量
                  </th>
                </tr>
                <tr>
                  <td
                    style="height:20px;borderRight:1px solid #000;textAlign:center"
                  >
                    第一次
                  </td>
                  <td
                    style="height:20px;borderRight:1px solid #000;textAlign:center"
                  >
                    第二次
                  </td>
                  <td
                    style="height:20px;borderRight:1px solid #000;textAlign:center"
                  >
                    第三次
                  </td>
                  <td style="height:20px;textAlign:center">
                    第四次
                  </td>
                </tr>
              </thead>
              <tbody>
                <template v-for="item in basicequipment">
                  <template v-if="item.items.length === 0">
                    <tr :key="item.pId * 2 + 1">
                      <td
                        colspan="6"
                        class="td-colspan"
                      >
                        {{ item.pName }}
                      </td>
                      <td colspan="3">
                        <svg
                          :id="'_' + item.pId"
                          alt=""
                        />
                      </td>
                    </tr>
                    <!-- <tr :key="item.pId">
                      <td />
                      <td class="td-text-center">
                        1
                      </td>

                      <td class="td-text-center">
                        0
                      </td>
                      <td class="td-text-center">
                        0
                      </td>
                      <td class="td-text-center">
                        0
                      </td>
                      <td class="td-text-center">
                        0
                      </td>

                      <td class="td-text-center">
                        1
                      </td>
                      <td class="td-text-center">
                        1
                      </td>
                      <td class="td-text-center">
                        1
                      </td>
                    </tr> -->
                  </template>
                  <template v-else>
                    <template>
                      <tr :key="item.pId * 2 + 1">
                        <td
                          colspan="6"
                          class="td-colspan"
                        >
                          {{ item.pName }}
                        </td>
                        <td colspan="3">
                          <img
                            :id="'_' + item.pId"
                            alt=""
                          >
                        </td>
                      </tr>
                    </template>
                    <template v-for="v in item.items">
                      <tr :key="v.pId">
                        <td class="td-text-center">
                          {{ v.insName }}
                        </td>
                        <td class="td-text-center">
                          {{ v.before }}
                        </td>

                        <td class="td-text-center">
                          {{ v.adding }}
                        </td>
                        <td class="td-text-center">
                          {{ v.adding1 }}
                        </td>
                        <td class="td-text-center">
                          {{ v.adding2 }}
                        </td>
                        <td class="td-text-center">
                          {{ v.adding3 }}
                        </td>

                        <td class="td-text-center">
                          {{ v.before2 }}
                        </td>
                        <td class="td-text-center">
                          {{ v.after }}
                        </td>
                        <td class="td-text-center">
                          {{ v.after2 }}
                        </td>
                      </tr>
                    </template>
                  </template>
                </template>
                <template>
                  <tr>
                    <td class="td-text-center">
                      洗手护士签名
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xsSqQm }}
                    </td>

                    <td class="td-text-center">
                      {{ qianmingList.xsOneQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xsTwoQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xsThreeQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xsFourQm }}
                    </td>

                    <td class="td-text-center">
                      {{ qianmingList.xsClossQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xsAllClossQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xsFhQm }}
                    </td>
                  </tr>
                  <tr>
                    <td class="td-text-center">
                      巡回护士签名
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xhSqQm }}
                    </td>

                    <td class="td-text-center">
                      {{ qianmingList.xhOneQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xhTwoQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xhThreeQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xhFourQm }}
                    </td>

                    <td class="td-text-center">
                      {{ qianmingList.xhClossQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xhAllClossQm }}
                    </td>
                    <td class="td-text-center">
                      {{ qianmingList.xhFhQm }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container-bottom">
      <NursingBottom :form="form" />
    </div> -->
  </div>
</template>

<script>
// import NursingBottom from './nursing-document-teshu-bottom'
import JsBarcode from 'jsbarcode'
import { ipcRenderer } from 'electron'
import Bus from '@/utils/bus.js'
export default {
  name: 'NursingDocumentTeshu',
  props: {
    needBus: {
      default: true,
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      htmlTitle: '护理记录单单据(特殊)',
      basicequipment: [],
      form: {
        bedNo: '',
        diagnosis: '',
        hospitalNo: '',
        operateDate: '',
        patientName: ''
      },
      basicEquipmentStr: [],
      qianmingList: {
        xsSqQm: '',
        xsOneQm: '',
        xsTwoQm: '',
        xsThreeQm: '',
        xsFourQm: '',
        xsClossQm: '',
        xsAllClossQm: '',
        xsFhQm: '',

        xhSqQm: '',
        xhOneQm: '',
        xhTwoQm: '',
        xhThreeQm: '',
        xhFourQm: '',
        xhClossQm: '',
        xhAllClossQm: '',
        xhFhQm: ''
      }
    }
  },
  mounted () {
    if (this.needBus) {
      Bus.$on('clickShuaXinTeShu', res => {
        if (res === '1') {
          this.utilsDebounce(() => {
            this.EquipmentChange()
          }, 300)
        } else if (res === '2') {
          this.utilsDebounce(() => {
            this.dayin()
          }, 300)
        } else if (res === '3') {
          this.htmlTitle =
          this.$store.state['nursing-document-list'].patientName +
          this.htmlTitle
          this.utilsDebounce(() => {
          //  this.getPdf('nursing-document-teshu')
            this.daochuPDF()
          }, 300)
        }
      })
    }

    this.EquipmentChange()
  },
  methods: {
    dayin () {
      this.printCurrent()
    },
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('nursing-document-teshu')
        .outerHTML
      const options = { silent: true }
      // options = JSON.stringify(options)
      ipcRenderer.send(
        'printChannel',
        printHtml,
        'nursing-document-teshu.css',
        options
      )
    },
    daochuPDF () {
      const printHtml = document.getElementById('nursing-document-teshu')
        .outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      this.utilsDebounce(() => {
        ipcRenderer.send(
          'printpdfChannel',
          printHtml,
          'nursing-document-teshu.css',
          options
        )
      }, 1000)
    },
    EquipmentChange () {
      this.basicequipment = []
      let obj = {
        // cureNo: 1010,
        cureNo: this.$store.state['nursing-document-list'].cureNo,
        // hospitalNo: 666

        hospitalNo: this.$store.state['nursing-document-list'].hospitalNo,
        operSchNo: this.$store.state['nursing-document-list'].operSchNo
      }
      this.$store.dispatch('ReqNursingDocumentTeShu', obj).then(res => {
        if (res.data.code === 200) {
          if (res.data.msg === '未查询到信息') {
            this.openToast('warning', '暂无数据')
            return false
          }
        }
        let wenshuData = res.data.data
        this.form.operateDate = wenshuData.operateDate
        this.form.patientName = wenshuData.patientName
        this.form.hospitalNo = wenshuData.hospitalNo
        this.form.bedNo = wenshuData.bedNo
        this.form.diagnosis = wenshuData.diagnosis

        this.qianmingList.xsSqQm = wenshuData.xsSqQm
        this.qianmingList.xsOneQm = wenshuData.xsOneQm
        this.qianmingList.xsTwoQm = wenshuData.xsTwoQm
        this.qianmingList.xsThreeQm = wenshuData.xsThreeQm
        this.qianmingList.xsFourQm = wenshuData.xsFourQm
        this.qianmingList.xsClossQm = wenshuData.xsClossQm
        this.qianmingList.xsAllClossQm = wenshuData.xsAllClossQm
        this.qianmingList.xsFhQm = wenshuData.xsFhQm

        this.qianmingList.xhSqQm = wenshuData.xhSqQm
        this.qianmingList.xhOneQm = wenshuData.xhOneQm
        this.qianmingList.xhTwoQm = wenshuData.xhTwoQm
        this.qianmingList.xhThreeQm = wenshuData.xhThreeQm
        this.qianmingList.xhFourQm = wenshuData.xhFourQm
        this.qianmingList.xhClossQm = wenshuData.xhClossQm
        this.qianmingList.xhAllClossQm = wenshuData.xhAllClossQm
        this.qianmingList.xhFhQm = wenshuData.xhFhQm
        console.log(this.qianmingList)
        this.basicequipment = wenshuData.specialEquipment.allList
        this.$nextTick(() => {
          if (this.basicequipment) {
            this.basicequipment.forEach(item => {
              JsBarcode(`#_${item.pId}`, `P-${item.pId}`, {
                height: 30,
                fontSize: 12
              })
            })
          }
        })
      })
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    }
  },
  components: {
    // NursingBottom
  }
}
</script>

<style scoped lang="scss">
@import './../../../styles/wenshu.scss';
.nursing-teshu-container {
  width: 824px;
  // height: 920px;
  min-width: 824px;
  // min-height: 920px;
  // background-color: #fff;
  // padding: 10px;
  .container-title {
    font-size: 16px;
    letter-spacing: 10px;
    // border-bottom: 1px solid #000;
    text-align: center;
    font-weight: 600;
    text-indent: 10px;
    margin: 0 70px;
  }
  .wenben-content-info {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    .info-content-title {
      text-align: center;
      font-weight: 600;
      // font-size: 16px;
    }
    .info-content-form {
      padding-left: 15px;
    }
  }
  .info-content-container {
    padding-left: 20px;
    font-size: 14px;
    .context1 {
      display: flex;
      table {
        tr {
          th {
            overflow: hidden;
            width: 85px;
            .table-th-time {
              width: 40px;
              position: relative;
              left: 40px;
            }
            .table-th-xiangmu {
              width: 40px;
            }
          }
          td {
            width: 85px;
            height: 25px;
            padding-left: 3px;
          }
        }
      }
    }
    .context2 {
      display: flex;
      justify-content: center;
      .context2-box {
        width: 230px;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #000;
        padding: 5px;
        .box-row {
          display: flex;
        }
      }
    }
  }
}
.nursing-top {
  padding: 10px;
  background-color: #fff;
}
.input-div {
  display: flex;
  .input-div-context {
    padding: 0 5px;
    width: 100px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-120 {
    text-align: center;
    padding: 0 5px;
    width: 140px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-noborder {
    padding: 0 5px;
    width: 100px;
  }
  .input-div-context-short {
    padding: 0 5px;
    width: 80px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-short-60 {
    padding: 0 5px;
    width: 60px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-long {
    padding: 0 5px;
    width: 380px;
    border-bottom: 1px solid #000;
  }
}
.mgt10 {
  margin-top: 10px;
}
.mgt20 {
  margin-top: 10px;
}
.mgl50 {
  margin-left: 50px;
}
.mgl5 {
  margin-left: 5px;
}
.row-line {
  width: 140px;
  height: 1px;
  background-color: #000;
  transform: rotate(-155deg);
  // width: 110px;
}
.line {
  width: 250px;
  height: 1px;
  background-color: #000;
}
.td-div {
  display: flex;
}
.td-center {
  width: 60px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.td-text-center {
  text-align: center;
}
.td-colspan {
  height: 50px;
  line-height: 50px;
  background-color: #ccc;
  font-weight: 600;
}
.container-bottom {
  margin-top: 50px;
}
table thead tr th,
table tbody tr td {
  border: 1px solid #000;
}
</style>
