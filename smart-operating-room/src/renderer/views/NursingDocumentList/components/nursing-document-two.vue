<template>
  <div class="hulijilv-two-container">
    <div class="container-title">
      复旦大学附属华山医院
    </div>
    <div class="wenben-content-info">
      <div class="info-content-title">
        手术病人护理记录单(二)
      </div>
      <div class="info-content-form">
        <el-form
          size="mini"
          ref="form"
          :model="form"
          label-width="90px"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="病人信息：">
                <el-input
                  disabled
                  v-model="form.patient"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手术日期:">
                <el-input
                  disabled
                  v-model="form.opsDate"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手术房间：">
                <el-input
                  disabled
                  v-model="form.opsRoom"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="术前诊断：">
                <el-input
                  disabled
                  v-model="form.diagnosis"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手术方式:">
                <el-input
                  disabled
                  v-model="form.opsName"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="info-content-container">
        <div class="context1">
          <span>1、手术类型：</span>
          <span style="marginLeft:105px">
            <span>择期</span>
            <IsSelect :myselect="form.opsType === 'lxzq'?true:false" />
          </span>
          <span class="mgl50">
            <span>非择期</span>
            <IsSelect :myselect="form.opsType === 'lxfzq'?true:false" />
          </span>
          <span class="mgl50">
            <span>急诊</span>
            <IsSelect :myselect="form.opsType === 'lxjz'?true:false" />
          </span>
        </div>
        <div class="context1">
          <span>2、术前意识评估：</span>
          <span style="marginLeft:77px">
            <span>清醒</span>
            <IsSelect :myselect="form.consciousness === 'ysqx'?true:false" />
          </span>
          <span style="marginLeft:65px">
            <span>烦躁</span>
            <IsSelect :myselect="form.consciousness === 'ysfz'?true:false" />
          </span>
          <span class="mgl50">
            <span>昏迷</span>
            <IsSelect :myselect="form.consciousness === 'yshm'?true:false" />
          </span>
        </div>
        <div class="context1">
          <span>3、术前皮肤评估：</span>
          <span style="marginLeft:20px">
            <span>完整</span>
            <isSelect prop-select="true" />
            <span>皮肤不完整</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl50">
            <span>部位</span>
            <div class="input-div-context">123</div>
          </span>
          <span class="input-div">
            <span>程度</span>
            <div class="input-div-context">123</div>
          </span>
        </div>
        <div class="context1">
          <span>4、麻醉方式：</span>
          <span style="marginLeft:20px">
            <span>全麻</span>
            <isSelect prop-select="true" />
          </span>
        </div>
        <div class="context1">
          <span>5、手术体位：</span>
          <span style="marginLeft:6px">
            <span>仰卧位</span>
            <isSelect prop-select="true" />
          </span>
        </div>
        <div class="context1">
          <span>6、体位装置：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
        </div>
        <div class="context1">
          <span>7、约束带：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
        </div>
        <div class="context1">
          <span>8、导尿管：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>病房带入</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>手术室插入</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl5">
            <span>插管者</span>
            <div class="input-div-context-short">123</div>
          </span>
          <span class="input-div mgl5">
            <span>型号</span>
            <div class="input-div-context-short">123</div>
          </span>
          <span class="input-div mgl5">
            <span>尿液性质</span>
            <div class="input-div-context-short">123</div>
          </span>
        </div>
        <div class="context1">
          <span>9、设备使用：</span>
          <span style="marginLeft:6px">
            <span>电刀：</span>
            <span>1. 电切</span>
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl5">
            <span>功率</span>
            <div class="input-div-context-short">123</div>
          </span>
          <span>电凝</span>
          <span class="input-div mgl5">
            <span>功率</span>
            <div class="input-div-context-short">123</div>
          </span>
        </div>
        <div class="context1">
          <span>电极板位置：</span>
          <span style="marginLeft:6px">
            <span>大腿</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>小腿</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>臀部</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>其他</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:15px">
            <span>负极电路板回垫</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:15px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
        </div>
        <div class="context1">
          <span>气囊止血机：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
        </div>
        <div class="context2">
          <div class="context2-box">
            <div class="box-row">
              <span class="input-div mgl5">
                <span>部位</span>
                <div class="input-div-context-short">123</div>
              </span>
              <span class="input-div mgl5">
                <span style="marginLeft:8px">压力</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
            <div class="box-row">
              <span class="input-div mgl5">
                <span>充气时间</span>
                <div class="input-div-context-short-60">123</div>
              </span>
              <span class="input-div mgl5">
                <span>签名</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
            <div class="box-row">
              <span class="input-div mgl5">
                <span>放气时间</span>
                <div class="input-div-context-short-60">123</div>
              </span>
              <span class="input-div mgl5">
                <span>签名</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
          </div>
          <div class="context2-box mgl5">
            <div class="box-row">
              <span class="input-div mgl5">
                <span>部位</span>
                <div class="input-div-context-short">123</div>
              </span>
              <span class="input-div mgl5">
                <span style="marginLeft:8px">压力</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
            <div class="box-row">
              <span class="input-div mgl5">
                <span>充气时间</span>
                <div class="input-div-context-short-60">123</div>
              </span>
              <span class="input-div mgl5">
                <span>签名</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
            <div class="box-row">
              <span class="input-div mgl5">
                <span>放气时间</span>
                <div class="input-div-context-short-60">123</div>
              </span>
              <span class="input-div mgl5">
                <span>签名</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
          </div>
          <div class="context2-box mgl5">
            <div class="box-row">
              <span class="input-div mgl5">
                <span>部位</span>
                <div class="input-div-context-short">123</div>
              </span>
              <span class="input-div mgl5">
                <span style="marginLeft:8px">压力</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
            <div class="box-row">
              <span class="input-div mgl5">
                <span>充气时间</span>
                <div class="input-div-context-short-60">123</div>
              </span>
              <span class="input-div mgl5">
                <span>签名</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
            <div class="box-row">
              <span class="input-div mgl5">
                <span>放气时间</span>
                <div class="input-div-context-short-60">123</div>
              </span>
              <span class="input-div mgl5">
                <span>签名</span>
                <div class="input-div-context-short-60">123</div>
              </span>
            </div>
          </div>
        </div>
        <div class="context1">
          <span>10、手术冲洗：</span>
          <span style="marginLeft:6px">
            <span>0.9%氯化钠溶液</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>灭菌注射用水</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">药液</span>
            <span style="marginLeft:8px">1、</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">2、</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">3、</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">4、</span>
            <div class="input-div-context-short-60">123</div>
          </span>
        </div>
        <div class="context1 mgt20">
          <span>11、腰穿留置：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">操作者</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">拔针芯时间</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">签名</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">拔针时间</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">签名</span>
            <div class="input-div-context-short-60">123</div>
          </span>
        </div>
        <div class="context1 mgt20">
          <span>12、术中特殊交班：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl5">
            <div class="input-div-context-long">123</div>
          </span>
        </div>
        <div
          class="context1"
          style="marginTop:15px"
        >
          <span>13、术中冰冻：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">送检者1、</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">报告接收者</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">送检者2、</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">报告接收者</span>
            <div class="input-div-context-short-60">123</div>
          </span>
        </div>
        <div
          class="context1"
          style="marginTop:15px"
        >
          <span
            class="input-div"
            style="marginLeft:182px"
          >
            <span style="marginLeft:8px">送检者1、</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">报告接收者</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">送检者2、</span>
            <div class="input-div-context-short-60">123</div>
            <span style="marginLeft:8px">报告接收者</span>
            <div class="input-div-context-short-60">123</div>
          </span>
        </div>
        <div
          class="context1"
          style="marginTop:15px"
        >
          <span style="marginLeft:60px">
            <span>病理：</span>
            <span>无</span>
            <isSelect prop-select="true" />
            <span>有</span>
            <isSelect prop-select="true" />
            <span>数量：</span>
            <span>10</span>
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">送检医生</span>
            <div class="input-div-context-short">123</div>
          </span>
        </div>
        <div class="context1">
          <span>14、植入体：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl5">
            详见植入物使用登记单
          </span>
        </div>
        <div class="context1">
          <span>16、术中可观察的受压部位皮肤：</span>
        </div>
        <div class="context1">
          <table
            border="1"
            style="border-collapse:collapse;"
          >
            <tr>
              <th>
                <div class="table-th-time">
                  手术时间
                </div>
                <div class="line" />
                <div class="table-th-xiangmu">
                  项目
                </div>
              </th>
              <th>2小时</th>
              <th>4小时</th>
              <th>6小时</th>
              <th>8小时</th>
              <th>10小时</th>
              <th>12小时</th>
              <th>14小时</th>
              <th>16小时</th>
            </tr>
            <tr>
              <td style="textAlign:center">
                皮损情况
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>皮损情况</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>皮损情况</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>皮损情况</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>皮损情况</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>皮损情况</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>皮损情况</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>皮损情况</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>皮损情况</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="context1 mgt10">
          <span>18、巡回护士签名：</span>
          <span
            class="input-div"
          >
            <div class="input-div-context-short">123</div>
          </span>
        </div>
        <div class="context1">
          <span>19、术中交接班：</span>
        </div>
        <div
          class="context1"
          style="marginLeft:80px"
        >
          <span style="marginLeft:6px">
            <span>无</span>
            <isSelect prop-select="true" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <isSelect prop-select="true" />
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">时间</span>
            <div class="input-div-context-noborder">123</div>
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">签名</span>
            <div class="input-div-context-noborder">123</div>
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">时间</span>
            <div class="input-div-context-noborder">123</div>
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">签名</span>
            <div class="input-div-context-noborder">123</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import IsSelect from './components/isSelect'
export default {
  name: 'NursingDocumentTwo',
  data () {
    return {
      form: {
        patient: '',
        opsDate: '',
        opsRoom: '',
        diagnosis: '',
        opsName: '',
        opsType: '',
        consciousness: ''
      },
      wenshuData: {}
    }
  },
  mounted () {
    this.getWenShuData()
    Bus.$on('clickShuaXinTwo', res => {
      this.getWenShuData()
    })
  },
  methods: {
    getWenShuData () {
      let obj = {
        hospitalNo: 91150384,
        cureNo: 17257233
      }
      this.$store.dispatch('ReqNursingDocumentTwo', obj).then(res => {
        if (res.status === 200 && res.data.code === 200) {
          this.wenshuData = res.data.data
          console.log(this.wenshuData)
          this.form.patient = this.wenshuData.patient
          this.form.opsDate = this.wenshuData.opsDate
          this.form.opsRoom = this.wenshuData.opsRoom
          this.form.diagnosis = this.wenshuData.diagnosis
          this.form.opsName = this.wenshuData.opsName
          this.form.opsType = this.wenshuData.opsType
          this.form.consciousness = this.wenshuData.consciousness
          this.form.skin = this.wenshuData.skin
        }
      })
    }
  },
  components: {
    IsSelect
  }
}
</script>

<style scoped lang="scss">
@import './../../../styles/wenshu.scss';
.hulijilv-two-container {
  width: 824px;
  height: 920px;
  min-width: 824px;
  min-height: 920px;
  background-color: #fff;
  padding: 10px;
  .container-title {
    border-bottom: 1px solid #000;
    text-align: center;
    font-weight: 600;
    margin: 0 70px;
  }
  .wenben-content-info {
      display: flex;
      flex-direction: column;
      .info-content-title {
        text-align: center;
        letter-spacing: 5px;
        font-weight: 600;
        text-indent: 5px;
        font-size: 16px;
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
            width: 85px;
            height: 70px;
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
            height: 70px;
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
.input-div {
  display: flex;
  .input-div-context {
    padding: 0 5px;
    width: 100px;
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
.line {
  width: 84px;
  height: 1px;
  background-color: #000;
  transform:  rotate(-140deg);
  // width: 110px;
}
</style>
