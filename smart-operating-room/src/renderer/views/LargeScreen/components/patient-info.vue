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
        <span>
          <el-button @click="handleShowHistory">历史患者</el-button>
        </span>
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
      activeIndex: 2,
      componentInfo: 'CheckInfo'
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
    handleShowHistory () {
      this.$emit('handleShowHistory')
    },
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
@import '@/styles/themes';
.patient-info {
  height: 100%;
  padding: 20px 20px 24px 20px;
  @include theme-property('background-color',background_color_primary);
  // box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  @include theme-property('box-shadow',box_color_shadow);
  border-radius: 5px;
  .tab {
    display: flex;
    ul {
      display: flex;
      flex: 1;
      li {
        padding: 0 17px;
        line-height: 40px;
        // @include theme-property('box-shadow',box_color_shadow);
        @include theme-property('color',font_color_title);
        @include theme-property('background-color',background_color_card);
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
          @include theme-property('color',font_color_primary);
        }
        &.active {
          @include theme-property('background-color',font_color_primary);
          color: #ffffff !important;
        }
        &:hover {
          @include theme-property('background-color',font_color_primary);
          color: #ffffff !important;
        }
      }
    }
    .connect{
      line-height: 40px;
      span{
        font-size: 18px;
        @include theme-property('color',font_color_secondary);
        &:first-child{
          @include theme-property('color',font_color_secondary);
          .el-button{
            @include theme-property('color',font_color_secondary);
            @include theme-property('background-color',background_color_card);
            border: unset;
          }
        }
        &:last-child{
          color:#FF5959 !important;
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
    height: calc(100% - 64px);
  }
}
</style>
