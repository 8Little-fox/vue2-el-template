import ComponentsMessage from '@/components/Message'
import { createMessage } from '@/components/Message/message'
export default {
  install (Vue) {
    Vue.component(ComponentsMessage.name, ComponentsMessage)
    Vue.prototype.$BlMessage = createMessage
  }
}
