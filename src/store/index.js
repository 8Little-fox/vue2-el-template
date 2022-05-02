import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import app from './modules/app'
import user from './modules/user'
import common from './modules/common'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
    app,
    permission,
    user,
    tagsView,
    common
  },
  getters
})
