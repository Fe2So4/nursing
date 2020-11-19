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
        <td>{{ showData.userName }}</td>
        <td>性别</td>
        <td>{{ showData.gender===0?'男':'女' }}</td>
        <td>技术职称</td>
        <td>{{ showData.technicalTitle }}</td>
        <td>职务</td>
        <td>{{ showData.duty }}</td>
      </tr>
      <tr>
        <td>名族</td>
        <td>{{ showData.nation }}</td>
        <td>出生年月</td>
        <td>{{ showData.birthTime }}</td>
        <td>身份证</td>
        <td>{{ showData.idNumber }}</td>
        <td>参加工作时间</td>
        <td>{{ showData.workTime }}</td>
      </tr>
      <tr>
        <td>原学历</td>
        <td>{{ showData.originalEducateBack }}</td>
        <td>现学历</td>
        <td>{{ showData.presentEducateBack }}</td>
        <td>能级水平</td>
        <td>NO</td>
        <td colspan="3">
          {{ showData.energyLevels }}
        </td>
      </tr>
      <tr>
        <td>籍贯</td>
        <td colspan="4">
          {{ showData.nativePlace }}
        </td>
        <td>宅电</td>
        <td colspan="2">
          {{ showData.homePhone }}
        </td>
      </tr>
      <tr>
        <td>家庭详细地址</td>
        <td colspan="4">
          {{ showData.homeAddress }}
        </td>
        <td>手机</td>
        <td colspan="2">
          {{ showData.mobilePhone }}
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
      <template
        v-for="item in educationList"
      >
        <tr :key="item.id">
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
        <tr :key="item.educateStartTime">
          <td colspan="2">
            {{ item.educateStartTime }} - {{ item.educateEndTime }}
          </td>
          <td colspan="2">
            {{ item.schoolGraduation }}
          </td>
          <td colspan="">
            {{ item.education }}
          </td>
          <td colspan="">
            {{ item.degree }}
          </td>
          <td colspan="2">
            {{ item.learningForm }}
          </td>
        </tr>
      </template>
      <tr>
        <td
          colspan="8"
          class="left"
        >
          职称聘任情况
        </td>
      </tr>
      <template v-for="item in UserWork">
        <tr :key="item.id">
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
        <tr :key="item.userJobName">
          <td colspan="2">
            {{ item.userJobName }}
          </td>
          <td colspan="2">
            {{ item.getAccessTime }}
          </td>
          <td colspan="2">
            {{ item.appointTime }}
          </td>
          <td colspan="2">
            {{ item.desc }}
          </td>
        </tr>
      </template>
      <tr>
        <td
          colspan="8"
          class="left"
        >
          科室轮转情况
        </td>
      </tr>

      <template v-for="item in UserDeptTurn">
        <tr :key="item.id">
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
        <tr :key="item.deptCode">
          <td colspan="2">
            {{ item.deptTurnStartTime }} - {{ item.deptTurnEndTime }}
          </td>
          <td colspan="2">
            {{ item.deptTurnDepartment }}
          </td>
          <td colspan="2">
            {{ item.deptName }}
          </td>
          <td colspan="2">
            {{ item.remark }}
          </td>
        </tr>
      </template>
      <tr>
        <td
          colspan="8"
          class="left"
        >
          手术室科室轮转情况
        </td>
      </tr>
      <template v-for="item in UserOperDeptTurn">
        <tr :key="item.id">
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
        <tr :key="item.deptCode">
          <td colspan="2">
            {{ item.specialistTourTime }}
          </td>
          <td colspan="1">
            {{ item.specialistItinerantWork }}
          </td>
          <td colspan="2">
            {{ item.specialistWashTime }}
          </td>
          <td colspan="1">
            {{ item.specialistWashWork }}
          </td>
          <td colspan="2">
            {{ item.remark }}
          </td>
        </tr>
      </template>

      <tr>
        <td
          colspan="8"
          class="left"
        >
          培训进修情况（>2个月）
        </td>
      </tr>
      <template v-for="item in UserTrainInfo">
        <tr :key="item.id">
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
        <tr :key="item.specialistWashWork">
          <td colspan="2">
            {{ item.trainStartStart }} - {{ item.trainStartEnd }}
          </td>
          <td colspan="2">
            {{ item.trainCondition }}
          </td>
          <td colspan="2">
            {{ item.trainUnit }}
          </td>
          <td colspan="2">
            {{ item.certificationStatus }}
          </td>
        </tr>
      </template>

      <tr>
        <td>获奖情况</td>
        <td colspan="7">
          {{ showData.honorAward }}
        </td>
      </tr>
      <tr>
        <td>论文发表</td>
        <td colspan="7">
          {{ showData.paperPublishing }}
        </td>
      </tr>
      <tr>
        <td>课题申报</td>
        <td colspan="7">
          {{ showData.subjectDeclare }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    showData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      educationList: [], // 教育经历
      UserWork: [], // 工作经历
      UserDeptTurn: [], // 科室经历
      UserOperDeptTurn: [], // 手术科室轮转
      UserTrainInfo: [] // 培训经历查询
    }
  },
  mounted () {
    console.log(this.showData)
    this.getUserEducation()
    this.getUserWork()
    this.getUserDeptTurnInfo()
    this.getUserOperDeptTurnInfo()
    this.getUserTrainInfo()
  },
  methods: {
    // 获取用户教育经历
    getUserEducation () {
      let obj = {
        userCode: this.showData.userCode
      }
      this.$store.dispatch('ReqGetUserEducationInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.educationList = res.data.data
        } else {
          this.openToast('error', '获取教育经历失败')
        }
      })
    },
    // 获取用户任聘经历
    getUserWork () {
      let obj = {
        userCode: this.showData.userCode
      }
      this.$store.dispatch('ReqGetUserAppointInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.UserWork = res.data.data
        } else {
          this.openToast('error', '获取任聘经历失败')
        }
      })
    },
    // 科室轮转经历查询
    getUserDeptTurnInfo () {
      let obj = {
        userCode: this.showData.userCode
      }
      this.$store.dispatch('ReqGetUserDeptTurnInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.UserDeptTurn = res.data.data
        } else {
          this.openToast('error', '获取科室轮转经历失败')
        }
      })
    },
    // 手术科室轮转经历查询
    getUserOperDeptTurnInfo () {
      let obj = {
        userCode: this.showData.userCode
      }
      this.$store.dispatch('ReqGetUserOperDeptTurnInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.UserOperDeptTurn = res.data.data
        } else {
          this.openToast('error', '获取手术科室轮转经历失败')
        }
      })
    },
    // 培训经历查询
    getUserTrainInfo () {
      let obj = {
        userCode: this.showData.userCode
      }
      this.$store.dispatch('ReqgetUserTrainInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.UserTrainInfo = res.data.data
        } else {
          this.openToast('error', '获取培训经历失败')
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
  }
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
