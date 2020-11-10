<template>
  <div
    class="nursing-jichu-container"
    id="nursing-document-jichu"
  >
    <div class="wenben-content-info mgt10">
      <div class="info-content-container">
        <div
          class="context1"
          style="marginTop:5px"
        >
          <table
            border="0"
            style="border-collapse:collapse;"
          >
            <thead>
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
                      <div class="input-div-context-120">{{ form.operateDate }}</div>
                    </span>
                    <span class="input-div">
                      <span>姓名</span>
                      <div class="input-div-context-120">{{ form.patientName }}</div>
                    </span>
                    <span class="input-div">
                      <span>住院号</span>
                      <div class="input-div-context-120">{{ form.hospitalNo }}</div>
                    </span>
                    <span class="input-div">
                      <span>病床号</span>
                      <div class="input-div-context-120">{{ form.bedNo }}</div>
                    </span>
                  </div>
                  <div class="context1 mgt20">
                    <span class="input-div ">
                      <span>术前诊断</span>
                      <div
                        class="input-div-context-long"
                        style="textAlign:center"
                      >{{ form.diagnosis }}</div>
                    </span>
                  </div>
                  <div
                    class="context1"
                    style="marginTop:5px"
                  >
                    <span>手术敷科、基本器械清单</span>
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
                <th
                  rowspan="2"
                >
                  手术前数量
                </th>
                <th
                  colspan="4"
                >
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
                <td style="borderRight:1px solid #000;textAlign:center">
                  第一次
                </td>
                <td style="borderRight:1px solid #000;textAlign:center">
                  第二次
                </td>
                <td style="borderRight:1px solid #000;textAlign:center">
                  第三次
                </td>
                <td style="textAlign:center">
                  第四次
                </td>
              </tr>
            </thead>
            <tbody>
              <template v-if="basicEquipment.length > 0">
                <tr
                  v-for="item in basicEquipment"
                  :key="item.name"
                >
                  <td>
                    {{ item.name }}
                  </td>
                  <td class="td-text-center">
                    {{ item.before }}
                  </td>

                  <td class="td-text-center border-right1">
                    {{ item.adding }}
                  </td>
                  <td class="td-text-center border-right1">
                    {{ item.adding1 }}
                  </td>
                  <td class="td-text-center border-right1">
                    {{ item.adding2 }}
                  </td>
                  <td class="td-text-center">
                    {{ item.adding3 }}
                  </td>

                  <td class="td-text-center">
                    {{ item.before2 }}
                  </td>
                  <td class="td-text-center">
                    {{ item.after }}
                  </td>
                  <td class="td-text-center">
                    {{ item.after2 }}
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td>
                    刀片
                  </td>
                  <td class="td-text-center" />

                  <td class="td-text-center border-right1" />
                  <td class="td-text-center border-right1" />
                  <td class="td-text-center border-right1" />
                  <td class="td-text-center" />

                  <td class="td-text-center" />
                  <td class="td-text-center" />
                  <td class="td-text-center" />
                </tr>
                <tr>
                  <td>
                    缝针
                  </td>
                  <td class="td-text-center" />

                  <td class="td-text-center border-right1" />
                  <td class="td-text-center border-right1" />
                  <td class="td-text-center border-right1" />
                  <td class="td-text-center" />

                  <td class="td-text-center" />
                  <td class="td-text-center" />
                  <td class="td-text-center" />
                </tr>
                <tr>
                  <td>
                    腔镜纱布
                  </td>
                  <td class="td-text-center" />

                  <td class="td-text-center border-right1" />
                  <td class="td-text-center border-right1" />
                  <td class="td-text-center border-right1" />
                  <td class="td-text-center" />

                  <td class="td-text-center" />
                  <td class="td-text-center" />
                  <td class="td-text-center" />
                </tr>
                <tr>
                  <td>
                    纱布
                  </td>
                  <td class="td-text-center" />

                  <td class="td-text-center border-right1" />
                  <td class="td-text-center border-right1" />
                  <td class="td-text-center border-right1" />
                  <td class="td-text-center" />

                  <td class="td-text-center" />
                  <td class="td-text-center" />
                  <td class="td-text-center" />
                </tr>
              </template>
              <tr>
                <td>
                  洗手护士签名
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xsSqQm }}
                  <!-- <img
                    :src="qianmingList.xsSqQm"
                    alt=""
                  > -->
                </td>

                <td class="td-text-center border-right1">
                  {{ qianmingList.xsOneQm }}
                  <!-- <img
                    :src="qianmingList.xsOneQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center border-right1">
                  {{ qianmingList.xsTwoQm }}
                  <!-- <img
                    :src="qianmingList.xsTwoQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center border-right1">
                  {{ qianmingList.xsThreeQm }}
                  <!-- <img
                    :src="qianmingList.xsThreeQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xsFourQm }}
                  <!-- <img
                    :src="qianmingList.xsFourQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xsClossQm }}
                  <!-- <img
                    :src="qianmingList.xsClossQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xsAllClossQm }}
                  <!-- <img
                    :src="qianmingList.xsAllClossQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xsFhQm }}
                  <!-- <img
                    :src="qianmingList.xsFhQm"
                    alt=""
                  > -->
                </td>
              </tr>
              <tr>
                <td>
                  巡回护士签名
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xhSqQm }}
                  <!-- <img
                    :src="qianmingList.xhSqQm"
                    alt=""
                  > -->
                </td>

                <td class="td-text-center border-right1">
                  {{ qianmingList.xhOneQm }}
                  <!-- <img
                    :src="qianmingList.xhOneQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center border-right1">
                  {{ qianmingList.xhTwoQm }}
                  <!-- <img
                    :src="qianmingList.xhTwoQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center border-right1">
                  {{ qianmingList.xhThreeQm }}
                  <!-- <img
                    :src="qianmingList.xhThreeQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xhFourQm }}
                  <!-- <img
                    :src="qianmingList.xhFourQm"
                    alt=""
                  > -->
                </td>

                <td class="td-text-center">
                  {{ qianmingList.xhClossQm }}
                  <!-- <img
                    :src="qianmingList.xhClossQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xhAllClossQm }}
                  <!-- <img
                    :src="qianmingList.xhAllClossQm"
                    alt=""
                  > -->
                </td>
                <td class="td-text-center">
                  {{ qianmingList.xhFhQm }}
                  <!-- <img
                    :src="qianmingList.xhFhQm"
                    alt=""
                  > -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import isSelect from './components/isSelect'
import {ipcRenderer} from 'electron'

import Bus from '@/utils/bus.js'
export default {
  name: 'NursingDocumentJiChu',
  data () {
    return {
      htmlTitle: '护理记录单单据(基础)',
      form: {
        operateDate: '',
        patientName: '',
        hospitalNo: '',
        bedNo: '',
        diagnosis: ''
      },
      basicEquipmentStr: [],
      basicEquipment: [],
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
    this.search()
    Bus.$on('clickShuaXinJiChu', res => {
      if (res === '1') {
        this.utilsDebounce(() => { this.search() }, 300)
      } else if (res === '2') {
        this.utilsDebounce(() => { this.dayin() }, 300)
      } else if (res === '3') {
        this.htmlTitle = this.$store.state['nursing-document-list'].patientName + '护理记录单单据(基础)'
        this.utilsDebounce(() => {
          // this.getPdf('nursing-document-jichu')
          // console.log(this.htmlTitle)
          // shell.openExternal(this.htmlTitle)
          // this.$electron.shell.openExternal('https://www.baidu.com/')

          this.daochuPDF()
        }, 1000)
      }
    })
  },
  methods: {
    dayin () {
      this.printCurrent()
    },
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('nursing-document-jichu').outerHTML
      const options = { silent: true }
      // options = JSON.stringify(options)
      ipcRenderer.send('printChannel', printHtml, 'nursing-document-jichu.css', options)
    },
    daochuPDF () {
      const printHtml = document.getElementById('nursing-document-jichu').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      this.utilsDebounce(() => {
        ipcRenderer.send('printpdfChannel', printHtml, 'nursing-document-jichu.css', options)
      }, 1000)
    },
    // 查询数据
    search () {
      let obj = {
        // cureNo: 1010,
        cureNo: this.$store.state['nursing-document-list'].cureNo,
        // hospitalNo: 666
        hospitalNo: this.$store.state['nursing-document-list'].hospitalNo
      }
      this.$store.dispatch('ReqNursingDocumentJiChu', obj).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.msg === '未查询到信息') {
            this.openToast('warning', '暂无数据')
            return false
          }
          let wenshuData = res.data.data

          this.form.operateDate = wenshuData.operateDate
          this.form.patientName = wenshuData.patientName
          this.form.hospitalNo = wenshuData.hospitalNo
          this.form.bedNo = wenshuData.bedNo
          this.form.diagnosis = wenshuData.diagnosis

          this.qianmingList.xsSqQm = wenshuData.xsSqQm
          // this.qianmingList.xsSqQm = 'data:image/png;base64,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'
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

          // if (wenshuData.basicEquipment && this.IsEmpty(wenshuData.basicEquipment.items)) {
          let arr = []
          this.basicEquipmentStr = wenshuData.basicEquipment
          if (this.basicEquipmentStr && this.basicEquipmentStr.items) {
            this.basicEquipmentStr.items.adding.forEach(item => {
              let obj = {
                name: item.insName
              }
              this.basicEquipmentStr.items.before.forEach(bItem => {
                if (bItem.insName === item.insName) {
                  obj.before = bItem.number
                  return false
                }
              })
              this.basicEquipmentStr.items.adding.forEach(bItem => {
                if (bItem.insName === item.insName) {
                  obj.adding = bItem.number
                  return false
                }
              })
              this.basicEquipmentStr.items.adding1.forEach(bItem => {
                if (bItem.insName === item.insName) {
                  obj.adding1 = bItem.number
                  return false
                }
              })
              this.basicEquipmentStr.items.adding2.forEach(bItem => {
                if (bItem.insName === item.insName) {
                  obj.adding2 = bItem.number
                  return false
                }
              })
              this.basicEquipmentStr.items.adding3.forEach(bItem => {
                if (bItem.insName === item.insName) {
                  obj.adding3 = bItem.number
                  return false
                }
              })
              this.basicEquipmentStr.items.before2.forEach(bItem => {
                if (bItem.insName === item.insName) {
                  obj.before2 = bItem.number
                  return false
                }
              })
              this.basicEquipmentStr.items.after.forEach(bItem => {
                if (bItem.insName === item.insName) {
                  obj.after = bItem.number
                  return false
                }
              })
              this.basicEquipmentStr.items.after2.forEach(bItem => {
                if (bItem.insName === item.insName) {
                  obj.after2 = bItem.number
                  return false
                }
              })
              arr.push(obj)
            })
          }

          this.basicEquipment = arr
          // }
        } else {
          this.openToast('error', res.data.msg)
        }
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
    // isSelect
  }
}
</script>

<style scoped lang="scss">
@import './../../../styles/wenshu.scss';
.nursing-jichu-container {
  width: 824px;
  height: 920px;
  min-width: 824px;
  min-height: 920px;
  background-color: #fff;
  padding: 10px;
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
          tr {
            td{
              width: 85px;
              height: 25px;
            // padding-left: 3px;
            }
          }
          td {
            width: 85px;
            height: 25px;
            // padding-left: 3px;
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
img {
  height: 25px;
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
  transform:  rotate(-155deg);
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
    width:60px;
    margin-left: 50%;
    transform: translateX(-50%);
}
.td-text-center {
  text-align: center;
}
.border-right1 {
  border-right: 1px solid grey
}

table thead tr th,
table tbody tr td {
  border: 1px solid #000;
}
</style>
