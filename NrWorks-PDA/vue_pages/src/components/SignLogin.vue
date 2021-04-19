<template>
  <div>
    <van-popup round :style="{ width: '85%',height: '240px' }" v-model="show" bind:close="onClose" :close-on-click-overlay="false">
      <van-cell-group :border="false">
        <van-cell class="buttons-cell" style="margin-bottom:10px">
          {{signTitle || ''}}
        </van-cell>
        <van-cell style="font-size:18px">
          <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          icon="question-o"
          placeholder="请输入用户名"
          bind:click-icon="onClickIcon"
        />
        </van-cell>

        <van-cell style="font-size:18px">
          <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
        </van-cell>
        <van-cell class="buttons-cell" :border="false" style="margin-top:20px">
          <van-button round color="#FF4E4E" style="margin-right:10px;width:100px;height:40px;font-size:18px" @click="onClose" icon="cross">取消</van-button>
          <van-button round icon="success" type="primary" style="margin-left:10px;width:100px;height:40px;font-size:18px" @click="handleSave">确定</van-button>
        </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import {checkSendDoctor} from '@/api/login'
import request from '@/utils/request'
export default {

  data () {
    return {
      username: '',
      password: ''
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    signTitle: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted () {},
  methods: {
    handleSave () {
      return request({
        method: 'post',
        url: checkSendDoctor,
        params: {
          loginName: this.username,
          password: this.password
        }
      }).then(
        (res) => {
          if (res.data.code === 200) {
            this.onClose()
            this.$emit('handleSubmit', res.data.data.userName)
          } else {
            return Promise.reject(new Error(res.data.msg))
          }
        },
        e => {
          return Promise.reject(new Error('网络异常，请稍后尝试'))
        }
      )
    },
    onClose () {
      this.username = ''
      this.password = ''
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup--center {

}
.van-cell {
    line-height: 60px;
    color: #2e2e2e;
    font-size: 30px;
    .first-cell {
      flex: unset;
    }
    .left-title {
      flex: unset;
      white-space: nowrap;
    }
    .right-value {
      .van-field {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .van-field {
      font-size: 36px;
    }
  }
.van-cell.buttons-cell .van-cell__value--alone{
  text-align: center;
}
</style>
