/**
 *  routesList 接口返回的菜单路由
 *  permission_routes  本地配置的路由
 */

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routesList: state => state.user.routesList,
  permission_routes: state => state.permission.routes,
  cachedViews: state => state.tagsView.cachedViews,
  calendarOptions: state => state.calendarOptions
}
export default getters
