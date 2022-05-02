import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import EventOb from './eventObserve'
import { Message } from 'element-ui'
import Vue from 'vue'

const service = axios.create({})
const sendToken = new Map()
const cacheAction = new Map()
/**
 * 请求拦截器
 */
 service.interceptors.request.use(request => {
  if (getToken()) {
    request.headers.Authorization = getToken()
  }
  return request
}, error => {
  return Promise.reject(error)
})
/**
 * 响应拦截器
 */
service.interceptors.response.use(response => {
  return response.data
}, error => {
  let code = 0
  try {
    code = error.response.data.status
  } catch (error) {
    if (error.toString().indexOf('Error: timeout') !== -1) {
      Message.error('网络请求超时')
      return Promise.reject(error)
    }
  }
  if (code === 401) {
    store.dispatch('user/resetToken')
    router.push('/login')
  } else {
    Message.error(error.response.data.message)
  }
  return Promise.reject(error)
})
class Request {
  constructor () {
    this.path = ''
    this.config = {}
    this.obSend = new EventOb()
    this.cache = false
  }

  static getInstance () {
    if (!Request.instance) {
      Request.instance = new Request()
    }
    return Request.instance
  }

  withAction (sendData = {}, method) {
    const toMethod = method.toUpperCase()
    const isSendData = ['POST', 'PUT'].includes(toMethod)
    return new Promise((resolve, reject) => {
      const url = `${this.path}`.replace(/(\/\/)/g, '/')
      const cacheKey = `${url}${JSON.stringify(sendData)}`
      // const cacheAction = store.state.common.cacheAction
      const isCache = this.cache && toMethod === 'GET'
      // 当存在请求时将resolve放入
      if (sendToken.get(cacheKey)) {
        this.obSend.once(cacheKey, resolve)
        return
      }
      if (isCache && cacheAction.get(cacheKey)) {
        resolve(cacheAction.get(cacheKey))
        return
      }
      // 只处理cache重复请求
      console.log(sendToken.get(cacheKey))
      if (isCache && !sendToken.get(cacheKey)) {
        sendToken.set(cacheKey, true)
      }
      service({
        url,
        method,
        [isSendData ? 'data' : 'params']: sendData,
        ...this.config
      }).then((data) => {
        isCache && cacheAction.set(cacheKey, data)
        // isCache && store.dispatch('common/setCacheAction', { key: cacheKey, data })
        resolve(data)
      }).catch((err) => {
        reject(err)
      }).finally(() => {
        if (isCache && sendToken.get(cacheKey) && cacheAction.get(cacheKey)) {
          Vue.nextTick(() => {
            sendToken.delete(cacheKey)
            this.obSend.emit(cacheKey, cacheAction.get(cacheKey))
          })
        }
      })
    })
  }

  setPath (url, loading = false) {
    this.path = url
    this.config = {}
    this.setConfig({ loading })
    return this
  }

  setConfig (config) {
    this.config = Object.assign(this.config, config)
    return this
  }

  carry (key) {
    this.path = this.path.replace(/\{.*?\}/g, () => key)
    return this
  }

  get (params, cache = false) {
    if (typeof params === 'boolean') {
      cache = params
      params = {}
    }
    this.cache = cache
    return this.withAction(params, 'get')
  }

  post (data) {
    return this.withAction(data, 'post')
  }

  put (data) {
    return this.withAction(data, 'put')
  }

  del (params) {
    return this.withAction(params, 'delete')
  }

  upload (file, data = {}) {
    const formData = new FormData()
    formData.append('file', file)
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    this.setConfig(Object.assign(this.config, { headers: { 'Content-Type': 'multipart/form-data' } }))
    return this.withAction(formData, 'post')
  }

  downLoad (param, fileName, extension = false) {
    this.setConfig(Object.assign(this.config, { isFile: true, responseType: 'blob' }))
    return new Promise((resolve, reject) => {
      this.withAction(param, 'get').then(([file, config]) => {
        const blob = new Blob([file])
        fileName = (typeof extension === 'boolean' && extension) ? decodeURI(config['content-disposition']).slice(20) : fileName + '.xlsx'
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const eLink = document.createElement('a')
          eLink.download = fileName
          eLink.style.display = 'none'
          eLink.href = URL.createObjectURL(blob)
          document.body.appendChild(eLink)
          eLink.click()
          // 释放URL 对象
          URL.revokeObjectURL(eLink.href)
          document.body.removeChild(eLink)
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
        resolve()
      })
    })
  }
}

export const dataToFormData = (data) => {
  if (data instanceof FormData) {
    return data
  }
  return Object.entries(data).reduce((total, [key, value]) => {
    if (typeof value !== 'undefined') {
      total.append(key, typeof value !== 'string' ? JSON.stringify(value) : value)
    }
    return total
  }, new FormData())
}

export default Request.getInstance()
