class Common {
   /**
 * 日历气泡函数
 * @param {*} evt
 * @param {*} title
 * @returns
 */
    static popupDocument (evt, title) {
      // 气泡
      const tooltip = document.createElement('div')
      // 三角
      const triangle = document.createElement('div')
      tooltip.style.position = 'absolute'
      tooltip.style.zIndex = 9
      tooltip.style.bottom = `${(window.innerHeight - evt.clientY) + 7}px`
      tooltip.style.left = `${evt.clientX}px`
      tooltip.style.background = 'rgba(0, 0, 0, 0.65)'
      tooltip.style.color = 'white'
      tooltip.style.padding = '10px'
      tooltip.style.borderRadius = '5px'
      tooltip.id = 'my-tooltip'
      tooltip.innerHTML = `<div id="tooltip">${title}</div>`
      triangle.style.position = 'absolute'
      triangle.style.bottom = '-7px'
      triangle.style.borderTop = '5px solid rgba(0, 0, 0, 0.65)'
      triangle.style.borderRight = '5px solid transparent'
      triangle.style.borderLeft = '5px solid transparent'
      triangle.style.borderBottom = '3px solid transparent'
      triangle.style.borderRadius = '3px'
      triangle.style.width = '0px'
      triangle.style.height = '0px'
      document.body.appendChild(tooltip)
      tooltip.appendChild(triangle)
      return true
    }
}

export default Common
