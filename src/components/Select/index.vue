<template>
  <div>子组件</div>
</template>

<script>
import request from '@/utils/request3'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleGetTable()
    })
  },
  methods: {
    async handleGetTable () {
      await request
        .setPath('/api/roles')
        .get({ page: 1 }, true)
        .then((res) => {})
    }
  }
}
</script>

<style>
</style>
