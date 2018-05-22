<template>
	<div>
      <div class="hos-detail">
          <div class="base-info">
	          <div class="info-title">
	            <span class="title-color fs20 fl">基本信息</span>
	            <span class="corfff fs20 fr cp" @click="backbtn()">返回</span>
	          </div>
	          <div class="info-content">
  	            <ul class="">
	  	           <li class="bgkey">
	  	             <span class="corfff inblock bgtablel fs16 ter">名称</span>
	  	             <span class="corfff fs16">{{data.name}}</span>
	  	           </li>
	  	           <li class="bgkey">
	  	             <span class="corfff inblock bgtablel ter fs16">等级</span>
	  	             <span class="corfff fs16">{{data.grade}}</span>
	  	           </li>
	  	           <li class="bgkey">
	  	             <span class="corfff inblock bgtablel ter fs16">性质</span>
	  	             <span class="corfff fs16">{{data.nature}}</span>
	  	           </li>
	  	           <li class="bgkey">
	  	             <span class="corfff inblock bgtablel ter fs16">所在地区</span>
	  	             <span class="corfff fs16">{{data.nativeFlag}}</span>
	  	           </li>
	  	           <li class="bgkey">
	  	             <span class="corfff inblock bgtablel ter fs16">详情地址</span>
	  	             <span class="corfff fs16">{{data.address}}</span>
	  	           </li>
  	            </ul>
	          </div>
          </div>
      </div>
	<!-- 医院详情End -->
	   <!-- 区域数据Start -->
	   <div class="area-data">
	             <div class="data-title title-des bgmain bottom-line relative">
	   	            <span class="fs20 title-color inblock">业务信息</span>
	             </div>
	     	  <div class="data-content bgmain">
	   	            <ul class="">
	     	            <li class="bgkey">
	     	              <span class="corfff inblock bgtablel fs16 ter">签约家庭</span>
	     	              <span class="corfff fs16">{{data.familyCount}}</span>
	     	            </li>
	     	            <li class="bgkey">
	     	              <span class="corfff inblock bgtablel ter fs16">覆盖人数</span>
	     	              <span class="corfff fs16">{{data.userCount}}</span>
	     	            </li>
	   	            </ul>
	   	            <!-- 圆柱表 Start-->
	   	            <div class="followup-rate bgmain">
	   	              	  <graphCircle :percentObject="{resultcout: data.joinPercent + '%',resultdes:'加入云病房比例'}"></graphCircle>
	   	            </div>
	   	            <!-- 圆柱表End -->
	     	   </div>
	   </div>
	</div>
</template>

<script>

import graphCircle from "~/GraphApp/components/widget/GraphCircle";


export default {
  name: 'PreviewDetail',
  components: {
  	//'areaList': AreaList,
  	//BMap,
  	graphCircle
  },
  props: {
  	data: {}
  },
  data () {
    return {
    	name: '医院详情'
    }
  },
  methods: {
  	backbtn() {
       this.$store.commit('DistributeModule/DETAIL_PANE_TOGGLE')
  		console.log('返回');
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
    .hos-detail {
	    .base-info {
	      background-color: #122442;
	      border-radius: 4px;
	      margin-bottom: 1px;
	    }
	    .business-info {
	      background-color: #122442;
	    }
	    .info-title {
	      height: 62px;
	      line-height: 62px;
	      padding: 0 32px;
	      border-bottom: 0.5px solid #2C3D5D;
	    }
	    .info-content {
	      padding: 24px 32px;
	      li {
	        height: 40px;
	        line-height: 40px;
	        border-radius: 4px;
	        margin-bottom: 1px;
	        :first-child {
	          width: 80px;
	          padding-right: 18px;
	        }
	        :last-child {
	          padding: 0 18px;
	        }
	      }
        :last-child {
          height: auto;
        }
        .followup-rate {
          height: 300px;
          margin-top: 40px;
          margin-left: 66px;
        }
      }
      
    }
    
    .area-data {
      .data-title {
        height: 46px;
        line-height: 44px;
        padding: 0 32px;
      }
      .data-content {
        padding: 24px 32px;
        .bgkey {
          height: 40px;
          line-height: 40px;
          border-radius: 4px;
          margin-bottom: 1px;
          :first-child {
            width: 80px;
            padding-right: 18px;
          }

        }
      }
    }
    .followup-rate {
      height: 260px;
      margin-top: 40px;
      margin-left: 66px;
    }
</style>