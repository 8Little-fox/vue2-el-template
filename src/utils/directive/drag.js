// 使用该指令可以对元素进行拖拽。
import Vue from 'vue'

const install = () => {
  Vue.directive('drag', {
    inserted (el) {
      const _el = el
      document.onselectstart = function () {
        console.log('111')
        return false // 禁止选择网页上的文字
      }

      _el.onmousedown = e => {
        console.log('e', e)
        const disX = e.clientX - _el.offsetLeft // 鼠标按下，计算当前元素距离可视区的距离
        const disY = e.clientY - _el.offsetTop
        document.onmousemove = function (e) {
          const l = e.clientX - disX
          const t = e.clientY - disY
          _el.style.left = l + 'px'
          _el.style.top = t + 'px'
        }
        document.onmouseup = e => {
          document.onmousemove = document.onmouseup = null
        }
        return false
      }
    }
  })
}

export default { install }
