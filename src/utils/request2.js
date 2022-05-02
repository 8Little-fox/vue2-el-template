import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'
import qs from 'qs'
import { downloadFile } from './tools/method'

const service = axios.create({})
const cacheAction = new Map()
const sendToken = new Map()
const resolveKeyOfFn = new Map()

class Request {
  constructor () {
    this.path = ''
    this.config = {}
    this.cache = false
    this.instance = null
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new Request()
    }
    return this.instance
  }

  withAction (sendData = {}, method) {
    const toMethod = method.toUpperCase()
    const isSendData = ['POST', 'PUT', 'DELETE'].includes(toMethod)
    return new Promise((resolve, reject) => {
      const url = `${this.path}`.replace(/(\/\/)/g, '/')
      const cacheKey = `${url}${JSON.stringify(sendData)}`
      const isCache = this.cache && toMethod === 'GET'

      if (sendToken.get(cacheKey)) {
        resolveKeyOfFn.set(cacheKey, resolve)
        return
      }

      if (isCache && cacheAction.get(cacheKey)) {
        resolve({ data: cacheAction.get(cacheKey) })
        return
      }

      if (isCache && !sendToken.get(cacheKey)) {
        sendToken.set(cacheKey, true)
      }
      console.log('sendData', sendData)
      service({
        url: method === 'get' ? url + '?' + qs.stringify(sendData, { indices: false }) : url,
        method,
        [isSendData ? 'data' : 'params']: method === 'get' ? {} : sendData,
        ...this.config
      }).then((data) => {
        isCache && cacheAction.set(cacheKey, data)
        resolve(data)
      }).catch((reject) => {
        reject(reject)
      }).finally(() => {
        if (isCache && sendToken.get(cacheKey)) {
          const resolveFn = resolveKeyOfFn.get(cacheKey)
          sendToken.delete(cacheKey)
          resolveKeyOfFn.delete(cacheKey)
          resolveFn(cacheAction.get(cacheKey))
        }
      })
    })
  }

  setPath (url, responseType) {
    this.path = url
    this.setConfig(responseType)
    return this
  }

  setConfig (config) {
    this.config = config
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

  export (params, name, suffix) {
    this.setConfig({ responseType: 'blob' })
    return this.withAction(params, 'get').then((res) => downloadFile(res, name, suffix))
  }

  upload (file, data) {
    const formData = new FormData()
    formData.append('file', file)
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    this.setConfig({ headers: { 'Content-Type': 'multipart/form-data' } })
    return this.withAction(formData, 'post')
  }
}

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
export {
  Request
}
export default Request.getInstance()
