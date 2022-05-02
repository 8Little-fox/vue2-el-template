<template>
  <div class="left-bar-head">
    <div class="left-bar-head-wrapper">
      <div v-for="(item) in titles" :key="item.id"
           class="left-bar-head-item"
           :class="{'active': activeId === item.id}"
           @click="activate(item)">
        <span class="text">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftBarHead',
  data () {
    return {
      activeId: 1,
      titles: [
        { id: 1, name: '按业务', label: 'business' },
        { id: 2, name: '按经销商', label: 'dealer' }
      ]
    }
  },
  methods: {
    activate (item) {
      this.activeId = item.id || 1

      this.$emit('activate', this.activeId)
      this.$emit('activated', { ...item || {} })
    }
  }
}
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.left-bar-head {
  position: relative;
  z-index: 9999;
  transform: translateY(1px);
  height: 100%;
}

$topGutter: 6px;

.left-bar-head-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: $topGutter;
}

.left-bar-head-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  line-height: normal;
  border-bottom: 1px solid #CFDAEA;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC, sans-serif;
  font-weight: 400;
  color: #444444;
  background: #F1F2F7;
  cursor: pointer;

  .text {
    z-index: 1;
  }

  &.active {
    position: relative;
    height: calc(100% + #{$topGutter} + 1px);
    margin-top: -$topGutter;
    padding-top: $topGutter;
    border: 1px solid #CFDAEA;
    border-bottom-width: 0;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    background-color: #ffffff;

    &:not(:first-child) {
      &:before {
        @extend .active-skew;
        left: 0;
        transform: skewX(-12deg) translateX(-50%);
        border-left: 1px solid #CFDAEA;
      }
    }

    &:not(:last-child) {
      &:after {
        @extend .active-skew;
        right: 0;
        transform: skewX(12deg) translateX(50%);
        border-right: 1px solid #CFDAEA;
      }
    }
  }
}

.active-skew {
  display: inline-block;
  width: 12px;
  height: 100%;
  content: '';
  position: absolute;
  top: 0;
  z-index: 0;
  background-color: #ffffff;
}
</style>
