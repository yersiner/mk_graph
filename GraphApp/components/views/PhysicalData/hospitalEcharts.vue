<template>
    <chart id="charts" :options="bar" ref="bar"  auto-resize></chart>
</template>
<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import echarts from 'echarts/lib/echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import {initial as barInit, async as barAsync} from './bar'

export default {
  name: 'hospitalEcharts',
  components: {
    chart: ECharts
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      bar: barInit
    }
  },
  mounted(){
    //this.drawLine();
  },
  methods: {
    
  }
}
</script>

<style scoped lang='less'>
#charts{
  width: 100%;
  height: 350px;
}
</style>