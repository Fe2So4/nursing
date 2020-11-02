<template>
  <div class="win-operation">
    <span @click="mini">
      <i class="el-icon-minus" />
    </span>
    <span
      @click="changeWin(2)"
      v-if="type === 2"
      class="zuidahua"
    />
    <span
      v-if="type === 1"
      @click="changeWin(1)"
    >
      <i class="el-icon-copy-document" />
    </span>
    <span @click="close">
      <i class="el-icon-close" />
    </span>
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
    close () {
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
  }
}
</script>

<style lang="scss" scoped>
.win-operation {
  display: flex;
  span {
    display: flex;
    margin-left: 20px;
    cursor: pointer;
    margin-top: 8px;
  }
  .zuidahua {
    margin-top: 10px;
    width: 13px;
    height: 12px;
    border: 2px solid rgba($color: #F7F7F7, $alpha: .6);
  }
}
</style>
