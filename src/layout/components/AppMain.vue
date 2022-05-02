<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div v-if="$store.state.settings.showFooter" id="el-main-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> ⋅ </span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 90px);
  position: relative;
  overflow: hidden;
  background-color: #fff;
  div:first-child {
    padding: 30px 20px;
    height: 100%;
    overflow: auto;
  }
}
.fixed-header+.app-main {
  padding-top: 50px;
  padding: 70px 20px 45px 20px;
}
#el-main-footer {
  background: none repeat scroll 0 0 white;
  border-top: 1px solid #e7eaec;
  overflow: hidden;
  padding: 10px 6px 0 6px;
  height: 33px;
  font-size: 0.7rem !important;
  color: #7a8b9a;
  letter-spacing: 0.8px;
  font-family: Arial, sans-serif !important;
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100%;
}
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
  </style>
