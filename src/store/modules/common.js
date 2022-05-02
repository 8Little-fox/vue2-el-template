const state = {
  calendarOptions: [], // 日历数据
  trainingObj: {}
}
const mutations = {
  CALENDAR_OPTIONS: (state, options) => {
    state.calendarOptions = options
  }
}
const actions = {
  setCalendarOptions ({ commit }, options) {
    commit('CALENDAR_OPTIONS', options)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
