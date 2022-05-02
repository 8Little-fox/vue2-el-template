<template>
  <div>
    数据双向绑定组件： {{message}}
    <Input v-model="message"/>
     <div id="box">
        <div v-color="'red'">加油，武汉!</div>
    </div>
    <div v-drag style="height:500px;width:500px" v-empty="emptyValue"> 自定义指令缺省图</div>
    <el-button v-debounce="geCount">防抖指令不传参时测试</el-button>
    <el-button v-debounce="[$ev => { geCount($ev, 4)}, 500, true]">防抖指令传参，且获取事件的测试</el-button>
    <el-button v-debounce="[() => { geCount(4)}, 500, true]">防抖指令传参，不获取事件的测试</el-button>

  </div>
</template>

<script>
import Input from './components/Input.vue'
export default {
  components: {
    Input
  },
  name: 'Directive',
  data () {
    return {
      message: '',
      emptyValue: {
        content: '暂无列表',
        img: require('@/assets/empty.jpg'),
        visible: true
      }
    }
  },
  methods: {
    geCount ($ev, num) {
      console.log($ev, num)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
