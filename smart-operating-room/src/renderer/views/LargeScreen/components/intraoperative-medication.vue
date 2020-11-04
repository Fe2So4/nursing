<template>
  <div class="intraoperative-medication">
    <p>{{ item.outDrugItemName }}</p>
    <p>{{ item.interType }}\{{ item.dosagePerTime }}{{ item.minunit }}\{{ item.usage }}</p>
  </div>
</template>

<script>
export default {
  name: 'IntraoperativeMedication',
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
  .intraoperative-medication{
    p{
      color:#444444;
      &:last-child{
        color:#929498;
      }
    }
  }
</style>
