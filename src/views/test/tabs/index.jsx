export default {
  name: 'MxTabs',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => ([])
    },
    single: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scrollable: false,
      navOffset: 0
    }
  },
  computed: {
    navStyle () {
      return {
        transform: `translateX(-${this.navOffset}px)`
      }
    }
  },
  mounted () {
    this.handleComputedScroll()
    // 计算是否存在可点击滑动按钮
    window.addEventListener('resize', this.handleComputedScroll, false)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handleComputedScroll, false)
    })
  },
  updated () {
    this.handleComputedScroll()
  },
  methods: {
    scrollPrev () {
      const containerSize = this.$refs.nav.offsetWidth
      const currentOffset = this.navOffset

      if (!currentOffset) return

      const newOffset = currentOffset > containerSize
        ? currentOffset - containerSize
        : 0

      this.navOffset = newOffset || 0
    },
    scrollNext () {
      const navSize = this.$refs.nav.offsetWidth
      const containerSize = this.$refs.container.offsetWidth
      const currentOffset = this.navOffset

      if (navSize - currentOffset <= containerSize) return

      const newOffset = navSize - currentOffset > containerSize * 2
        ? currentOffset + containerSize
        : (navSize - containerSize)

      this.navOffset = newOffset || 0
    },
    handleComputedScroll () {
      const navSize = this.$refs.nav.offsetWidth
      const containerSize = this.$refs.container.offsetWidth

      const scrollable = this.scrollable = containerSize < navSize
      if (scrollable) {
        const currentOffset = this.navOffset
        if (navSize - currentOffset < containerSize) {
          this.navOffset = navSize - containerSize
        }
      }
    },
    handleScrollActive (key) {
      this.$emit('change', key)
      if (!this.scrollable) {
        return
      }
      this.$nextTick(() => {
        const nav = this.$refs.nav
        const activeTab = this.$el.querySelector('.active')
        const navScroll = this.$refs.container
        const activeTabBounding = activeTab.getBoundingClientRect()
        const navScrollBounding = navScroll.getBoundingClientRect()
        const maxOffset = nav.offsetWidth - navScrollBounding.width
        const currentOffset = this.navOffset
        let newOffset = currentOffset

        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left) - activeTab.clientWidth / 2
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right + activeTab.clientWidth / 2
        }
        newOffset = Math.max(newOffset, 0)
        this.navOffset = Math.min(newOffset, maxOffset)
      })
    }
  },
  render (h) {
    const { scrollable, handleScrollActive } = this
    const scrollBtn = scrollable
      ? [
        <span class={['mx-tabs__header-nav', 'mx-tabs__header-nav-left']} onClick={this.scrollPrev}><i class='el-icon-arrow-left' /></span>,
        <span class={['mx-tabs__header-nav', 'mx-tabs__header-nav-right']} onClick={this.scrollNext}><i class='el-icon-arrow-right' /></span>
      ] : null

    return (
      <div class='mx-tabs'>
        <div class={['mx-tabs__header', scrollable && 'mx-tabs-scroll']} >
          { scrollBtn }
          <div class='mx-tabs__scroll' ref='container'>
            <ul class='mx-tabs__list' style={this.navStyle} ref='nav'>
              { this.list.map((item) => (
                <li
                  class={{ 'mx-tabs__list-item': true, active: item.key === this.active }}
                  key={item.key}
                  onClick={() => { handleScrollActive(item.key) }}
                >
                  <span class='mx-tabs__list-name'>{ item.name }</span>
                </li>
              )) }
            </ul>
            { this.$scopedSlots.tools?.() }
          </div>
        </div>
        <section class={[this.position, 'mx-tabs__content']}>
          { this.single ? this.$scopedSlots.default?.() : (this.active && this.$scopedSlots[this.active]?.()) }
        </section>
      </div>
    )
  }
}
