<template>
  <div class="change-room">
    <el-dialog
      title="选择手术房间"
      :visible.sync="roomVisible"
      width="65%"
      :before-close="handleClose"
    >
      <div class="content">
        <h3>
          <span>楼层</span>
          <el-radio-group
            v-model="floor"
            size="medium"
          >
            <el-radio-button label="6楼" />
            <el-radio-button label="7楼" />
            <el-radio-button label="8楼" />
          </el-radio-group>
        </h3>
        <ul class="clearfix">
          <li
            v-for="item in roomList"
            :key="item"
            :class="{ active: activeIndex === item }"
            @click="handleChangeRoom(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ChangeRoom',
  data () {
    return {
      floor: '6楼',
      roomList: [
        '601',
        '602',
        '603',
        '604',
        '605',
        '606',
        '607',
        '608',
        '609',
        '6pacu'
      ],
      activeIndex: '601'
    }
  },
  props: {
    roomVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleChangeRoom (item) {
      this.activeIndex = item
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.change-room {
  .content {
    font-size: 18px;
    h3 {
      line-height: 76px;
      color: #919398;
      font-weight: unset;
      span {
        margin-right: 14px;
      }
    }
    ul {
      // display: grid;
      height: 450px;
      // grid-template-columns: repeat(auto-fill, 100px);
      // grid-row-gap: 40px;
      // grid-column-gap: 40px;
      background: #f8f8f8;
      // padding: 40px;
      border-radius: 10px;
      li {
        width: 100px;
        float: left;
        cursor: pointer;
        margin: 40px 0 0 40px;
        height: 60px;
        line-height: 60px;
        background: #ffffff;
        border: 1px solid #d6d8e1;
        border-radius: 10px;
        text-align: center;
        &.active {
          background: #d6d8e1;
          color: #0094ff;
        }
      }
    }
  }
  /deep/ .el-dialog__body {
    padding-top: unset;
  }
}
</style>>
