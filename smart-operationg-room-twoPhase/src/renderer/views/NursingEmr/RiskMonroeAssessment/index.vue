<template>
  <div class="record-before">
    <PatientInfo />
    <div class="rb-content">
      <div class="rb-option">
        <el-button
          type="primary"
          size="mini"
        >
          保 存
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          同 步
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          提 交
        </el-button>
      </div>
      <div class="rb-table">
        <table cellspacing="0">
          <tbody>
            <tr>
              <td colspan="5">
                术前风险因素评估
              </td>
            </tr>
            <tr>
              <td
                style="width:600px;"
              >
                评分数
              </td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td
                class="left"
                style="width:60px;"
              >
                总分
              </td>
            </tr>
            <tr>
              <td class="left">
                活动度
              </td>
              <td>
                <el-radio :value="1">
                  无受限或轻微受限，可自主活动
                </el-radio>
              </td>
              <td>
                <el-radio :value="2">
                  非常受限需协助移动有功能性限制
                </el-radio>
              </td>
              <td>
                <el-radio :value="3">
                  完全受限，需完全依靠他人
                </el-radio>
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td class="left">
                空腹时间
              </td>
              <td>
                <el-radio :value="1">
                  ≤12h
                </el-radio>
              </td>
              <td>
                <el-radio :value="2">
                  12h
                </el-radio>
              </td>
              <td>
                <el-radio :value="3">
                  ≥24h
                </el-radio>
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td class="left">
                身体质量指数(BMI)
              </td>
              <td>
                <el-radio :value="1">
                  &lt;30kg/m^2
                </el-radio>
              </td>
              <td>
                <el-radio :value="2">
                  30kg/m2-35kg/m2
                </el-radio>
              </td>
              <td>
                <el-radio :value="3">
                  &gt;35kg/m2
                </el-radio>
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td class="left">
                发生30-180天内的体重降低
              </td>
              <td>
                <el-radio :value="1">
                  ≤7.4%，无改变或不知道
                </el-radio>
              </td>
              <td>
                <el-radio :value="2">
                  7.5%-9.9%
                </el-radio>
              </td>
              <td>
                <el-radio :value="3">
                  ≥10%
                </el-radio>
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td class="left">
                年龄
              </td>
              <td>
                <el-radio :value="1">
                  ≤39岁
                </el-radio>
              </td>
              <td>
                <el-radio :value="2">
                  40-59岁
                </el-radio>
              </td>
              <td>
                <el-radio :value="3">
                  ≥60岁
                </el-radio>
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td
                class="left"
                rowspan="7"
              />
              <td
                colspan="3"
                class="left"
              >
                每项不利因素评1分，最低0分，最高6分
              </td>
              <td>
                <el-checkbox v-model="checkList" />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                吸烟（30天内）
              </td>
              <td>
                <el-checkbox v-model="checkList" />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                高血压前期或高血压（血压&gt;120/80）
              </td>
              <td>
                <el-checkbox v-model="checkList" />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                血管/肾脏/心血管/周期血管疾病
              </td>
              <td>
                <el-checkbox v-model="checkList" />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                哮喘/肺部/呼吸系统疾病
              </td>
              <td>
                <el-checkbox v-model="checkList" />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                有过压力性损伤病史/目前有压压力性损失
              </td>
              <td>
                <el-checkbox v-model="checkList" />
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="left"
              >
                糖尿病/胰岛素型糖尿病
              </td>
              <td>
                <el-checkbox v-model="checkList" />
              </td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="right"
              >
                术前部分门罗评分统计：
              </td>
              <td>0</td>
            </tr>
            <tr>
              <td>5-6=低风险</td>
              <td>7-14=中度风险</td>
              <td>≥15=高风险</td>
              <td>风险程度</td>
              <td>低风险</td>
            </tr>
            <tr>
              <td class="left">
                术前风险评估人签字：
              </td>
              <td>
                <LineInput
                  input-width="300px"
                  :value="value"
                />
              </td>
              <td>
                <span>日期：</span>
                <LineInput
                  input-width="300px"
                  :value="value"
                />
              </td>
              <td>
                <span>时间：</span>
                <LineInput
                  input-width="300px"
                  :value="value"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td>接收者签字：</td>
              <td>
                <LineInput
                  input-width="300px"
                  :value="value"
                />
              </td>
              <td>
                <span>日期：</span>
                <LineInput
                  input-width="300px"
                  :value="value"
                />
              </td>
              <td>
                <span>时间：</span>
                <LineInput
                  input-width="300px"
                  :value="value"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td colspan="5">
                术中风险因素评分
              </td>
            </tr>
            <tr>
              <td>评分数</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>总分</td>
            </tr>
            <tr>
              <td>身体状态/麻醉评分（由临床医生/麻醉医生/病史室提供）</td>
              <td>
                <el-radio :label="1">
                  健康或轻度系统疾病，无功能性限制
                </el-radio>
              </td>
              <td>
                <el-radio :label="2">
                  中、重度的系统疾病，有功能性限制
                </el-radio>
              </td>
              <td>
                <el-radio :label="3">
                  中、重度的系统疾病，严重功能受限，甚至威胁生命，或麻醉评分&gt;3分
                </el-radio>
              </td>
              <td>1</td>
            </tr>
            <tr>
              <td>麻醉类型</td>
              <td>
                <el-radio :label="1">
                  监护局麻/局麻
                </el-radio>
              </td>
              <td>
                <el-radio :label="2">
                  神经阻滞
                </el-radio>
              </td>
              <td>
                <el-radio :label="3">
                  全麻
                </el-radio>
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>体温（根据体温监测提供）</td>
              <td>
                <el-radio :label="1">
                  36.1*-37.8*体温保持横温
                </el-radio>
              </td>
              <td>
                <el-radio :label="2">
                  &lt;36.1*或者&gt;37.8*(体温变化±2*之间)
                </el-radio>
              </td>
              <td>
                <el-radio :label="3">
                  &lt;36.1*或者&gt;37.8*(体温变化±2*)
                </el-radio>
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>低血压（根据血压监测提供收缩压）</td>
              <td>
                <el-radio :label="1">
                  没有或≤10%的血压变化
                </el-radio>
              </td>
              <td>
                <el-radio :label="2">
                  11%&lt;血压变化&lt;20%
                </el-radio>
              </td>
              <td>
                <el-radio :label="3">
                  血压变化21%-50%/持续性
                </el-radio>
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>潮湿程度（病人皮肤下）</td>
              <td>
                <el-radio :label="1">
                  保持干燥
                </el-radio>
              </td>
              <td>
                <el-radio :label="2">
                  有一些潮湿
                </el-radio>
              </td>
              <td>
                <el-radio :label="3">
                  汇聚潮湿
                </el-radio>
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>体位协助物/加温毯/体位改变</td>
              <td>
                <el-radio :label="1">
                  未使用体位协助物/患者体表覆盖加温毯
                </el-radio>
              </td>
              <td>
                <el-radio :label="2">
                  使用体位协助物/加温毯垫于患者身下
                </el-radio>
              </td>
              <td>
                <el-radio :label="3">
                  剪切力/加压力/改变体位
                </el-radio>
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>体位（根据手术）</td>
              <td>
                <el-radio :label="1">
                  膀胱结石位
                </el-radio>
              </td>
              <td>
                <el-radio :label="2">
                  侧卧位
                </el-radio>
              </td>
              <td>
                <el-radio :label="3">
                  平卧位/俯卧位
                </el-radio>
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="right"
              >
                术中部分门罗评分总计：
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="right"
              >
                术前部分门罗评分总计：
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td
                colspan="4"
                class="right"
              >
                目前（术前部分+术中部分）门罗评分总计：
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td>
                13=低风险
              </td>
              <td>14-24=中度风险</td>
              <td>
                ≥25=高风险
              </td>
              <td class="right">
                风险程度：
              </td>
              <td>
                低风险
              </td>
            </tr>
            <tr>
              <td class="left">
                手术风险评估人签字：
              </td>
              <td>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </td>
              <td>
                <span>日期：</span>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </td>
              <td>
                <span>时间：</span>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td class="left">
                接收者签字：
              </td>
              <td>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </td>
              <td>
                <span>日期：</span>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </td>
              <td>
                <span>时间：</span>
                <LineInput
                  :value="value"
                  input-width="150px"
                />
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import LineInput from '@/components/LineInput/index'
import PatientInfo from '@/components/PatientInfoStep/patient-info-step'
export default {
  name: 'RecordBefore',
  data () {
    return {
      radio: '',
      input: '无',
      checkList: []
    }
  },
  components: {
    PatientInfo,
    LineInput
  }
}
</script>

<style lang="scss" scoped>
  .record-before{
    height: 100%;
    .rb-content{
      height: calc(100% - 250px);
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      .rb-option{
        text-align: right;
        padding: 10px 20px;
      }
      .rb-table{
        height: calc(100% - 48px);
        padding:0 20px;
        overflow-y: scroll;
        padding-bottom: 20px;
        table{
          width: 100%;
          // height: 100%;
          border-bottom: 1px solid #E8E8E8;
          border-left: 1px solid #E8E8E8;
          tbody{
            text-align: center;
            tr{
              td{
                border-top: 1px solid #E8E8E8;
                border-right: 1px solid #E8E8E8;
                color: #444444;
                font-size: 14px;
                height: 40px;
                &.left{
                  text-align: left;
                  padding-left: 20px;
                }
                &.right{
                  text-align: right;
                  padding-right: 20px;
                }
                .el-checkbox-group{
                  display: inline-block;
                }
                .el-icon-success{
                  color: #0BBE4A;
                }
                &:nth-last-child(3){
                  /deep/ .el-radio__label{
                    padding: unset;
                  }
                }
                &:nth-last-child(2){
                  /deep/ .el-radio__label{
                    padding: unset;
                  }
                }
                &:nth-last-child(){

                }
              }
            }
          }
        }
      }
    }
  }
</style>
