<template>
  <div class="healthRecords">
  	<!-- 左边布局 Start-->
  	<div class="health-left absolute">
  		<LeftBar :data="areaData" @updateData="loadRegionData"></LeftBar>
  	</div>
  	<!-- 左边布局 End -->
  	<!-- 右边布局Start -->
  	<div class="health-right">
  		<div class="right-title bottom-line relative">
			<div class="fl">
				<input type="text" v-model="conditions" name="" class="title-color name-number fs12" placeholder="请输入姓名或者编号">
			</div>
			<div class="fl sex bgmain">
				<v-select placeholder="请选择" v-model="selectedSex" class="select-item" :options="sexs"></v-select>
			</div>
			<div class="fl province">
				<region-picker 
				  :province="province"
				  :city="prefecture"
				  :twoSelect="true"
				  :auto="true"
				  @onchange="regionChanged">
				</region-picker>
			</div>
			<div @click="search" class="fl search tec cp inblock">
				<img src="../../assets/search1x.png" class="search-icon inblock">
				<span class="corfff searchbtn inblock fs12">搜索</span>
			</div>
			<div class="switch-item fr">
				<img v-if="isphoto" src="../../assets/chart.png" @click="showPhoto">
				<img v-if="!isphoto" src="../../assets/chart2.png" @click="showPhoto">

				<img v-if="!islist" src="../../assets/list.png" @click="showList">
				<img v-if="islist" src="../../assets/list2.png" @click="showList">
			</div>
  		</div>
  		<!-- <div class="opacityline"></div> -->
  		<!-- 列表Start -->
  		<div class="table-content">
  			<!-- 表格组件 -->
  			<div v-if="islist">
				<healthTable :data="recordData.regionCaseList"></healthTable>
	        	<ExportCurrent @exportEvent="exportEvent"></ExportCurrent>
				<DataTable :current="currentPage" :total="recordData.totalCount" @loadData="loadCurList" v-show="recordData.totalCount > 1"></DataTable>
  			</div>
  			
  			<!-- 照片组件 -->
  			<healthPhoto :current="currentPage" @loadData="loadCurList" :total="iconRecordData.totalCount" :data="iconRecordData.regionCaseList" v-if="isphoto"></healthPhoto>

  		</div>
  		<!-- 列表End -->
  	</div>
  	<!-- 右边布局End -->
  </div>
</template>

<script>
import HealthTable from "./healthRecord/healthTable.vue";
import HealthPhoto from "./healthRecord/healthPhoto.vue";
import vSelect from "vue-select";
import LeftBar from "./CommonLeftBarInfo"

import RegionPicker from "../widget/regionPicker.vue";//省市县

import REGION_DATA from "~/GraphApp/api/cityData";

import {mapState} from 'vuex'

import DataTable from "~/GraphApp/components/widget/DataTable.vue"

import ExportCurrent from "~/GraphApp/components/widget/exportCurrent.vue"

import _ from 'lodash'

RegionPicker.region = REGION_DATA

export default {
  name: 'healthRecords',
  components: {
  	LeftBar,
  	ExportCurrent,
  	vSelect,
  	DataTable,
  	RegionPicker,
  	'healthTable': HealthTable,
  	'healthPhoto': HealthPhoto
  },
  computed: {
  	...mapState('RecordModule', [
       // map this.count to store.state.count
       'recordData',
       'iconRecordData',
       'areaData'
     ])
  },
  data () {
    return {
    	currentPage: 1,
    	conditions: "",
    	prefecture:"",
    	selectedSex:{
    		label: '全部性别',
    		value: -1
    	},
    	islist: true,
    	isphoto: false,
    	sexs: [
    		{
    			label: '全部性别',
            	value: -1
    		},
    		{
    			label: '男',
            	value: 1
    		},
    		{
    			label: '女',
            	value: 2
    		}	
    	],
    	province: "贵州省",
    }
  },
  asyncData ({ store, route }) {
	   // 触发 action 后，会返回 Promise
	   return store.dispatch('RecordModule/queryHealthRecordList', {
	      conditions: '',
	      sex: -1,
	      province: '贵州省',
	      prefecture: '贵阳市',
	      page_index: 1,
	      item_count: 10
	   })
  },
  methods: {
  	exportEvent() {
  		this.$store.dispatch('RecordModule/exportHealthList', {
  		  exportIds:this.recordData.exportIds
  		}).then((res)=> {
  		  this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
  		})
  	},
  	loadCurList(currentPage) {
  		this.currentPage = currentPage||1
  		console.log('currentPage--<>>', this.currentPage)
  	    this.$store.dispatch('RecordModule/queryHealthRecordList', {
		      conditions: this.conditions,
		      sex: this.selectedSex.value,
		      province: this.province,
		      prefecture: this.prefecture,
		      page_index: currentPage,
		      item_count: 10
	   }).then((res)=> {
     		this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
     		if(this.isphoto) {
     			this.shuffle()
     		}
	   })
  	},
  	shuffle() {
  		setTimeout(()=>{
  			this.iconRecordData.regionCaseList = _.shuffle(this.iconRecordData.regionCaseList)
  		}, 10)
  	},
  	search() {
  		this.loadCurList(1);
  	},
  	loadRegionData(regionInfo) {
  		//加载左侧菜单栏信息
  		this.$store.dispatch('RecordModule/fetchHealthAreaData', {
	   		province: regionInfo.province,
	   		prefecture: regionInfo.city
	    })
  	},
  	regionChanged(regionInfo) {
  		this.province = regionInfo.province;
  		this.prefecture = regionInfo.city;
  	},
  	showPhoto: function () {//照片和列表切换
  		if(this.islist) {
			this.shuffle()
  		}
  		this.islist = false;
  		this.isphoto = true;
  	},
  	showList: function (argument) {
		this.islist = true;
  		this.isphoto = false;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.healthRecords .health-right select {
		margin-right: 10px;
	}
</style>
<style lang='less' scoped>
@opcityColor:rgb(118,137,182,0.7);

	/*健康档案*/
	.health-table .detail { 
		background: rgba(0,209,255,0.20);
		width: 47px;line-height: 47px;height: 20px;padding: 2px 12px;border-radius: 4px;
		border: 1px solid #00D1FF;
	}
	.healthRecords {
		width: 100%;
		min-height: 958px;
		margin-top: 30px;
		.health-left {
			width: 443px;
			margin-left: 56px;
		}
		.health-right {
			margin-right: 56px; 
			margin-left: 555px;
			.right-title {
				height: 63px;
				.name-number {
					outline: none;
					color: white;
					text-indent: 10px;
					width: 185px;
					border-radius: 4px;
					background-color: #122442;
					height: 40px;
					border: 0;
				}
				.sex,.province,.city {
					margin-left: 20px;
					height: 40px;
					border-radius: 4px;
					width: auto;
					.select-item {
						width: 100px;
						height: 40px;
						// line-height: 24px;
						.selection-wrap {
							.selection-show {
								height: 40px;
								line-height: 40px;
								background-color: #122442;
							}
							.selection-list{
								top: 40px;
							}
						}
					}
					
				}
				.sex {
					.selection-wrap {
						width: 90px;
					}
				}
				.search {
					height:40px;
					width:95px;
					border-radius: 4px;
					border: 2px solid #01D7FD;
					margin-left: 10px;
					margin-top: -2px;
					overflow: hidden;
					.search-icon {
						vertical-align:middle;
						margin-top: 13px;
					}
					.searchbtn {
						vertical-align:middle;
						margin-top: 8px;
					}
				}
				.switch-item {
					:last-child {
						margin-left: 30px;
					}
				}
				
			}
			.table-content {
				margin-top: 24px;
				padding: 0 10px;
			}
		}
		/*媒体查询布局Start*/
		@media screen and (max-width:1400px) {
			.health-left {
				width: 326px;
				margin-left: 40px;

				.info-overview {
					border-radius: 4px;
					margin-bottom: 1px;
					.title-des {
						height: 45px;
						line-height: 45px;
						padding: 0 24px;
						border-bottom: 1px solid #2C3D5D;
						>span {
							font-size: 16px;
						}
					}
					.info-content {
						padding: 30px 0 20px 0;
						.info-item {
							height: 45px;
							line-height: 45px;
							padding: 8px 24px;
							>.count {
								font-size: 32px;
							}
							>.count-des {
								font-size: 14px;
							}
							:first-child {
								width: 10px;
								height: 10px;
								border-radius: 4px;
							}
						}

					}
				}//区域数据
				.area-data {
					.data-title {
						height: 46px;
						line-height: 44px;
						padding: 0 32px;
						border-bottom: 1px solid #2C3D5D;
						>span {font-size: 16px;}
						.select-item {
							line-height: 24px;
						}
						.province {
							margin-right: 33px;
							
						}
					}
					.data-content {
						padding: 24px 32px;
							.data-wrap {
							height: 120px;
						}
						.bgkey {
							height: 40px;
							line-height: 40px;
							border-radius: 4px;
							margin-bottom: 1px;
							>span {
								font-size: 13px
							}
							:first-child {
								width: 80px;
								padding-right: 18px;
							}
						}
						.rate {
							margin-top: 40px;
							margin-left: 20px;
							height: 325px;
							}
					}
				}
			}
			.health-right {
				margin-right: 40px; 
				margin-left: 406px;
				.right-title {
					height: 63px;
					.name-number {
						text-indent: 10px;
						width: 185px;
						border-radius: 4px;
						background-color: #122442;
						height: 40px;
						border: 0;
					}
				}
			}

		}
		/*媒体查询End*/
	}
</style>
