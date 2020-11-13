<template>
  <div
    class="hulijilv-two-container"
    id="nursing-document-two"
  >
    <div class="wenben-content-info">
      <table>
        <thead style="display: table-header-group;">
          <div class="container-title">
            复旦大学附属华山医院
          </div>
          <div class="info-content-title">
            手术病人护理记录单(二)
          </div>
          <div class="wenben-content-userinfo">
            <div class="row">
              <div class="col">
                <span class="row-lable">病人信息：</span>
                <div class="row-text">
                  {{ form.patient }}
                </div>
              </div>
              <div
                class="col-40"
              >
                <span class="row-lable">手术日期：</span>
                <div class="row-text">
                  {{ form.opsDate }}
                </div>
              </div>
              <div
                class="col"
              >
                <span class="row-lable">手术房间：</span>
                <div
                  class="row-text"
                  style="width:70px"
                >
                  {{ form.opsRoom }}
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col"
                style="width:30%"
              >
                <span class="row-lable">术前诊断：</span>
                <div class="row-text">
                  {{ form.diagnosis }}
                </div>
              </div>
              <div
                style="width:66%"
                class="col-50"
              >
                <span
                  style="width: 118px"
                  class="row-lable"
                >手术方式：</span>
                <div class="row-text">
                  {{ form.opsName }}
                </div>
              </div>
            </div>
          </div>
        </thead>
      </table>
      <div class="info-content-container">
        <div class="context1">
          <span>1、手术类型：</span>
          <span style="marginLeft:105px">
            <span>择期</span>
            <IsSelect :myselect="form.opsType === '1'?true:false" />
          </span>
          <span class="mgl50">
            <span>非择期</span>
            <IsSelect :myselect="form.opsType === '2'?true:false" />
          </span>
          <span class="mgl50">
            <span>急诊</span>
            <IsSelect :myselect="form.opsType === '3'?true:false" />
          </span>
        </div>
        <div class="context1">
          <span>2、术前意识评估：</span>
          <span style="marginLeft:77px">
            <span>清醒</span>
            <IsSelect :myselect="form.consciousness === '1'?true:false" />
          </span>
          <span style="marginLeft:65px">
            <span>烦躁</span>
            <IsSelect :myselect="form.consciousness === '2'?true:false" />
          </span>
          <span class="mgl50">
            <span>昏迷</span>
            <IsSelect :myselect="form.consciousness === '3'?true:false" />
          </span>
        </div>
        <div class="context1">
          <span>3、术前皮肤评估：</span>
          <span style="marginLeft:20px">
            <span>完整</span>
            <IsSelect :myselect="form.skin.skinName === '1'?true:false" />
            <span>皮肤不完整</span>
            <IsSelect :myselect="form.skin.skinName === '2'?true:false" />
          </span>
          <span class="input-div mgl50">
            <span>部位</span>
            <div
              style="textAlign:center"
              class="input-div-context"
            >{{ form.skin.skinLocate || '' }}</div>
          </span>
          <span class="input-div">
            <span>程度</span>
            <div
              style="textAlign:center"
              class="input-div-context"
            >{{ form.skin.skinDegree || '' }}</div>
          </span>
        </div>
        <div class="context1">
          <span>4、麻醉方式：</span>
          <span
            style="marginLeft:20px"
            v-for="item in selectAne"
            :key="item.value"
          >
            <span>{{ item.text }}</span>
            <IsSelect :myselect="true" />
          </span>
        </div>
        <div class="context1">
          <span>5、手术体位：</span>
          <span
            style="marginLeft:6px"
            v-for="item in selectBody"
            :key="item.value"
          >
            <span>{{ item.text }}</span>
            <IsSelect :myselect="true" />
          </span>
        </div>
        <div class="context1">
          <span>6、体位装置：</span>
          <span
            style="marginLeft:6px"
            v-for="item in selectDev"
            :key="item.value"
          >
            <span>{{ item.text }}</span>
            <IsSelect :myselect="true" />
          </span>
        </div>
        <div class="context1">
          <span>7、约束带：</span>
          <span style="marginLeft:6px">
            <span>无</span>

            <IsSelect :myselect="form.constraints === '1'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <IsSelect :myselect="form.constraints === '2'?true:false" />
          </span>
        </div>
        <div class="context1">
          <span>8、导尿管：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <IsSelect :myselect="catheter.catheterName === '1'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>病房带入</span>
            <IsSelect :myselect="catheter.catheterName === '2'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>手术室插入</span>
            <IsSelect :myselect="catheter.catheterName === '3'?true:false" />
          </span>
          <span class="input-div mgl5">
            <span>插管者</span>
            <div
              class="input-div-context-short"
              style="height:30px;textAlign:center;width:120px"
            >
              <img
                style="height:100%"
                :src="catheter.catheterSign"
                alt=""
              >
            </div>
          </span>
          <span class="input-div mgl5">
            <span>型号</span>
            <div
              class="input-div-context-short"
              style="textAlign:center"
            >{{ catheter.catheterType || '' }}</div>
          </span>
          <span class="input-div mgl5">
            <span>尿液性质</span>
            <div
              class="input-div-context-short"
              style="textAlign:center"
            >{{ catheter.catheterNature || '' }}</div>
          </span>
        </div>
        <div class="context1">
          <span>9、设备使用：</span>
          <span style="marginLeft:6px">
            <span>电刀：</span>
            <span>1. 电切</span>
            <span>无</span>
            <IsSelect :myselect="equipment.electrotome.electrotomeName === '1'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <IsSelect :myselect="equipment.electrotome.electrotomeName === '2'?true:false" />
          </span>
          <span class="input-div mgl5">
            <span>功率</span>
            <div
              style="textAlign:center"
              class="input-div-context-short"
            >{{ equipment.electrotome.electrotomeDQ||'' }}</div>
          </span>
          <span>电凝</span>
          <span class="input-div mgl5">
            <span>功率</span>
            <div
              style="textAlign:center"
              class="input-div-context-short"
            >{{ equipment.electrotome.electrotomeDN||'' }}</div>
          </span>
        </div>
        <div class="context1">
          <span>电极板位置：</span>
          <span style="marginLeft:6px">
            <span>大腿</span>
            <IsSelect :myselect="equipment.electrotomeLocation === '1'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>小腿</span>
            <IsSelect :myselect="equipment.electrotomeLocation === '2'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>臀部</span>
            <IsSelect :myselect="equipment.electrotomeLocation === '3'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>其他</span>
            <IsSelect :myselect="equipment.electrotomeLocation === '4'?true:false" />
          </span>
          <span style="marginLeft:15px">
            <span>负极电路板回垫</span>
            <IsSelect :myselect="equipment.electrotomeLocation === '5'?true:false" />
          </span>
          <span style="marginLeft:15px">
            <span>无</span>
            <IsSelect :myselect="equipment.electrotomeLocation === '6'?true:false" />
          </span>
        </div>
        <div class="context1">
          <span>气囊止血机：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <IsSelect :myselect="equipment.bhMachine.bhMachineName === '1'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <IsSelect :myselect="equipment.bhMachine.bhMachineName === '2'?true:false" />
          </span>
        </div>
        <div class="context2">
          <div
            style="marginLeft:10px"
            class="context2-box"
            v-for="(item,index) in equipment.bhMachine.bhMachineList || []"
            :key="index"
          >
            <div class="box-row">
              <span class="input-div mgl5">
                <span>部位</span>
                <div
                  class="input-div-context-short"
                  style="width:60px;textAlign:center"
                >{{ item.locateName | capitalize }}</div>
              </span>
              <span
                class="input-div mgl5"
                style="flex:1"
              >
                <span style="marginLeft:8px">压力</span>
                <div
                  class="input-div-context-short"
                  style="textAlign:center;flex:1"
                >{{ item.presureValue }} {{ item.presure }}</div>
              </span>
            </div>
            <div class="box-row">
              <span
                class="input-div mgl5"
                style="width:100%"
              >
                <span>充气时间</span>
                <div
                  style="flex: 1;padding-left: 5px;textAlign:center"
                  class="input-div-context-short-60"
                >{{ item.cqTime }}</div>
              </span>
            </div>
            <div class="box-row">
              <span
                class="input-div mgl5"
                style="width:100%"
              >
                <span style="lineHeight:30px">签名</span>
                <div
                  class="input-div-context-short-60"
                  style="height:30px;flex:1"
                >
                  <img
                    style="height:100%"
                    :src="item.cqSign"
                    alt=""
                  >
                </div>
              </span>
            </div>
            <div class="box-row">
              <span
                class="input-div mgl5"
                style="width:100%"
              >
                <span>放气时间</span>
                <div
                  style="flex: 1;padding-left: 5px;textAlign:center"
                  class="input-div-context-short-60"
                >{{ item.fqTime }}</div>
              </span>
            </div>
            <div class="box-row">
              <span
                class="input-div mgl5"
                style="width:100%"
              >
                <span style="lineHeight:30px">签名</span>
                <div
                  class="input-div-context-short-60"
                  style="height:30px;flex:1"
                >
                  <img
                    style="height:100%"
                    :src="item.fqSign"
                    alt=""
                  >
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="context1">
          <span>10、手术冲洗：</span>
          <span style="marginLeft:6px">
            <span>0.9%氯化钠溶液</span>
            <IsSelect :myselect="rinse.rinseStr.includes('1')?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>灭菌注射用水</span>
            <IsSelect :myselect="rinse.rinseStr.includes('2')?true:false" />
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">药液</span>
            <span style="marginLeft:8px">1、</span>
            <div class="input-div-context-short-60" />
            <span style="marginLeft:8px">2、</span>
            <div class="input-div-context-short-60" />
            <span style="marginLeft:8px">3、</span>
            <div class="input-div-context-short-60" />
            <span style="marginLeft:8px">4、</span>
            <div class="input-div-context-short-60" />
          </span>
        </div>
        <div class="context1 mgt20">
          <span>11、腰穿留置：</span>
          <span>
            <span>无</span>
            <IsSelect :myselect="waistPuncture.waistPunctureName === '1'?true:false" />
          </span>
          <span>
            <span>有</span>
            <IsSelect :myselect="waistPuncture.waistPunctureName === '2'?true:false" />
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:6px">操作者</span>
            <div
              class="input-div-context"
              style="height:30px;textAlign:center"
            >
              <img
                :src="waistPuncture.operationDoc"
                alt=""
                style="height:100%"
              >
            </div>

          </span>
        </div>
        <div class="context1 mgt20">
          <span class="input-div mgl5">
            <span>拔针芯时间</span>
            <div
              class="input-div-context-short-140"
              style="textAlign:center"
            >{{ waistPuncture.needleHeartTime }}</div>
            <span style="marginLeft:6px">签名</span>
            <div
              class="input-div-context"
              style="height:30px;textAlign:center"
            >
              <img
                :src="waistPuncture.needleHeartSign"
                alt=""
                style="height:100%"
              >
            </div>
            <span style="marginLeft:6px">拔针时间</span>
            <div
              class="input-div-context-short-140"
              style="textAlign:center"
            >{{ waistPuncture.needleTime }}</div>
            <span style="marginLeft:8px">签名</span>
            <div
              class="input-div-context"
              style="height:30px;textAlign:center"
            >
              <img
                :src="waistPuncture.needleSign"
                alt=""
                style="height:100%"
              >
            </div>
          </span>
        </div>
        <div
          class="context1 mgt20"
          style="flexWrap: wrap"
        >
          <div>
            <span>12、术中特殊交班：</span>
            <span style="marginLeft:6px">
              <span>无</span>
              <IsSelect :myselect="handOver.handOverName === '1'?true:false" />
            </span>
            <span style="marginLeft:6px">
              <span>有</span>
              <IsSelect :myselect="handOver.handOverName === '2'?true:false" />
            </span>
          </div>
          <div style="width:300px;borderBottom:1px solid #000;marginLeft:10px;textAlign:center">
            {{ handOver.handOverRemarks }}
          </div>
        </div>
        <div
          class="context1"
          style="marginTop:15px"
        >
          <div>
            <span>13、术中冰冻：</span>
            <span style="marginLeft:6px">
              <span>无</span>
              <IsSelect :myselect="frozen.frozenName === '1'?true:false" />
            </span>
            <span style="marginLeft:6px">
              <span>有</span>
              <IsSelect :myselect="frozen.frozenName === '2'?true:false" />
            </span>
          </div>
          <div style="marginLeft:50px">
            <span
              class="input-div mgl5"
              v-for="(item,index) in frozen.frozenList"
              :key="index"
            >
              <span style="marginLeft:8px">送检者{{ index + 1 }}、</span>
              <div
                class="input-div-context-short-60"
                style="width:150px;height:30px;textAlign:center"
              ><img
                style="height:100%"
                :src="item.sendDoc"
                alt=""
              ></div>
              <span style="marginLeft:8px">报告接收者</span>
              <div
                class="input-div-context-short-60"
                style="width:150px;height:30px;textAlign:center"
              ><img
                style="height:100%"
                :src="item.receiveDoc"
                alt=""
              ></div>
            </span>
          </div>
        </div>

        <div
          class="context1"
          style="marginTop:15px"
        >
          <span style="marginLeft:60px">
            <span>病理：</span>
            <span>无</span>
            <IsSelect :myselect="pathology.pathologyName === '1'?true:false" />
            <span>有</span>
            <IsSelect :myselect="pathology.pathologyName === '2'?true:false" />
            <span>数量：</span>
            <span>{{ pathology.pathologyCount }}</span>
          </span>
          <span class="input-div mgl5">
            <span style="marginLeft:8px">送检医生</span>
            <div
              class="input-div-context-short"
              style="width:150px;height:30px;textAlign:center"
            >
              <img
                style="height:100%"
                :src="pathology.sendDoc"
                alt=""
              >
            </div>
          </span>
        </div>
        <div class="context1">
          <span>14、植入体：</span>
          <span style="marginLeft:6px">
            <span>无</span>
            <IsSelect :myselect="implants === '1'?true:false" />
          </span>
          <span style="marginLeft:6px">
            <span>有</span>
            <IsSelect :myselect="implants === '2'?true:false" />
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
              <td
                v-for="(item,index) in 8"
                :key="index"
              >
                <div>
                  <IsSelect :myselect="compressedSkin[item-1].isFull === '1'?true:false" />
                  <span>完整</span>
                </div>
                <div>
                  <IsSelect :myselect="compressedSkin[item-1].isFull === '2'?true:false" />
                  <span>皮损情况</span>
                </div>
                <div style="width:75px;word-break:break-all">
                  {{ compressedSkin[item-1].skinStatus }}
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
            <div
              class="input-div-context-short"
              style="width:150px;height:30px;textAlign:center"
            >
              <img
                :src="nursesSignature"
                style="height:100%"
                alt=""
              >
            </div>
          </span>
        </div>
        <div class="context1">
          <span>19、术中交接班：</span>
        </div>
        <div
          class="context1"
          style="marginLeft:80px"
        >
          <div>
            <span style="marginLeft:6px">
              <span>无</span>

              <IsSelect :myselect="opsChange.opsChangeName === '1'?true:false" />
            </span>
            <span style="marginLeft:6px">
              <span>有</span>
              <IsSelect :myselect="opsChange.opsChangeName === '2'?true:false" />
            </span>
          </div>
          <div>
            <div
              style="display:flex"
              v-for="(item,index) in opsChange.opsChangeList"
              :key="index"
            >
              <span class="input-div mgl5">
                <span style="marginLeft:8px">时间</span>
                <div
                  class="input-div-context-noborder"
                  style="width:140px;textAlign:center"
                >{{ item.time }}</div>
              </span>
              <span class="input-div mgl5">
                <span
                  style="marginLeft:8px"
                >交班人签名</span>
                <div
                  class="input-div-context-noborder"
                  style="width:120px;height:30px;textAlign:center"
                >
                  <img
                    style="height:100%"
                    :src="item.jiaobrSign"
                    alt=""
                  >
                  <!-- 123 -->
                </div>
              </span>
              <span class="input-div mgl5">
                <span
                  style="marginLeft:8px"
                >接班人签名</span>
                <div
                  class="input-div-context-noborder"
                  style="width:140px;height:30px;textAlign:center"
                >
                  <img
                    style="height:100%"
                    :src="item.jiebrSign"
                    alt=""
                  >
                  <!-- 123 -->
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import IsSelect from './components/isSelect'
import {ipcRenderer} from 'electron'
export default {
  name: 'NursingDocumentTwo',
  data () {
    return {
      htmlTitle: '护理记录单(二)',
      form: {
        patient: '',
        opsDate: '',
        opsRoom: '',
        diagnosis: '',
        opsName: '',
        opsType: '',
        consciousness: '',

        skin: { // 皮肤评估
          skinDegree: '',
          skinLocate: '',
          skinName: ''
        },
        constraints: ''
      },
      catheter: { // 导尿管
        catheterName: '',
        catheterSign: '', // base64
        catheterType: '',
        catheterNature: ''

      },
      equipment: { // 设备使用
        electrotome: {}, // 电刀
        bhMachine: {
          bhMachineList: []
        }, // 血泵机器
        electrotomeLocation: '' // 电极板
      },
      rinse: { // 手术冲洗
        rinseName: '',
        rinseList: [],
        rinseStr: ''
      },
      waistPuncture: { // 腰穿留置
        waistPunctureName: '',
        operationDoc: '',
        needleTime: '',
        needleSign: '',
        needleHeartSign: '',
        needleHeartTime: ''
      },
      handOver: { // 术中特殊交接班
        handOverName: '',
        handOverRemarks: ''
      },
      opsChange: { // 术中交接班
        opsChangeName: '',
        opsChangeList: [

        ]
      },
      compressedSkin: [ // 受压皮肤
        {
          isFull: '', skinStatus: ''
        },
        {isFull: '', skinStatus: ''},
        {isFull: '', skinStatus: ''},
        {isFull: '', skinStatus: ''},
        {isFull: '', skinStatus: ''},
        {isFull: '', skinStatus: ''},
        {isFull: '', skinStatus: ''},
        {isFull: '', skinStatus: ''}
      ],
      frozen: { // 术中冰冻
        frozenName: '',
        frozenList: []
      },
      pathology: { // 病理
        pathologyCount: '',
        pathologyName: '',
        sendDoc: ''
      },
      implants: '', // 植入体
      nursesSignature: '', // 护士qianm
      wenshuData: {},
      anesMethodOptionArr: [
        {text: '全麻', value: '1'}, {text: '臂丛麻醉', value: '2'}, {text: '硬膜外麻醉', value: '3'},
        {text: '丛麻醉', value: '4'}, {text: '跟阻麻醉', value: '5'}, {text: '静脉麻醉', value: '6'}, {text: '腰麻', value: '7'},
        {text: '颈从麻醉', value: '8'}, {text: '局麻监护', value: '9'}, {text: '局麻', value: '10'}, {text: '唤醒麻醉', value: '11'}
      ],
      selectAne: [],
      bodyOptionArr: [
        {text: '仰卧位', value: '1'},
        {text: '俯卧位', value: '2'},
        {text: '左侧卧位', value: '3'},
        {text: '右侧卧位', value: '4'},
        {text: '左侧俯卧位', value: '5'},
        {text: '右侧俯卧位', value: '6'},
        {text: '坐位', value: '7'},
        {text: '俯卧位', value: '8'}
      ],
      selectBody: [],
      deviceOption: [
        {text: '肩垫', value: '1'},
        {text: '腋垫', value: '2'},
        {text: '胸垫', value: '3'},
        {text: '背垫', value: '4'},
        {text: '腰垫', value: '5'},
        {text: '肘垫', value: '6'},
        {text: '两脚间垫', value: '7'},
        {text: '膝垫', value: '8'},
        {text: '后跟垫', value: '9'},
        {text: '其他', value: '10'},
        {text: '无', value: '11'}
      ],
      selectDev: [],
      arr: [],
      testBase64: 'data:image/png;base64,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'
    }
  },
  mounted () {
    this.getWenShuData()
    Bus.$on('clickShuaXinTwo', res => {
      if (res === '1') {
        this.utilsDebounce(() => { this.getWenShuData() }, 1000)
      } else if (res === '2') {
        this.utilsDebounce(() => { this.dayin() }, 1000)
      } else if (res === '3') {
        this.htmlTitle = this.$store.state['nursing-document-list'].patientName + '护理记录单(二)'
        this.utilsDebounce(() => {
          //  this.getPdf('nursing-document-two')
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
      const printHtml = document.getElementById('nursing-document-two').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      ipcRenderer.send('printChannel', printHtml, 'nursing-document-two.css', options)
    },
    daochuPDF () {
      const printHtml = document.getElementById('nursing-document-two').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      this.utilsDebounce(() => {
        ipcRenderer.send('printpdfChannel', printHtml, 'nursing-document-two.css', options)
      }, 1000)
    },
    getWenShuData () {
      let obj = {
        cureNo: this.$store.state['nursing-document-list'].cureNo,
        hospitalNo: this.$store.state['nursing-document-list'].hospitalNo

        // hospitalNo: 666,
        // cureNo: 1010
      }
      this.$store.dispatch('ReqNursingDocumentTwo', obj).then(res => {
        if (res.status === 200 && res.data.code === 200) {
          this.wenshuData = res.data.data
          console.log(this.wenshuData)
          this.form.patient = this.$store.state['nursing-document-list'].patientName + '-' + this.$store.state['nursing-document-list'].hospitalNo
          this.form.opsDate = this.wenshuData.opsDate
          this.form.opsRoom = this.wenshuData.opsRoom
          this.form.diagnosis = this.wenshuData.diagnosis
          this.form.opsName = this.wenshuData.opsName
          this.form.opsType = this.wenshuData.opsType
          this.form.consciousness = this.wenshuData.consciousness
          this.form.skin = this.wenshuData.skin
          this.form.constraints = this.wenshuData.constraints
          this.catheter = this.wenshuData.catheter
          this.equipment = this.wenshuData.equipment
          if (this.IsEmpty(this.equipment)) {
            this.equipment = { // 设备使用
              electrotome: {}, // 电刀
              bhMachine: {
                bhMachineList: []
              }, // 血泵机器
              electrotomeLocation: '' // 电极板
            }
          }
          this.rinse = this.wenshuData.rinse
          this.rinse.rinseStr = this.rinse.rinseList.join(',')
          this.waistPuncture = this.wenshuData.waistPuncture
          this.opsChange = this.wenshuData.opsChange
          this.handOver = this.wenshuData.handOver
          this.frozen = this.wenshuData.frozen
          this.pathology = this.wenshuData.pathology
          this.implants = this.wenshuData.implants
          this.nursesSignature = this.wenshuData.nursesSignature
          this.compressedSkin = this.wenshuData.compressedSkin
          if (this.IsEmpty(this.compressedSkin)) {
            this.compressedSkin = [ // 受压皮肤
              {
                isFull: '', skinStatus: ''
              },
              {isFull: '', skinStatus: ''},
              {isFull: '', skinStatus: ''},
              {isFull: '', skinStatus: ''},
              {isFull: '', skinStatus: ''},
              {isFull: '', skinStatus: ''},
              {isFull: '', skinStatus: ''},
              {isFull: '', skinStatus: ''}
            ]
          }
          // 判断麻醉方式数组
          if (!this.IsEmpty(this.wenshuData.anesthesiaMode)) {
            this.selectAne = []
            if (this.wenshuData.anesthesiaMode.includes(',')) {
              this.arr = []
              this.arr = this.wenshuData.anesthesiaMode.split(',')
            } else {
              this.arr = []
              this.arr.push(this.wenshuData.anesthesiaMode)
            }
            this.anesMethodOptionArr.forEach(item => {
              this.arr.forEach(v => {
                if (item.value === v) {
                  this.selectAne.push(item)
                }
              })
            })
          }
          // 判断手术体位
          if (!this.IsEmpty(this.wenshuData.position)) {
            this.selectBody = []
            if (this.wenshuData.position.includes(',')) {
              this.arr = []
              this.arr = this.wenshuData.position.split(',')
            } else {
              this.arr = []
              this.arr.push(this.wenshuData.position)
            }
            this.bodyOptionArr.forEach(item => {
              this.arr.forEach(v => {
                if (item.value === v) {
                  this.selectBody.push(item)
                }
              })
            })
          }

          // 判断体位装置
          if (!this.IsEmpty(this.wenshuData.device)) {
            this.selectDev = []
            if (this.wenshuData.device.includes(',')) {
              this.arr = []
              this.arr = this.wenshuData.device.split(',')
            } else {
              this.arr = []
              this.arr.push(this.wenshuData.device)
            }
            this.deviceOption.forEach(item => {
              this.arr.forEach(v => {
                if (item.value === v) {
                  this.selectDev.push(item)
                }
              })
            })
          }
        }
      })
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      if (value === '1') {
        return '左上肢'
      }
      if (value === '2') {
        return '左下肢'
      }
      if (value === '3') {
        return '右下肢'
      }
      if (value === '4') {
        return '右下肢'
      }
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
  // height: 920px;
  min-width: 824px;
  min-height: 920px;
  background-color: #fff;
  padding: 10px;
  .container-title {
    // border-bottom: 1px solid #000;
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
      // justify-content: center;
      .context2-box {
        font-size: 12px;
        width: 240px;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #000;
        padding: 5px;
        .box-row {
          width: 100%;
          display: flex;
          align-items: center;
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
    // padding: 0 5px;
    width: 60px;
    border-bottom: 1px solid #000;
  }
  .input-div-context-short-140 {
    // padding: 0 5px;
    width: 150px;
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
.row {
  width: 100%;
  display: flex;
  height: 28px;
  padding-left: 10px;
}
.col {
  display: flex;
  font-size: 14px;
  width: 30%;
  flex-wrap: nowrap
}
.col-20 {
  display: flex;
  font-size: 14px;
  width: 20%;
  flex-wrap: nowrap
}

.col-40 {
  display: flex;
  font-size: 14px;
  flex-wrap: nowrap;
  width: 40%;
}
.col-45 {
  display: flex;
  font-size: 14px;
  flex-wrap: nowrap;
  width: 45%;
}
.col-50 {
  display: flex;
  font-size: 14px;
  width: 50%;
  flex-wrap: nowrap
}
.col-70 {
  display: flex;
  font-size: 14px;
  width: 70%;
  flex-wrap: nowrap
}

.row-lable {
  width: 135px;
  line-height: 28px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.row-text {
  line-height: 28px;
  width: 100%;
  padding: 0 10px;
  height: 25px;
  text-align: center;
  border-bottom: 1px solid;
}
</style>
