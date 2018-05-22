import echarts from 'echarts/lib/echarts'

export let initial = {
  title: {
    text: '异步数据加载示例'
  },
  tooltip:{
      trigger: 'axis',
      axisPointer: {
        lineStyle :{
            color:"#38E6FF"
        }
      },
      formatter : function(param,tick,calback){
       return param[0].seriesName + ":" + param[0].data;
      },
      borderColor : "#000",
      textStyle:{
          color : "#fff",
      },
      alwaysShowContent:false
  },
  legend: {
    data: ['医院体格统计'],
    textStyle: {
        fontSize: 16,
        color: '#fff'
    }
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisLine: {
      show: true,
      onZero: true,
      lineStyle: {
        color: '#7689B6',
        width: 1,
        type: 'solid',
      }
    },
    axisTick: {
      show: false,
    }
  }],
  yAxis: [{
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#7689B6',
          opacity: 0.2,
        }
      },
      axisLine: {
        show: true,
        onZero: true,
        lineStyle: {
          color: '#7689B6',
          width: 1,
          type: 'solid',
          opacity: 0,
        }
      },
      axisTick: {
        show: false,
      },
    }

  ],
  series: [{
    name: '医院体格统计',
    type: 'bar',
    data: [],
    tooltip: {
        
    },
    barWidth: '35px',
    itemStyle: {
      normal: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(28,113,241,0.00)'
        }, {
          offset: 1,
          color: '#1ACFFD'
        }]),
        opacity: 0.5,
      },
      emphasis: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#1C71F1'
        }, {
          offset: 1,
          color: '#1ACFFD'
        }]),
        opacity: 1,
      }
    }
  }, {
    name: '医院体格统计',
    type: 'line',
    data: [],
    legendHoverLink: false,
    itemStyle: {
      normal: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#1C71F1' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#1ACFFD' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        width: 3,
      }
    },
    smooth: true,
  }]
}

let asyncData = {
  categories: ['第一医院', '第一医院', '第一医院', '第一医院', '第一医院', '第一医院', '第一医院', '第一医院', '第一医院', '第一医院'],
  data: [100, 200, 400, 600, 760, 500, 300, 200, 700, 600]
}

export let async = {
  xAxis: {
    data: asyncData.categories
  },
  yAxis: {
    axisLabel: {
      show: true
    }
  },
  series: [{
    name: '医院体格统计',
    type: 'bar',
    data: asyncData.data,
  },{
    name: '医院体格统计',
    type: 'line',
    data: asyncData.data,
  }]
}