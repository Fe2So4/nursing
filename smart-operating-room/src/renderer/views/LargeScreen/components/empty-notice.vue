<template>
  <div class="empty-notice">
    <div class="top">
      <i class="el-icon-warning-outline" />
      <span>{{
        currentRoom ? "目前未绑定患者，请在PDA中进行操作！" : "请先选择手术房间"
      }}</span>
      <span
        style="position: absolute; right: 50px; cursor: pointer"
        @click="handleShowHistory"
      >历史患者</span>
    </div>
    <div
      class="bottom"
      v-if="currentRoom"
    >
      <ul>
        <li>
          <div class="li-top">
            <i />
            <span>术前</span>
            <!-- <span>术前-进手术室之前</span> -->
          </div>
          <div class="li-bottom">
            <p>患者病史摘要、当前有效医嘱、化验报告/危急值</p>
            <p>检查报告、房间清洁、设备检查</p>
            <p>术中带药、抗生素用药</p>
          </div>
        </li>
        <li>
          <div class="li-top">
            <i />
            <span>术中</span>
            <!-- <span>术中-进手术室之后</span> -->
          </div>
          <div class="li-bottom">
            <p>安全核查：Sign In、Time Out、Sign Out</p>
            <p>手术器械清点</p>
            <p>护理记录单二、术中病理</p>
          </div>
        </li>
        <li>
          <div class="li-top">
            <i />
            <span>术后</span>
            <!-- <span>术后-离开手术室</span> -->
          </div>
          <div class="li-bottom">
            <p>安全核查：Sign In、Time Out、Sign Out</p>
            <p>手术器械清点</p>
            <p>护理记录单二、术中病理</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('LargeScreen', ['currentRoom'])
  },
  methods: {
    handleShowHistory () {
      this.$emit('handleShowHistory')
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
@import '@/styles/themes';
.empty-notice {
  .top {
    height: 70px;
    // background: #ffffff;
    @include theme-property('background-color',background_color_secondary);
    // box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.15);
    @include theme-property('box-shadow',box_color_shadow_info);
    border-radius: 5px;
    color: #303133;
    font-size: 24px;
    line-height: 70px;
    padding-left: 20px;
    vertical-align: middle;
    border-top: 5px solid;
    @include theme-property('border-color',font_color_primary);
    i {
      @include theme-property('color',font_color_primary);
      font-weight: bold;
    }
  }
  .bottom {
    margin-top: 20px;
    ul {
      display: flex;
      li {
        flex: 1;
        @include theme-property('box-shadow',box_color_shadow_info);
        @include theme-property('background-color',background_color_secondary);
        border-radius: 10px;
        .li-top {
          color: #303133;
          padding-left: 20px;
          i {
            width: 4px;
            display: inline-block;
            height: 18px;
            @include theme-property('background-color',font_color_primary);
            border-radius: 2px;
            vertical-align: middle;
            margin-right: 4px;
          }
          span {
            display: inline-block;
            vertical-align: middle;
          }
          line-height: 58px;
        }
        .li-bottom {
          // color: #919398;
          @include theme-property('color',font_color_secondary);
          padding-left: 20px;
          border-top: 1px solid #e9ebf4;
          p {
            line-height: 40px;
          }
        }
        &:nth-child(2) {
          margin: 0 25px;
        }
      }
    }
  }
}
</style>
