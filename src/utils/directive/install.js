import Vue from 'vue'
// 自定义指令

const install = () => {
  Vue.directive('color', {
    inserted (el, bind) {
        el.style.background = bind.value
    }
  })
}

export default { install }
