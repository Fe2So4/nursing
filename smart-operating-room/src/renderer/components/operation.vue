<template>
  <div class="win-operation">
    <div class="win-operation-left">
      <span
        class="span"
        @click="mini"
      >
        <i class="el-icon-minus" />
      </span>
      <span
        @click="changeWin(2)"
        v-if="type === 2"
        class="zuidahua span"
      />
      <span
        class="span"
        v-if="type === 1"
        @click="changeWin(1)"
      >
        <i class="el-icon-copy-document" />
      </span>
      <span
        class="span"
        @click="close"
      >
        <i class="el-icon-close" />
      </span>
    </div>
  </div>
</template>

<script>
const { BrowserWindow } = require('electron').remote
export default {
  data () {
    return {
      type: 1
    }
  },
  methods: {
    theme (type) {
      // this.$store.commit('upDate', { themeType: type })
      window.document.documentElement.setAttribute('data-theme', type)
    },
    close () {
      localStorage.removeItem('userName')
      const win = BrowserWindow.getFocusedWindow()
      win.close()
    },
    mini () {
      const win = BrowserWindow.getFocusedWindow()
      win.minimize()
    },
    changeWin (data) {
      const win = BrowserWindow.getFocusedWindow()
      if (data === 2) {
        this.type = 1
        win.maximize()
      } else {
        this.type = 2
        win.unmaximize()
      }
    }
  },
  mounted () {
    if (document.body.offsetWidth < window.screen.availWidth) {
      this.type = 2
    }
    window.document.documentElement.setAttribute('data-theme', 'light')
  }
}
</script>

<style lang="scss" scoped>
.win-operation {
  .win-operation-left {
    display: flex;
    .span {
      display: flex;
      margin-left: 20px;
      cursor: pointer;
      margin-top: 8px;
    }
    .zuidahua {
      margin-top: 10px;
      width: 13px;
      height: 12px;
      border: 2px solid rgba($color: #f7f7f7, $alpha: 0.6);
    }
  }
}
</style>
