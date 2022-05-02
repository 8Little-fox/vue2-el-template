import Vue from 'vue'
import { debounce } from '../tools/method'

const install = () => {
  Vue.directive('debounce', {
    bind (el, binding) {
      let executeFunction
      if (binding.value instanceof Array) {
        const [func, time = 1000, immediate = true] = binding.value
        executeFunction = debounce(func, time, immediate)
      } else {
        executeFunction = debounce(binding.value, 1000, true)
      }
      el.addEventListener('click', executeFunction)
    }
  })
}
export default { install }
