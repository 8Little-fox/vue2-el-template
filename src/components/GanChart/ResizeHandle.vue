<template>
  <div class="resize-handle"
       :style="{
          left: left + 'px',
       }"
       @mousedown="setResizable"/>
</template>

<script>
export default {
  name: 'ResizeHandle',
  model: {
    prop: 'left',
    event: 'change'
  },
  props: {
    left: { type: Number, default: 0 }
  },
  watch: {
    resizable: {
      immediate: true,
      handler (val) {
        this.$emit('resizable', val)
      }
    }
  },
  data () {
    return {
      resizable: false,
      originMouseX: 0
    }
  },
  mounted () {
    document.addEventListener('mouseup', this.cancelResizable, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
  },
  beforeDestroy () {
    document.removeEventListener('mouseup', this.cancelResizable)
    document.removeEventListener('mousemove', this.onMouseMove)
  },
  methods: {
    setResizable (evt) {
      if (evt) {
        this.originMouseX = evt.clientX
      }

      this.resizable = true
    },
    cancelResizable () {
      this.resizable = false
      this.originMouseX = 0
    },

    onMouseMove (evt) {
      if (this.resizable) {
        const left = this.left + evt.clientX - this.originMouseX

        if (left <= 150) {
          this.$emit('change', 150)
          return
        }

        if (left >= 1050) {
          this.$emit('change', 1050)
          return
        }

        this.$emit('change', left)
        this.originMouseX = evt.clientX
      }
    }
  }
}
</script>

<style scoped lang="scss">
.resize-handle {
  position: absolute;
  top: 50%;
  left: 240px;
  transform: translateY(-50%);
  width: 7px;
  height: 68px;
  // background-image: url("@/assets/handle_icon.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &:hover {
    cursor: ew-resize;
  }
}
</style>
