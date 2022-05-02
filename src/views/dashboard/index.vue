<template>
  <div class="dashboard-container">
    <div class="line-wrapper m-b-10">
      <LineChart />
    </div>
    <div class="panel-wrapper">
      <PanelGroup @click="handlerChart" />
    </div>
    <div class="panel-wrapper">
      <PieChart />
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Chart/LineChart'
import PanelGroup from '@/components/Chart/PanelGroup'
import PieChart from '@/components/Chart/PieChart'

export default {
  name: 'Dashboard',
  components: {
    LineChart,
    PanelGroup,
    PieChart
  },
  methods: {
    handlerChart () {
      console.log('走着了嘛')
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .line-wrapper {
    background-color: #fff;
  }
  .panel-wrapper {
    background-color: #fff;
  }
}
</style>
