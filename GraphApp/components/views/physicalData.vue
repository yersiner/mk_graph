<template>
  <div class="container">
	<!-- left -->
	<div class="container-left">
		<LeftBar :data="areaData" @updateData="loadRegionData"></LeftBar>
	</div>
	<!-- right -->
	<div class="container-right">
		<div class="hospital">
			<div class="hospital-wrap">
				<form>
					<input type="checkbox" id="radio-hospital" class="radio-hospital">
				<label for="radio-hospital"></label>
				<span class="total-hospital fs20">医院体格统计</span>
				<v-select v-model="selectedProvince" placeholder="请选择" class="hospital-list-province normal-item" :options="provinceData"></v-select>
				<span class="hospital-btn fs16" @click="searchHospital()">生产柱状图</span>
				</form>
			</div>
			<div class="hospital-echarts">
    			<chart class="charts" :options="bar" ref="bar"></chart>
			</div>
		</div>
		<div class="country">
			<div class="country-wrap">
				<form>
					<input type="checkbox" id="radio-country" class="radio-country">
					<label for="radio-country"></label>
					<span class="total-country fs20">全国体格统计</span>
					<v-select placeholder="请选择" v-model="selectedYears" class="country-list-year normal-item" :options="years"></v-select>
					<v-select placeholder="请选择" v-model="selectedMonth" class="country-list-month normal-item" :options="months"></v-select>
					<span class="country-btn fs16">生产柱状图</span>
				</form>
			</div>
			<div class="country-echarts">
    			<chart class="charts" :options="bar" ref="bar_w"  auto-resize></chart>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import vSelect from "vue-select";
import LeftBar from "./CommonLeftBarInfo"

import REGION_DATA from "~/GraphApp/api/cityData";
import {mapState} from 'vuex'

import ECharts from 'vue-echarts/components/ECharts.vue'
import echarts from 'echarts/lib/echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import {initial as barInit, async as barAsync} from './physicalData/bar'

let provinceData = [];

for(let key in REGION_DATA['86']) {
	provinceData.push(REGION_DATA['86'][key])
}
console.log(provinceData)
export default {
  name: 'physicalData',
  components: {
  	vSelect,
    chart: ECharts,
  	LeftBar
  },
  mounted() {
  	this.loadHospitalPhysical();
  	this.loadWorldPhysical();
  },
  methods: {
		loadRegionData(regionInfo) {
			//加载左侧菜单栏信息
			this.selectedProvince = regionInfo.province
	  		this.$store.dispatch('PhysicalModule/fetchPhysicalAreaData', {
		   		province: regionInfo.province,
		   		prefecture: regionInfo.city
		    })
			console.log('regionInfoLoaded-->physicalData', regionInfo);
		},
		loadHospitalPhysical() {
			let bar = this.$refs.bar
	      	bar.showLoading({
	      	  text: '正在加载',
	      	  color: '#4ea397',
	      	  maskColor: 'rgba(255, 255, 255, 0.4)'
	      	})
			this.$store.dispatch('PhysicalModule/fetchHospitalPhysical', {
				province: this.selectedProvince,
				type: 'hospital'
			}).then(()=>{
				bar.hideLoading()
				barAsync.xAxis.data = this.hosPyhsicalData.labels
				barAsync.series[0].data = this.hosPyhsicalData.datas
				barAsync.series[1].data = this.hosPyhsicalData.datas
				bar.mergeOptions(barAsync)
			})
			console.log('loadHospitalPhysical--->')
		},
		loadWorldPhysical() {
			let bar = this.$refs.bar_w
	      	bar.showLoading({
	      	  text: '正在加载',
	      	  color: '#4ea397',
	      	  maskColor: 'rgba(255, 255, 255, 0.4)'
	      	})
			this.$store.dispatch('PhysicalModule/fetchWorldPhysical', {
				year: this.selectedYears.match(/\d+/g)[0]|0,
				month: this.selectedMonth.match(/\d+/g)[0]|0,
				type:'world'
			}).then(()=>{
				bar.hideLoading()
				barAsync.xAxis.data = this.worldPyhsicalData.labels
				barAsync.series[0].data = this.worldPyhsicalData.datas
				barAsync.series[1].data = this.worldPyhsicalData.datas
				bar.mergeOptions(barAsync)
			})
			console.log('loadHospitalPhysical--->')
		},
		searchHospital() {
			this.loadHospitalPhysical()	
		},
		getData: function (data) {
			// body...
		}
  },
  computed: {
  	...mapState('PhysicalModule', [
       // map this.count to store.state.count
       'areaData',
       'worldPyhsicalData',
       'hosPyhsicalData'
     ])
  },
  data () {
    return {
      bar: barInit,
      test_data:'1,566,254,',
      user:'125',
      id:0,
      selectedProvince: '贵州省',
      selectedMonth: '12月',
      selectedYears:'2017年',
      provinceData: provinceData,
      months:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      years: ['2017年', '2016年', '2015年', '2013年', '2012年'],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@bgColor:#243554;
.charts{
  width: 100%;
  height: 350px;
}
.label{
	box-sizing: border-box;
	background: #122442; 
    border: 2px solid #3CD2FF;
	border-radius: 4px;
    width: 15px;
    height: 15px; 
    display: inline-block; 
    position: relative; 
    margin-right: 11px;
    &:active{
    	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1); 
    }
}
.label-checked{
	background: #122442; 
    border: 2px solid #3CD2FF;
	border-radius: 4px;
    &:after{
    	content: '\2714';
    	position: absolute; 
    	font-family: PingFangSC-Regular;
   		top: -27px; 
   		left: 0px; 
   		color: #fff; 
   		width: 100%; 
    	text-align: center; 
   		padding: 1px 0 0 0; 
    	vertical-align: text-top; 
    }
}
.btn-span{
	height: 30px;
	width: 89px;
	line-height: 30px;
	text-align: center;
	display: inline-block;
	font-family: PingFangSC-Regular;
	color: #FFFFFF;
	letter-spacing: 0;
	opacity: 0.7;
	border: 2px solid #01D7FD;
	box-shadow: 0 2px 3px 0 #051E38;
	border-radius: 4px;
}
#container{
	width: 100%;
	height: 1074px;
	background-color: @bgColor;
	.nav{
		background-color: #122442;
		height: 60px;
		position: relative;
		.icon{
			display: block;
			float: left;
			background-image: url(../../assets/icon_menu@2x.png);
			background-size: 40px;
			background-repeat: no-repeat;
			margin-left: 58px;
			width: 40px;
			height: 40px;
			margin-top: 10px;
			cursor: pointer;	
		}
		.crl{
			display: block;
			float: left;
			margin-left: 8px;
			font-family: PingFangSC-Medium;
			color: #00D1FF;
			letter-spacing: 0;
			line-height: 60px;
		}
		.icon-menu {
			position: absolute;
			top: 60px;
			height: 155px;
			width: 120px;
			background-color: white;
			margin-left: 65px;
			z-index: 1000;

			li {
				text-align: center;
				height: 30px;
				line-height: 30px;
				border-bottom: 1px solid red;
				cursor: pointer;
			}
		}
	}
	.container{
		display: flex;
		margin-bottom: 50px;
		background: #243554;
		.container-left{
			position: relative;
			width: 443px;
			height: 920px;
			margin-left: 56px;
			margin-top: 30px;
			.news-left{
				width: 443px;
				height: 274px;
				background-color: #152848;
				border-radius: 4px;
				&>p{
					height: 63px;
					line-height: 63px;
					font-size: 20px;
					padding-left:32px;
					font-family: PingFangSC-Regular;
					color: #8494A5;
					letter-spacing: 0;
					border-bottom: 2px solid @bgColor;
				}
				.news-wrap{
					width: 100%;
					.data-wrap{
						height: 48px;
						margin-top: 40px;
						.radio-data{
							display: inline-block;
							width: 12px;
							height: 12px;
							border-radius: 6px;
							background: #01D7FD;
							box-shadow: 0 2px 4px 1px #081828;
							margin-left: 35px;
							margin-bottom: 9px;
						}
						.data{
							display: inline-block;
							font-family: UniversLTStd-UltraCn;
							color: #FFFFFF;
							letter-spacing: -5;
							font-size: 48px;
						}
						&>span{
							font-family: PingFangSC-Regular;
							color: #8FACC8;
							letter-spacing: 0;
						}
					}
					.user-wrap{
					    height: 48px;
					    margin-top: 30px;
						.radio-user{
							display: inline-block;
							width: 12px;
							height: 12px;
							border-radius: 6px;
							background: #50E3C2;
							box-shadow: 0 2px 4px 1px #081828;
							margin-left: 35px;
							margin-bottom: 9px;
						}
						.user{
							display: inline-block;
							font-family: UniversLTStd-UltraCn;
							color: #FFFFFF;
							letter-spacing: -5;
							font-size: 48px;
						}
						&>span{
							font-family: PingFangSC-Regular;
							color: #8FACC8;
							letter-spacing: 0;
						}
					}
				}
			}
			.area-left{
				margin-top: 2px;
				width: 443px;
				height: 642px;
				background-color: #152848;
				border-radius: 4px;
				.area-wrap{
					display: flex;
					border-bottom: 2px solid @bgColor;
					padding: 0 32px;
					&>p{
					height: 47px;
					line-height: 47px;
					font-size: 20px;
					font-family: PingFangSC-Regular;
					color: #8494A5;
					}
					.area-list{
						flex:1;
						height: 47px;
						line-height: 47px;
						.selection-list {
								top:38px;
								li {
									height: 24px;
									line-height: 24px;
								}
							}
						.list-city{
							margin-left: 10px;
							li {
								height: 24px;
								line-height: 24px;
							}
						}
					}
				}
				.area-data{
					height: 593px;
					font-family: PingFangSC-Regular;
					color: #FFFFFF;
					letter-spacing: 0;
					.area-data-wrap{
						margin-top: 27px;
						padding: 0 32px;
						.area-table {
							background: rgba(31,53,89,0.5);
							border-radius: 4px;
							margin-top: 1px;
							:first-child {
								border-bottom: 0.5px solid #152848;
							}
							>li{
								height: 39px;
								line-height: 39px;
								
								>span {
									&:first-child{
										text-align: center;
										width: 150px;
										background: rgba(31,53,89,0.50);
									}
									&:last-child{
										text-align: center;
									}
								}
							}
						}
					}
					.show-data{
						height: 480px;
						margin: 80px 0 0 102px
					}
				}
			}
		}
		.container-right{
			flex:1;
			width:auto;
			margin: 30px 40px 50px 40px;
			height: 918px;
			&>div{
				width: 100%;
				height: 459px;
			}
			.normal-item {
				width: 100px;
			    height: 37px;
			    background: #122442;
			    line-height: 30px;
			    vertical-align: middle;
			    margin-top: -4px;
			}
			.hospital{
				.hospital-wrap{
					box-sizing: border-box;
					margin:0 10px;
					width: auto;
					height: 63px;
					line-height: 63px;
					border-bottom: 2px solid rgba(118,137,182,0.3);
					#radio-hospital{
						display: none;
					}
					.total-hospital{
						font-family: PingFangSC-Regular;
						color: #7689B6;
					}
					.hospital-list-province{
						display: inline-block;
						margin-left: 34px;
						margin-right: 11px;
						line-height: 24px;
					}
					.hospital-btn{
						.btn-span
					}
					.radio-hospital + label{
						.label
					}
					.radio-hospital:checked + label{
						.label-checked
					}
				}
				.hospital-echarts{
					width:100%;
					height: 350px;
					background-color: #152848;
					border-radius: 5px;
					margin-top: 30px;
				}
			}
			.country{
				.country-wrap{
					box-sizing: border-box;
					margin:0 10px;
					width: auto;
					height: 63px;
					line-height: 63px;
					border-bottom: 2px solid rgba(118,137,182,0.3);
					#radio-country{
						display: none;
					}
					.total-country{
						font-family: PingFangSC-Regular;
						color: #7689B6;
					}
					.country-list-year{
						display: inline-block;
						margin-left: 34px;
						margin-right: -1px;
						line-height: 24px;
					}
					.country-list-month{
						display: inline-block;
						margin-right: 11px;
						margin-left: -2px;
						line-height: 24px;
					}
					.country-btn{
						.btn-span
					}
					.radio-country + label{
						.label
					}
					.radio-country:checked + label{
						.label-checked
					}
				}
				.country-echarts{
					width:100%;
					height: 365px;
					background-color: #152848;
					border-radius: 5px;
					margin-top: 30px;
				}
			}
		}
		/*媒体查询布局Start*/
		@media screen and (max-width:1400px) {
			.container-left{
				width: 326px;
				height: 920px;
				margin-left: 40px;
				margin-top: 30px;
				.news-left{
					width: 326px;
					height: 240px;
					background-color: #152848;
					border-radius: 4px;
					&>p{
						height: 40px;
						line-height: 40px;
						font-size: 16px;
						padding-left:32px;
						font-family: PingFangSC-Regular;
						color: #8494A5;
						letter-spacing: 0;
						border-bottom: 2px solid @bgColor;
					}
					.news-wrap{
						width: 100%;
						.data-wrap{
							height: 48px;
							margin-top: 40px;
							.radio-data{
								display: inline-block;
								width: 12px;
								height: 12px;
								border-radius: 6px;
								background: #01D7FD;
								box-shadow: 0 2px 4px 1px #081828;
								margin-left: 25px;
								margin-bottom: 9px;
							}
							.data{
								display: inline-block;
								font-family: UniversLTStd-UltraCn;
								color: #FFFFFF;
								letter-spacing: -5;
								font-size: 35px;
							}
							&>span{
								font-family: PingFangSC-Regular;
								color: #8FACC8;
								letter-spacing: 0;
							}
						}
						.user-wrap{
						    height: 48px;
						    margin-top: 30px;
							.radio-user{
								display: inline-block;
								width: 12px;
								height: 12px;
								border-radius: 6px;
								background: #50E3C2;
								box-shadow: 0 2px 4px 1px #081828;
								margin-left: 25px;
								margin-bottom: 9px;
							}
							.user{
								display: inline-block;
								font-family: UniversLTStd-UltraCn;
								color: #FFFFFF;
								letter-spacing: -5;
								font-size: 35px;
								.count-des {font-size: 14px;}
							}
							&>span{
								font-family: PingFangSC-Regular;
								color: #8FACC8;
								letter-spacing: 0;
							}
						}
					}
				}
				.area-left{
					margin-top: 2px;
					width: 326px;
					height: 642px;
					background-color: #152848;
					border-radius: 4px;
					.area-wrap{
						display: flex;
						border-bottom: 2px solid @bgColor;
						padding: 0 25px;
						&>p{
						height: 47px;
						line-height: 47px;
						font-size: 16px;
						font-family: PingFangSC-Regular;
						color: #8494A5;
						font-size: 16;
						}
						.area-list{
							flex:1;
							height: 47px;
							line-height: 47px;
							.selection-list {
								top:38px;
							}
						}
					}
					.area-data{
						height: 593px;
						width: 326px;
						font-family: PingFangSC-Regular;
						color: #FFFFFF;
						letter-spacing: 0;
						.area-data-wrap{
							height: 80px;
							margin-top: 27px;
							padding: 0 32px;
							.area-table {
								background: rgba(31,53,89,0.50);
								border-radius: 4px;
								margin-top: 1px;
								:first-child {
									border-bottom: 0.5px solid #152848;
								}
								&>li{
									height: 39px;
									line-height: 39px;
									>span {
										&:first-child{
											text-align: center;
											width: 120px;
											background: rgba(31,53,89,0.50);
										}
										&:last-child{
											text-align: center;
										}
									}
								}
							}
						}
						.show-data{
							height: 480px;
							margin: 40px 0 0 48px;
						}
					}
				}
			}
			.container-right{
				flex:1;				
				width:auto;
				margin: 30px 40px 50px 40px;
				height: 918px;
				&>div{
					width: 100%;
					height: 459px;
				}
				.hospital{
					.hospital-wrap{
						box-sizing: border-box;
						margin:0 10px;
						width: auto;
						height: 63px;
						line-height: 63px;
						border-bottom: 2px solid rgba(118,137,182,0.3);
						#radio-hospital{
							display: none;
						}
						.total-hospital{
							font-family: PingFangSC-Regular;
							color: #7689B6;
						}
						.hospital-list-province{
							display: inline-block;
							margin-left: 34px;
							margin-right: 11px;
							line-height: 24px;
						}
						.hospital-btn{
							.btn-span
						}
						.radio-hospital + label{
							.label
						}
						.radio-hospital:checked + label{
							.label-checked
						}
					}
					.hospital-echarts{
						width:100%;
						height: 350px;
						background-color: #152848;
						border-radius: 5px;
						margin-top: 30px;
					}
				}
				.country{
					.country-wrap{
						box-sizing: border-box;
						margin:0 10px;
						width: auto;
						height: 63px;
						line-height: 63px;
						border-bottom: 2px solid rgba(118,137,182,0.3);
						#radio-country{
							display: none;
						}
						.total-country{
							font-family: PingFangSC-Regular;
							color: #7689B6;
						}
						.country-list-year{
							display: inline-block;
							margin-left: 34px;
							margin-right: -1px;
							line-height: 24px;
						}
						.country-list-month{
							display: inline-block;
							margin-right: 11px;
							margin-left: -2px;
							line-height: 24px;
						}
						.country-btn{
							.btn-span
						}
						.radio-country + label{
							.label
						}
						.radio-country:checked + label{
							.label-checked
						}
					}
					.country-echarts{
						width:100%;
						height: 365px;
						background-color: #152848;
						border-radius: 5px;
						margin-top: 30px;
					}
				}
			}
		}
		/*媒体查询布局End*/ 
	}
}
</style>
