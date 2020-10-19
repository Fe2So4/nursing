<template>
  <el-scrollbar style="height:100%;">
    <div
      ref="operation"
      class="operation-body-container"
    >
      <div
        v-for="item in CardList"
        @dblclick="operationCard(item)"
        @click="selectItem(item)"
        :key="item.id"
        class="card"
        :class="{active: isSelectIndex == item.id}"
      >
        <div class="header">
          <div class="header-img" />
          <div class="mgl10 fontCss">
            917882
          </div>
          <div class="mgl15 fontCss">
            关佩云
          </div>
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
      :visible.sync="dbdialogVisible"
      top="30vh"
      width="520px"
      :before-close="handleClose"
    >
      <div class="dialog-body-span">
        <i class="el-icon-warning icon-gantanghao" />
        <span>是否发起派单？</span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <el-button
            size="mini"
            class="btn"
            @click="dbdialogVisible = false"
          >是(Y)</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="dbdialogVisible = false"
          >否(N)</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="exitdialogVisible"
      top="30vh"
      width="520px"
      :before-close="handleClose"
    >
      <div class="dialog-body-span">
        <i class="el-icon-warning icon-gantanghao" />
        <span>是否发起退单？</span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <el-button
            size="mini"
            class="btn"
            @click="exitdialogVisible = false"
          >是(Y)</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="exitdialogVisible = false"
          >否(N)</el-button>
        </div>
      </span>
    </el-dialog>
    <el-dialog
      title="排班楼层房间修改"
      :visible.sync="selectDialogVisible"
      top="30vh"
      width="520px"
      :before-close="handleClose"
    >
      <div>
        <el-row class="row-width">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              楼层
            </div>
            <div class="mgl20">
              6
            </div>
          </el-col>
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              房间
            </div>
            <div class="mgl20">
              602
            </div>
          </el-col>
        </el-row>
        <el-row class="row-width mgt20">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              病人姓名
            </div>
            <div class="mgl20">
              吴苏川
            </div>
          </el-col>
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              手术名称
            </div>
            <div class="mgl20">
              腹腔镜下袖状胃切除术
            </div>
          </el-col>
        </el-row>
        <el-row class="row-width mgt20">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              主刀
            </div>
            <div class="mgl20">
              姚琪远
            </div>
          </el-col>
        </el-row>
        <el-row class="row-width mgt20">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              洗手
            </div>
            <div class="mgl20">
              <el-select
                size="mini"
                style="width:96px"
                v-model="value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              巡回
            </div>
            <div class="mgl20">
              <el-select
                size="mini"
                style="width:96px"
                v-model="value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="row-width mgt20">
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              楼层
            </div>
            <div class="mgl20">
              <el-select
                size="mini"
                style="width:96px"
                v-model="value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <el-col
            :span="12"
            class="col-line"
          >
            <div class="col-left">
              房间号
            </div>
            <div class="mgl20">
              <el-select
                size="mini"
                style="width:96px"
                v-model="value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <div class="dialog-footer-div">
          <el-button
            size="mini"
            class="btn"
            @click="selectDialogVisible = false"
          >修改</el-button>
          <el-button
            size="mini"
            class="btn mgl40"
            @click="selectDialogVisible = false"
          >取消</el-button>
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
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9}
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      dbdialogVisible: false, // 派单
      exitdialogVisible: false, // 退单
      isSelectItem: [],
      isSelectIndex: 0,
      selectDialogVisible: false, // 修改

      searchCardParams: {
        selectFloor: '',
        getNewDate: ''

      }
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
    // 初始化查询参数
    initSearchCardParams () {

    },
    // 获取内容列表
    getCardList () {
      this.$store.dispatch('ReqOperationOrders', this.searchCardParams)
    },
    // 显示修改弹窗
    changeDialogShow () {
      this.selectDialogVisible = true
    },
    // 显示退单弹窗
    exitDialogShow () {
      this.exitdialogVisible = true
    },
    handleClose (done) {
      done()
    },
    // 显示派单弹窗
    operationCard (item) {
      this.dbdialogVisible = true
    },
    // 点击选中一条记录
    selectItem (item) {
      this.isSelectItem = []
      this.isSelectItem.push(item)
      this.isSelectIndex = item.id
    },
    // 清空点击选中
    clearSelect () {
      this.isSelectItem = []
      this.isSelectIndex = -1
    }
  }
}
</script>

<style lang="scss" scoped>
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
.mgt20 {
  margin-top: 20px;
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
.row-width {
  width: 100%;
}
.col-line {
  display: flex;
}
.col-left {
  width: 60px;
  text-align: right;
}
.active {
  border: 1px solid #366FE2;
  box-shadow: 1px 1px #366FE2;
}
</style>
