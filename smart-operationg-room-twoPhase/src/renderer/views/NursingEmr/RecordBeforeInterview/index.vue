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
                style="width:138px;"
                class="simple-left"
              >
                一、访视自我介绍
              </td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    有
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td
                style="text-align:left;"
                colspan="2"
              >
                二、手术患者评估
              </td>
            </tr>
            <tr>
              <td>1.意识活动</td>
              <td class="left">
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
              </td>
            </tr>
            <tr>
              <td>2.四肢活动</td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    正常
                  </el-radio>
                  <el-radio :label="2">
                    障碍
                  </el-radio>
                </el-radio-group>
                <span>
                  （
                  <span>部位：</span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                  <span>性质：</span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">
                      瘫痪
                    </el-radio>
                    <el-radio :label="2">
                      畸形
                    </el-radio>
                    <el-radio :label="3">
                      其他
                    </el-radio>
                  </el-radio-group>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                  ）
                </span>
              </td>
            </tr>
            <tr>
              <td>3.皮肤</td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    正常
                  </el-radio>
                  <el-radio :label="2">
                    破损
                  </el-radio>
                </el-radio-group>
                <span>
                  （
                  <span>部位：</span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                  ）
                </span>
              </td>
            </tr>
            <tr>
              <td>4.患者过敏史</td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    有
                  </el-radio>
                </el-radio-group>
                <span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </span>
              </td>
            </tr>
            <tr>
              <td>5.患者手术史</td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    有
                  </el-radio>
                </el-radio-group>
                <span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </span>
              </td>
            </tr>
            <tr>
              <td>6.传染病或感染情况</td>
              <td class="left">
                <span>乙肝两对半：</span>
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    阴性
                  </el-radio>
                  <el-radio :label="2">
                    阳性
                  </el-radio>
                </el-radio-group>
                <span>乙肝两对半：</span>
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    阴性
                  </el-radio>
                  <el-radio :label="2">
                    阳性
                  </el-radio>
                </el-radio-group>
                <span>
                  <span>其他</span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </span>
              </td>
            </tr>
            <tr>
              <td>7.金属植入物</td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    有
                  </el-radio>
                </el-radio-group>
                <span>
                  （部位：
                  <LineInput
                    :value="input"
                    input-width="300px"
                  />）
                </span>
              </td>
            </tr>
            <tr>
              <td>8.术前心理</td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    平静、稳定
                  </el-radio>
                  <el-radio :label="2">
                    开朗
                  </el-radio>
                  <el-radio :label="3">
                    焦虑
                  </el-radio>
                  <el-radio :label="4">
                    恐惧
                  </el-radio>
                  <el-radio :label="5">
                    悲哀
                  </el-radio>
                  <el-radio :label="6">
                    压抑
                  </el-radio>
                  <el-radio :label="7">
                    孤独
                  </el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span>
                  <span>访视护士：</span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </span>
                <span>
                  <span>访视日期：</span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                术前访视确认：我已接受手术室护士的术前宣教，充分了解手术前的注意事项和有关事宜，并愿意配合手术过程。
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span>
                  <span>患者或家属签名：</span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </span>
                <span>
                  <span>访视日期：</span>
                  <span><LineInput
                    :value="input"
                    input-width="300px"
                  /></span>
                </span>
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
      padding:0 20px;
      border-radius: 5px;
      .rbn-option{
        text-align: right;
        padding: 10px 0;
      }
      .rbn-table{
        height: calc(100% - 48px);
        // overflow-y: scroll;
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
                &:first-child{
                  text-align: left;
                  padding-left: 10px;
                }
                &.left{
                  text-align: left;
                  padding-left: 20px;
                }
                &.simple-left{
                  text-align: left;
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
