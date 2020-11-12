<template>
  <table
    width="100%"
    cellspacing="0"
  >
    <thead>
      <tr>
        <th colspan="8">
          完整护士技术档案
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>姓名</td>
        <td>汤雯菲</td>
        <td>性别</td>
        <td>女</td>
        <td>技术职称</td>
        <td>护士</td>
        <td>职务</td>
        <td>护士</td>
      </tr>
      <tr>
        <td>名族</td>
        <td>汉族</td>
        <td>出生年月</td>
        <td>2000-1</td>
        <td>身份证</td>
        <td>无</td>
        <td>参加工作时间</td>
        <td>2000-01-01</td>
      </tr>
      <tr>
        <td>原学历</td>
        <td>本科</td>
        <td>现学历</td>
        <td>本</td>
        <td>能级水平</td>
        <td>NO</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>籍贯</td>
        <td colspan="4">
          中国
        </td>
        <td>宅电</td>
        <td colspan="2">
          12345678955
        </td>
      </tr>
      <tr>
        <td>家庭详细地址</td>
        <td colspan="4">
          无
        </td>
        <td>手机</td>
        <td colspan="2">
          12345678955
        </td>
      </tr>
      <tr>
        <td
          colspan="8"
          class="left"
        >
          何时何月何校发给毕业证书（中专以上学历）
        </td>
      </tr>
      <tr>
        <td colspan="2">
          起止时间
        </td>
        <td colspan="2">
          毕业学校
        </td>
        <td>学历</td>
        <td>学位</td>
        <td colspan="2">
          学习形式（全日制、夜大等）
        </td>
      </tr>
      <tr>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
        <td colspan="">
          1
        </td>
        <td colspan="">
          1
        </td>
        <td colspan="2">
          1
        </td>
      </tr>
      <tr>
        <td
          colspan="8"
          class="left"
        >
          职称聘任情况
        </td>
      </tr>
      <tr>
        <td colspan="2">
          职称
        </td>
        <td colspan="2">
          资格取得时间
        </td>
        <td colspan="2">
          聘任时间
        </td>
        <td colspan="2">
          备注
        </td>
      </tr>
      <tr>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
      </tr>
      <tr>
        <td
          colspan="8"
          class="left"
        >
          科室轮转情况
        </td>
      </tr>
      <tr>
        <td colspan="2">
          起止时间
        </td>
        <td colspan="2">
          单位
        </td>
        <td colspan="2">
          科室
        </td>
        <td colspan="2">
          备注
        </td>
      </tr>
      <tr>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
      </tr>
      <tr>
        <td
          colspan="8"
          class="left"
        >
          手术室科室轮转情况
        </td>
      </tr>
      <tr>
        <td colspan="2">
          专科巡回时间
        </td>
        <td colspan="1">
          专科巡回工作
        </td>
        <td colspan="2">
          专科洗手时间
        </td>
        <td colspan="1">
          专科洗手工作
        </td>
        <td colspan="2">
          备注
        </td>
      </tr>
      <tr>
        <td colspan="2">
          1
        </td>
        <td colspan="1">
          1
        </td>
        <td colspan="2">
          1
        </td>
        <td colspan="1">
          1
        </td>
        <td colspan="2">
          1
        </td>
      </tr>
      <tr>
        <td
          colspan="8"
          class="left"
        >
          培训进修情况（>2个月）
        </td>
      </tr>
      <tr>
        <td colspan="2">
          起止时间
        </td>
        <td colspan="2">
          培训进修情况
        </td>
        <td colspan="2">
          培训进修单位
        </td>
        <td colspan="2">
          获证情况
        </td>
      </tr>
      <tr>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
        <td colspan="2">
          1
        </td>
      </tr>
      <tr>
        <td>获奖情况</td>
        <td colspan="7">
          1
        </td>
      </tr>
      <tr>
        <td>论文发表</td>
        <td colspan="7">
          1
        </td>
      </tr>
      <tr>
        <td>课题申报</td>
        <td colspan="7">
          1
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  table{
        // border-top: 1px solid #000;
        // border-right: 1px solid #000;
        border-collapse:0;
        thead{
          th{
            border-bottom: 1px solid #000;
            font-size: 20px;
            font-weight: bold;
            // line-height: ;
            height: 60px;
          }
        }
        tbody{
          border-right: 1px solid #000;
          tr{
            td{
              border-bottom:1px solid #000;
              border-left:1px solid #000;
              text-align: center;
              font-size: 14px;
              height: 40px;
              &:last-child{
                border-right: 1px solid #000 ;
              }
              &.left{
                text-align: left;
                text-indent: 10px;
              }
            }
          }
        }
      }
</style>
