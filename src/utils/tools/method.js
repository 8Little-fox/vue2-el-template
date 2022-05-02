
/**
 * @desc 函数防抖
 * @author lls
 * @param {*} func 目标函数
 * @param {*} wait 延迟执行毫秒数
 * @param {*} immediate true - 立即执行, false - 延迟执行
 * @returns
 */
export function debounce (func, wait, immediate) {
  let timer
  return function () {
    const context = this
        const args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @author lls
 * @param {*} func 目标函数
 * @param {*} wait 延迟执行毫秒数
 * @param {*} type 1 - 时间戳版 2 - 定时器版
 * @returns
 */
export function throttle (func, wait, type) {
  if (type === 1) {
    var previous = 0
  } else if (type === 2) {
    var timeout
  }
  return function () {
    const context = this
    const args = arguments
    if (type === 1) {
        const now = Date.now()

        if (now - previous > wait) {
          func.apply(context, args)
          previous = now
        }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
 export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'undefined' || time === null || time === 'null') {
    return ''
  } else if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 下载文件
 * @param {*} obj
 * @param {*} name
 * @param {*} suffix
 */
export function downloadFile (obj, name, suffix) {
  console.log('下载文件', obj, name, suffix)
  const url = window.URL.createObjectURL(new Blob([obj]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = parseTime(new Date()) + '-' + name + '.' + suffix
  console.log('fileName', fileName)
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 *
 * @param {*} imgSrc 图片地址
 * @param {*} name 图片名
 */
export const downloadImage = (imgSrc, name) => {
  console.log(imgSrc)
  var image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function () {
    var canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    var context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据

    var a = document.createElement('a') // 生成一个a元素
    var event = new MouseEvent('click') // 创建一个单击事件
    a.download = name || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
}
  /**
   *
   * @param {*} beginDateStr [开始日期]
   * @param {*} now [当前选中日期]
   * @param {*} endDateStr [结束日期]
   */
export function isDuringDate (beginDateStr, now, endDateStr) {
  const curDate = new Date(now).getTime()
  const beginDate = new Date(beginDateStr).getTime()
  const endDate = new Date(endDateStr).getTime()
  if (beginDate <= curDate && curDate <= endDate) {
    return true
  }
  return false
}
