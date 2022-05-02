<template>
  <div>
    <Tabs :list="list" v-model="active"/>
    1211
  </div>
</template>

<script>
import Tabs from '../tabs/index.jsx'
export default {
components: {
  Tabs
},
data () {
  return {
    list: [
      { key: 1, name: 'tab1' },
      { key: 2, name: 'tab1' },
      { key: 3, name: 'tab1' },
      { key: 4, name: 'tab1' },
      { key: 5, name: 'tab1' },
      { key: 6, name: 'tab1' },
      { key: 7, name: 'tab1' },
      { key: 8, name: 'tab1' },
      { key: 9, name: 'tab1' },
      { key: 10, name: 'tab1' }
    ],
    active: '1'
  }
}
}
</script>

<style>

</style>
