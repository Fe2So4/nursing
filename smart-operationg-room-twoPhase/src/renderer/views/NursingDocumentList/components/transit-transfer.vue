<template>
  <div
    class="transit-container"
    id="transit-transfer"
  >
    <div class="wenben-content-info mgt10">
      <div class="info-content-container">
        <table>
          <thead style="display: table-header-group;">
            <tr>
              <div class="container-title">
                <span>复旦大学附属华山医院</span>
                <span class="title-right">患者转运交接单</span>
              </div>
              <div class="context1 mgt10">
                <span class="input-div ">
                  <span>姓名</span>
                  <div
                    class="input-div-context"
                    style="textAlign:center"
                  >{{ userInfo.patientName }}</div>
                </span>
                <span class="input-div">
                  <span>住院号/卡号</span>
                  <div
                    class="input-div-context"
                    style="textAlign:center"
                  >{{ userInfo.hospitalNo }}</div>
                </span>
                <span class="input-div">
                  <span>病区</span>
                  <div
                    class="input-div-context"
                    style="textAlign:center"
                  >{{ userInfo.ward }}</div>
                </span>
                <span class="input-div">
                  <span>床号</span>
                  <div
                    class="input-div-context"
                    style="textAlign:center"
                  >{{ userInfo.bedNo }}</div>
                </span>
                <span class="input-div">
                  <span>性别</span>
                  <div
                    class="input-div-context-short-60"
                    style="textAlign:center"
                  >{{ userInfo.sex }}</div>
                </span>
                <span class="input-div">
                  <span>年龄</span>
                  <div
                    class="input-div-context-short-60"
                    style="textAlign:center"
                  >{{ userInfo.age }}</div>
                </span>
              </div>
            </tr>
          </thead>
        </table>
        <div class="context1 mgt20">
          <span class="input-div ">
            <span style="lineHeight:30px">转运起始时间：</span>
            <div
              class="input-div-context-long"
              style="textAlign:center;lineHeight:30px"
            >{{ userInfo.startTime }}</div>
          </span>
          <span
            class="input-div"
          >
            <span style="lineHeight:30px">运送</span>
            <div
              class="input-div-context"
              style="textAlign:center;height:30px"
            ><img
              style="height:100%"
              :src="userInfo.carrier"
              alt=""
            ></div>
          </span>
        </div>
        <div class="context1 mgt20">
          <span class="input-div ">
            <span>当前诊断：</span>
            <div
              style="width:180px"
              class="input-div-context"
            >{{ userInfo.diagnosis }}</div>
          </span>
          <span style="marginLeft:34px">
            <IsSelect :myselect="userInfo.inpatientWard === '1' ? true : false" />
            <span>住院/</span>
            <IsSelect :myselect="userInfo.inpatientWard === '2' ? true : false" />
            <span>转病区</span>
          </span>
          <span
            class="input-div"
          >
            <span>：病区</span>
            <div
              class="input-div-context"
              style="textAlign:center"
            >{{ userInfo.forwardingWard }}</div>
          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="userInfo.department === '1' ? true : false" />
            <span>手术</span>
            <IsSelect :myselect="userInfo.department === '2' ? true : false" />
            <span>监护室</span>
            <IsSelect :myselect="userInfo.department === '3' ? true : false" />
            <span>透析室</span>
          </span>
        </div>
        <div class="context1">
          <span>评估：</span>
          <span style="marginLeft:20px">意识</span>

          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.consciousness.consciousnessName === '1' ? true : false" />
            <span>清楚</span>
          </span>
          <span style="marginLeft:48px">
            <IsSelect :myselect="appraiseJson.consciousness.consciousnessName === '2' ? true : false" />
            <span>烦躁</span>

          </span>
          <span style="marginLeft:37px">
            <IsSelect :myselect="appraiseJson.consciousness.consciousnessName === '3' ? true : false" />
            <span>嗜睡</span>

          </span>
          <span style="marginLeft:39px">
            <IsSelect :myselect="appraiseJson.consciousness.consciousnessName === '4' ? true : false" />
            <span>昏迷</span>

          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.consciousness.consciousnessName === '5' ? true : false" />
            <span>其他</span>

          </span>
          <span class="input-div mgl5">
            <div
              class="input-div-context-short"
              style="textAlign:center"
            >{{ appraiseJson.consciousness.consciousnessOther }}</div>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:63px">疼痛</span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.ache.acheName === '1' ? true : false" />
            <span>NRS</span>

          </span>
          <span style="marginLeft:47px">
            <IsSelect :myselect="appraiseJson.ache.acheName === '2' ? true : false" />
            <span>FLACC</span>

          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.ache.acheName === '3' ? true : false" />
            <span>CCPOT</span>

          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.ache.acheName === '4' ? true : false" />
            <span>VONG-BAKER</span>

          </span>
          <span
            style="marginLeft:20px"
            class="input-div"
          >
            <span>强度</span>
            <div
              class="input-div-context-short"
              style="textAlign:center"
            >{{ appraiseJson.ache.acheStrength || '' }}</div>
          </span>
          <span class="input-div">
            <span>部位</span>
            <div
              class="input-div-context-short"
              style="textAlign:center"
            >{{ appraiseJson.ache.achePart || '' }}</div>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:63px">性质</span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.nature === '1' ? true : false" />
            <span>刀割样痛</span>

          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.nature === '2' ? true : false" />
            <span>绞痛</span>

          </span>
          <span style="marginLeft:36px">
            <IsSelect :myselect="appraiseJson.nature === '3' ? true : false" />
            <span>灼烧样痛</span>

          </span>
          <span style="marginLeft:11px">
            <IsSelect :myselect="appraiseJson.nature === '4' ? true : false" />
            <span>刺痛</span>
          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.nature === '5' ? true : false" />
            <span>压痛</span>
          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.nature === '6' ? true : false" />
            <span>胀痛</span>
          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.nature === '7' ? true : false" />
            <span>钝痛</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:63px">皮肤</span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="appraiseJson.skin.skinName === '1' ? true : false" />
            <span>完整</span>
          </span>
          <span style="marginLeft:48px">
            <IsSelect :myselect="appraiseJson.skin.skinName === '2' ? true : false" />
            <span>破损</span>
          </span>
          <span
            style="marginLeft:36px"
            class="input-div"
          >
            <span>部位</span>
            <div
              class="input-div-context"
              style="textAlign:center"
            >{{ appraiseJson.skin.skinPart || '' }}</div>
          </span>
          <span class="input-div">
            <span>程度</span>
            <div
              class="input-div-context"
              style="textAlign:center"
            >{{ appraiseJson.skin.skinDegree || '' }}</div>
          </span>
          <span class="input-div">
            <span>大小</span>
            <div
              class="input-div-context"
              style="textAlign:center"
            >{{ appraiseJson.skin.skinSize || '' }}</div>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:63px">体温</span>
          <span
            style="marginLeft:15px"
            class="input-div"
          >
            <div
              class="input-div-context-noborder-short-40"
              style="textAlign:center"
            >{{ appraiseJson.vitalSigns.temp || '' }}</div>
            <span>℃</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <span>脉搏</span>
            <div
              class="input-div-context-noborder-40"
              style="textAlign:center"
            >{{ appraiseJson.vitalSigns.pulse || '' }}</div>
            <span>分/次</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <span>呼吸</span>
            <div
              class="input-div-context-noborder-40"
              style="textAlign:center"
            >{{ appraiseJson.vitalSigns.breathe || '' }}</div>
            <span>分/次</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <span>血压</span>
            <div
              class="input-div-context-noborder-40"
              style="textAlign:center"
            >{{ appraiseJson.vitalSigns.bp || '' }}</div>
            <span>mmHg</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <span>氧饱和度</span>
            <div
              class="input-div-context-noborder-40"
              style="textAlign:center"
            >{{ appraiseJson.vitalSigns.o2 || '' }}</div>
            <span>%</span>
          </span>
        </div>
        <div class="context1">
          <span>导管：固定并通畅</span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <IsSelect :myselect="catheter.includes('o2') ? true : false" />
            <span>氧气</span>
          </span>
          <span style="marginLeft:160px">
            <IsSelect :myselect="catheter.includes('qjm') ? true : false" />
            <span>浅静脉留置({{ conduitTime ||'留置日期' }})</span>
          </span>
          <span style="marginLeft:100px">
            <IsSelect :myselect="catheter.includes('sjm') ? true : false" />
            <span>深静脉留置({{ conduitTime ||'留置日期' }})</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <IsSelect :myselect="catheter.includes('picc') ? true : false" />
            <span>PICC({{ conduitTime ||'留置日期' }})</span>
          </span>
          <span style="marginLeft:135px">
            <IsSelect :myselect="catheter.includes('dml') ? true : false" />
            <span>动脉留置({{ conduitTime ||'留置日期' }})</span>
          </span>
          <span style="marginLeft:100px">
            <IsSelect :myselect="catheter.includes('cwj') ? true : false" />
            <span>肠胃减压({{ conduitTime ||'留置日期' }})</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <IsSelect :myselect="catheter.includes('bs') ? true : false" />
            <span>鼻饲({{ conduitTime ||'留置日期' }})</span>
          </span>
          <span style="marginLeft:138px">
            <IsSelect :myselect="catheter.includes('lzd') ? true : false" />
            <span>留置导尿({{ conduitTime ||'留置日期' }})</span>
          </span>
          <span style="marginLeft:100px">
            <IsSelect :myselect="catheter.includes('qgd') ? true : false" />
            <span>气管导管({{ conduitTime ||'留置日期' }})</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <IsSelect :myselect="catheter.includes('fyq') ? true : false" />
            <span>负压球({{ conduitTime ||'留置日期' }})</span>
          </span>
          <span style="marginLeft:125px">
            <IsSelect :myselect="catheter.includes('xqy') ? true : false" />
            <span>胸腔引流({{ conduitTime ||'留置日期' }})</span>
          </span>
          <span style="marginLeft:100px">
            <IsSelect :myselect="catheter.includes('tg') ? true : false" />
            <span>T管({{ conduitTime ||'留置日期' }})</span>
          </span>
        </div>
        <div class="context1">
          <span style="marginLeft:42px">
            <IsSelect :myselect="catheter.includes('qita') ? true : false" />
            <span>其他({{ conduitTime ||'留置日期' }})</span>
          </span>
          <span style="marginLeft:140px">
            <IsSelect :myselect="catheter.includes('wu') ? true : false" />
            <span>无</span>
          </span>
        </div>

        <div class="context1">
          <span>物品：</span>
          <span>

            <IsSelect :myselect="goodsJson.goods === '1' ? true : false" />
            <span>输液</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <div class="input-div-context-noborder-40">{{ goodsJson.goods === '1'?goodsJson.number:'' }}</div>
            <span>瓶/袋</span>
          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="goodsJson.goods === '2' ? true : false" />
            <span>X片</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <div class="input-div-context-noborder-40">{{ goodsJson.goods === '2'?goodsJson.number:'' }}</div>
            <span>张</span>
          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="goodsJson.goods === '3' ? true : false" />
            <span>CT片</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <div class="input-div-context-noborder-40">{{ goodsJson.goods === '3'?goodsJson.number:'' }}</div>
            <span>张</span>
          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="goodsJson.goods === '4' ? true : false" />
            <span>磁共振片</span>
          </span>
          <span
            class="input-div"
            style="marginLeft:15px"
          >
            <div class="input-div-context-noborder-40">{{ goodsJson.goods === '4'?goodsJson.number:'' }}</div>
            <span>张</span>
          </span>
          <span style="marginLeft:20px">
            <IsSelect :myselect="goodsJson.goods === '5' ? true : false" />
            <span>其他</span>
          </span>
        </div>
        <div class="context1">
          <span>建议：</span>
          <span
            class="input-div"
          >
            <div class="input-div-context-long">{{ userInfo.suggest }}</div>
          </span>
        </div>
        <div class="context1">
          <span style="lineHeight:30px">转运结束时间：</span>
          <span
            class="input-div"
          >
            <div
              class="input-div-context-long"
              style="lineHeight:30px"
            >{{ userInfo.endTime }}</div>
          </span>
          <span
            class="input-div"
          >
            <span style="lineHeight:30px">接收</span>
            <div
              class="input-div-context-noborder-40"
              style="height:30px;width:160px;borderBottom:1px solid #000;paddingLeft:15px;lineHeight:30px"
            >
              <span>{{ userInfo.recipientEnd }}</span>
              <!-- <img
                style="height:100%"
                :src="userInfo.recipientEnd"
                alt=""
              > -->
            </div>
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
                  {{ pointInRoomtime || '日 时 分' }}
                </div>
              </th>
              <th>
                <div>出手术间</div>
                <div class="line" />
                <div>
                  {{ pointOutRoomTime || '日 时 分' }}
                </div>
              </th>
              <th>
                <div>进PACU</div>
                <div class="line" />
                <div>
                  {{ pointPacuTime || '日 时 分' }}
                </div>
              </th>
              <th>
                <div>出PACU</div>
                <div class="line" />
                <div>
                  {{ outPacuTime || '日 时 分' }}
                </div>
              </th>
            </tr>
            <tr>
              <td style="textAlign:center">
                意识
              </td>
              <td>
                <div>
                  <IsSelect :myselect="pointInRoom.consciousness === '1' ? true : false" />
                  <span>清醒</span>
                  <IsSelect :myselect="pointInRoom.consciousness === '2' ? true : false" />
                  <span>烦躁</span>
                  <IsSelect :myselect="pointInRoom.consciousness === '3' ? true : false" />
                  <span>嗜睡</span>
                </div>
                <div>
                  <IsSelect :myselect="pointInRoom.consciousness === '4' ? true : false" />
                  <span>昏迷</span>
                  <IsSelect :myselect="pointInRoom.consciousness === '5' ? true : false" />
                  <span>其他</span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="pointOutRoom.consciousness === '1' ? true : false" />
                  <span>清醒</span>
                  <IsSelect :myselect="pointOutRoom.consciousness === '2' ? true : false" />
                  <span>烦躁</span>
                  <IsSelect :myselect="pointOutRoom.consciousness === '3' ? true : false" />
                  <span>嗜睡</span>
                </div>
                <div>
                  <IsSelect :myselect="pointOutRoom.consciousness === '4' ? true : false" />
                  <span>昏迷</span>
                  <IsSelect :myselect="pointOutRoom.consciousness === '5' ? true : false" />
                  <span>其他</span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="pointPacu.consciousness === '1' ? true : false" />
                  <span>清醒</span>
                  <IsSelect :myselect="pointPacu.consciousness === '2' ? true : false" />
                  <span>烦躁</span>
                  <IsSelect :myselect="pointPacu.consciousness === '3' ? true : false" />
                  <span>嗜睡</span>
                </div>
                <div>
                  <IsSelect :myselect="pointPacu.consciousness === '4' ? true : false" />
                  <span>昏迷</span>
                  <IsSelect :myselect="pointPacu.consciousness === '5' ? true : false" />
                  <span>其他</span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="outPacu.consciousness === '1' ? true : false" />
                  <span>清醒</span>
                  <IsSelect :myselect="outPacu.consciousness === '2' ? true : false" />
                  <span>烦躁</span>
                  <IsSelect :myselect="outPacu.consciousness === '3' ? true : false" />
                  <span>嗜睡</span>
                </div>
                <div>
                  <IsSelect :myselect="outPacu.consciousness === '4' ? true : false" />
                  <span>昏迷</span>
                  <IsSelect :myselect="outPacu.consciousness === '5' ? true : false" />
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
                    <div class="input-div-context-noborder-40">{{ pointInRoom.pulse || 0 }}</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>呼吸</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">{{ pointInRoom.breathe || 0 }}</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>血压</span>
                  <span
                    class="input-div"
                  >
                    <div
                      class="input-div-context-noborder-33"
                    >{{ pointInRoom.bp || 0 }}</div>
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
                    <div class="input-div-context-noborder-40">{{ pointOutRoom.pulse || 0 }}</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>呼吸</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">{{ pointOutRoom.breathe || 0 }}</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>血压</span>
                  <span
                    class="input-div"
                  >
                    <div
                      class="input-div-context-noborder-33"
                    >{{ pointOutRoom.bp || 0 }}</div>
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
                    <div class="input-div-context-noborder-40">{{ pointPacu.pulse || 0 }}</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>呼吸</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">{{ pointPacu.breathe || 0 }}</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>血压</span>
                  <span
                    class="input-div"
                  >
                    <div
                      class="input-div-context-noborder-33"
                    >{{ pointPacu.bp || 0 }}</div>
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
                    <div class="input-div-context-noborder-40">{{ outPacu.pulse || 0 }}</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>呼吸</span>
                  <span
                    class="input-div"
                  >
                    <div class="input-div-context-noborder-40">{{ outPacu.breathe || 0 }}</div>
                    <span>次/分</span>
                  </span>
                </div>
                <div class="td-div">
                  <span>血压</span>
                  <span
                    class="input-div"
                  >
                    <div
                      class="input-div-context-noborder-33"
                    >{{ outPacu.bp || 0 }}</div>
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
                  <IsSelect :myselect="pointInRoom.skinName === '0' ? true : false" />
                  <span>完整</span>
                </div>
                <div class="td-div">
                  <IsSelect :myselect="pointInRoom.skinName === '1' ? true : false" />
                  <span>破损</span>
                  <span
                    class="input-div mgl5"
                  >
                    <span>部位：</span>
                    <div class="input-div-context-noborder-33">{{ pointInRoom.skinPart }}</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>程度：</span>
                    <div class="input-div-context-noborder-33">{{ pointInRoom.skinDegree }}</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>大小：</span>
                    <div class="input-div-context-noborder-33">{{ pointInRoom.skinSize }}</div>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="pointOutRoom.skinName === '0' ? true : false" />
                  <span>完整</span>
                </div>
                <div class="td-div">
                  <IsSelect :myselect="pointOutRoom.skinName === '1' ? true : false" />
                  <span>破损</span>
                  <span
                    class="input-div mgl5"
                  >
                    <span>部位：</span>
                    <div class="input-div-context-noborder-33">{{ pointOutRoom.skinPart }}</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>程度：</span>
                    <div class="input-div-context-noborder-33">{{ pointOutRoom.skinDegree }}</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>大小：</span>
                    <div class="input-div-context-noborder-33">{{ pointOutRoom.skinSize }}</div>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="pointPacu.skinName === '0' ? true : false" />
                  <span>完整</span>
                </div>
                <div class="td-div">
                  <IsSelect :myselect="pointPacu.skinName === '1' ? true : false" />
                  <span>破损</span>
                  <span
                    class="input-div mgl5"
                  >
                    <span>部位：</span>
                    <div class="input-div-context-noborder-33">{{ pointPacu.skinPart }}</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>程度：</span>
                    <div class="input-div-context-noborder-33">{{ pointPacu.skinDegree }}</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>大小：</span>
                    <div class="input-div-context-noborder-33">{{ pointPacu.skinSize }}</div>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="outPacu.skinName === '0' ? true : false" />
                  <span>完整</span>
                </div>
                <div class="td-div">
                  <IsSelect :myselect="outPacu.skinName === '1' ? true : false" />
                  <span>破损</span>
                  <span
                    class="input-div mgl5"
                  >
                    <span>部位：</span>
                    <div class="input-div-context-noborder-33">{{ outPacu.skinPart }}</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>程度：</span>
                    <div class="input-div-context-noborder-33">{{ outPacu.skinDegree }}</div>
                  </span>
                </div>
                <div>
                  <span
                    class="input-div mgl48"
                  >
                    <span>大小：</span>
                    <div class="input-div-context-noborder-33">{{ outPacu.skinSize }}</div>
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
                  <IsSelect :myselect="pointInRoom.conduit.includes('jm') ? true : false" />
                  <span>静脉</span>
                  <IsSelect :myselect="pointInRoom.conduit.includes('dm') ? true : false" />
                  <span>动脉</span>
                  <IsSelect :myselect="pointInRoom.conduit.includes('wg') ? true : false" />
                  <span>胃管</span>
                </div>
                <div>
                  <IsSelect :myselect="pointInRoom.conduit.includes('dn') ? true : false" />
                  <span>导尿</span>
                  <IsSelect :myselect="pointInRoom.conduit.includes('qgdg') ? true : false" />
                  <span>气管导管</span>
                </div>
                <div>
                  <IsSelect :myselect="pointInRoom.conduit.includes('fyq') ? true : false" />
                  <span>负压球</span>
                  <IsSelect :myselect="pointInRoom.conduit.includes('xqyl') ? true : false" />
                  <span>胸腔引流</span>
                </div>
                <div>
                  <IsSelect :myselect="pointInRoom.conduit.includes('qita') ? true : false" />
                  <span>其他</span>
                  <IsSelect :myselect="pointInRoom.conduit.includes('picc') ? true : false" />
                  <span>PICC</span>
                  <IsSelect :myselect="pointInRoom.conduit.includes('wu') ? true : false" />
                  <span>无</span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('jm') ? true : false" />
                  <span>静脉</span>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('dm') ? true : false" />
                  <span>动脉</span>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('wg') ? true : false" />
                  <span>胃管</span>
                </div>
                <div>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('dn') ? true : false" />
                  <span>导尿</span>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('qgdg') ? true : false" />
                  <span>气管导管</span>
                </div>
                <div>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('fyq') ? true : false" />
                  <span>负压球</span>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('xqyl') ? true : false" />
                  <span>胸腔引流</span>
                </div>
                <div>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('qita') ? true : false" />
                  <span>其他</span>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('picc') ? true : false" />
                  <span>PICC</span>
                  <IsSelect :myselect="pointOutRoom.conduit.includes('wu') ? true : false" />
                  <span>无</span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="pointPacu.conduit.includes('jm') ? true : false" />
                  <span>静脉</span>
                  <IsSelect :myselect="pointPacu.conduit.includes('dm') ? true : false" />
                  <span>动脉</span>
                  <IsSelect :myselect="pointPacu.conduit.includes('wg') ? true : false" />
                  <span>胃管</span>
                </div>
                <div>
                  <IsSelect :myselect="pointPacu.conduit.includes('dn') ? true : false" />
                  <span>导尿</span>
                  <IsSelect :myselect="pointPacu.conduit.includes('qgdg') ? true : false" />
                  <span>气管导管</span>
                </div>
                <div>
                  <IsSelect :myselect="pointPacu.conduit.includes('fyq') ? true : false" />
                  <span>负压球</span>
                  <IsSelect :myselect="pointPacu.conduit.includes('xqyl') ? true : false" />
                  <span>胸腔引流</span>
                </div>
                <div>
                  <IsSelect :myselect="pointPacu.conduit.includes('qita') ? true : false" />
                  <span>其他</span>
                  <IsSelect :myselect="pointPacu.conduit.includes('picc') ? true : false" />
                  <span>PICC</span>
                  <IsSelect :myselect="pointPacu.conduit.includes('wu') ? true : false" />
                  <span>无</span>
                </div>
              </td>
              <td>
                <div>
                  <IsSelect :myselect="outPacu.conduit.includes('jm') ? true : false" />
                  <span>静脉</span>
                  <IsSelect :myselect="outPacu.conduit.includes('dm') ? true : false" />
                  <span>动脉</span>
                  <IsSelect :myselect="outPacu.conduit.includes('wg') ? true : false" />
                  <span>胃管</span>
                </div>
                <div>
                  <IsSelect :myselect="outPacu.conduit.includes('dn') ? true : false" />
                  <span>导尿</span>
                  <IsSelect :myselect="outPacu.conduit.includes('qgdg') ? true : false" />
                  <span>气管导管</span>
                </div>
                <div>
                  <IsSelect :myselect="outPacu.conduit.includes('fyq') ? true : false" />
                  <span>负压球</span>
                  <IsSelect :myselect="outPacu.conduit.includes('xqyl') ? true : false" />
                  <span>胸腔引流</span>
                </div>
                <div>
                  <IsSelect :myselect="outPacu.conduit.includes('qita') ? true : false" />
                  <span>其他</span>
                  <IsSelect :myselect="outPacu.conduit.includes('picc') ? true : false" />
                  <span>PICC</span>
                  <IsSelect :myselect="outPacu.conduit.includes('wu') ? true : false" />
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
                  <IsSelect :myselect="pointInRoomState === '1' ? true : false" />
                  <span>是</span>
                  <IsSelect :myselect="pointInRoomState === '0' ? true : false" />
                  <span>否</span>
                </div>
              </td>
              <td style="textAlign:center;height:30px">
                <div>
                  <IsSelect :myselect="pointOutRoomState === '1' ? true : false" />
                  <span>是</span>
                  <IsSelect :myselect="pointOutRoomState === '0' ? true : false" />
                  <span>否</span>
                </div>
              </td>
              <td style="textAlign:center;height:30px">
                <div>
                  <IsSelect :myselect="pointPacuState === '1' ? true : false" />
                  <span>是</span>
                  <IsSelect :myselect="pointPacuState === '0' ? true : false" />
                  <span>否</span>
                </div>
              </td>
              <td style="textAlign:center;height:30px">
                <div>
                  <IsSelect :myselect="outPacuState === '1' ? true : false" />
                  <span>是</span>
                  <IsSelect :myselect="outPacuState === '0' ? true : false" />
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
                  style="height:100%"
                  :src="pointInRoom.signatureImage2"
                  alt=""
                >
              </td>
              <td style="textAlign:center;height:60px">
                <img
                  style="height:100%"
                  :src="pointOutRoom.signatureImage2"
                  alt=""
                >
              </td>
              <td style="textAlign:center;height:60px">
                <img
                  style="height:100%"
                  :src="pointPacu.signatureImage2"
                  alt=""
                >
              </td>
              <td style="textAlign:center;height:60px">
                <img
                  style="height:100%"
                  :src="outPacu.signatureImage2"
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
            <div class="input-div-context-long">{{ userInfo.arrivalTime }}</div>
          </span>
        </div>
        <div class="context1">
          <span>物品及药物：详见《手术病人护理记录单(一)》</span>
          <span
            style="marginLeft:250px"
            class="input-div"
          >
            <span>接收</span>
            <div
              class="input-div-context-noborder"
              style="width:160px;paddingLeft:15px;borderBottom:1px solid #000;height:30px"
            >
              <img
                style="height:100%"
                :src="userInfo.recipient"
                alt=""
              >
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IsSelect from './components/isSelect'
import {ipcRenderer} from 'electron'
import Bus from '@/utils/bus.js'
export default {
  name: 'TransitTransfer',
  data () {
    return {
      htmlTitle: '转运交接单',
      wenshuData: {

      },
      userInfo: {
        patientName: '',
        admitNo: '',
        ward: '',
        bedNo: '',
        sex: '',
        age: '',
        startTime: '',
        carrier: '',
        diagnosis: '',
        inpatientWard: '',
        endTime: '',
        suggest: '',
        recipient: '',
        recipientent: '',
        changeWard: '',
        department: '',
        arrivalTime: '',
        forwardingWard: '',
        recipientEnd: ''
      },
      appraiseJson: {
        ache: { // 疼痛
          acheName: '',
          acheStrength: '',
          achePart: ''
        },
        consciousness: {
          consciousnessName: '', // 意识
          consciousnessOther: ''
        },

        nature: '', // 性质
        skin: {
          skinDegree: '', // 皮肤
          skinName: '',
          skinPart: ''
        },

        vitalSigns: {
          bp: '',
          breathe: '',
          o2: '',
          pulse: '',
          temp: ''
        }

      }, // 评估json
      catheter: '', // 拼接后的导管选择
      conduitTime: '', // 留置时间
      goodsJson: {
        goods: '',
        number: ''
      }, // 拼接后的物品
      pointInRoomtime: '', // 进手术室时间
      pointOutRoomTime: '', // 出手术室时间
      pointPacuTime: '', // 进pacu时间
      outPacuTime: '', // 出pacu时间

      pointInRoomState: '0',
      pointOutRoomState: '0',
      pointPacuState: '0',
      outPacuState: '0',
      pointInRoom: {
        conduit: '',
        bp: '',
        breathe: '',
        pulse: '',
        signatureImage2: '',
        skinDegree: '',
        skinName: '',
        skinPart: '',
        skinSize: ''
      },
      pointOutRoom: {
        conduit: '',
        bp: '',
        breathe: '',
        pulse: '',
        signatureImage2: '',
        skinDegree: '',
        skinName: '',
        skinPart: '',
        skinSize: ''
      },
      pointPacu: {
        conduit: '',
        bp: '',
        breathe: '',
        pulse: '',
        signatureImage2: '',
        skinDegree: '',
        skinName: '',
        skinPart: '',
        skinSize: ''
      },
      outPacu: {
        conduit: '',
        bp: '',
        breathe: '',
        pulse: '',
        signatureImage2: '',
        skinDegree: '',
        skinName: '',
        skinPart: '',
        skinSize: ''
      }
    }
  },
  mounted () {
    Bus.$on('clickShuaXinTransit', res => {
      if (res === '1') {
        this.utilsDebounce(() => { this.getWenShuData() }, 1000)
      } else if (res === '2') {
        this.utilsDebounce(() => { this.dayin() }, 1000)
      } else if (res === '3') {
        this.htmlTitle = this.$store.state['nursing-document-list'].patientName + '转运交接单'
        this.utilsDebounce(() => {
          //  this.getPdf('transit-transfer')
          this.daochuPDF()
        }, 1000)
      }
    })
    this.getWenShuData()
  },
  methods: {
    dayin () {
      this.printCurrent()
    },
    // 打印
    printCurrent () {
      const printHtml = document.getElementById('transit-transfer').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      ipcRenderer.send('printChannel', printHtml, 'transit-transfer.css', options)
    },
    daochuPDF () {
      const printHtml = document.getElementById('transit-transfer').outerHTML
      const options = { silent: false }
      // options = JSON.stringify(options)
      this.utilsDebounce(() => {
        ipcRenderer.send('printpdfChannel', printHtml, 'transit-transfer.css', options)
      }, 1000)
    },
    getWenShuData () {
      let obj = {
        // hospitalNo: 666,
        // cureNo: 1010
        cureNo: this.$store.state['nursing-document-list'].cureNo,

        hospitalNo: this.$store.state['nursing-document-list'].hospitalNo
      }

      this.$store.dispatch('ReqTransitTransfer', obj).then(res => {
        if (res.data.code === 200) {
          this.wenshuData = res.data.data
          if (this.IsEmpty(this.wenshuData.patientName)) {
            this.openToast('warning', '暂无数据')
            return false
          }
          this.userInfo.patientName = this.wenshuData.patientName || ''
          this.userInfo.hospitalNo = this.wenshuData.hospitalNo || ''
          this.userInfo.ward = this.wenshuData.ward || ''
          this.userInfo.bedNo = this.wenshuData.bedNo || ''
          this.userInfo.sex = this.wenshuData.sex || ''
          this.userInfo.age = this.wenshuData.age || ''
          this.userInfo.endTime = this.wenshuData.endTime || ''
          this.userInfo.startTime = this.wenshuData.startTime || ''
          this.userInfo.suggest = this.wenshuData.suggest || ''
          this.userInfo.recipientEnd = this.wenshuData.recipientEnd || '' // 结束接收
          this.userInfo.inpatientWard = this.wenshuData.inpatientWard || ''
          this.userInfo.diagnosis = this.wenshuData.diagnosis || ''
          this.userInfo.forwardingWard = this.wenshuData.forwardingWard || ''
          this.userInfo.department = this.wenshuData.department || ''
          this.userInfo.arrivalTime = this.wenshuData.arrivalTime || ''
          this.userInfo.carrier = this.wenshuData.carrier || ''
          this.userInfo.recipient = this.wenshuData.recipient || '' // 到达接收

          this.pointInRoomState = this.wenshuData.pointInRoomState || '0'
          this.pointOutRoomState = this.wenshuData.pointOutRoomState || '0'
          this.pointPacuState = this.wenshuData.pointPacuState || '0'
          this.outPacuState = this.wenshuData.outPacuState || '0'

          if (this.wenshuData.appraiseJson.length > 0) {
            this.appraiseJson = this.wenshuData.appraiseJson[0]
          }

          if (this.wenshuData.catheterJson.length > 0) {
            this.catheter = this.wenshuData.catheterJson[0].catheter.join('-')
            this.conduitTime = this.wenshuData.catheterJson[0].conduitTime
          }

          if (this.wenshuData.goodsJson.length > 0) {
            this.goodsJson = this.wenshuData.goodsJson[0]
          }
          if (!this.IsEmpty(this.wenshuData.pointInRoomtime)) {
            this.pointInRoomtime = this.Moment(this.wenshuData.pointInRoomtime).format('DD日HH时mm分')
          }
          if (!this.IsEmpty(this.wenshuData.pointOutRoomTime)) {
            this.pointOutRoomTime = this.Moment(this.wenshuData.pointOutRoomTime).format('DD日HH时mm分')
          }
          if (!this.IsEmpty(this.wenshuData.pointPacuTime)) {
            this.pointPacuTime = this.Moment(this.wenshuData.pointPacuTime).format('DD日HH时mm分')
          }
          if (!this.IsEmpty(this.wenshuData.outPacuTime)) {
            this.outPacuTime = this.Moment(this.wenshuData.outPacuTime).format('DD日HH时mm分')
          }

          if (this.wenshuData.pointInRoom.length > 0) {
            this.pointInRoom.bp = this.wenshuData.pointInRoom[0].bp
            this.pointInRoom.breathe = this.wenshuData.pointInRoom[0].breathe
            this.pointInRoom.conduit = this.wenshuData.pointInRoom[0].conduit.join('-')
            this.pointInRoom.consciousness = this.wenshuData.pointInRoom[0].consciousness
            this.pointInRoom.pulse = this.wenshuData.pointInRoom[0].pulse
            this.pointInRoom.signatureImage2 = this.wenshuData.pointInRoom[0].signatureImage2
            this.pointInRoom.skinDegree = this.wenshuData.pointInRoom[0].skinDegree
            this.pointInRoom.skinName = this.wenshuData.pointInRoom[0].skinName
            this.pointInRoom.skinPart = this.wenshuData.pointInRoom[0].skinPart
            this.pointInRoom.skinSize = this.wenshuData.pointInRoom[0].skinSize
          }
          if (this.wenshuData.pointOutRoom.length > 0) {
            this.pointOutRoom.bp = this.wenshuData.pointOutRoom[0].bp
            this.pointOutRoom.breathe = this.wenshuData.pointOutRoom[0].breathe
            this.pointOutRoom.conduit = this.wenshuData.pointOutRoom[0].conduit.join('-')
            this.pointOutRoom.consciousness = this.wenshuData.pointOutRoom[0].consciousness
            this.pointOutRoom.pulse = this.wenshuData.pointOutRoom[0].pulse
            this.pointOutRoom.signatureImage2 = this.wenshuData.pointOutRoom[0].signatureImage2
            this.pointOutRoom.skinDegree = this.wenshuData.pointOutRoom[0].skinDegree
            this.pointOutRoom.skinName = this.wenshuData.pointOutRoom[0].skinName
            this.pointOutRoom.skinPart = this.wenshuData.pointOutRoom[0].skinPart
            this.pointOutRoom.skinSize = this.wenshuData.pointOutRoom[0].skinSize
          }
          if (this.wenshuData.pointPacu.length > 0) {
            this.pointPacu.bp = this.wenshuData.pointPacu[0].bp
            this.pointPacu.breathe = this.wenshuData.pointPacu[0].breathe
            this.pointPacu.conduit = this.wenshuData.pointPacu[0].conduit.join('-')
            this.pointPacu.consciousness = this.wenshuData.pointPacu[0].consciousness
            this.pointPacu.pulse = this.wenshuData.pointPacu[0].pulse
            this.pointPacu.signatureImage2 = this.wenshuData.pointPacu[0].signatureImage2
            this.pointPacu.skinDegree = this.wenshuData.pointPacu[0].skinDegree
            this.pointPacu.skinName = this.wenshuData.pointPacu[0].skinName
            this.pointPacu.skinPart = this.wenshuData.pointPacu[0].skinPart
            this.pointPacu.skinSize = this.wenshuData.pointPacu[0].skinSize
          }
          if (this.wenshuData.outPacu.length > 0) {
            this.outPacu.bp = this.wenshuData.outPacu[0].bp
            this.outPacu.breathe = this.wenshuData.outPacu[0].breathe
            this.outPacu.conduit = this.wenshuData.outPacu[0].conduit.join('-')
            this.outPacu.consciousness = this.wenshuData.outPacu[0].consciousness
            this.outPacu.pulse = this.wenshuData.outPacu[0].pulse
            this.outPacu.signatureImage2 = this.wenshuData.outPacu[0].signatureImage2
            this.outPacu.skinDegree = this.wenshuData.outPacu[0].skinDegree
            this.outPacu.skinName = this.wenshuData.outPacu[0].skinName
            this.outPacu.skinPart = this.wenshuData.outPacu[0].skinPart
            this.outPacu.skinSize = this.wenshuData.outPacu[0].skinSize
          }
        }
      })
    },
    // 提示方法
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: 3000
      })
    }
  },

  components: {
    IsSelect
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
    width: 50px;
  }
  .input-div-context-noborder-33 {
    padding: 0 5px;
    width: 60px;
    text-align: center;
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
