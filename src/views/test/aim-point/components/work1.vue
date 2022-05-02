<template>
  <div @click="clickOnScroll" >
    <h1 class="line">工作信息1</h1>
    <ul v-for="(item, index) of list" :key="index">
      <li>{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Work1',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    for (var i = 0; i < 10; i++) {
      this.list.push({ name: `word1-${i}` })
    }
  },
  methods: {
    clickOnScroll () {
      this.$emit('scroll')
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  li {
    line-height: 100px !important;
    border: 1px solid #ccc;
  }
}

.line {
  margin: 40px auto;
  color: #409EFF
}
</style>
