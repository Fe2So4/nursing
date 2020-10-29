<template>
  <div class="detail-drawer">
    <el-drawer
      :title="type"
      :visible.sync="detailVisible"
      :with-header="false"
      :direction="direction"
      :size="size"
      :before-close="handleClose"
    >
      <detail-pathology
        :select-row="selectRow"
        v-if="detailStatus===1"
      />
      <detail-patient
        :select-row="selectRow"
        v-else
      />
    </el-drawer>
  </div>
</template>
<script>
import DetailPatient from './detail-patient'
import DetailPathology from './detail-pathology'
export default {
  name: 'DetailDrawer',
  data () {
    return {
      direction: 'rtl',
      // detailStatus: '0',
      size: null,
      type: ''
    }
  },
  watch: {
    detailStatus: {
      handler (newVal, old) {
        if (newVal === 1) {
          this.size = '73%'
        } else {
          this.size = '40%'
        }
      },
      immediate: true
    }
  },
  components: {DetailPatient, DetailPathology},
  props: {
    detailVisible: {
      type: Boolean,
      required: true
    },
    detailStatus: {
      type: Number,
      required: true
    },
    selectRow: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    }
  },
  mounted () {
    console.log(this.selectRow)
    if (this.selectRow.orderState === '0') {
      this.type = '手术冰冻详情-未接单'
    } else {
      this.type = '手术冰冻详情-进行中'
    }
  }
}
</script>

<style>

</style>
