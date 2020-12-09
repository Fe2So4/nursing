<template>
  <div class="line-input">
    <input
      type="text"
      v-model="input"
      :style="{'width':inputWidth}"
      :disabled="disabled"
      @input="handleInput"
    >
  </div>
</template>

<script>
export default {
  name: 'LineInput',
  data () {
    return {
      input: this.value
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    inputWidth: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput () {
      this.$emit('update:value', this.input)
    }
  }
}
</script>

<style lang="scss" scoped>
  .line-input{
    display: inline-block;
    input{
      border: unset;
      border-bottom: 1px solid #e8e8e8;
      outline: unset;
    }
  }
</style>
