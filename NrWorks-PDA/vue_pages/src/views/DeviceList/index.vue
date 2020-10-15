<template>
  <div class="device-list">
    <van-nav-bar
      title="转运交接单"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      right-text="运送"
    >
    </van-nav-bar>
    <div class="patient-card">
      <div class="content">
          <div class="left">
            <span>808</span>
          </div>
          <div class="right">
            <p>魏鑫 12床 91166492</p>
            <p>主刀 陈疾仵 麻醉 王海莲</p>
            <p>巡回 —— 洗手 余琼</p>
          </div>
      </div>
    </div>
    <div class="list">
      <!-- <van-cell-group>
        <van-cell title="核查时间" value="2020-10-12 09:48"></van-cell>
        <van-cell title="麻醉医师签名" title-class="sign-title"></van-cell>
        <van-cell title="手术医师签名" title-class="sign-title"></van-cell>
        <van-cell title="手术护士签名" title-class="sign-title"></van-cell>
      </van-cell-group> -->
      <van-tree-select height="100%" :items="items" :main-active-index.sync="active" @click-nav="handleChange">
        <template slot="content">
          <div v-for="item in items" :key="item.active" class="list-item" v-show="item.active===active">
            <p v-if="active===item.active">
              <van-cell-group>
                <van-cell title="手术敷料、基本器械、物品清点" value="已清点" title-class="first-cell" value-class="value-cell">
                  <!-- <template #right-icon>
                    <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/>
                  </template> -->
                </van-cell>
              </van-cell-group>
              <van-cell-group>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
                <van-cell title="腔脑室外引流管" value="已清点" title-class="first-cell">
                  <template #right-icon>
                    <!-- <van-switch v-model="checked" active-color="#3478FF" inactive-color="#E8E8E8" @change="handleChange"/> -->
                    <!-- <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" disable-input /> -->
                    <van-stepper v-model="stepper" theme="round" button-size="50px" input-width="90px" />
                  </template>
                </van-cell>
              </van-cell-group>
            </p>
          </div>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      input: '',
      showFullSkin: false,
      value1: '',
      option: [
        { text: 'PACU', value: 0 },
        { text: '病房', value: 1 },
        { text: 'ICU病房', value: 2 },
        { text: '急诊', value: 3 },
        { text: '离院', value: 4 }
      ],
      active: 0,
      stepper: '',
      items: [{ text: '术前', active: 0 }, { text: '术中(一)', active: 1 },
        { text: '术中(二)', active: 2 }, { text: '术中(三)', active: 3 }, { text: '术中(四)', active: 4 },
        { text: '体腔关闭前', active: 5 }, { text: '体腔关闭后', active: 6 }, { text: '皮肤缝合后', active: 7 }]
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

    },
    // handleChange () {
    //   this.showFullSkin = !this.showFullSkin
    // },
    handleChange (index) {
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .device-list{
    height: 100%;
    .van-nav-bar{
      height: 100px;
      background: linear-gradient(90deg, #666666, #303030);
      /deep/ .van-nav-bar__title{
        color:#ffffff;
        font-size: 34px;
        line-height: 100px;
      }
      /deep/ .van-nav-bar__text{
        color: #ffffff;
        font-size: 30px;
      }
      /deep/ .van-icon-arrow-left{
        color: #ffffff;
        font-size: 36px;
      }
    }
    .patient-card{
      padding: 15px 20px;
      .content{
        background: #ffffff;
        display: flex;
        height: 194px;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .left{
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            width: 140px;
            height: 80px;
            background: #3478FF;
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.15);
            border-radius: 0px 40px 40px 0px;
            line-height: 80px;
            text-align: center;
            font-size: 42px;
            font-weight: bold;
            color: #ffffff;
          }
        }
        .right{
          flex: 1;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p{
            font-size: 26px;
            color: #7F7F7F;
            &:nth-child(1){
              font-size: 30px;
              color: #2E2E2E;
            }
            &:nth-child(2){
              margin:30px 0;
            }
          }
        }
      }
    }
    .list{
      height:calc(100% - 324px);
      overflow-y: auto;
    }
    .van-cell{
      line-height: 94px;
      color: #2E2E2E;
      font-size: 30px;
      &::after{
        border-color: #E2E2E2;
      }
      .first-cell{
        flex: unset;
      }
      .left-title{
        flex: unset;
      }
      .value-cell{
        color: #10C15B;
      }
      .right-value{
        .van-field{
          padding-top: 0;
          padding-bottom: 0;
        }
      }
    }
    .van-cell-group{
      &:last-child{
        height: calc(100% - 114px);
        overflow-y: auto;
        // margin-top: 15px;
        // margin-bottom: 15px;
        // .van-cell{
        //   .van-cell__value{
        //     color: #7F7F7F;
        //   }
        //   .sign-title{
        //     color: #32db64;
        //   }
        // }
      }
    }
    .van-tree-select{
      .van-sidebar{
        width: 160px;
      }
      .van-sidebar-item{
        line-height: unset;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
      }
      .van-tree-select__nav{
        flex: unset;
        background: #F2F2F2;
        display: flex;
        // line-height: unset;
        flex-direction: column;
        .van-tree-select__nav-item{
          // line-height: 104px;
          font-size: 34px;
          color: #2E2E2E;
          // padding: 0;
          padding: 12px 0 12px 16px;
          // padding-left: 16px;
          // flex: 1;
        }
      }
      .van-sidebar-item--select{
        background: #3377FF;
        color: #ffffff;
        &::before{
          width: 0;
        }
      }
      .van-tree-select__content{
        flex: 1;
        overflow-y: unset;
      }
      .list-item{
        height: 100%;
        p{
          height: 100%;
        }
      }
    }
    .van-stepper{
      /deep/ .van-stepper__input{
        font-size: 30px;
      }
      /deep/ .van-stepper__minus{
        color: #3377FF;
        border-color: #3377FF;
        border: 2px solid #3377FF;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);
        &::before{
          height: 3px;
        }
      }
      /deep/ .van-stepper__plus{
        background-color: #3377FF;
        &::before{
          height: 3px;
        }
        &::after{
          width: 3px;
        }
      }
    }
  }
</style>
