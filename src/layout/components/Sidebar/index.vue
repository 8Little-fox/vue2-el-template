<template>
  <div :class="{ 'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"></logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
      >
      <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
import Logo from './Logo.vue'
export default {
  components: {
    SidebarItem,
    Logo
  },
  mounted () {
    console.log(this.permission_routes)
  },
  computed: {
    ...mapGetters([
      'routesList', // 接口菜单返回的路由
      'permission_routes', // 本地配置的路由
      'sidebar'
    ]),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
