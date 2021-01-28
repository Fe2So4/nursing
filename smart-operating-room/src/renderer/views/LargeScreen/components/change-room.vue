<template>
  <div class="change-room">
    <el-dialog
      title="选择手术房间"
      :visible.sync="roomVisible"
      width="65%"
      :before-close="handleClose"
    >
      <div
        slot="title"
        class="title"
      >
        <i /><span>选择手术间</span>
      </div>
      <div class="content">
        <h3>
          <span>楼层</span>
          <el-radio-group
            @change="changeFloor"
            v-model="floor"
            size="medium"
          >
            <el-radio-button
              :label="item.floorName"
              v-for="item in floorList"
              :key="item.floorName"
            />
          </el-radio-group>
        </h3>
        <ul class="clearfix">
          <li
            v-for="item in roomList"
            :key="item.roomCode"
            :class="{ active: activeIndex === item.roomCode }"
            @click="handleChangeRoom(item)"
          >
            {{ item.roomCode }}
          </li>
        </ul>
      </div>
      <div class="bottomBtn">
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="handleClose"
            size="medium"
          >取 消</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="saveChangeRoom"
          >确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {setCurrentRoom} from '@/utils/storage'
export default {
  name: 'ChangeRoom',
  data () {
    return {
      floorList: [],
      floor: '',
      roomList: [],
      activeIndex: '',
      selectIndex: '',
      selectfloor: '',
      type: 0
    }
  },
  props: {
    roomVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapActions('LargeScreen', ['largefloorList', 'laretRoomByFloor', 'setCurrentRoom']),
    // 获取楼层列表
    getFloorList () {
      this.largefloorList().then(res => {
        if (res.data.code === 200) {
          this.floorList = res.data.data
          this.floor = this.floorList[0].floorName
          this.selectfloor = this.floor
          this.getFloorRoom()
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    // 点击切换楼层列表
    changeFloor () {
      this.getFloorRoom()
    },
    // 获取楼层对应的房间号
    getFloorRoom () {
      let text = this.floor.replace(/楼/ig, '')
      let obj = {
        floorNo: text
      }
      this.laretRoomByFloor(obj).then(res => {
        if (res.data.code === 200) {
          this.roomList = res.data.data
          // if (this.type === 0) {
          //   this.setCurrentRoom(this.roomList[0].roomCode)
          // }
          this.type += 1
          if (!this.IsEmpty(this.selectIndex)) {
            this.activeIndex = this.selectIndex
          } else {
            this.handleChangeRoom(this.roomList[0])
          }
        } else {
          this.openToast('error', res.data.msg)
        }
      })
    },
    handleClose () {
      this.floor = this.selectfloor
      if (!this.IsEmpty(this.selectIndex)) {
        this.activeIndex = this.selectIndex
      } else {
        this.handleChangeRoom(this.roomList[0])
      }
      this.$emit('update:roomVisible', false)
    },
    handleChangeRoom (item) {
      this.activeIndex = item.roomCode
    },
    saveChangeRoom () {
      if (this.floor.split('')[0] !== this.activeIndex.split('')[0]) {
        this.$alert('请先选择房间,房间号不能为空')
        return false
      }
      if (this.IsEmpty(this.activeIndex)) {
        this.$alert('请先选择房间,房间号不能为空')
        return false
      }
      this.selectfloor = this.floor
      this.selectIndex = this.activeIndex
      setCurrentRoom(this.selectIndex)
      this.setCurrentRoom(this.selectIndex)
      this.handleClose()
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
  },
  mounted () {
    this.getFloorList()
  },
  computed: {
    // 监听房间切换
    Listeningfloor () {
      return this.floor
    }
  },
  watch: {
    Listeningfloor: function (newd, oldV) {
      if (!this.IsEmpty(newd)) {
        this.getFloorRoom()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/themes';
.change-room {
  .content {
    font-size: 18px;
    h3 {
      line-height: 76px;
      @include theme-property('color',font_color_secondary);
      font-weight: unset;
      span {
        margin-right: 14px;
      }
      .el-radio-group{
        /deep/ .el-radio-button__inner{
          @include theme-property('color',font_color_secondary);
          @include theme-property('border-color',background_color_info_item);
          @include theme-property('background-color',background_color_info_item);
        }
        /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
          color: #ffffff !important;
          @include theme-property('border-color',font_color_primary);
          @include theme-property('background-color',font_color_primary);
          @include theme-property('box-shadow',radio_shadow);
        }
      }
    }
    ul {
      // display: grid;
      height: 450px;
      // grid-template-columns: repeat(auto-fill, 100px);
      // grid-row-gap: 40px;
      // grid-column-gap: 40px;
      @include theme-property('background',background_color_change_room);
      // padding: 40px;
      border-radius: 10px;
      li {
        width: 100px;
        float: left;
        cursor: pointer;
        margin: 40px 0 0 40px;
        height: 60px;
        line-height: 60px;
        @include theme-property('background-color',background_color_room_item);
        border: 1px solid;
        @include theme-property('border-color',border_color_room);
        @include theme-property('color',font_color_secondary);
        border-radius: 10px;
        text-align: center;
        &.active {
          @include theme-property('background-color',background_color_room_active);
          @include theme-property('color',font_color_room_active);
        }
        &:hover {
          @include theme-property('background-color',background_color_room_active);
          @include theme-property('color',font_color_room_active);
        }
      }
    }
  }
  /deep/ .el-dialog__body {
    padding-top: unset;
  }
  /deep/ .el-dialog__header{
    border-bottom:1px solid;
    @include theme-property('border-bottom-color',border_color_info);
  }
  /deep/ .el-dialog, .el-pager li{
    @include theme-property('background-color',background_color_primary);
  }
  .title{
    i{
      width: 4px;
      height: 18px;
      @include theme-property('background-color',font_color_primary);
      border-radius: 2px;
      display: inline-block;
      vertical-align: middle;
    }
    span{
      display: inline-block;
      margin-left: 12px;
      font-size: 20px;
      font-weight: 600;
      @include theme-property('color',font_color_title);
      vertical-align: middle;
    }
  }
}
.bottomBtn {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  .el-button--primary{
    @include theme-property('background-color',font_color_primary);
    @include theme-property('border-color',font_color_primary);
  }
}
</style>>
