<template>
  <div class="basic-info">
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="姓名">
        <el-input
          clearable
          v-model="userInfo.userName"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          clearable
          v-model="userInfo.gender"
        >
          <el-option
            v-for="item in genderList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="技术职称"
        label-width="100px"
      >
        <el-select
          clearable
          v-model="userInfo.technicalTitle"
        >
          <el-option
            v-for="item in technologyList"
            :key="item.id"
            :label="item.typeName"
            :value="item.typeName"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="人员类别"
        label-width="100px"
      >
        <el-select
          clearable
          v-model="userInfo.personnelCategory"
        >
          <el-option
            v-for="item in personnelCategory"
            :key="item.typeName"
            :label="item.typeName"
            :value="item.typeName"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="民族">
        <el-select
          clearable
          v-model="userInfo.nation"
        >
          <el-option
            v-for="item in ethnicList"
            :key="item.typeName"
            :label="item.typeName"
            :value="item.typeName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出生年月">
        <el-date-picker
          clearable
          v-model="userInfo.birthTime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="参加工作时间"
        label-width="100px"
      >
        <el-date-picker
          clearable
          v-model="userInfo.workTime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="职务"
        label-width="100px"
      >
        <el-select
          clearable
          v-model="userInfo.duty"
        >
          <el-option
            v-for="item in dutyList"
            :key="item.typeName"
            :label="item.typeName"
            :value="item.typeName"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="原学历">
        <el-select
          clearable
          v-model="userInfo.originalEducateBack"
        >
          <el-option
            v-for="item in originalEducateBack"
            :key="item.typeName"
            :label="item.typeName"
            :value="item.typeName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="现学历">
        <el-select
          clearable
          v-model="userInfo.presentEducateBack"
        >
          <el-option
            v-for="item in originalEducateBack"
            :key="item.typeName"
            :label="item.typeName"
            :value="item.typeName"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="能级水平"
        label-width="100px"
      >
        <el-select
          clearable
          v-model="userInfo.energyLevels"
        >
          <el-option
            v-for="item in energyLevelList"
            :key="item.typeName"
            :label="item.typeName"
            :value="item.typeName"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否带教组长"
        label-width="100px"
      >
        <el-select
          clearable
          v-model="userInfo.teachingGroupLeader"
        >
          <el-option
            v-for="item in isTeachingGroupLeader"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="籍贯">
        <el-input
          clearable
          v-model="userInfo.nativePlace"
        />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="userInfo.mobilePhone" />
      </el-form-item>
      <el-form-item
        label="宅电"
        label-width="100px"
      >
        <el-input
          clearable
          v-model="userInfo.homePhone"
        />
      </el-form-item>
      <el-form-item
        label="是否在科"
        label-width="100px"
      >
        <el-select
          clearable
          v-model="userInfo.isInDept"
        >
          <el-option
            v-for="item in isInDept"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="身份证">
        <el-input
          clearable
          v-model="userInfo.idNumber"
          style="width:466px"
        />
      </el-form-item>
      <el-form-item
        label-width="100px"
        label="家庭详细地址"
      >
        <el-input
          clearable
          style="width:466px"
          v-model="userInfo.homeAddress"
        />
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="获奖情况">
        <el-input
          clearable
          type="textarea"
          v-model="userInfo.honorAward"
          style="width:1080px"
        />
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="论文发表">
        <el-input
          clearable
          v-model="userInfo.paperPublishing"
          type="textarea"
          style="width:1080px"
        />
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      size="mini"
      label-width="80px"
    >
      <el-form-item label="课题申报">
        <el-input
          clearable
          v-model="userInfo.subjectDeclare"
          type="textarea"
          style="width:1080px"
        />
      </el-form-item>
    </el-form>
    <div class="option">
      <span>
        <el-button
          type="info"
          size="mini"
          plain
        >选择文件</el-button>
      </span>
      <span><el-button
        type="info"
        size="mini"
        plain
        @click="saveUserInfo"
      >保 存</el-button><el-button
        v-show="loginType === 0"
        type="info"
        size="mini"
        plain
        @click="goback"
      >返 回</el-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  data () {
    return {
      form: {
        department: ''
      },
      deptList: [
        {
          label: '男',
          value: '0'
        }, {
          label: '女',
          value: '1'
        }
      ],
      isTeachingGroupLeader: [
        {
          label: '不是',
          value: 0
        }, {
          label: '是',
          value: 1
        }
      ],
      isInDept: [
        {
          label: '不在科',
          value: 0
        }, {
          label: '在科',
          value: 1
        }
      ],
      genderList: [
        {
          label: '男',
          value: 0
        }, {
          label: '女',
          value: 1
        }
      ],
      technologyList: [],
      personnelCategory: [],
      dutyList: [],
      originalEducateBack: [],
      energyLevelList: [],
      ethnicList: []
    }
  },
  props: {
    userInfo: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    loginType: {
      type: Number,
      required: false,
      default: 1
    },
    isAdd: {
      type: String,
      required: false,
      default: '1'
    }
  },
  mounted () {
    this.getSelectList('005')
    this.getSelectList('001')
    this.getSelectList('002')
    this.getSelectList('010')
    this.getSelectList('004')
    this.getSelectList('009')
  },
  methods: {
    // 点击返回
    goback () {
      this.$emit('gotoBack')
    },

    // 获取数据字典列表
    getSelectList (num) {
      let obj = {
        belongSerialNumber: num
      }
      this.$store.dispatch('ReqgetBaseDictDetailList', obj).then(res => {
        if (res.data.code === 200) {
          if (num === '001') {
            this.personnelCategory = res.data.data
          } else if (num === '005') {
            this.technologyList = res.data.data
          } else if (num === '002') {
            this.dutyList = res.data.data
          } else if (num === '010') {
            this.originalEducateBack = res.data.data
          } else if (num === '004') {
            this.energyLevelList = res.data.data
          } else if (num === '009') {
            this.ethnicList = res.data.data
          }
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击保存
    saveUserInfo () {
      console.log(this.userInfo)

      if (this.isAdd === '0') {
        // 新增
        this.$store.dispatch('ReqaddUserBaseInfo', this.userInfo).then(res => {
          if (res.data.code === 200) {
            this.openToast('success', '保存成功')
            this.$emit('IsShowAnthorInfo', true)
            this.$emit('setUserCodeAndSearch', res.data.data)
          } else {
            this.openToast('error', res.data.msg)
          }
        })
      } else {
        // 修改
        this.$store.dispatch('RequpdateUserBaseInfo', this.userInfo).then(res => {
          if (res.data.code === 200) {
            this.openToast('success', '保存成功')
          } else {
            this.openToast('error', res.data.msg)
          }
        })
      }
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
  .basic-info{
    .el-form{
      .el-form-item{
        margin-bottom:unset;
        padding:8px 0;
      }
      &:nth-child(1){
        background: #F9FAFC;
      }
      &:nth-child(3){
        background: #F9FAFC;
      }
      &:nth-child(5){
        background: #F9FAFC;
      }
    }
    .option{
      display: flex;
      margin-top: 30px;
      justify-content: space-between;
      span{
        &:first-child{
          margin-left: 26px;
        }
        &:last-child{
          margin-right: 280px;
        }
      }
    }
  }
/deep/ .el-select, .el-date-editor.el-input, .el-input.el-input--mini.el-input--suffix{
  width: 178px;
}

</style>
