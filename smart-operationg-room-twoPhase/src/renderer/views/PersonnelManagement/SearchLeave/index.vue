<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'SearchLeave',
  methods: {
    handleClick () {
      console.log(122)
      this.$router.push('/personnel/search-leave/personnel-file/files-info-select')
    }
  }
}
</script>

<style>

</style>
