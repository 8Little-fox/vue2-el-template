import Vue from 'vue'

const install = () => {
  Vue.directive('empty', {
    inserted (el, binding) {
      console.log(el, binding)
      el.style.position = el.style.position || 'relative'
      const { offsetHeight, offsetWidth } = el
      const { visible, content, img } = binding.value
      const image = img ? `<img src="${img}" height="30%" width="30%"></img>` : ''
      const defaultStyle = 'position:absolute;top:0;left:50%;z-index:9999;background:#fff;display:flex;justify-content: center;align-items: center;'
      const empty = Vue.extend({
        template: `<div style="height:${offsetHeight}px;width:${offsetWidth}px;${defaultStyle}">
          <div style="text-align:center">
            <div>${image}</div>
            <div>${content || '暂无数据'}</div>
          </div>
        </div>`
      })
      // eslint-disable-next-line new-cap
      const component = new empty().$mount().$el
      if (visible) {
        el.appendChild(component)
      } else {
        el.removeChild(el.lastChild)
      }
    }
  })
}

export default { install }
