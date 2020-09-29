<template>
  <div class="invalid-medical-order">
    <p>(JG)注射用头孢呋辛钠</p>
    <p>qd\3克\静滴</p>
  </div>
</template>

<script>
export default {
  name: 'InvalidMedicalOrder',
  data () {
    return {

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
