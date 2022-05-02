<template>
  <div class="work">
    <div class="work-left">
      <ul v-for="(item, index) of menuList" :key="index">
        <li
          :class="current === index ? 'active' : ''"
          @click="scrollToTab(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div ref="scrollRef" @scroll="onScroll" class="work-right">
      <div class="work-right-list">
        <Work1 ref="work1Ref" />
        <Work2 ref="work2Ref" />
        <Work3 ref="work3Ref" />
      </div>
    </div>
  </div>
</template>

<script>
import Work1 from './components/work1.vue'
import Work2 from './components/work2.vue'
import Work3 from './components/work3.vue'

export default {
  name: 'AimPoint',
  components: {
    Work1,
    Work2,
    Work3
  },
  data () {
    return {
      menuList: [
        { name: '工作信息1' },
        { name: '工作信息2' },
        { name: '工作信息3' }
      ],
      current: 0,
      scrollTimer: null,
      activeId: 'work1',
      is_show_achievement: true

    }
  },
  mounted () {
    console.log('****', this.$refs.scrollRef)
  },
  methods: {
    /**
     * 滚动到当前选中 tab
     */
    scrollToTab (index) {
      const arr = ['work1', 'work2', 'work3']
      this.current = index
      const scrollEl = this.$refs.scrollRef || undefined
      const el = this.$refs[arr[index] + 'Ref']?.$el || undefined
      if (!scrollEl || !el) {
        return
      }
      this.scrollToY(scrollEl, +el.offsetTop, 260)
    },

    scrollToY (el, posY, duration) {
      if (!el) {
        return
      }

      this.tabNavigateScrolling = true
      const orgY = el.scrollTop
      let y = orgY

      const stepTime = 8
      const durationTime = !(duration % stepTime) ? duration + 1 : duration
      const step = Math.abs(posY - orgY) / (durationTime / stepTime)
      const timer = setInterval(() => {
        if (Math.abs(posY - y) <= step) {
          clearInterval(timer)
          this.tabNavigateScrolling = false
          return
        }

        y += posY - orgY > 0 ? step : -step
        el.scrollTo(0, y)
      }, stepTime)
    },
    onScroll (val) {
      this.locate()
      this.scrollTimer = setTimeout(() => {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = null
        this.locate()
      }, 180)
    },
    locate () {
      const scrollTop = this.$refs.scrollRef.scrollTop || 0
      if (!scrollTop) {
        return
      }
      const refs = [
        this.$refs.work1Ref,
        this.$refs.work2Ref,
        this.$refs.work3Ref
      ]
      refs.forEach((ref) => {
        if (Math.abs(ref.$el.offsetTop - scrollTop) < 120) {
          this.activeId =
            ref.$vnode?.componentOptions?.tag?.toLowerCase() || ''
        }
      })
      const arr = ['work1', 'work2', 'work3']
      this.current = arr.indexOf(this.activeId)
      console.log('this.activeId ', this.current)
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
/*隐藏滚轮*/
display: none;
}
.work {
  display: flex;
  &-left {
    position: absolute;
  }
  &-right {
    overflow-y: auto;
    margin-left: 240px;
    width: calc(100% - 300px);
    text-align: center;
    border: 1px solid #bcccf1;
    &-list {
      position: relative;
    }
  }
}
ul {
  width: 200px;
  text-align: center;
}
li {
  line-height: 50px;
}
.active {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
}
</style>
