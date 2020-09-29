<template>
  <div class="postoperative-info">
    <postoperative-list />
  </div>
</template>

<script>
import PostoperativeList from './postoperative-list'
export default {
  name: 'PostoperativeInfo',
  data () {
    return {

    }
  },
  components: {
    PostoperativeList
  }
}
</script>

<style lang="scss" scoped>
   .postoperative-info{
    display: flex;
    height: 100%;
  }
</style>>
