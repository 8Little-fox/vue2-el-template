
import { getToken, setToken, removeToken } from '@/utils/auth'
import request from '@/utils/request'
import { mapTreeModules } from '@/utils'
import { resetRouter } from '@/router'

const getDefaultState = () => ({
  token: getToken(),
  routesList: [],
  menuPermission: []
})
const state = getDefaultState()
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_PREMISSION: (state, payload) => {
  //   state.menuPermission = payload.menuPermission
  // },
  SET_ROUTE: (state, routes) => {
    state.routesList = routes
  }
}
const actions = {
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      request.setPath('/auth/login').post(userInfo).then((res) => {
        commit('SET_TOKEN')
        // dispatch('tagsView/delAllViews', {}, { root: true })
        setToken(res.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit }) {
    return new Promise(resolve => {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  },
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      request.setPath('/api/menus/build').get().then((res) => {
        const menuPermission = mapTreeModules()
        commit('SET_ROUTE', res)
        if (res.code === 401) {
          commit('RESET_STATE')
        }
        resolve({ res, menuPermission })
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
