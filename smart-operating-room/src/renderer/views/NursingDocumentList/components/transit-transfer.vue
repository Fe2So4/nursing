<template>
  <div class="transit-container">
    <div class="container-title">
      <span>复旦大学附属华山医院</span>
      <span class="title-right">患者转运交接单</span>
    </div>
    <div class="wenben-content-info mgt10">
      <div class="info-content-container">
        <div class="context1">
          <span class="input-div ">
            <span>姓名</span>
            <div class="input-div-context">123</div>
          </span>
          <span class="input-div">
            <span>住院号/卡号</span>
            <div class="input-div-context">123</div>
          </span>
          <span class="input-div">
            <span>病区</span>
            <div class="input-div-context">123</div>
          </span>
          <span class="input-div">
            <span>床号</span>
            <div class="input-div-context">123</div>
          </span>
          <span class="input-div">
            <span>性别</span>
            <div class="input-div-context-short-60">123</div>
          </span>
          <span class="input-div">
            <span>年龄</span>
            <div class="input-div-context-short-60">123</div>
          </span>
        </div>
        <div class="context1 mgt20">
          <span class="input-div ">
            <span>转运起始时间：</span>
            <div class="input-div-context-long">123</div>
          </span>
          <span
            class="input-div"
          >
            <span>运送</span>
            <div class="input-div-context">123</div>
          </span>
        </div>
        <div class="context1 mgt20">
          <span class="input-div ">
            <span>当前诊断：</span>
            <div class="input-div-context">123</div>
          </span>
          <span style="marginLeft:34px">
            <!-- <IsSelect :myselect="beforeLeaveRoomCheck.isSelect8_5" /> -->
            <span>住院/</span>
            <isSelect prop-select="true" />
            <span>转病区</span>
          </span>
          <span
            class="input-div"
          >
            <span>：病区</span>
            <div class="input-div-context">123</div>
          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>手术</span>
            <isSelect prop-select="true" />
            <span>监护室</span>
            <isSelect prop-select="true" />
            <span>透析室</span>
          </span>
        </div>
        <div class="context1">
          <span>评估：</span>
          <span style="marginLeft:20px">意识</span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>清楚</span>
          </span>
          <span style="marginLeft:48px">
            <isSelect prop-select="true" />
            <span>烦躁</span>

          </span>
          <span style="marginLeft:37px">
            <isSelect prop-select="true" />
            <span>嗜睡</span>

          </span>
          <span style="marginLeft:39px">
            <isSelect prop-select="true" />
            <span>昏迷</span>

          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>其他</span>

          </span>
          <span class="input-div mgl5">
            <div class="input-div-context-short">123</div>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:63px">疼痛</span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>NRS</span>

          </span>
          <span style="marginLeft:47px">
            <isSelect prop-select="true" />
            <span>FLACC</span>

          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>CCPOT</span>

          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>VONG-BAKER</span>

          </span>
          <span
            style="marginLeft:20px"
            class="input-div"
          >
            <span>强度</span>
            <div class="input-div-context-short">123</div>
          </span>
          <span class="input-div">
            <span>部位</span>
            <div class="input-div-context-short">123</div>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:63px">性质</span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>刀割样痛</span>

          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>绞痛</span>

          </span>
          <span style="marginLeft:36px">
            <isSelect prop-select="true" />
            <span>灼烧样痛</span>

          </span>
          <span style="marginLeft:11px">
            <isSelect prop-select="true" />
            <span>刺痛</span>
          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>压痛</span>
          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>胀痛</span>
          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>钝痛</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:63px">皮肤</span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>完整</span>
          </span>
          <span style="marginLeft:48px">
            <isSelect prop-select="true" />
            <span>破损</span>
          </span>
          <span
            style="marginLeft:36px"
            class="input-div"
          >
            <span>部位</span>
            <div class="input-div-context">123</div>
          </span>
          <span class="input-div">
            <span>程度</span>
            <div class="input-div-context">123</div>
          </span>
          <span class="input-div">
            <span>完整</span>
            <div class="input-div-context">123</div>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:63px">体温</span>
          <span
            style="marginLeft:15px"
            class="input-div"
          >
            <div class="input-div-context-noborder-short-40">123</div>
            <span>℃</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <span>脉搏</span>
            <div class="input-div-context-noborder-40">123</div>
            <span>分/次</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <span>呼吸</span>
            <div class="input-div-context-noborder-40">123</div>
            <span>分/次</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <span>血压</span>
            <div class="input-div-context-noborder-40">123</div>
            <span>/</span>
            <div class="input-div-context-noborder-40">123</div>
            <span>mmHg</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <span>氧饱和度</span>
            <div class="input-div-context-noborder-40">123</div>
            <span>%</span>
          </span>
        </div>
        <div class="context1">
          <span>导管：固定并通畅</span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <isSelect prop-select="true" />
            <span>氧气</span>
          </span>
          <span style="marginLeft:160px">
            <isSelect prop-select="true" />
            <span>浅静脉留置(留置日期)</span>
          </span>
          <span style="marginLeft:100px">
            <isSelect prop-select="true" />
            <span>深静脉留置(留置日期)</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <isSelect prop-select="true" />
            <span>PICC(留置日期)</span>
          </span>
          <span style="marginLeft:135px">
            <isSelect prop-select="true" />
            <span>动脉留置(留置日期)</span>
          </span>
          <span style="marginLeft:100px">
            <isSelect prop-select="true" />
            <span>肠胃减压(留置日期)</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <isSelect prop-select="true" />
            <span>鼻饲(留置日期)</span>
          </span>
          <span style="marginLeft:138px">
            <isSelect prop-select="true" />
            <span>留置导尿(留置日期)</span>
          </span>
          <span style="marginLeft:100px">
            <isSelect prop-select="true" />
            <span>气管导管(留置日期)</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <isSelect prop-select="true" />
            <span>负压球(留置日期)</span>
          </span>
          <span style="marginLeft:125pxpx">
            <isSelect prop-select="true" />
            <span>胸腔引流(留置日期)</span>
          </span>
          <span style="marginLeft:100px">
            <isSelect prop-select="true" />
            <span>I管(留置日期)</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <isSelect prop-select="true" />
            <span>其他</span>
          </span>
        </div>
        <div class="context1">
          <span>物品：</span>
          <span>
            <isSelect prop-select="true" />
            <span>输液</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <div class="input-div-context-noborder-40">123</div>
            <span>瓶/袋</span>
          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>X片</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <div class="input-div-context-noborder-40">123</div>
            <span>张</span>
          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>CT片</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <div class="input-div-context-noborder-40">123</div>
            <span>张</span>
          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>磁共振片</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <div class="input-div-context-noborder-40">123</div>
            <span>张</span>
          </span>
          <span style="marginLeft:20px">
            <isSelect prop-select="true" />
            <span>其他</span>
          </span>
        </div>
        <div class="context1">
          <span>建议：</span>
          <span
            class="input-div"
          >
            <div class="input-div-context-long">123</div>
          </span>
        </div>
        <div class="context1">
          <span>转运结束时间：</span>
          <span
            class="input-div"
          >
            <div class="input-div-context-long">123</div>
          </span>
          <span
            class="input-div"
          >
            <div class="input-div-context-noborder-40">123</div>
            <span>接收</span>
          </span>
        </div>
        <div class="context1">
          <span style="fontWeight:600">*手术环节交流：</span>
        </div>
        <div class="context1">
          <span>手术物品及药物：详见《手术病人护理记录单(一)》</span>
        </div>
        <div class="context1">
          <table
            border="1"
            style="border-collapse:collapse;"
          >
            <tr>
              <th>
                <div>
                  评估
                </div>
              </th>
              <th>
                <div>进手术间</div>
                <div class="line" />
                <div>
                  <span>1</span>
                  <span>日</span>
                  <span>1</span>
                  <span>时</span>
                  <span>1</span>
                  <span>分</span>
                  <span>1</span>
                </div>
              </th>
              <th>
                <div>出手术间</div>
                <div class="line" />
                <div>
                  <span>1</span>
                  <span>日</span>
                  <span>1</span>
                  <span>时</span>
                  <span>1</span>
                  <span>分</span>
                  <span>1</span>
                </div>
              </th>
              <th>
                <div>进PACU</div>
                <div class="line" />
                <div>
                  <span>1</span>
                  <span>日</span>
                  <span>1</span>
                  <span>时</span>
                  <span>1</span>
                  <span>分</span>
                  <span>1</span>
                </div>
              </th>
              <th>
                <div>出PACU</div>
                <div class="line" />
                <div>
                  <span>1</span>
                  <span>日</span>
                  <span>1</span>
                  <span>时</span>
                  <span>1</span>
                  <span>分</span>
                  <span>1</span>
                </div>
              </th>
            </tr>
            <tr>
              <td style="textAlign:center">
                意识
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>清醒</span>
                  <isSelect prop-select="true" />
                  <span>烦躁</span>
                  <isSelect prop-select="true" />
                  <span>嗜睡</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>昏迷</span>
                  <isSelect prop-select="true" />
                  <span>其他</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>清醒</span>
                  <isSelect prop-select="true" />
                  <span>烦躁</span>
                  <isSelect prop-select="true" />
                  <span>嗜睡</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>昏迷</span>
                  <isSelect prop-select="true" />
                  <span>其他</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>清醒</span>
                  <isSelect prop-select="true" />
                  <span>烦躁</span>
                  <isSelect prop-select="true" />
                  <span>嗜睡</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>昏迷</span>
                  <isSelect prop-select="true" />
                  <span>其他</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>清醒</span>
                  <isSelect prop-select="true" />
                  <span>烦躁</span>
                  <isSelect prop-select="true" />
                  <span>嗜睡</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>昏迷</span>
                  <isSelect prop-select="true" />
                  <span>其他</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="textAlign:center">
                体征
              </td>
              <td>
                <div class="td-div">
                  <span>脉搏</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">123</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>呼吸</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">123</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>血压</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                  <span>/</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                  <span>mmHg</span>
                </div>
              </td>
              <td>
                <div class="td-div">
                  <span>脉搏</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">123</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>呼吸</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">123</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>血压</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                  <span>/</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                  <span>mmHg</span>
                </div>
              </td>
              <td>
                <div class="td-div">
                  <span>脉搏</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">123</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>呼吸</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">123</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>血压</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                  <span>/</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                  <span>mmHg</span>
                </div>
              </td>
              <td>
                <div class="td-div">
                  <span>脉搏</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">123</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>呼吸</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">123</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>血压</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                  <span>/</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                  <span>mmHg</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="textAlign:center">
                皮肤
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div class="td-div">
                  <isSelect prop-select="true" />
                  <span>破损</span>
                  <span
                    class="input-div mgl5"
                  >
                    <span>部位：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>程度：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>大小：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div class="td-div">
                  <isSelect prop-select="true" />
                  <span>破损</span>
                  <span
                    class="input-div mgl5"
                  >
                    <span>部位：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>程度：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>大小：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div class="td-div">
                  <isSelect prop-select="true" />
                  <span>破损</span>
                  <span
                    class="input-div mgl5"
                  >
                    <span>部位：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>程度：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>大小：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>完整</span>
                </div>
                <div class="td-div">
                  <isSelect prop-select="true" />
                  <span>破损</span>
                  <span
                    class="input-div mgl5"
                  >
                    <span>部位：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>程度：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>大小：</span>
                    <div class="input-div-context-noborder-33">123</div>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="textAlign:center">
                <div>留置导管</div>
                <div>固定通畅</div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>静脉</span>
                  <isSelect prop-select="true" />
                  <span>动脉</span>
                  <isSelect prop-select="true" />
                  <span>胃管</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>导尿</span>
                  <isSelect prop-select="true" />
                  <span>气管导管</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>负压球</span>
                  <isSelect prop-select="true" />
                  <span>胸腔引流</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>其他</span>
                  <isSelect prop-select="true" />
                  <span>PICC</span>
                  <isSelect prop-select="true" />
                  <span>无</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>静脉</span>
                  <isSelect prop-select="true" />
                  <span>动脉</span>
                  <isSelect prop-select="true" />
                  <span>胃管</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>导尿</span>
                  <isSelect prop-select="true" />
                  <span>气管导管</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>负压球</span>
                  <isSelect prop-select="true" />
                  <span>胸腔引流</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>其他</span>
                  <isSelect prop-select="true" />
                  <span>PICC</span>
                  <isSelect prop-select="true" />
                  <span>无</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>静脉</span>
                  <isSelect prop-select="true" />
                  <span>动脉</span>
                  <isSelect prop-select="true" />
                  <span>胃管</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>导尿</span>
                  <isSelect prop-select="true" />
                  <span>气管导管</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>负压球</span>
                  <isSelect prop-select="true" />
                  <span>胸腔引流</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>其他</span>
                  <isSelect prop-select="true" />
                  <span>PICC</span>
                  <isSelect prop-select="true" />
                  <span>无</span>
                </div>
              </td>
              <td>
                <div>
                  <isSelect prop-select="true" />
                  <span>静脉</span>
                  <isSelect prop-select="true" />
                  <span>动脉</span>
                  <isSelect prop-select="true" />
                  <span>胃管</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>导尿</span>
                  <isSelect prop-select="true" />
                  <span>气管导管</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>负压球</span>
                  <isSelect prop-select="true" />
                  <span>胸腔引流</span>
                </div>
                <div>
                  <isSelect prop-select="true" />
                  <span>其他</span>
                  <isSelect prop-select="true" />
                  <span>PICC</span>
                  <isSelect prop-select="true" />
                  <span>无</span>
                </div>
              </td>
            </tr>
            <tr style="height:30px">
              <td style="textAlign:center;height:30px">
                身份确认
              </td>
              <td style="textAlign:center;height:30px">
                <div>
                  <isSelect prop-select="true" />
                  <span>是</span>
                  <isSelect prop-select="true" />
                  <span>否</span>
                </div>
              </td>
              <td style="textAlign:center;height:30px">
                <div>
                  <isSelect prop-select="true" />
                  <span>是</span>
                  <isSelect prop-select="true" />
                  <span>否</span>
                </div>
              </td>
              <td style="textAlign:center;height:30px">
                <div>
                  <isSelect prop-select="true" />
                  <span>是</span>
                  <isSelect prop-select="true" />
                  <span>否</span>
                </div>
              </td>
              <td style="textAlign:center;height:30px">
                <div>
                  <isSelect prop-select="true" />
                  <span>是</span>
                  <isSelect prop-select="true" />
                  <span>否</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="textAlign:center;height:60px">
                签名
              </td>
              <td style="textAlign:center;height:60px">
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </td>
              <td style="textAlign:center;height:60px">
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </td>
              <td style="textAlign:center;height:60px">
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </td>
              <td style="textAlign:center;height:60px">
                <img
                  src="./../../../assets/isFalse.png"
                  alt=""
                >
              </td>
            </tr>
          </table>
        </div>
        <div class="context1">
          <span>术后到达病区(监护室)时间:</span>
          <span
            class="input-div"
          >
            <div class="input-div-context-long">123</div>
          </span>
        </div>
        <div class="context1">
          <span>物品及药物：详见《手术病人护理记录单(一)》</span>
          <span
            class="input-div"
          >
            <div class="input-div-context-noborder">123</div>
            <span>接收</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isSelect from './components/isSelect'
export default {
  name: 'TransitTransfer',
  data () {
    return {
      selectArr1: {

      }
    }
  },
  mounted () {
    this.getWenShuData()
  },
  methods: {

    getWenShuData () {
      let obj = {
        admitNo: 91119858
      }
      this.$store.dispatch('ReqTransitTransfer', obj).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    isSelect
  }
}
</script>

<style scoped lang="scss">
@import './../../../styles/wenshu.scss';
.transit-container {
  width: 824px;
  height: 1080px;
  min-width: 824px;
  min-height: 920px;
  background-color: #fff;
  padding: 10px;
  .container-title {
    display: flex;
    border-bottom: 1px solid #000;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin: 0 70px;
    .title-right {
      font-size: 18px;
      margin-left: 10px;
    }
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
            width: 120px;
            height: 40px;
          }
          td {
            width: 85px;
            height: 80px;
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
  .input-div-context-noborder-short {
    padding: 0 5px;
    width: 60px;
  }
  .input-div-context-noborder-40 {
    padding: 0 5px;
    width: 40px;
  }
  .input-div-context-noborder-33 {
    padding: 0 5px;
    width: 33px;
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
.mgl48 {
  margin-left: 48px;
}
.line {
  width: 160px;
  height: 1px;
  background-color: #000;

}
.td-div {
  display: flex;
}
</style>
