import Vue from 'vue'
import ComponentsMessage from '@/components/Message'

const createMessage = (propsData) => {
  // 1. 生成组件的构造器
  const Ctor = Vue.extend(ComponentsMessage)
  // 2. 创建组件实例，并执行挂载
  const vm = new Ctor({ propsData }).$mount()
  //  监听visible 变化
  vm.$on('update:visible', flag => {
    vm.visible = flag
  })
  // 3. 通过原生DOM API的方式把组件的跟元素插入到文档中（真实DOM 中）
  document.body.appendChild(vm.$el)
  return vm
}
export { createMessage }
