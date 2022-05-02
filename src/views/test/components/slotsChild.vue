<template>
  <div>
      <slot v-for="item of list" :item="item" />
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [1, 2, 3, 4]
      }
    }
  }
</script>
