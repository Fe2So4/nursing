<template>
  <span>
    <span v-if="myselect === '1'">
      <span>是</span>
      <span>
        <img
          src="./../../../../assets/isTrue.png"
          alt=""
        >
      </span>
      <span>否</span>
      <span>
        <img
          src="./../../../../assets/isFalse.png"
          alt=""
        >
      </span>
    </span>
    <span v-if="myselect === '2'">
      <span>是</span>
      <span>
        <img
          src="./../../../../assets/isFalse.png"
          alt=""
        >
      </span>
      <span>否</span>
      <span>
        <img
          src="./../../../../assets/isTrue.png"
          alt=""
        >
      </span>
    </span>
    <span v-if="myselect === '3'">
      <span>是</span>
      <span>
        <img
          src="./../../../../assets/isFalse.png"
          alt=""
        >
      </span>
      <span>否</span>
      <span>
        <img
          src="./../../../../assets/isFalse.png"
          alt=""
        >
      </span>
    </span>
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
