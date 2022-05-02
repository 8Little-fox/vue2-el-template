<template>
<transition name="move" appear>
  <div class="message" v-if="visible" >
    {{message}}
  </div>
</transition>
</template>

<script>
export default {
name: 'ComponentsMessage',
props: {
  message: {
    type: String,
    default: '我是一段消息提示文本'
  },
  visible: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3000
  }
},
mounted () {
  this.autoClose()
},
methods: {
  // 自动关闭消息组件
  autoClose () {
    if (this.duration !== 0) {
      setTimeout(() => {
        this.close()
      }, this.duration + 800)
    }
  },
  close () {
    // 符合sync 修饰符的自定义事件名称， 父组件可以通过 sync 修饰符监听这个事件
    this.$emit('update:visible', false)
  }
}
}
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  top: 15px;
  left: 0px;
  right: 0px;
  width: 30%;
  height: 40px;
  line-height: 40px;
  padding: 0px 10px;
  text-align: center;
  margin: auto;
  background: rgb(233, 214, 108);
  color: #fff;
  z-index: 10;
  &.move-enter, &.move-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  &.move-enter-active, &.move-leave-active {
    transition: 0.8s linear;
  }
}
</style>
