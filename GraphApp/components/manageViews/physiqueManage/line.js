var symbolSize = 20;
export let initial = {
  title: {
    text: 'Click to Add Points'
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: [{
      name: '收缩压',
      icon: 'circle'
    }, {
      name: '舒张压',
      icon: 'circle'
    }, {
      name: '血氧',
      icon: 'circle'
    }, {
      name: '心率',
      icon: 'circle'
    }, {
      name: '血糖',
      icon: 'circle'
    }],
    textStyle: {
      fontSize: 16,
      color: '#fff'
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      onZero: false,
      lineStyle: {
        color: '#7689B6',
        width: 1,
        opacity: .3,
        type: 'solid',
      }
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        color: '#7689B6',
        opacity: .3,
      }
    },
    axisLine: {
      onZero: false,
      lineStyle: {
        color: '#7689B6',
        width: 1,
        opacity: .3,
        type: 'solid',
      }
    }
  },
  series: [{
    name: '收缩压',
    type: 'line',
    itemStyle: {
      normal: {
        lineStyle: {
          width: 4 //设置线条粗细
        }
      }
    },
    smooth: true,
    symbolSize: symbolSize,
    data: []
  }, {
    name: '舒张压',
    type: 'line',
    itemStyle: {
      normal: {
        lineStyle: {
          width: 4 //设置线条粗细
        }
      }
    },
    smooth: true,
    symbolSize: symbolSize,
    data: []
  }]
};

export let async = {
  xAxis: {
    data: []
  },
  yAxis: {
    axisLabel: {
      show: true
    }
  },
  series: [{
    name: '医院体格统计',
    type: 'line',
    data: [],
    itemStyle: {
      normal: {
        color: {

        }
      }
    }
  }, {
    name: '医院体格统计',
    type: 'line',
    data: [],
    itemStyle: {
      normal: {
        color: {
          
        }
      }
    }
  }]
}

export let typeChartMap = {
  "pressure": {
    szy: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: '#3AE7C9' // 0% 处的颜色
        }, {
          offset: 1,
          color: '#33CFEB' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },
      markLine: {
        itemStyle: {
          normal: {
            color: '#3AE5CC',
            label: {
              show: true,
              position: 'start',
              formatter: function(param) {
                return param.name
              }
            },
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        silent: true,
        data: [{
          name: '舒张压标\n准最低值',
          yAxis: 60
        }, {
          name: '舒张压标\n准最高值',
          yAxis: 90
        }]
      }
    },
    ssy: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: '#02F0FE' // 0% 处的颜色
        }, {
          offset: 1,
          color: '#2CA2FA' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },
      markLine: {
        itemStyle: {
          normal: {
            color: '#02F0FE',
            label: {
              show: true,
              position: 'end',
              formatter: function(param) {
                return param.name
              }
            },
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        silent: true,
        data: [{
          name: '收缩压标\n准最低值',
          yAxis: 90
        }, {
          name: '收缩压标\n准最高值',
          yAxis: 140
        }]
      }
    }
  },
  "oxygen": {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#2058E7' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#48A7FF' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    markLine: {
      itemStyle: {
        normal: {
          color: 'red',
          label: {
            show: true,
            position: 'end',
            formatter: function(param) {
              return param.name
            }
          },
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        }
      },
      silent: true,
      data: [{
        name: '血氧(mm\nHg)标准\n最低值',
        yAxis: 80
      }, {
        name: '血氧(mm\nHg)标准\n最高值',
        yAxis: 110
      }]
    }
  },
  "sugar": {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#3023AE' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#A979FF' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    markLine: {
      itemStyle: {
        normal: {
          color: 'red',
          label: {
            show: true,
            position: 'end',
            formatter: function(param) {
              return param.name
            }
          },
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        }
      },
      silent: true,
      data: [{
        name: '血糖(毫\n摩/升)标\n准最低值',
        yAxis: 3.9
      }, {
        name: '血糖(毫\n摩/升)标\n准最高值',
        yAxis: 6.1
      }]
    }
  },
  "heart": {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: '#3023AE' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#A979FF' // 100% 处的颜色
      }],
      globalCoord: false // 缺省为 false
    },
    markLine: {
      itemStyle: {
        normal: {
          color: 'red',
          label: {
            show: true,
            position: 'end',
            formatter: function(param) {
              return param.name
            }
          },
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        }
      },
      silent: true,
      data: [{
        name: '心率(次\n/每分)标\n准最低值',
        yAxis: 60
      }, {
        name: '心率(次\n/每分)标\n准最高值',
        yAxis: 100
      }]
    }
  }
}