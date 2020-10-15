<template>
  <div class="content-wenben-container">
    <div class="wenben-content">
      <div class="wenben-content-title">
        <span>复旦大学附属华山医院</span>
      </div>
      <div class="wenben-content-info">
        <div class="info-content-title">
          手术安全检查表
        </div>
        <div class="info-content-form">
          <el-form
            size="mini"
            ref="form"
            :model="formData"
            label-width="90px"
          >
            <el-row>
              <el-col :span="7">
                <el-form-item label="科 别：">
                  <el-input
                    disabled
                    v-model="formData.deptName"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="患者姓名:">
                  <el-input
                    disabled
                    v-model="formData.name"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性 别：">
                  <el-input
                    disabled
                    v-model="formData.name"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="住院号：">
                  <el-input
                    disabled
                    v-model="formData.name"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="麻醉方式:">
                  <el-input
                    disabled
                    v-model="formData.name"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年 龄：">
                  <el-input
                    disabled
                    v-model="formData.name"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="手术日期：">
                  <el-input
                    disabled
                    v-model="formData.name"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="主 刀:">
                  <el-input
                    disabled
                    v-model="formData.name"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="手术方式：">
                  <el-input
                    disabled
                    v-model="formData.name"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="wenben-content-context">
        <div class="before-anesthesia">
          <div class="title">
            麻醉实施前
          </div>
          <div class="info-isTrue">
            <div class="info-one">
              <span class="info-left padl5">患者姓名,性别,年龄正确：</span>
              <span class="info-right-one">
                <span>是</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
                <span>否</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
            </div>
            <InfoList title="手术方式确认：" />
            <InfoList title="手术部位与标识正确：" />
            <InfoList title="手术知情同意书：" />
            <InfoList title="麻醉知情同意书：" />
            <InfoList title="麻醉设备安全检查完成：" />
            <InfoList title="皮肤是否完整：" />
            <div class="info-pifu">
              <div class="pifu-buwei">
                <span>部位</span>
                <div class="text">
                  123
                </div>
              </div>
              <div class="pifu-chengdu">
                <span>程度</span>
                <div class="text">
                  123
                </div>
              </div>
            </div>
            <InfoList title="术野皮肤准备正确：" />
            <InfoList title="静脉通道建立完成:" />
            <InfoList title="患者是否有过敏史：" />
            <InfoList title="抗菌药物皮试结果：" />
            <InfoList title="术前准备：" />
            <InfoList title="影像学资料：" />
            <InfoList title="假体：" />
            <InfoList title="体内植入物：" />
          </div>
          <div class="qita">
            <span>其他：</span>
            <div class="text">
              123
            </div>
          </div>
          <div class="qianming">
            <div class="qianming-list">
              <span>麻醉医师签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div class="qianming-list">
              <span>手术医师签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div class="qianming-list">
              <span>手术护士签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div>
              <span>麻醉前核对时间：</span>
              <div>123</div>
            </div>
          </div>
        </div>
        <div class="before-surgery">
          <div class="title">
            手术开始前
          </div>
          <div class="info-isTrue">
            <div class="info-one">
              <span class="info-left padl5">患者姓名,性别,年龄正确：</span>
              <span class="info-right-one">
                <span>是</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
                <span>否</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
            </div>
            <InfoList title="手术方式确认：" />
            <InfoList title="手术部位与标识正确：" />
            <div class="info-one">
              <span class="info-left padl3">手术,麻醉风险预警：</span>
              <span class="info-right-one" />
            </div>
            <div class="info-one">
              <span class="info-left padl3">手术医师陈述：</span>
              <span class="info-right-one">
                <span class="info-left padl3">预计手术时间</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">预计失血量</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">手术关注点</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">其他</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
            </div>
            <div class="info-one">
              <span class="info-left padl3">麻醉医师陈述：</span>
              <span class="info-right-one">
                <span class="info-left padl3">麻醉关注点</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">其他</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
            </div>
            <div class="info-one padb10">
              <span class="info-left padl3">手术护士陈述：</span>
              <span class="info-right-one">
                <span class="info-left padl3">物品灭菌合格</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">仪器设备、植入物</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">术前术中特殊用药情况</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">其他</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
            </div>
            <InfoList title="是否需要相关影像资料：" />
          </div>
          <div class="qita">
            <span>其他：</span>
            <div class="text">
              123
            </div>
          </div>
          <div class="qianming">
            <div class="qianming-list">
              <span>麻醉医师签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div class="qianming-list">
              <span>手术医师签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div class="qianming-list">
              <span>手术护士签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div>
              <span>手术开始前时间：</span>
              <div>123</div>
            </div>
          </div>
        </div>
        <div class="before-leaveroom">
          <div class="title">
            患者离开手术室前
          </div>
          <div class="info-isTrue">
            <div class="info-one">
              <span class="info-left padl5">患者姓名,性别,年龄正确：</span>
              <span class="info-right-one">
                <span>是</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
                <span>否</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
            </div>
            <InfoList title="实际手术方式确认：" />
            <div class="info-one">
              <span class="info-left padl5">手术用药,输血,冰冻报告的检查正确：</span>
              <span class="info-right-one">
                <span>是</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
                <span>否</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
            </div>
            <InfoList title="病理标本：" />
            <InfoList title="病理标本号核对正确：" />
            <InfoList title="手术用物清点正确：" />
            <InfoList title="皮肤是否完整：" />
            <div class="info-pifu">
              <div class="pifu-buwei">
                <span>部位</span>
                <div class="text">
                  123
                </div>
              </div>
              <div class="pifu-chengdu">
                <span>程度</span>
                <div class="text">
                  123
                </div>
              </div>
            </div>
            <div class="info-one padb10">
              <span class="info-left padl3 ziti">各种管路：</span>
              <span class="info-right-one">
                <span class="info-left padl3">静脉通路</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">动脉通路</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">气管插管</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">伤口引流</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">胃管</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one">
                <span class="info-left padl3">尿管</span>
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </span>
              <span class="info-right-one guanluqita">
                <div class="info-left padl3">其他：</div>
                <span class="zidingyi">123</span>
                <div>
                  <img
                    src="./../../../assets/isFalse.png"
                    alt=""
                  >
                </div>
              </span>
            </div>
            <div class="info-one padb10">
              <span
                style="width:100%"
                class="info-left padl3 ziti"
              >患者去向：</span>
              <div class="info-content">
                <div class="padb10">
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">PACU</span>
                    <img
                      src="./../../../assets/isFalse.png"
                      alt=""
                    >
                  </span>
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">病房</span>
                    <img
                      src="./../../../assets/isFalse.png"
                      alt=""
                    >
                  </span>
                </div>
                <div>
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">ICU病房</span>
                    <img
                      src="./../../../assets/isFalse.png"
                      alt=""
                    >
                  </span>
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">急诊</span>
                    <img
                      src="./../../../assets/isFalse.png"
                      alt=""
                    >
                  </span>
                  <span class="info-right-one">
                    <span class="info-left padl3 mgl10">离院</span>
                    <img
                      src="./../../../assets/isFalse.png"
                      alt=""
                    >
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="qita">
            <span>其他：</span>
            <div class="text">
              123
            </div>
          </div>
          <div class="qianming">
            <div class="qianming-list">
              <span>麻醉医师签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div class="qianming-list">
              <span>手术医师签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div class="qianming-list">
              <span>手术护士签名：</span>
              <div class="text">
                123
              </div>
            </div>
            <div>
              <span>离开手术室前时间：</span>
              <div>123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqSecurityCheck} from '@/api/NursingDocumentApi/security-check.js'
import InfoList from './components/info-list'
export default {
  name: 'SecurityCheck',
  data () {
    return {
      formData: {
        deptName: ''
      }
    }
  },
  mounted () {
    let obj = {
      cureNo: 16447102,
      hospitalNo: 91131393
    }
    reqSecurityCheck(obj).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        let wenshuData = res.data.data
        console.log(wenshuData.deptName)
        this.formData.deptName = wenshuData.deptName
        this.formData.name = '555'
      }
    })
  },
  methods: {
  },
  components: {
    InfoList
  }
}
</script>

<style scoped lang="scss">
@import './../../../styles/wenshu.scss';
.content-wenben-container {
  width: 824px;
  height: 920px;
  min-width: 824px;
  min-height: 920px;
  background-color: #fff;
  padding: 10px 80px 0 80px;
  .wenben-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    .wenben-content-title {
      text-align: center;
      border-bottom: 1px solid #000;
      font-weight: 600;
    }
    .wenben-content-info {
      display: flex;
      flex-direction: column;
      .info-content-title {
        text-align: center;
        letter-spacing: 14px;
        font-weight: 600;
        text-indent: 14px;
        font-size: 16px;
      }
      .info-content-form {
        padding-left: 15px;
      }
    }
    .wenben-content-context {
      border: 1px solid #000;
      display: flex;
      .before-anesthesia {
        border-right: 1px solid #000;
        flex: 1;
        .info-isTrue {
          height: 480px;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          .info-one {
            display: flex;
            flex-wrap: wrap;
          }
          .info-list {
            display: flex;
            justify-content: space-between;
            .info-left {
              flex: 1;
              padding-left: 3px;
            }
            .info-right {
              padding: 1px;
            }
          }
          .info-pifu {
            margin-top: 20px;
            padding-left: 3px;
            display: flex;
            .pifu-buwei {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
            .pifu-chengdu {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
          }
        }
      }
      .before-surgery {
        border-right: 1px solid #000;
        flex: 1;
        .info-isTrue {
          height: 480px;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          .info-one {
            display: flex;
            flex-wrap: wrap;
          }
          .info-list {
            display: flex;
            justify-content: space-between;
            .info-left {
              flex: 1;
              padding-left: 3px;
            }
            .info-right {
              padding: 1px;
            }
          }
          .info-pifu {
            margin-top: 20px;
            padding-left: 3px;
            display: flex;
            .pifu-buwei {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
            .pifu-chengdu {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
          }
        }
      }
      .before-leaveroom {
        flex: 1;
        .info-isTrue {
          height: 480px;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          .info-one {
            display: flex;
            flex-wrap: wrap;
          }
          .info-list {
            display: flex;
            justify-content: space-between;
            .info-left {
              flex: 1;
              padding-left: 3px;
            }
            .info-right {
              padding: 1px;
            }
          }
          .info-pifu {
            margin-top: 20px;
            padding-left: 3px;
            display: flex;
            .pifu-buwei {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
            .pifu-chengdu {
              display: flex;
              flex: 1;
              .text {
                padding-left: 5px;
                border-bottom: 1px solid #000;
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}
.info-right-one {
  width: 100%;
  text-align: right;
  padding: 1px;
}
.padl5 {
  padding-left: 5px;
}
.padl3 {
  padding-left: 3px;
}
.padb10 {
  padding-bottom: 10px;
}
.title {
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid #000;
}
.mgl10 {
  margin-left: 10px;
}
.qita {
  margin-bottom: 10px;
  display: flex;
  font-size: 12px;
  .text {
    padding-left: 5px;
    border-bottom: 1px solid #000;
    flex: 1;
  }
}
.qianming {
  border-top: 1px solid #000;
  padding-bottom: 20px;
  padding-top: 10px;
  font-size: 12px;
  div {
    display: flex;
    align-items: center;
    .text {
      padding-left: 5px;
      border-bottom: 1px solid #000;
      flex: 1;
    }
  }
  .qianming-list {
    height: 50px;
  }
}
.guanluqita {
  display: flex;
  justify-content: flex-end;
}
.zidingyi {
  width: 120px;
  border-bottom: 1px solid #000;
  text-align: left;
  padding: 0 5px;
}
.ziti {
  font-size: 16px;
  font-weight: 600;
}
</style>
