<template>
  <div>
    <Calendar
    :calendarData="calendarData"
    :editable="true"
  />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar/index'
import { calendarData } from './mock'
export default {
  components: {
    Calendar
  },
  data () {
    return {
      calendarData
    }
  },
  mounted () {
    console.log('calendarData', calendarData)
  }
}
</script>

<style>

</style>
