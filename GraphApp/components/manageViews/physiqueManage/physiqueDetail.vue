<template>
  <div class="detail-container">
    <div class="detail-content">
        <div class="detail-top">
            <span></span>
            <span class="fs12 detail-des">张三的体格详情</span>
            <div class="inblock backbtn fr cp">
                <img src="" alt="">
                <span>返回</span>
            </div>
        </div>
        <!-- 体格项 item Start -->
        <div class="physique-item">
            <ul>
                <li class="fl">
                    <div class="graph-content">
                        <chart id="" :options="line" ref="pressure"  auto-resize></chart>
                        <div class="search-date">
                            <span>查询日期</span>
                            <flat-pickr class="input-item-date" :config="config" v-model="pressure_date"></flat-pickr>
                            <span>至</span>
                            <flat-pickr class="input-item-date" :config="config" v-model="pressure_back_date"></flat-pickr>
                            <span class="generate-button hvr-shutter-in-horizontal" @click="querySinglePhyData({
                                    type: 'pressure', 
                                    beginTime:pressure_date,
                                    endTime:pressure_back_date
                            })">生成折线图</span>
                        </div>
                    </div>
                </li>
                <li class="fl">
                    <div class="graph-content">
                        <chart id="" :options="line" ref="oxygen"  auto-resize></chart>
                        <div class="search-date">
                            <span>查询日期</span>
                            <flat-pickr class="input-item-date" :config="config" v-model="oxygen_date"></flat-pickr>
                            <span>至</span>
                            <flat-pickr class="input-item-date" :config="config" v-model="oxygen_back_date"></flat-pickr>
                            <span class="generate-button hvr-shutter-in-horizontal" @click="querySinglePhyData({
                                    type: 'oxygen', 
                                    beginTime:oxygen_date,
                                    endTime:oxygen_back_date
                            })">生成折线图</span>
                        </div>
                    </div>
                </li>
                <li class="fl">
                    <div class="graph-content">
                        <chart id="" :options="line" ref="heart"  auto-resize></chart>
                        <div class="search-date">
                            <span>查询日期</span>
                            <flat-pickr class="input-item-date" :config="config" v-model="heart_date"></flat-pickr>
                            <span>至</span>
                            <flat-pickr class="input-item-date" :config="config" v-model="heart_back_date"></flat-pickr>
                            <span class="generate-button hvr-shutter-in-horizontal" @click="querySinglePhyData({
                                    type: 'heart', 
                                    beginTime:heart_date,
                                    endTime:heart_back_date
                            })">生成折线图</span>
                        </div>
                    </div>
                </li>
                <li class="fl">
                    <div class="graph-content">
                        <chart id="" :options="line" ref="sugar"  auto-resize></chart>
                        <div class="search-date">
                            <span>查询日期</span>
                            <flat-pickr class="input-item-date" :config="config" v-model="sugar_date"></flat-pickr>
                            <span>至</span>
                            <flat-pickr class="input-item-date" :config="config" v-model="sugar_back_date"></flat-pickr>
                            <span class="generate-button hvr-shutter-in-horizontal" @click="querySinglePhyData({
                                    type: 'sugar', 
                                    beginTime:sugar_date,
                                    endTime:sugar_back_date
                            })">生成折线图</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 体格项 item End-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts.vue'
import echarts from 'echarts/lib/echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/markline'

import {initial as lineInit, async as lineAsync, typeChartMap as replaceStyle} from './line'

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Mandarin} from 'flatpickr/dist/l10n/zh';

let DomMap = {
    pressureDom: null,
    sugarDom: null,
    oxygenDom: null,
    heartDom: null
}
export default {
  name: 'physiqueDetails',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      line: lineInit,
      pressure_date: new Date(),
      sugar_date: new Date(),
      oxygen_date: new Date(),
      heart_date: new Date(),
      pressure_back_date: new Date(),
      sugar_back_date: new Date(),
      oxygen_back_date: new Date(),
      heart_back_date: new Date(),
      config: {
        altFormat: 'Y-m-d',
        altInput: true,
        dateFormat: 'Y-m-d',
        locale: Mandarin, // locale for this instance only          
      },
    }
  },
  methods: {
    querySinglePhyData(data) {
        console.log('---->date', data)
        let type = data.type
        DomMap[type + 'Dom'].showLoading({
          text: '正在加载',
          color: '#4ea397',
          maskColor: 'rgba(255, 255, 255, 0.4)'
        })
        this.$store.dispatch('PhysiqueModule/querySinglePhyData', data).then((res)=>{
            DomMap[type + 'Dom'].hideLoading()            
            lineAsync.xAxis.data = res[type].day
            if(res.type === 'pressure') {
                lineAsync.series[0].data = res.pressure.ssy
                lineAsync.series[0].name = '收缩压'
                lineAsync.series[0].itemStyle.normal.color = replaceStyle.pressure.ssy.color
                lineAsync.series[0].markLine = replaceStyle.pressure.ssy.markLine
                lineAsync.series[1].itemStyle.normal.color = replaceStyle.pressure.szy.color
                lineAsync.series[1].markLine = replaceStyle.pressure.szy.markLine
                lineAsync.series[1].data = res.pressure.szy
                lineAsync.series[1].name = '舒张压'
                DomMap.pressureDom.mergeOptions(lineAsync)
            }else {
                lineAsync.series[0].name = res.name
                lineAsync.series[0].data = res[type].list
                lineAsync.series[0].itemStyle.normal.color = replaceStyle[type].color
                lineAsync.series[0].markLine = replaceStyle[type].markLine
                lineAsync.series[1].data = []
                lineAsync.series[1].name = ""
                lineAsync.series[1].markLine = {}
                DomMap[type + 'Dom'].mergeOptions(lineAsync)
            }
        })
    }
  },
  components: {
    chart: ECharts,
    flatPickr
  },
  mounted() {
     DomMap.pressureDom = this.$refs.pressure
     DomMap.oxygenDom = this.$refs.oxygen
     DomMap.sugarDom = this.$refs.sugar
     DomMap.heartDom = this.$refs.heart
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('PhysiqueModule/getPhysiqueDetail', {
        userId:route.params.detailid
    }).then((res)=>{
        var me = this;
        lineAsync.series[1].data = []
        lineAsync.series[1].name = ""
        setTimeout(()=> {
            lineAsync.series[1].markLine = {}

            lineAsync.series[0].name = '血氧'
            lineAsync.xAxis.data = res.oxygenList.day
            lineAsync.series[0].data = res.oxygenList.list
            lineAsync.series[0].itemStyle.normal.color = replaceStyle.oxygen.color
            lineAsync.series[0].markLine = replaceStyle.oxygen.markLine
            DomMap.oxygenDom.mergeOptions(lineAsync)

            lineAsync.series[0].name = '心率'
            lineAsync.xAxis.data = res.heartList.day
            lineAsync.series[0].data = res.heartList.list
            lineAsync.series[0].itemStyle.normal.color = replaceStyle.heart.color
            lineAsync.series[0].markLine = replaceStyle.heart.markLine
            DomMap.heartDom.mergeOptions(lineAsync)

            lineAsync.series[0].name = '血糖'
            lineAsync.xAxis.data = res.sugarList.day
            lineAsync.series[0].data = res.sugarList.list
            lineAsync.series[0].itemStyle.normal.color = replaceStyle.sugar.color
            lineAsync.series[0].markLine = replaceStyle.sugar.markLine
            DomMap.sugarDom.mergeOptions(lineAsync)

            //console.log(DomMap.pressureDom)
            lineAsync.xAxis.data = res.pressureList.day
            lineAsync.series[0].data = res.pressureList.ssy
            lineAsync.series[0].itemStyle.normal.color = replaceStyle.pressure.ssy.color
            lineAsync.series[0].markLine = replaceStyle.pressure.ssy.markLine
            lineAsync.series[0].name = '收缩压'
            lineAsync.series[1].data = res.pressureList.szy
            lineAsync.series[1].itemStyle.normal.color = replaceStyle.pressure.szy.color
            lineAsync.series[1].markLine = replaceStyle.pressure.szy.markLine
            lineAsync.series[1].name = '舒张压'
            DomMap.pressureDom.mergeOptions(lineAsync)
        }, 500)
    })
  },
  computed: mapState('PhysiqueModule', {
    //把vuex里面的状态取出来 给该组件去使用
    // arrow functions can make the code very succinct!
    pressureList: state => state.pressureList,
    sugarList: state => state.sugarList,
    oxygenList: state => state.oxygenList,
    heartList: state => state.heartList
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .input-item-date {
        background: #2F4162;
        border-radius: 4px;
        outline: none;
        border: 0;
        padding: 5px 0;
        color: white;
        text-align: center;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
<style scoped lang='less'>
.hvr-shutter-in-horizontal {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  position: relative;
  background: #2098D1;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.hvr-shutter-in-horizontal:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1E4C6C;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-shutter-in-horizontal:hover, .hvr-shutter-in-horizontal:focus, .hvr-shutter-in-horizontal:active {
  color: white;
}
.hvr-shutter-in-horizontal:hover:before, .hvr-shutter-in-horizontal:focus:before, .hvr-shutter-in-horizontal:active:before {
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
}
.echarts {
    height: 360px;
}
.search-date {
    margin-top: -20px;
    text-align: left;
    margin-left: 100px;
    font-size: 12px;
    position: relative;
    z-index: 10;
    color: #7689B6;
}
.generate-button {
    background: #2098D1;
    border: 1px solid #01D7FD;
    box-shadow: 0 2px 3px 0 #051E38;
    border-radius: 4px;
    padding: 3px 6px;
    color: white;
    cursor: pointer;
}
@bgColor:#243554;
.detail-container .detail-wrap span {
    background:#122442;
    color: #01D7FD;
    border: 2px solid #01D7FD;
    line-height: 36px;
}
.detail-container .detail-wrap .active span{
    background-image: linear-gradient(270deg, #04BBE4 0%, #059AFF 100%);
    border: none;
    line-height: 40px;
    color: #fff;
}
.detail-container {
    margin-top: 30px;
    width: auto;
    background-color: @bgColor;
    height: 912px;
    color: #FFF;
    .detail-wrap{
      width: auto;
      height: 125px;
      margin:0 10px;
      .system-item{
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        width: 120px;
        height: 40px;
        border-radius: 100px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        letter-spacing: 0;
        margin-top: 40px;
      }
      .info-item{
        margin-left: 20px;
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        width: 120px;
        height: 40px;
        border-radius: 100px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        letter-spacing: 0;
        margin-top: 40px;

      }
    }
    /*详情内容*/

    .detail-top {
        height: 50px;
        border-bottom: 1px solid #7689B6;
        >:first-child {
            height: 18px;
            display: inline-block;
            width: 4px;
            background: #01D7FD;
            border-radius: 4px;
            margin-right: 20px;
            vertical-align: top;
        }
        .detail-des {
            font-size: 16px;
            color: #01D7FD;
        }
        .backbtn {
            width: 76px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            border: 2px solid #01D7FD;
            border-radius: 4px;
        }
    }
    .physique-item {
        margin: 30px 20px;
        li {
            width: 48%;
            height: 380px;
            background: #122442;
            margin-bottom: 30px;
            border-radius: 4px;
            >p {
            height: 60px;
            line-height: 60px;
            color: #01D7FD;
            font-size: 18px;
        }
            
        }
    }
}
</style>
