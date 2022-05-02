<template>
  <div class="left-bar-item">
    左侧
  </div>
</template>

<script>
export default {
  name: 'LeftBarItem'
}
</script>

<style scoped lang="scss">
.left-bar-item {
  position: relative;
  height: 100%;
  padding-left: 17px;
  padding-right: 15px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  font-family: PingFangSC-Semibold, PingFang SC, sans-serif;
  cursor: pointer;

  .name {
    position: relative;
    z-index: 1;
    flex: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .name-inner {
      //display: inline-block;
    }
  }

  .count {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    margin-left: auto;
    background-color: #E1E5F2;
    color: #334FA0;
  }

  &.active {
    font-size: 14px;
    font-weight: 600;
    color: #334FA0;
    background: linear-gradient(90deg, rgba(83, 129, 209, 0) 0%, rgba(51, 79, 160, 0.12) 100%);

    .count {
      background-color: #334FA0;
      color: #fff;
    }

    &:after {
      display: block;
      width: 100%;
      height: 100%;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      z-index: 0;
      border-right: 4px solid #334FA0;
    }
  }
}

.checkbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
  height: 100%;
}

.left-bar-item-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
  width: 100%;
  height: 100%;

  img {
    width: 14px;
    margin: 0 10px;
  }

  .jt, .img, .count {
    flex: none;
  }
}

.jt {
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: 8px solid #333;
}

.jt180deg {
  transform: rotate(-90deg);
}

.two {
  padding-left: 20px;
}

.three {
  padding-left: 40px;
}
</style>
