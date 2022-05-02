<template>
  <div class="excel">
    <OneExcel/>
    <el-divider direction="vertical"></el-divider>
    <DoubleExcel/>
  </div>
</template>
<script>
import OneExcel from './OneExcel.vue'
import DoubleExcel from './DoubleExcel.vue'

export default {
  components: {
    OneExcel,
    DoubleExcel
  }
}
</script>
<style lang="scss" scoped>
.excel {
  // display: flex;
}
</style>
