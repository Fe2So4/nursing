<template>
  <div class="patient-info">
    <div class="tab">
      <ul>
        <li
          :class="{ active: activeIndex === 1 }"
          @click="handleActive(1)"
        >
          基本信息
          <i
            class="el-icon-caret-bottom"
            v-if="activeIndex === 1"
          />
        </li>
        <li
          :class="{ active: activeIndex === 2 }"
          @click="handleActive(2)"
        >
          检查信息
          <i
            class="el-icon-caret-bottom"
            v-if="activeIndex === 2"
          />
        </li>
        <li
          :class="{ active: activeIndex === 3 }"
          @click="handleActive(3)"
        >
          术后信息
          <i
            class="el-icon-caret-bottom"
            v-if="activeIndex === 3"
          />
        </li>
      </ul>
      <div class="connect">
        <span>服务器通信&nbsp;&nbsp;</span>
        <span :class="{'active':connect}">{{ connect ? 'SUCCESS' : 'CLOSE' }}</span>
      </div>
    </div>
    <div class="content">
      <component :is="componentInfo" />
    </div>
  </div>
</template>

<script>
import BasicInfo from './basic-info'
import CheckInfo from './check-info'
import PostoperativeInfo from './postoperative-info'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      activeIndex: 1,
      componentInfo: 'BasicInfo'
    }
  },
  props: {
    connect: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState('LargeScreen', ['patientInfo'])
  },
  components: {
    BasicInfo,
    CheckInfo,
    PostoperativeInfo
  },
  methods: {
    handleActive (index) {
      this.activeIndex = index
      if (index === 1) {
        this.componentInfo = 'BasicInfo'
      } else if (index === 2) {
        this.componentInfo = 'CheckInfo'
      } else {
        this.componentInfo = 'PostoperativeInfo'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-info {
  height: 100%;
  padding: 20px 20px 30px 20px;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
  .tab {
    display: flex;
    ul {
      display: flex;
      flex: 1;
      li {
        padding: 0 17px;
        line-height: 40px;
        background: #e9edf7;
        border-radius: 5px;
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        i {
          // font-size: 10px;
          position: absolute;
          bottom: -10px;
          left: calc(50% - 8px);
          right: 0;
          margin: 0 auto;
          color: #3377ff;
        }
        &.active {
          background: #3377ff;
          color: #ffffff;
        }
        &:hover {
          background: #3377ff;
          color: #ffffff;
        }
      }
    }
    .connect{
      line-height: 40px;
      span{
        font-size: 18px;
        &:first-child{
          color: #919398;
        }
        &:last-child{
          color:#FF5959;
          font-weight: 600;
        }
        &.active{
          color: #13ce66;
        }
      }
    }
  }
  .content {
    margin-top: 20px;
    height: calc(100% - 70px);
  }
}
</style>>
