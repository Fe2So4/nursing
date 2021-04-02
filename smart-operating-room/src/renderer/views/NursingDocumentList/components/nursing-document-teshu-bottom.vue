<template>
  <div class="nursing-teshu-container-bottom">
    <div class="container-title">
      福建医科大学附属第一医院
    </div>
    <div class="wenben-content-info mgt10">
      <div class="info-content-container">
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
            <span>手术诊断</span>
            <div class="input-div-context-long">{{ form.diagnosis }}</div>
          </span>
        </div>
        <div class="context1">
          <span>特殊器材清点记录</span>
        </div>
        <div class="context1">
          <table
            border="1"
            style="border-collapse:collapse;"
          >
            <tr>
              <th>
                <div style="textAlign:right">
                  时间
                </div>
                <div class="row-line" />
                <div style="textAlign:left">
                  品名
                </div>
              </th>
              <th>
                <div>手术前数量</div>
              </th>
              <th style="width:250px">
                <div style="height:40px;lineHeight:40px">
                  术中添加数
                </div>
                <div class="line" />
                <div>
                  <td style="height:20px;borderRight:1px solid #000">
                    第一次
                  </td>
                  <td style="height:20px;borderRight:1px solid #000">
                    第二次
                  </td>
                  <td style="height:20px;borderRight:1px solid #000">
                    第三次
                  </td>
                  <td style="height:20px">
                    第四次
                  </td>
                </div>
              </th>
              <th>
                <div class="td-center">
                  体腔关闭前数量
                </div>
              </th>
              <th>
                <div class="td-center">
                  所有体腔关闭后数量
                </div>
              </th>
              <th>
                <div class="td-center">
                  皮肤缝合后数量
                </div>
              </th>
            </tr>
            <tr>
              <td>
                羊式拉钩
              </td>
              <td class="td-text-center">
                1
              </td>
              <td>
                <div>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                </div>
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
            </tr>
            <tr>
              <td>
                圆牌
              </td>
              <td class="td-text-center">
                1
              </td>
              <td>
                <div>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                </div>
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
            </tr>
            <tr>
              <td>
                长弯血管钳
              </td>
              <td class="td-text-center">
                1
              </td>
              <td>
                <div>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                </div>
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
            </tr>
            <tr>
              <td
                colspan="3"
                class="td-colspan"
              >
                6F光线源(33)
              </td>
              <td colspan="3">
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </td>
            </tr>
            <tr>
              <td />
              <td class="td-text-center">
                1
              </td>
              <td>
                <div>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                </div>
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
            </tr>
            <tr>
              <td>
                洗手护士签名
              </td>
              <td class="td-text-center">
                1
              </td>
              <td>
                <div>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                </div>
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
            </tr>
            <tr>
              <td>
                巡回护士签名
              </td>
              <td class="td-text-center">
                1
              </td>
              <td>
                <div>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                  <td class="td-text-center">
                    1
                  </td>
                </div>
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
              <td class="td-text-center">
                1
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NursingDocumentTeshu',
  props: ['form'],
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">

@import './../../../styles/wenshu.scss';
.nursing-teshu-container-bottom {
  width: 824px;
  height: 920px;
  min-width: 824px;
  min-height: 920px;
  background-color: #fff;
  padding: 10px;
  .container-title {
    letter-spacing: 10px;
    border-bottom: 1px solid #000;
    text-align: center;
    font-weight: 600;
    text-indent: 10px;
    margin: 0 70px;
  }
  .wenben-content-info {
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
          td {
            width: 85px;
            height: 25px;
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
.td-colspan {
  height: 50px;
  line-height: 50px;
  background-color: #ccc;
  font-weight: 600;
}
</style>
