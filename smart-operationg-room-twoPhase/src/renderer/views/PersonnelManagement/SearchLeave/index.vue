<template>
  <div class="search-leave-container">
    <myCalendar
      :show-today="true"
      @on-click="showInfo"
    />
  </div>
</template>

<script>
import myCalendar from './components/myCalendar'
export default {

  name: 'SearchLeave',
  methods: {
    handleClick () {
      console.log(122)
      this.$router.push('/personnel/search-leave/personnel-file/files-info-select')
    }
  },
  components: {
    myCalendar
  }
}
</script>

<style lang="scss" scoped>
.search-leave-container {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
