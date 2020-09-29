<template>
  <div class="patient-card clearfix">
    <div class="left">
      <div
        class="card"
        @click="handleChangeRoom"
      >
        706
        <i />
      </div>
    </div>
    <div class="right">
      <el-row>
        <el-col :span="6">
          患者信息：<span class="value">陈爱云 80岁 16病区/19床 91161317</span>
        </el-col>
        <el-col :span="6">
          主刀医师：<span class="value">父的量</span>
        </el-col>
        <el-col :span="6">
          麻醉医师：<span class="value">固化话</span>
        </el-col>
        <el-col
          :span="6"
          style="text-align:right;padding-right:20px;"
        >
          语音开关：<span class="value">
            <el-switch
              v-model="voice"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </span>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col :span="6">
          手术信息：<span class="value">胰尾癌根治术 全麻</span>
        </el-col>
        <el-col :span="6">
          第一助手：<span class="value">蒋永剑</span>
        </el-col>
        <el-col :span="6">
          巡回护士：<span class="value">黄申慧</span>
        </el-col>
        <el-col :span="6">
          洗手护士：<span class="value">黄申慧</span>
        </el-col>
      </el-row>
      <div
        class="pc-option"
        @click="handleShowStep"
      >
        <i class="el-icon-bottom" />
      </div>
    </div>
    <change-room
      :room-visible="roomVisible"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import ChangeRoom from './change-room'
export default {
  name: 'PatientCard',
  data () {
    return {
      roomVisible: false,
      voice: true
    }
  },
  components: {
    ChangeRoom
  },
  methods: {
    handleChangeRoom () {
      this.roomVisible = true
    },
    handleClose () {
      this.roomVisible = false
    },
    handleShowStep () {
      this.$emit('handleShowStep')
    }
  }
}
</script>

<style scoped lang="scss">
  .patient-card{
    height: 110px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
    border-radius: 5px;
    display: flex;
    .left{
      overflow:hidden;
      text-align: center;
      // float: left;
      .card{
        width: 160px;
        margin:10px;
        height: 90px;
        background: #E9EDF7;
        border: 2px solid #CDD7F1;
        border-radius: 10px;
        color: #3377FF;
        line-height: 90px;
        font-size: 40px;
        font-weight: bold;
        position: relative;
        cursor: pointer;
        i{
          position: absolute;
          right: 10px;
          bottom: 10px;
          border-bottom: 10px solid #7F99BC;
          border-left: 10px solid transparent;
        }
      }
    }
    .right{
      // float: left;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #91949A;
      .value{
        color:#444444;
      }
      .pc-option{
        position: absolute;
        cursor: pointer;
        right: 10px;
        bottom: -10px;
        height: 20px;
        font-size: 14px;
        background: #ffff;
        width: 20px;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        border:1px solid #91949a;
      }
    }
  }
</style>
