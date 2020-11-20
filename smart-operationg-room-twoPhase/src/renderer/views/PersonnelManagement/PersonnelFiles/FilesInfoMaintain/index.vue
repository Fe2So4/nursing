<template>
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
              <el-button
                type="info"
                plain
              >
                上传头像
              </el-button>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="工号">
              <el-input v-model="form.workNo" />
            </el-form-item>
            <el-form-item label="工作部门">
              <el-select v-model="form.department">
                <el-option
                  v-for="item in deptList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="form.age" />
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
          :label="item.title"
          :name="item.name"
        >
          <component :is="item.component" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import BasicInfo from './components/basic-info'
import TitleInfo from './components/title-info'
import EducationExperience from './components/education-experience'
import DepartmentRotation from './components/department-rotation'
import TrainingFurtherStudy from './components/training-further-study'
export default {
  name: 'FilesInfoMaintain',
  data () {
    return {
      form: {
        department: '',
        name: '',
        workNo: '',
        age: ''
      },
      activeName: '1',
      deptList: [
        {
          label: '部门1',
          value: '1'
        }, {
          label: '部门2',
          value: '2'
        }
      ],
      tabList: [
        {title: '基本信息', component: 'BasicInfo', name: '1'},
        {title: '教育经历', component: 'EducationExperience', name: '2'},
        {title: '职称聘任情况', component: 'TitleInfo', name: '3'},
        {title: '科室轮转情况', component: 'DepartmentRotation', name: '4'},
        {title: '培训进修', component: 'TrainingFurtherStudy', name: '5'}
      ]
    }
  },
  components: {
    BasicInfo, EducationExperience, TitleInfo, DepartmentRotation, TrainingFurtherStudy
  },
  mounted () {
    if (!this.IsEmpty(this.$route.query.userCode)) {
      this.searchUserInfo()
    }
  },
  methods: {
    // 获取用户基本信息
    searchUserInfo () {
      let obj = {
        userCode: this.$route.query.userCode
      }
      this.$store.dispatch('ReqGetUserBaseInfo', obj).then(res => {
        if (res.data.code === 200) {
          console.log(res)
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
</style>
