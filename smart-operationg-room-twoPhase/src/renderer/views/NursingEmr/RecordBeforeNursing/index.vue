<template>
  <div class="record-before-nursing">
    <PatientInfo />
    <div class="rbn-content">
      <div class="rbn-option">
        <el-button
          type="primary"
          size="mini"
        >
          保 存
        </el-button>
      </div>
      <div class="rbn-table">
        <table cellspacing="0">
          <tbody>
            <tr>
              <td
                style="width:138px;height:52px;"
              >
                一般资料
              </td>
              <td class="left">
                <div>
                  <span>性别：</span>
                  <span>年龄：</span>
                  <span>
                    民族：
                  </span>
                  <span>
                    <span>体重：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td
                rowspan="2"
              >
                临床资料
              </td>
              <td class="left">
                <div>
                  <span>
                    <span class="label">诊断：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    <span class="label">手术名称：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                  <span>
                    <span class="label">手术部位：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                  <span>
                    <span class="label">血型：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    <span class="label">过敏史：</span>
                    <el-radio-group v-model="radio">
                      <el-radio :label="1">
                        无
                      </el-radio>
                      <el-radio :label="2">
                        有
                      </el-radio>
                    </el-radio-group>
                    <span>（过敏源）：</span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                </div>
                <div>
                  <span>
                    <span class="label">既往手术史：</span>
                    <el-radio-group v-model="radio">
                      <el-radio :label="1">
                        无
                      </el-radio>
                      <el-radio :label="2">
                        有
                      </el-radio>
                    </el-radio-group>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                </div>
                <div>
                  <span class="label">肝功能：</span>
                  <span>
                    <span>
                      谷丙转氨酶：
                    </span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                  <span>
                    <span>
                      总胆红素：
                    </span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                  <span>
                    <span>
                      凝血酶原时间：
                    </span>
                    <span>
                      <LineInput
                        :value="input"
                        input-width="200px"
                      />
                    </span>
                  </span>
                </div>
                <div>
                  各类化验检查确认：
                </div>
                <div>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="梅毒、艾滋病毒" />
                    <el-checkbox label="MRI" />
                    <el-checkbox label="三大常规" />
                    <el-checkbox label="皮肤试验" />
                  </el-checkbox-group>
                </div>
                <div>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="凝血功能" />
                    <el-checkbox label="内窥镜" />
                    <el-checkbox label="胸片" />
                    <el-checkbox label="">
                      <LineInput
                        :value="input"
                        input-width="100px"
                      />
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="血型鉴定" />
                    <el-checkbox label="B超" />
                    <el-checkbox label="心电图" />
                    <el-checkbox label="">
                      <LineInput
                        :value="input"
                        input-width="100px"
                      />
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="生化指标" />
                    <el-checkbox label="三对半" />
                    <el-checkbox label="">
                      <LineInput
                        :value="input"
                        input-width="100px"
                      />
                    </el-checkbox>
                    <el-checkbox label="">
                      <LineInput
                        :value="input"
                        input-width="100px"
                      />
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="left">
                <div>
                  <span>T <LineInput
                    :value="input"
                    input-width="100px"
                  />℃</span>
                  <span>
                    P<LineInput
                      :value="input"
                      input-width="100px"
                    />次/分
                  </span>
                  <span>
                    R <LineInput
                      :value="input"
                      input-width="100px"
                    />次/分
                  </span>
                  <span>
                    BP <LineInput
                      :value="input"
                      input-width="100px"
                    />mmHg
                  </span>
                  <span>
                    瞳孔(mm)左 <LineInput
                      :value="input"
                      input-width="100px"
                    />右 <LineInput
                      :value="input"
                      input-width="100px"
                    />
                  </span>
                </div>
                <div>
                  <span class="label">神志：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      清醒
                    </el-radio>
                    <el-radio :label="2">
                      嗜睡
                    </el-radio>
                    <el-radio :label="3">
                      烦躁
                    </el-radio>
                    <el-radio :label="4">
                      昏迷
                    </el-radio>
                    <el-radio :label="5">
                      其他
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </div>
                <div>
                  <span class="label">语言沟通：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      正常
                    </el-radio>
                    <el-radio :label="2">
                      障碍
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </div>
                <div>
                  <span class="label">活动：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      正常
                    </el-radio>
                    <el-radio :label="2">
                      全瘫
                    </el-radio>
                    <el-radio :label="3">
                      截瘫
                    </el-radio>
                    <el-radio :label="4">
                      偏瘫
                    </el-radio>
                    <el-radio :label="5">
                      其他
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </div>
                <div>
                  <span class="label">皮肤：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      完整
                    </el-radio>
                    <el-radio :label="2">
                      不完整（部位及大小）
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value="input"
                    input-width="600px"
                  /></span>
                </div>
                <div>
                  <span class="label">引流管：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      无
                    </el-radio>
                    <el-radio :label="2">
                      有
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value="input"
                    input-width="600px"
                  /></span>
                </div>
                <div>
                  <span class="label">体型：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      标准
                    </el-radio>
                    <el-radio :label="2">
                      肥胖
                    </el-radio>
                    <el-radio :label="3">
                      消瘦
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value="input"
                    input-width="600px"
                  /></span>
                </div>
                <div>
                  <span class="label">心理状况：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      正常
                    </el-radio>
                    <el-radio :label="2">
                      紧张
                    </el-radio>
                    <el-radio :label="3">
                      恐惧
                    </el-radio>
                    <el-radio :label="4">
                      焦虑
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value="input"
                    input-width="600px"
                  /></span>
                </div>
                <div>
                  <span class="label">疼痛程度：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      无痛
                    </el-radio>
                    <el-radio :label="2">
                      有点痛
                    </el-radio>
                    <el-radio :label="3">
                      稍痛
                    </el-radio>
                    <el-radio :label="4">
                      更痛
                    </el-radio>
                    <el-radio :label="5">
                      很痛
                    </el-radio>
                    <el-radio :label="5">
                      最痛
                    </el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <span class="label">肠道准备：</span>
                  <span><LineInput
                    :value="input"
                    input-width="800px"
                  /></span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="height:52px;">
                术前宣教
              </td>
              <td class="left">
                <p
                  v-for="(item,index) in noticeList"
                  :key="index"
                >
                  {{ index+1 }}.{{ item }}
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:52px;">
                评估记录
              </td>
              <td class="left">
                <div>
                  <span>评估日期：</span>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="100px"
                    />
                  </span>
                </div>
                <div>
                  <span>术前评估护士签名：</span>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="100px"
                    />
                  </span>
                </div>
                <div>
                  <span>患者/家属签名：</span>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="100px"
                    />
                  </span>
                </div>
              </td>
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
      checkList: [],
      noticeList: ['明天是你的手术日期，请您在手术前6小时禁食禁水，手术后饮食根据医嘱。',
        '术前请用含有抗菌成分的皂液(沐浴露)沐浴，做好皮肤清洁工作。',
        '进手术室前排小便及大便，将手表、首饰、假牙、发卡等取下，贵重物品交给家人保管，以保证您的财产及手术、麻醉的安全。',
        '手术前较窄，尽量睡在床的中间，不要移动，如有不适请及时告知，我们会及时处理。',
        '手术日请勿化妆，尤其是唇膏及指甲油，以免影响医生观察。',
        '预先请换好清洁的病员服装（衣服请反穿，纽扣系在背后，勿穿内衣裤及袜子）。等待手术室接送员来接您。',
        '由于手术室内温度控制在21~25℃，如太热或者太冷，请及时告知。',
        '手术开始前，巡回护士将与您核对病区、床号、姓名，希望您准确回答。麻醉时，麻醉师会根据手术需要实施麻醉，请您配合。',
        '手术前麻醉及手术部位因消毒时要充分暴露，消毒时会有凉意，请您不必担心，同时我们会给您做好保暖工作。',
        '在麻醉后，我们会根据手术需要放置各种体位。可能有些体位会使您感到不适，请及时提出。我们会在手术允许的情况下，尽量为您调整。手术过程中，如您有不适，可向麻醉师或护士提出，以便我们及时处理。',
        '手术后我们会及时护理您的伤口，固定好引流管，并为您保暖。',
        '手术时间较长的，因骶尾骨、足部等部位受压时间过长，会引起发红。希望您能听从病区护士的劝导，定时翻身或采取其他预防受压措施。'
      ]
    }
  },
  components: {
    PatientInfo,
    LineInput
  }
}
</script>

<style lang="scss" scoped>
  .record-before-nursing{
    height: 100%;
    .rbn-content{
      height: calc(100% - 250px);
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
      border-radius: 5px;
      .rbn-option{
        text-align: right;
        padding: 10px 20px;
      }
      .rbn-table{
        height: calc(100% - 48px);
        overflow-y: scroll;
        padding:0 20px;
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
                padding: 10px 0;
                border-right: 1px solid #E8E8E8;
                color: #444444;
                font-size: 14px;
                line-height: 26px;
                &.left{
                  text-align: left;
                  padding-left: 20px;
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
                .label{
                  display: inline-block;
                  width: 90px;
                  text-align: left;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
