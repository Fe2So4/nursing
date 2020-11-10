<template>
  <div class="invalid-medical-order">
    <p>{{ item.label }}</p>
    <p>{{ item.type }}\{{ item.perTime }}{{ item.unit }}\{{ item.usage }}</p>
  </div>
</template>

<script>
export default {
  name: 'InvalidMedicalOrder',
  data () {
    return {

    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .invalid-medical-order{
    p{
      color:#444444;
      &:last-child{
        color:#929498;
      }
    }
  }
</style>
