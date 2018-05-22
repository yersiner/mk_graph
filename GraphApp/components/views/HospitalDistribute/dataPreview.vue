<template>
  	<div class="hos-left">
  	    <div class="left-info">
	  	      <!-- 医院类别Start -->
	  	      <div class="flip-container" :class="{hover: flipper_status}">
	  	      	<div class="flipper">
	  	      		<div class="front">
	  	      			<!-- front content -->
	  	      			  <div class="search">
	  	      			    <input type="text" v-model="hospitalName" name="" placeholder="碧海社区" class="fs16"/><div class="searchbtn inblock tec fs16">
	  	      			      <img src="../../../assets/search2x.png" class="cp" @click="search">
	  	      			    </div>
	  	      			  </div>
				  	      <LeftBar :data="areaData" @updateData="loadRegionData"></LeftBar>
	  	      		</div>
	  	      		<div class="back">
	  	      			<!-- back content -->
	  	      			<!-- 医院详情Start -->
				  	     <PreviewDetail :data="detailInfo"></PreviewDetail>
      					<!-- back content -->
	  	      		</div>
	  	      	</div>
	  	      </div>
	  	      <!-- 医院类别End -->
  	    </div>
  	</div>
</template>

<script>

import vSelect from "vue-select";

import PreviewDetail from "./previewDetail"
import LeftBar from "../CommonLeftBarInfo"
import {mapState} from 'vuex'

export default {
  name: 'dataPreview',
  components: {
  	//'areaList': AreaList,
  	//BMap,
  	vSelect,
  	PreviewDetail,
  	LeftBar
  },
  computed: {
  	/*...mapState('DistributeModule', [
       // map this.count to store.state.count
       'areaData'
    ])*/
    ...mapState({
    	areaData: state => state.DistributeModule.areaData,
    	flipper_status: state => state.DistributeModule.barToggle,
    	detailInfo: state => state.HospitalModule.detailInfo
    })
  },
  data () {
    return {
    	provinceSelected: '贵州省',
    	citySelected: '贵阳市',
    	districtSelected: '观山湖区',
    	hospitalName: '金阳'
    }
  },
  methods: {
	loadRegionData(regionInfo) {
		//加载左侧菜单栏信息
		this.$store.dispatch('DistributeModule/fetchHospitalAreaData', {
	   		province: regionInfo.province,
	   		prefecture: regionInfo.city
	    })
		console.log('regionInfoLoaded-->hosDistribute', regionInfo);
	},
  	backbtn() {
  		console.log('返回');
  	},
  	search() {
  		console.log('search');
  		this.$store.dispatch('DistributeModule/fetchPositionList', this.hospitalName)
  		/*this.$store.commit('DistributeModule/UPDATE_POSITION_LIST', {
            lng:106.6887843613,
            lat:26.6527625307
        })
        this.$store.commit('DistributeModule/UPDATE_POSITION_LIST', {
            lng:106.6247843613,
            lat:26.6927625307
        })
        */
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
	/* entire container, keeps perspective */
	.flip-container {
		perspective: 1000px;
	}
		/* flip the pane when hovered */
	    .flip-container.hover .flipper {
			transform: rotateY(180deg);
		}

	.flip-container, .front, .back {
		width: 100%;
	}

	/* flip speed goes here */
	.flipper {
		
		transition: 0.6s;
		transform-style: preserve-3d;

		position: relative;
	}

	/* hide back of pane during swap */
	.front, .back {
		backface-visibility: hidden;

		position: absolute;
		top: 0;
		left: 0;
	}

	/* front pane, placed above back */
	.front {
		z-index: 2;
		/* for firefox 31 */
		transform: rotateY(0deg);
	}

	/* back, initially hidden pane */
	.back {
		transform: rotateY(180deg);
	}
	.hos-left {
	    position: absolute;
	    left: 0;
	    top: 30px;
	    bottom: 0px;
	    z-index: 1000;
	    height: auto;
	    width: 443px;
	    margin-left: 56px;
	    z-index: 20;
	    .search {
	      height: 42px;
	      vertical-align: middle;
	      >input {
	      	outline: none;
	        height: 40px;
	        width: 363px;
	        text-indent: 32px;
	        line-height: 40px;
	        border: 0px;
	        color: #5D6985;
	        border-radius: 4px 0 0 4px; 
	        vertical-align: middle;
	      }
	      .searchbtn {
	        width: 80px;
	        height: 40px;
	        background: #347DFF;
	        border: 0px;
	        border-radius: 0px 4px 4px 0px;
	        vertical-align: middle;
	        >img {
	          margin-top: 5px;
	        }
	      }
	    }
	}
</style>