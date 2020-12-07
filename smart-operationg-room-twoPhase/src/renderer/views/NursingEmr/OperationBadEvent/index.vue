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
      </div>
      <div class="rb-table">
        <table cellspacing="0">
          <tbody>
            <tr>
              <td
                style="width:150px;"
                class="center"
              >
                上报日期
              </td>
              <td colspan="3">
                1
              </td>
              <td>上报科室</td>
              <td>2</td>
              <td>上报人</td>
              <td>3</td>
            </tr>
            <tr>
              <td class="center">
                事件类型（请在<el-checkbox />中用√选择，可多选）
              </td>
              <td colspan="7">
                <div>
                  <p>
                    <el-checkbox v-model="checkList">
                      1类，不良治疗：包括给药错误、输血错误、医疗感染爆发、手术身份部位识别错误、体内遗留手术器械、输液输血反应；重复给药；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      2类，意外事件：包括跌倒、坠床、走失、烫伤、烧伤、自残、自杀、火灾、失窃、咬破体温表、约束不良；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      3类，医患沟通事件：包括医患争吵、身体攻击、打架、暴力行为等；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      4类，饮食、皮肤护理不良事件：包括误吸/窒息、咽入异物、院内压疮、医源性皮肤损伤；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      5类，不良辅助诊查、病人转运事件；含身份识别错误、标本丢失、检查或运送中或后病情突变或出现意外；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      6类，管道护理不良事件；含管道滑脱、病人自拔；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      7类，职业暴露：含针刺伤、割伤；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      8类，公共设施事件：包括医院建筑损毁、病房设施故障、蓄意破坏、有害物质泄露；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      9类，医疗设备器械事件：包括医疗材料故障、仪器故障、器械不符合无菌要求；
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      10类，供应室不良事件：包括消毒物品未达要求、热源试验阳性、操作中发现器械包器械物品不符。
                    </el-checkbox>
                  </p>
                  <p>
                    <el-checkbox v-model="checkList">
                      其他，医护信息传递错误
                    </el-checkbox>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="center">
                发生地点
              </td>
              <td colspan="7">
                <el-checkbox-group>
                  <el-checkbox>
                    病房
                  </el-checkbox>
                  <el-checkbox>
                    治疗室
                  </el-checkbox>
                  <el-checkbox>
                    换药室
                  </el-checkbox>
                  <el-checkbox>
                    处置室
                  </el-checkbox>
                  <el-checkbox>
                    走廊
                  </el-checkbox>
                  <el-checkbox>
                    厕所
                  </el-checkbox>
                  <el-checkbox>
                    病区外
                  </el-checkbox>
                  <el-checkbox>
                    其他：
                  </el-checkbox>
                </el-checkbox-group>
              </td>
            </tr>
            <tr>
              <td class="center">
                事件经过
              </td>
              <td colspan="7">
                <div>
                  <p>
                    <span>发生时间：</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value="value"
                      />
                    </span>
                  </p>
                  <p>
                    <span>地点：</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value="value"
                      />
                    </span>
                  </p>
                  <p>
                    <span>事件：</span>
                    <span>
                      <LineInput
                        input-width="150px"
                        :value="value"
                      />
                    </span>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="center">
                紧急处理与患者情况
              </td>
              <td colspan="7">
                <div>
                  <p>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox>
                        立即通知
                      </el-checkbox>
                      <el-checkbox>
                        其他护理人员
                      </el-checkbox>
                      <el-checkbox>
                        病房护士长/责任组长
                      </el-checkbox>
                      <el-checkbox>
                        值班护士长
                      </el-checkbox>
                      <el-checkbox>
                        护理部
                      </el-checkbox>
                      <el-checkbox>
                        医生
                      </el-checkbox>
                      <el-checkbox>
                        家属
                      </el-checkbox>
                      <el-checkbox>
                        其他人员
                      </el-checkbox>
                    </el-checkbox-group>
                  </p>
                  <p>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox>
                        密切观察生命体征
                      </el-checkbox>
                    </el-checkbox-group>
                  </p>
                  <p>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox>
                        医疗或护理措施
                      </el-checkbox>
                    </el-checkbox-group>
                  </p>
                  <p>
                    <LineInput
                      input-width="600px"
                      :value="value"
                    />
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="center">
                三级审核反馈及签名
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value="value"
                />
              </td>
              <td>
                护士长签名
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value="value"
                />
              </td>
              <td>
                科护士长签名
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value="value"
                />
              </td>
              <td>
                护理部签名
              </td>
              <td>
                <LineInput
                  input-width="150px"
                  :value="value"
                />
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
      value: '',
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
            // text-align: center;
            tr{
              td{
                border-top: 1px solid #E8E8E8;
                border-right: 1px solid #E8E8E8;
                color: #444444;
                font-size: 14px;
                height: 40px;
                padding:10px 0 10px 20px;
                line-height:26px;
                &.left{
                  text-align: left;
                  padding-left: 20px;
                }
                &.center{
                  text-align: center;
                  padding-left: unset;
                }
                .right{
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
