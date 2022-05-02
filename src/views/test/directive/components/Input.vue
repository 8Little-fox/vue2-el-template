<template>
  <input
    type="text"
    :value="text"
    @input="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  model: {
    props: 'text',
    event: 'change'
  },
  props: {
    text: String,
    default () {
      return ''
    }
  }
}
</script>

<style>
</style>
