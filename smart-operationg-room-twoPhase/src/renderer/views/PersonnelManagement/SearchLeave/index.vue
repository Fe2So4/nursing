<template>
  <<<<<<< HEAD
  <div class="search-leave-container">
    <myCalendar
      :show-today="true"
      @on-click="showInfo"
    />
    =======
    <div class="search-leave">
      <router-view />
      >>>>>>> 6a22e430c47e3ef5734f374dadc5a1896c2add01
    </div>
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
  .search-leave{
    height: calc(100% - 24px);
  }
</style>
