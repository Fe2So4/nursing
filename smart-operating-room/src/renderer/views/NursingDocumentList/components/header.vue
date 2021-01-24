<template>
  <div class="nursing-documentlist-header">
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
        @click="headerHandle('1')"
      >
        刷 新
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
        @click="headerHandle('2')"
      >
        打 印
      </vxe-button>
      <vxe-button
        class="btn"
        size="mini"
        status="my-purple"
        @click="headerHandle('3')"
      >
        PDF
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
    headerHandle (type) {
      console.log(this.$route.path)
      let path = this.$route.path
      if (type === '1') {
        if (path.includes('security-check')) {
          Bus.$emit('clickShuaXinSecurity', '1')
        } else if (path.includes('nursing-two')) {
          Bus.$emit('clickShuaXinTwo', '1')
        } else if (path.includes('nursing-jichu')) {
          Bus.$emit('clickShuaXinJiChu', '1')
        } else if (path.includes('nursing-teshu')) {
          Bus.$emit('clickShuaXinTeShu', '1')
        } else if (path.includes('nursing-transit-transfer')) {
          Bus.$emit('clickShuaXinTransit', '1')
        }
      } else if (type === '2') {
        if (path.includes('security-check')) {
          Bus.$emit('clickShuaXinSecurity', '2')
        } else if (path.includes('nursing-two')) {
          Bus.$emit('clickShuaXinTwo', '2')
        } else if (path.includes('nursing-jichu')) {
          Bus.$emit('clickShuaXinJiChu', '2')
        } else if (path.includes('nursing-teshu')) {
          Bus.$emit('clickShuaXinTeShu', '2')
        } else if (path.includes('nursing-transit-transfer')) {
          Bus.$emit('clickShuaXinTransit', '2')
        }
      } else {
        if (path.includes('security-check')) {
          Bus.$emit('clickShuaXinSecurity', '3')
        } else if (path.includes('nursing-two')) {
          Bus.$emit('clickShuaXinTwo', '3')
        } else if (path.includes('nursing-jichu')) {
          Bus.$emit('clickShuaXinJiChu', '3')
        } else if (path.includes('nursing-teshu')) {
          Bus.$emit('clickShuaXinTeShu', '3')
        } else if (path.includes('nursing-transit-transfer')) {
          Bus.$emit('clickShuaXinTransit', '3')
        }
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
  background-color: #eaeef7;
}
.nursing-documentlist-header {
  box-shadow: 0px 0px 5px 0px rgba(5, 25, 51, 0.05);
  border-radius: 5px;
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
/deep/ .vxe-button--content,
.vxe-button--icon,
.vxe-button--loading-icon {
  vertical-align: unset;
}
</style>
