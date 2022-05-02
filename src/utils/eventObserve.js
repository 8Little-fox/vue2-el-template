function invokeCallback (callback, context, args) {
  try {
    typeof callback === 'function' && callback.apply(context, args)
  } catch (e) {
    console.warn('[mx-request]: cache request action error' + e)
  }
}

class EventOb {
  constructor () {
    this.subs = Object.create(null)
  }

  on (event, callback) {
    if (Array.isArray(event)) {
      event.forEach((e) => this.on(e, callback))
      return
    }
    !this.subs[event] && (this.subs[event] = [])
    this.subs[event].push(callback)
  }

  off (event, callback) {
    if (!arguments.length) {
      this.subs = Object.create(null)
      return
    }
    if (Array.isArray(event)) {
      event.forEach((e) => this.off(e, callback))
      return
    }
    const cbs = this.subs[event]
    if (!cbs || cbs.length) {
      return
    }
    if (!callback) {
      this.subs[event] = null
      return
    }
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === callback || cb.fn === callback) {
        cbs.splice(i, 1)
        break
      }
    }
  }

  once (event, callback) {
    const self = this
    function on () {
      self.off(event, on)
      callback.apply(self, arguments)
    }
    this.on(event, on)
  }

  emit (event) {
    const cbs = this.subs[event]
    if (cbs && cbs.length) {
      const args = [...arguments].slice(1)
      for (let i = 0; i < cbs.length; i++) {
        invokeCallback(cbs[i], this, args)
      }
    }
  }
}

export default EventOb
