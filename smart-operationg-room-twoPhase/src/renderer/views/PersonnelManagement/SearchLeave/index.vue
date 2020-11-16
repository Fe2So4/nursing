
<template>
  <div class="search-leave-container">
    <div class="search-leave">
      <myCalendar />
    </div>
  </div>
</template>

<script>
import myCalendar from './components/myCalendar'
export default {

  name: 'SearchLeave',
  methods: {

  },
  components: {
    myCalendar
  }
}
</script>

<style lang="scss" scoped>
  .search-leave-container {
    height: 100%;
  }
  .search-leave{
    height: 100%;
  }
</style>
