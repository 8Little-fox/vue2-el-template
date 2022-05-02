<template>
  <div class="icon-body">
    <el-input v-model="name" style="position: relative;" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
      <i slot="suffix" class="el-icon-search el-input__icon" />
    </el-input>
    <div class="icon-list">
      <div v-for="(item, index) of iconList" :key="index" @click="$emit('selected', item)">
        <svg-icon :icon-class="item" class="icon-list-icon"/>
        <span> {{ item }} </span>
      </div>
    </div>
  </div>
</template>
<script>
  import icons from './requireIcons'
  export default {
    data () {
      return {
        iconList: icons,
        name: ''
      }
    },
    methods: {
      filterIcons () {
        this.iconList = icons
        if (this.name) {
          this.iconList = this.iconList.filter(item => item.includes(this.name))
        }
      },
      reset () {
        this.name = ''
        this.iconList = icons
      }
    }
  }
</script>
<style lang="scss" scoped>
  .icon-body {
    width: 100%;
    padding: 10px;
    .icon-list {
      height: 200px;
      overflow-y: scroll;
      div {
        height: 30px;
        line-height: 30px;
        margin-bottom: -5px;
        cursor: pointer;
        width: 33%;
        float: left;
      }
      .icon-list-icon {
        height: 30px;
        width: 16px;
        margin-right: 10px;
      }
      span {
        display: inline-block;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
</style>
