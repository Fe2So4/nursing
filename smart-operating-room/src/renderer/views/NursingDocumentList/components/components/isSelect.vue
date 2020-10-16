<template>
  <span>
    <img
      v-if="myselect"
      src="./../../../../assets/isTrue.png"
      alt=""
    >
    <img
      v-else
      src="./../../../../assets/isFalse.png"
      alt=""
    >
  </span>
</template>

<script>
export default {
  name: 'IsSelect',
  props: ['myselect'],
  mounted () {
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
