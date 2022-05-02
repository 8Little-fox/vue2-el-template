<template>
  <div>
    B组件
    <CTest v-bind="$attrs" v-on="$listeners">></CTest>
    <el-divider></el-divider>
  </div>
</template>
<script>
  import CTest from './c'
  export default {
    components: {
      CTest
    },
    mounted () {
      console.log('attrs', this.$attrs)
      console.log('listeners', this.$listeners)
    }
  }
</script>
