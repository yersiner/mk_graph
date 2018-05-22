<template>
  	<div id="container">
  		<CloudHead></CloudHead>
  		<div class="nav" @click="hideMenu">
  			<!--  -->
  			<span class="icon" @click="menuShow =! menuShow"></span>
  			<span class="crl">{{ guidances[nowIndex].name }}</span>
  			<!-- hover 显示菜单 -->
  			<transition name="slide-fade">
	    		<div v-if="menuShow" class="icon-menu">
	  				<ul>
	  					<router-link :key="index" class="fs16 item-menu" v-for="(item, index) in guidances" :to="{ path: item.path }" tag="li" active-class="active" @click.native="hideGuide(index)">{{ item.name }}</router-link>
	  				</ul>
	  			</div>
  			</transition>
  		</div>
		<keep-alive>
		<!-- 自定义组件 -->
    		<router-view></router-view>
  		</keep-alive>
  		<CloudFooter></CloudFooter>
  	</div>
</template>

<script>
import CloudHead from './Head';
import CloudFooter from './Footer';
export default {
  name: 'subApp',
  components: {
  	CloudHead,
  	CloudFooter
  },
  mounted() {
  	for(let i =0; i < this.guidances.length; i++) {
  		let item = this.guidances[i];
  		if(this.$route.name === item.path) {
  			this.nowIndex = i;
  		}
  	}
  },
  data () {
    return {
      test_data:'12,566,254,',
      user:'125',
      id:0,
      menuShow:false,
      nowIndex: 1,
      guidances:[
      		{
      			name: '医院分布',
      			path: 'hosDistribute'
      		},
      		{
      			name: '健康档案',
      			path: 'healthRecords'
      		},
      		{
      			name: '体格数据',
      			path: 'physicalData'
      		},
      		{
      			name: '病种分析',
      			path: 'diseAnalysis'
      		},
      		{
      			name: '疾病趋势',
      			path: 'diseTrend'
      		}
      ]
    }
  },
  methods: {
  	hideMenu(event) {
  		//console.log(event.target)
  		if(event.target.className === 'icon' || event.target.className === 'crl') return;
  		this.menuShow = false
  	},
    hideGuide (index) {
    	this.nowIndex = index;
    	this.menuShow = false;
    }
  }
}
</script>
<style lang='less'>
	.area-data {
	  .data-title {
	    height: 46px;
	    line-height: 44px;
	    padding: 0 32px;
	    .select-item {
	      line-height: 24px;
	    }
	    .province {
	      margin-right: 20px;  
	    }
	    select {
	    	width: 70px;
		    height: 30px;
		    background: #1F3559;
		    outline: none;
	    }
	  }
	}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
#container {
	position: relative;
    z-index: 10;
}
@bgColor:#243554;
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
   		font-size: 10px; 
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
	font-size: 12px;
	color: #FFFFFF;
	letter-spacing: 0;
	opacity: 0.7;
	border: 2px solid #01D7FD;
	box-shadow: 0 2px 3px 0 #051E38;
	border-radius: 4px;
}
#container{
	width: 100%;
	min-width: 768px;
	background-color: @bgColor;
	.nav{
		background-color: #122442;
		height: 60px;
		position: relative;
		.icon{
			display: block;
			float: left;
			background-image: url(../assets/icon_menu@2x.png);
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
			font-size: 20px;
			color: #00D1FF;
			letter-spacing: 0;
			line-height: 60px;
		}
		.icon-menu {
			position: absolute;
			top: 60px;
			width: 120px;
			background-color:#263F67;
			opacity: .9;
			margin-left: 65px;
			z-index: 1000;
			box-shadow: 0 5px 7px 0 #071735;
			border-radius: 0 0 4px 4px;
			ul {
				padding: 9px 0;
			}
			li {
				text-align: center;
				height: 36px;
				line-height: 36px;
				color:#8FACC8;
				cursor: pointer;
			}
			li:hover {
				color: white;
				opacity: 1;
				background: #172945;
			}
		}
	}
	.container{
		display: flex;
		.container-left{
			width: 443px;
			min-width: 443px;
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
					padding-left:32px;
					font-family: PingFangSC-Regular;
					font-size: 20px;
					color: #8494A5;
					letter-spacing: 0;
					border-bottom: 2px solid @bgColor;
				}
				.news-wrap{
					width: 100%;
					line-height: 125px;
					.data-wrap{
						height: 48px;
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
							font-size: 48px;
							color: #FFFFFF;
							letter-spacing: -5;
						}
						&>span{
							font-family: PingFangSC-Regular;
							font-size: 16px;
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
							font-size: 48px;
							color: #FFFFFF;
							letter-spacing: -5;
						}
						&>span{
							font-family: PingFangSC-Regular;
							font-size: 16px;
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
					&>p{
					height: 47px;
					line-height: 47px;
					margin:0 auto auto 32px;
					font-family: PingFangSC-Regular;
					font-size: 20px;
					color: #8494A5;
					letter-spacing: 0;
					min-width: 100px;
					}
					.area-list{
						flex:1;
						min-width: 300px;
						height: 47px;
						line-height: 47px;
						.list-wrap{
							float: right;
							min-width: 193px;
							vertical-align: middle;
							.list-sheng{
								display: inline-block;
								line-height: 24px;
							}
							.list-city{
								margin-left: 33px;
								margin-right: 19px;
								line-height: 24px;
								display: inline-block;
							}
						}
					}
				}
				.area-data{
					width: 443px;
					min-width: 443px;
					height: 593px;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #FFFFFF;
					letter-spacing: 0;
					.area-data-wrap{
						width: 378px;
						height: 80px;
						margin-top: 27px;
						&>ul{
							width: 378px;
							height: 40px;
							background: rgba(31,53,89,0.50);
							border-radius: 4px;
							margin-left: 32px;
							margin-top: 1px;
							&>li{
								list-style: none;
								display: inline-block;
								height: 39px;
								line-height: 39px;
								width: 224px;
								&:first-child{
									text-align: center;
									width: 149px;
									background: rgba(31,53,89,0.50);
								}
								&:last-child{
									box-sizing: border-box;
									padding-left: 30px;
								}
							}
						}
					}
					.show-data{
						width: 443px;
						height: 485px;
						background-color: rgba(118,137,182,0.3)
					}
				}
			}
		}
		.container-right{
			flex:1;
			min-width: 950px;
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
						font-size: 18px;
						color: #7689B6;
					}
					.hospital-list-sheng{
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
						font-size: 18px;
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
					height: 350px;
					background-color: #152848;
					border-radius: 5px;
					margin-top: 30px;
				}
			}
		}
	}
}
</style>
