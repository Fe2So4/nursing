<template>
  <div class="header">
    <div class="title">
      <div class="name">
        {{ ListeningName }}
      </div>
      <div class="num">
        住院号:{{ ListeningNo }}
      </div>
    </div>
    <div class="btnList">
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
        @click="shuaxin"
      >
        刷新
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
      >
        打印
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
      >
        Excle
      </vxe-button>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'NursingHeader',
  data () {
    return {
      UserName: '',
      num: ''
    }
  },
  methods: {
    shuaxin () {
      console.log(this.$route.path)
      let path = this.$route.path
      if (path.includes('security-check')) {
        Bus.$emit('clickShuaXinSecurity', '123')
      } else if (path.includes('nursing-two')) {
        Bus.$emit('clickShuaXinTwo', '123')
      } else if (path.includes('nursing-jichu')) {
        Bus.$emit('clickShuaXinJiChu', '123')
      } else if (path.includes('nursing-teshu')) {
        Bus.$emit('clickShuaXinTeShu', '123')
      }
    }
  },
  computed: {
    // 获取用户姓名
    ListeningName () {
      return this.$store.state['nursing-document-list'].patientName
    },
    // 获取用住院号
    ListeningNo () {
      return this.$store.state['nursing-document-list'].hospitalNo
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
  width: 90px;
  background-color: #EAEEF7;
}
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 40px 0 20px;
  .title {
    min-width: 220px;
    display: flex;
    color: #444444;
    font-weight: 600;
    align-items: center;
    .num {
      margin-left: 20px;
    }
  }
  .btnList {
    display: flex;
    align-items: center;
  }
}
</style>
