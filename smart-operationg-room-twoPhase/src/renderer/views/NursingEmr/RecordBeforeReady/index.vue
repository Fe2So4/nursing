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
                病房护士确认栏
              </td>
              <td style="width:40px;" />
              <td style="width:40px;" />
              <td style="height:35px;width:120px;">
                手术护士确认栏
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
                术前一日晚睡眠
              </td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="3">
                    正常
                  </el-radio>
                  <el-radio :label="6">
                    失眠
                  </el-radio>
                </el-radio-group>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                心理状态
              </td>
              <td class="left">
                <el-radio-group v-model="radio">
                  <el-radio :label="1">
                    稳定
                  </el-radio>
                  <el-radio :label="2">
                    紧张
                  </el-radio>
                  <el-radio :label="3">
                    焦虑
                  </el-radio>
                  <el-radio :label="4">
                    恐惧
                  </el-radio>
                </el-radio-group>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                风险评估
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
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="跌倒" />
                  <el-checkbox label="营养" />
                  <el-checkbox label="压疮 营养" />
                </el-checkbox-group>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:52px;">
                药物过敏史
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
                已禁食
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
              <td style="height:52px;">
                已肠道准备
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
                取下假牙、隐形眼镜、首饰贵重物品
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
                <span>
                  <span>备注</span>
                  <el-input
                    v-model="input"
                    style="width:620px;"
                  />
                </span>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:170px;">
                随带药品
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
                    药品名称及数量
                  </span>
                  <el-button
                    type="info"
                    size="mini"
                    plain
                  >
                    扫码核对
                  </el-button>
                </div>
                <div><span>[乙10%]注射用矛头蝮蛇血凝酶（巴曲亭）1iu/瓶2.0瓶</span></div>
                <div><span>[甲]氯化钠针（百特塑袋）100ml*0.9% 1.0袋+[甲]头孢呋辛钠针（西力欣）750mg 2.0支</span><i class="el-icon-success" /></div>
                <div><span>[乙20%]左奥硝唑氯化钠注射液（优诺安）0.5g：100ml 1.0瓶</span><i class="el-icon-success" /></div>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td />
            </tr>
            <tr>
              <td style="height:102px;">
                随带病史
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
                随带物品
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
                <div><span>腹带*</span><span>胃管*</span><span>塑管*</span><span>防压疮敷料*</span></div>
                <div><span>造口袋*</span><span>胸瓶*</span><span>穿刺针*</span><span>其他*</span></div>
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
                随带影像学检查
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
                随带导管情况
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
                <el-input />
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td>腰带+1</td>
            </tr>
            <tr>
              <td style="height:52px;">
                女性月经情况
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
                <span>(如果患者为男性此条无需填写)</span>
              </td>
              <td><el-radio label="" /></td>
              <td><el-radio label="" /></td>
              <td>腰带+1</td>
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
                <span>说明</span>
                <el-input
                  size="mini"
                  style="width:300px;"
                  v-model="input"
                />
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
                <span>
                  <span>病区护士：</span>
                  <el-input
                    size="mini"
                    style="width:100px;"
                    v-model="input"
                  />
                </span>
                <span>
                  <span>交接时间：</span>
                  <el-input
                    size="mini"
                    style="width:150px;"
                    v-model="input"
                  />
                </span>
                <span>
                  <span>工务员：</span>
                  <el-input
                    size="mini"
                    style="width:100px;"
                    v-model="input"
                  />
                </span>
                <span>
                  <span>手术室护士：</span>
                  <el-input
                    size="mini"
                    style="width:100px;"
                    v-model="input"
                  />
                </span>
                <span>
                  <span>交接时间：</span>
                  <el-input
                    size="mini"
                    style="width:150px;"
                    v-model="input"
                  />
                </span>
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
    PatientInfo
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
      padding:0 20px;
      border-radius: 5px;
      .rb-option{
        text-align: right;
        padding: 10px 0;
      }
      .rb-table{
        height: calc(100% - 48px);
        overflow-y: scroll;
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
                &.left{
                  text-align: left;
                  padding-left: 20px;
                }
                .el-checkbox-group{
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
