<template>
  <div>
    <div class="line">工作信息2</div>
    <ul v-for="(item,index) of list" :key="index">
      <li>{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Work2',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    for (var i = 0; i < 10; i++) {
      this.list.push({ name: `word2-${i}` })
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
