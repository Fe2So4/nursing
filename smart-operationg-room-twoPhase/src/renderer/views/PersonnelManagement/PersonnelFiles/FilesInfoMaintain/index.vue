<template>
  <!-- 档案信息维护 -->
  <div class="files-info-maintain">
    <div class="fim-top">
      <div class="fim-top-top">
        <div class="fim-top-left">
          <span>预览</span>
          <div class="avater">
            <img
              src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
              alt=""
            >
          </div>
        </div>
        <div class="fim-top-right">
          <el-form
            :inline="true"
            size="mini"
          >
            <el-form-item>
              <!--  -->
              <el-upload
                ref="upload"
                class="upload-demo"
                :action="updataUrl"
                :on-success="handleAvatarSuccess"
                :headers="myHeaders"
                multiple
                :show-file-list="false"
                accept="image/png,image/gif,image/jpg,image/jpeg"
              >
                <el-button
                  type="info"
                  plain
                >
                  上传头像
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                readonly
                v-model="form.userName"
              />
            </el-form-item>
            <el-form-item label="工号">
              <el-input
                readonly
                v-model="form.userCode"
              />
            </el-form-item>
            <el-form-item label="工作部门">
              <!-- <el-input
                readonly
                v-model="form.workDepartmentName"
              /> -->
              <el-select
                readonly
                v-model="form.workDepartmentName"
              >
                <el-option
                  v-for="item in deptList"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input
                readonly
                v-model="form.age"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">
                打印预览
              </el-button>
            </el-form-item>
          </el-form>
          <div class="size">
            60*60
          </div>
        </div>
      </div>
      <p>仅支持JPG、GIF、PNG格式图片文件，且每个文件小于3M！</p>
    </div>
    <div class="fim-bottom">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.showType?item.title:''"
          :name="item.name"
        >
          <template v-if="item.showType">
            <component
              :is-add="isAdd"
              @gotoBack="gotoBack"
              :login-type="loginType"
              @setUserCodeAndSearch="setUserCodeAndSearch"
              @IsShowAnthorInfo="IsShowAnthorInfo"
              @getEducationInfo="getEducationInfo"
              @getUserWork="getUserWork"
              @getUserDeptTurnInfo="getUserDeptTurnInfo"
              @getUserOperDeptTurnInfo="getUserOperDeptTurnInfo"
              @getReqgetUserTrainInfo="getReqgetUserTrainInfo"
              :education-info="educationInfo"
              :user-work="userWork"
              :user-train-info="userTrainInfo"
              :user-code="userCode"
              :user-info="form"
              :user-dept-turn="userDeptTurn"
              :user-oper-dept-turn="userOperDeptTurn"
              :is="item.component"
            />
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getUserToken } from '@/utils/storage'
import ConfigUrl from '@/config/url.js'
import BasicInfo from './components/basic-info'
import TitleInfo from './components/title-info'
import EducationExperience from './components/education-experience'
import DepartmentRotation from './components/department-rotation'
import TrainingFurtherStudy from './components/training-further-study'
export default {
  name: 'FilesInfoMaintain',
  data () {
    return {
      updataUrl: `${ConfigUrl.api.baseURL}/ocis/portfolio/addPictures`,
      myHeaders: {},
      isAdd: '1',
      chuandiForm: {},
      loginType: 0,
      userCode: '',
      educationInfo: [],
      userWork: [],
      userDeptTurn: [],
      userOperDeptTurn: [],
      userTrainInfo: [],
      form: {
        department: '',
        name: '',
        workNo: '',
        age: ''
      },
      activeName: '1',
      deptList: [

      ],
      tabList: [
        {title: '基本信息', component: 'BasicInfo', name: '1', showType: true},
        {title: '教育经历', component: 'EducationExperience', name: '2', showType: false},
        {title: '职称聘任情况', component: 'TitleInfo', name: '3', showType: false},
        {title: '科室轮转情况', component: 'DepartmentRotation', name: '4', showType: false},
        {title: '培训进修', component: 'TrainingFurtherStudy', name: '5', showType: false}
      ]
    }
  },
  components: {
    BasicInfo, EducationExperience, TitleInfo, DepartmentRotation, TrainingFurtherStudy
  },
  mounted () {
    this.myHeaders = {
      Authorization: getUserToken()
    }
    console.log(this.$route.query)
    if (this.$route.query.chuandiType === '0') {
      this.loginType = 0
      this.chuandiForm = this.$route.query.form
      if (!this.IsEmpty(this.$route.query.userCode)) {
        this.isAdd = '1'
        this.IsShowAnthorInfo(true)
        // 维护页点击维护跳转
        this.userCode = this.$route.query.userCode
        // 获取基本信息
        this.searchUserInfo()
        this.getEducationInfo()
        this.getUserWork()
        this.getUserDeptTurnInfo()
        this.getUserOperDeptTurnInfo()
        this.getReqgetUserTrainInfo()
      } else {
        this.isAdd = '0'
        this.IsShowAnthorInfo(false)
        // 维护页点击新增
      }
    } else {
      this.IsShowAnthorInfo(true)
      this.loginType = 1
      this.userCode = '7441'
      // 获取基本信息
      this.searchUserInfo()
      this.getEducationInfo()
      this.getUserWork()
      this.getUserDeptTurnInfo()
      this.getUserOperDeptTurnInfo()
      this.getReqgetUserTrainInfo()
    }

    this.getSelectList('011')
  },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log(URL.createObjectURL(file.raw))
    },
    // 判断是否显示其他信息
    IsShowAnthorInfo (showType) {
      this.tabList.forEach((item, index) => {
        if (index !== 0) {
          item.showType = showType
        }
      })
    },
    setUserCodeAndSearch (userCode) {
      this.userCode = userCode
      this.searchUserInfo()
    },
    // 点击返回信息查询
    gotoBack () {
      console.log(this.$route.query)
      this.$router.push({
        path: '/personnel/personnel-file/files-info-select',
        query: {
          chuandiType: '0',
          userCode: this.$route.query.userCode || '',
          form: {
            name: this.$route.query.form.name || '',
            workTime: this.$route.query.form.workTime || '',
            workTimeStart: this.$route.query.form.workTimeStart || '',
            workTimeEnd: this.$route.query.form.workTimeEnd || '',
            department: this.$route.query.form.department || ''
          }
        }
      })
    },
    // 获取用户基本信息
    searchUserInfo () {
      let obj = {
        userCode: this.userCode
      }
      this.$store.dispatch('ReqGetUserBaseInfo', obj).then(res => {
        if (res.data.code === 200) {
          if (!this.IsEmpty(res.data.data.birthTime)) {
            res.data.data.age = this.utilsGetAge(res.data.data.birthTime)
          } else {
            res.data.data.age = ''
          }
          this.form = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 获取用户教育经历
    getEducationInfo () {
      let obj = {
        userCode: this.userCode
      }
      this.$store.dispatch('ReqGetUserEducationInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.educationInfo = res.data.data
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 获取用户任聘经历
    getUserWork () {
      let obj = {
        userCode: this.userCode
      }
      this.$store.dispatch('ReqGetUserAppointInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.userWork = res.data.data
        } else {
          this.openToast('error', '获取任聘经历失败')
        }
      })
    },
    // 科室轮转经历查询
    getUserDeptTurnInfo () {
      let obj = {
        userCode: this.userCode
      }
      this.$store.dispatch('ReqGetUserDeptTurnInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.userDeptTurn = res.data.data
        } else {
          this.openToast('error', '获取科室轮转经历失败')
        }
      })
    },
    // 手术科室轮转经历查询
    getUserOperDeptTurnInfo () {
      let obj = {
        userCode: this.userCode
      }
      this.$store.dispatch('ReqGetUserOperDeptTurnInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.userOperDeptTurn = res.data.data
        } else {
          this.openToast('error', '获取手术科室轮转经历失败')
        }
      })
    },
    // 培训经历查询
    getReqgetUserTrainInfo () {
      let obj = {
        userCode: this.userCode
      }
      this.$store.dispatch('ReqgetUserTrainInfo', obj).then(res => {
        if (res.data.code === 200) {
          this.userTrainInfo = res.data.data
        } else {
          this.openToast('error', '培训经历查询失败')
        }
      })
    },
    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: num
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          if (num === '011') {
            this.deptList = res.data.data
          }
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    handleClick () {

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
    //
  },
  filters: {
    getAge: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped lang="scss">
.files-info-maintain{
  color: #444444;
  height: 100%;
  display: flex;
  flex-direction: column;
  .fim-top{
    background: #FFFFFF;
    padding: 20px 20px;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    font-size: 14px;
    .fim-top-top{
      display: flex;
      .fim-top-left{
        display: flex;
        margin-right: 20px;
        .avater{
          height: 60px;
          width: 60px;
          margin-left: 10px;
          // background: gray;
        }
      }
      .fim-top-right{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .size{
          line-height:1em;
        }
      }
      .el-form{
        .el-form-item{
          margin-bottom:unset;
        }
      }
    }
    p{
      padding-left:42px;
      font-size: 12px;
      margin-top: 10px;
      color: #888888;
    }
  }
  .fim-bottom{
    flex: 1;
    margin-top: 10px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    border-radius: 5px;
  }
}
/deep/.el-form-item.bitianxiang:not(.is-no-asterisk)>.el-form-item__label:before{
  content:'*'!important;
  color:#f56c6c !important;
  margin-right:4px !important;
}
</style>
