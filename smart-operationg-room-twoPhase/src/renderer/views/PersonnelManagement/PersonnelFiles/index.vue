<template>
  <div class="personnel-files">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'PersonnelFiles'
}
</script>

<style lang="scss" scoped>
 .personnel-files{
   height: calc(100% - 24px);
 }
</style>
