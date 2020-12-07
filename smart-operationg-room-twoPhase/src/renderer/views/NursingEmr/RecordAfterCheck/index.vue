<template>
  <div class="record-before">
    <PatientInfo />
    <div class="rb-content">
      <div class="rb-option">
        <el-button
          type="primary"
          size="mini"
        >
          解 锁
        </el-button>
        <el-button
          type="primary"
          size="mini"
        >
          更新病房确认
        </el-button>
      </div>
      <div class="rb-table">
        <table cellspacing="0">
          <tbody>
            <tr>
              <td
                rowspan="2"
                style="width:138px;"
              >
                评估项目
              </td>
              <td
                rowspan="2"
              >
                手术护士确认栏
              </td>
              <td style="width:40px;" />
              <td style="width:40px;" />
              <td style="height:35px;width:120px;">
                病房护士确认栏
              </td>
            </tr>
            <tr>
              <td style="height:35px;">
                是
              </td>
              <td>否</td>
              <td>说明具体情况</td>
            </tr>
            <tr>
              <td style="height:52px;">
                术中留置导管情况
              </td>
              <td class="left">
                <div>
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">
                      无
                    </el-radio>
                    <el-radio :label="6">
                      有
                    </el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <span>数量*</span>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="620px"
                    />
                  </span>
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">
                      通畅
                    </el-radio>
                    <el-radio :label="6">
                      不畅
                    </el-radio>
                  </el-radio-group>
                </div>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                静脉通路情况
              </td>
              <td class="left">
                <div>
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">
                      无
                    </el-radio>
                    <el-radio :label="6">
                      有
                    </el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="浅静脉" />
                    <el-checkbox label="PICC" />
                    <el-checkbox label="CVC" />
                    <el-checkbox label="PORT" />
                    <el-checkbox label="通畅" />
                    <el-checkbox label="不畅" />
                    <el-checkbox label="其它" />
                  </el-checkbox-group>
                </div>
                <div>
                  <span>
                    <LineInput
                      :value="input"
                      input-width="620px"
                    />
                  </span>
                </div>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                术前带药
              </td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    无
                  </el-radio>
                  <el-radio :label="2">
                    已执行
                  </el-radio>
                  <el-radio :label="3">
                    未执行
                  </el-radio>
                </el-radio-group>
                <span>备注</span>
                <LineInput
                  :value="input"
                  input-width="620px"
                />
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                归还药品
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
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                带回血制品情况
              </td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    是
                  </el-radio>
                  <el-radio :label="2">
                    否
                  </el-radio>
                </el-radio-group>
                <el-input
                  type="textarea"
                  style="width:600px;"
                />
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                归还影像学检查
              </td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    是
                  </el-radio>
                  <el-radio :label="2">
                    否
                  </el-radio>
                </el-radio-group>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:72px;">
                术后皮肤粘膜情况
              </td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    完整
                  </el-radio>
                  <el-radio :label="2">
                    破损
                  </el-radio>
                  <el-radio :label="3">
                    发红
                  </el-radio>
                </el-radio-group>
                <span>
                  （术后门罗评分：分）
                </span>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                归还病史
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
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:102px;">
                归还物品情况
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
                <div>
                  <span>
                    <span>腹带* </span><span>
                      <LineInput
                        :value="input"
                        input-width="100px"
                      /></span>
                  </span>
                  <span>
                    <span>胃管* </span><span>
                      <LineInput
                        :value="input"
                        input-width="100px"
                      /></span>
                  </span>
                  <span>
                    <span>塑管* </span><span>
                      <LineInput
                        :value="input"
                        input-width="100px"
                      /></span>
                  </span>
                  <span>
                    <span>防压疮敷料* </span><span>
                      <LineInput
                        :value="input"
                        input-width="100px"
                      /></span>
                  </span>
                </div>
                <div>
                  <span>
                    <span>造口袋* </span><span>
                      <LineInput
                        :value="input"
                        input-width="100px"
                      /></span>
                  </span>
                  <span>
                    <span>胸瓶* </span><span>
                      <LineInput
                        :value="input"
                        input-width="100px"
                      /></span>
                  </span>
                  <span>
                    <span>穿刺针* </span><span>
                      <LineInput
                        :value="input"
                        input-width="100px"
                      /></span>
                  </span>
                  <span>
                    <span>其他* </span><span>
                      <LineInput
                        :value="input"
                        input-width="100px"
                      /></span>
                  </span>
                </div>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td>腰带</td>
            </tr>
            <tr>
              <td style="height:52px;">
                抗血栓袜
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
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td>腰带</td>
            </tr>
            <tr>
              <td style="height:52px;">
                术中添加情况
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
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td>腰带</td>
            </tr>
            <tr>
              <td style="height:52px;">
                备注
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
                <LineInput :value="input" />
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td>腰带+1</td>
            </tr>
            <tr>
              <td style="height:52px;">
                交接签名及时间
              </td>
              <td class="left">
                <div>
                  <span>
                    <span>手术室护士：</span>
                    <LineInput
                      :value="input"
                      input-width="100px"
                    />
                  </span>
                  <span>
                    <span>麻醉医生：</span>
                    <LineInput
                      :value="input"
                      input-width="150px"
                    />
                  </span>
                  <span>
                    <span>送复苏室工务员：</span>
                    <LineInput
                      :value="input"
                      input-width="100px"
                    />
                  </span>
                  <span>
                    <span>交接时间：</span>
                    <LineInput
                      :value="input"
                      input-width="150px"
                    />
                  </span>
                </div>
                <div>
                  <span>
                    <span>复苏室护士：</span>
                    <LineInput
                      :value="input"
                      input-width="100px"
                    />
                  </span>
                  <span>
                    <span>病区护士：</span>
                    <LineInput
                      :value="input"
                      input-width="150px"
                    />
                  </span>
                  <span>
                    <span>送到病房工务员：</span>
                    <LineInput
                      :value="input"
                      input-width="100px"
                    />
                  </span>
                  <span>
                    <span>交接时间：</span>
                    <LineInput
                      :value="input"
                      input-width="150px"
                    />
                  </span>
                </div>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td>腰带+1</td>
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
    PatientInfo, LineInput
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
      padding-left:20px;
      border-radius: 5px;
      .rb-option{
        text-align: right;
        padding: 10px 20px;
      }
      .rb-table{
        height: calc(100% - 48px);
        overflow-y: scroll;
        padding-bottom: 20px;
        padding-right: 20px;
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
              }
            }
          }
        }
      }
    }
  }
</style>
