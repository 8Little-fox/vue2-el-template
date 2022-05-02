<template>
  <Options v-bind="$attrs" v-on="$listeners"/>
</template>
<script>
  import Options from './options'
  export default {
    components: {
      Options
    }
  }
</script>
