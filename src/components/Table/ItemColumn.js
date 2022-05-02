import * as constants from '@/views/system/menuManager/constants'
export default {
  functional: true,
  name: 'ItemColum',
  props: {
    config: Object,
    slots: Function
  },
  render (h, context) {
    console.log(context.props)
    const { config, slots: slotsFn } = context.props
    const { slots, dataIndex, label, props } = config
    const { dict = '' } = props

    // valid slots
    if (slots && typeof slotsFn !== 'function') {
      throw new Error(`您的插槽${dataIndex}没有传入值`)
    }
    const slotsScoped = (slots || dict) && {
      scopedSlots: {
        default: (scope) => {
          const value = scope.row[dataIndex]
          return slots ? slotsFn({ ...scope, value }) : (<span>{ constants[dict][String(value)]}</span>)
        }
      }
    }
    return (
      <el-table-column
        { ...{ props: config.props, ...slotsScoped } }
        prop={dataIndex}
        label={label}
      />
    )
  }
}
