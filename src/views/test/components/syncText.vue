<template>
  <div>
    子组件
    <el-button @click="$emit('update:money', money - 100)">sycn</el-button>
  </div>
</template>
<script>
  export default {
    props: ['money']
  }
</script>
