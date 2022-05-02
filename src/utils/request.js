import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'
import qs from 'qs'
import { downloadFile } from './tools/method'

const service = axios.create({})

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
    this.cache = false
    this.instance = null
    this.cacheGetters = {}
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
      if (isCache && this.cacheGetters[cacheKey]) {
        console.log('mx-components[request]: cache', this.cacheGetters)
        resolve(this.cacheGetters[cacheKey])
        return
      }
      console.log('sendData', sendData)
      service({
        url: method === 'get' ? url + '?' + qs.stringify(sendData, { indices: false }) : url,
        method,
        [isSendData ? 'data' : 'params']: method === 'get' ? {} : sendData,
        ...this.config
      }).then((data) => {
        isCache && (this.cacheGetters[cacheKey] = data)
        resolve(data)
      }).catch(reject)
    })
  }

  setPath (url, cache = false, responseType) {
    this.path = url
    this.cache = cache
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

  get (params) {
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

export {
  Request
}
export default Request.getInstance()
