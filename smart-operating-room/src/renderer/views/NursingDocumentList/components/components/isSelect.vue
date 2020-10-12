<template>
  <span>
    <img
      v-if="propSelect"
      src="./../../../../assets/isFalse.png"
      alt=""
    >
    <img
      v-else
      src="./../../../../assets/isTrue.png"
      alt=""
    >
  </span>
</template>

<script>
export default {
  name: 'IsSelect',
  props: ['propSelect'],
  mounted () {
    console.log()
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
img{
  position: relative;
  top: 2px;
}
</style>
