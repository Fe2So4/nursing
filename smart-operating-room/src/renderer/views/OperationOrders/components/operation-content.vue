<template>
  <el-scrollbar style="height:100%;">
    <div ref="operation" class="operation-body-container">
      <div v-for="item in 50" @dblclick="operationCard(item)" :key="item.id" class="card">
        <div class="header">
          <div class="header-img"></div>
          <div class="mgl10 fontCss">917882</div>
          <div class="mgl15 fontCss">关佩云</div>
        </div>
        <div class="body">
          <div class="body-one boxFlex mgb15">
            <div>
              <span class="tltle-span">楼层</span>
              <span class="mgl10">6</span>
            </div>
            <div>
              <span class="tltle-span">房间</span>
              <span class="mgl10">601</span>
            </div>
          </div>
          <div class="boxFlex mgb15">
            <div>
              <span class="tltle-span">手术</span>
              <span class="mgl10">机器人辅助腹腔惊吓前列腺</span>
            </div>
          </div>
          <div class="boxFlex mgb15">
            <div>
              <span class="tltle-span">台次</span>
              <span class="red mgl10">6</span>
            </div>
            <div>
              <span class="tltle-span">床号</span>
              <span class="mgl10">1</span>
            </div>
          </div>
          <div class="boxFlex mgb15">
            <div>
              <span class="tltle-span">主刀</span>
              <span class="mgl10">夏卫国</span>
            </div>
            <div>
              <span class="blue">泌尿科</span>
              <span class="blue mgl10">8病区</span>
            </div>
          </div>
          <div class="boxFlex mgb15">
            <div>
              <span class="tltle-span">麻醉</span>
              <span class="mgl10">玉琼</span>
            </div>
          </div>
          <div class="boxFlex">
            <div>
              <span class="tltle-span">洗手</span>
              <span class="mgl10">御手洗</span>
            </div>
            <div>
              <span class="tltle-span">巡回</span>
              <span class="mgl10">红豆</span>
            </div>
          </div>
        </div>
      </div>
  </div>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    top="30vh"
    width="520px"
    :before-close="handleClose">
    <div class="dialog-body-span">
      <i class="el-icon-warning icon-gantanghao"></i>
      <span>是否发起派单？</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="dialog-footer-div">
        <el-button size="mini" class="btn" @click="dialogVisible = false">是(Y)</el-button>
        <el-button size="mini" class="btn mgl40"  @click="dialogVisible = false">否(N)</el-button>
      </div>
    </span>
  </el-dialog>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'OperationContent',
  data () {
    return {
      CardList: [
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1},
        {id: 1}
      ],
      dialogVisible: false
    }
  },
  mounted () {
    // let card = this.$refs.operation
    // let num = parseInt(card.offsetWidth / 262)
    // let cardChildren = card.childNodes
    // let length = cardChildren.length
    // for(let i=0;i<length;i++) {
    //   if(i%num == 0) {
    //     console.log(i,num)
    //     cardChildren[i].style.marginLeft='0px'
    //   }
    // }

  },
  methods: {
    handleClose (done) {
      done()
    },
    operationCard (item) {
      this.dialogVisible = true
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scope>
.el-scrollbar__wrap{
  overflow-x: hidden;
}
.btn {
  width: 90px;
  // height: 30px;
  color: #303133;
  background-color: #E9EDF7;
}
.mgl5 {
    margin-left: 5px;
}
.mgl10 {
    margin-left: 10px;
}
.mgl15 {
    margin-left: 15px;
}
.mgl20 {
    margin-left: 20px;
}
.mgl40 {
  margin-left: 40px !important;
}
.mgb15 {
  margin-bottom: 15px;
}

.operation-body-container {
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(auto-fill, 262px);
    // grid-template-rows: 250px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    width: 100%;
    .card {
      cursor: pointer;
      background-color: #fff;
      border-radius: 5px;
      width: 262px;
      height: 250px;
      // margin-bottom: 20px;
      // margin-left: 20px;
      .header {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height: 36px;
        position: relative;
        display: flex;
        align-items: center;
        background-color: #3770E2;
        padding: 10px;
        .header-img {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 8px;
          background-color: #55DEFF;
          border-top-left-radius: 5px;
        }
        .fontCss {
          color: #fff;
        }
      }
      .body {
        padding: 15px 18px;
        .boxFlex {
          margin-bottom: 8px;
          display: flex;
          div {
            flex: 1;
            span{
              font-size: 14px;
            }
            .tltle-span{
              color: #888888;
            }
            .blue {
              color: #3478FF;
            }
            .red {
              font-weight: bold;
              color: #FF3131;
            }
          }
        }
      }
    }
}
.dialog-footer-div {
  display: flex;
  justify-content: center;
}
.dialog-body-span {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-gantanghao {
    font-size: 26px;
    width: 40px;
    color: #3377FF;
  }
}
.vxe-input.is--suffix .vxe-input--inner {
  padding-right: 0.8em;
}
</style>