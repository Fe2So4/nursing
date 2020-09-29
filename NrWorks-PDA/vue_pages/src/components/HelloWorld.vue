<template>
  <div class="hello">
    pda测试页面
    哇喀喀喀喀喀喀
    <p>132345sada</p>
    <van-dialog v-model="show" title="标题" show-cancel-button>
      <p>引入vant-UI组件库</p>
    </van-dialog>
    <van-grid>
      <van-grid-item icon="photo-o" text="文字1" />
      <van-grid-item icon="photo-o" text="文字2" />
      <van-grid-item icon="photo-o" text="文字3" />
      <van-grid-item icon="photo-o" text="文字4" />
    </van-grid>
    <van-button type="primary" @click="handleShow">我是一个小按钮啊</van-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      show: false,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleShow () {
      this.show = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  text-align: center;
  font-size: 16px;
  background:green;
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
</style>
