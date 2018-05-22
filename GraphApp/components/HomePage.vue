<template>
  <div class="homepage absolute">
  	<!-- 顶部Start -->
  	<div class="homepage-top">
  		<div class="quit">
        <img src="../assets/close-icon.png" alt="" style="margin-right:40px;margin-top:30px;" class="fr inblock quitbtn" @click="quitMethod()">
  		</div>
  		<div class="top-title tec fs32">
  			米可医疗社区智慧健康大数据管理平台
  		</div>
  	</div>
  	<!-- 顶部End -->
  	<!-- 展示页Start -->
  	<div class="home-show">
      <carousel-3d :width="300" :height="300" :inverse-scaling="400" :space="450" :autoplay="false" :display="5">
        <slide v-for="(slide, index) in slides" :index="index" :key="index">
          <!-- <div class="pic-content"> -->
            <router-link :to="{path: slide.url}">
              <!-- <img src="../assets/view0.png"> -->
              <img :src='"../assets/view"+index+".png"'>
            </router-link>
        </slide>
      </carousel-3d>
  	</div>
  	<!-- 展示页End -->
  	<!-- 功能页Start -->
  	<div class="home-manane">
  		<div class="manage-wrap">
  			<ul>
          <!-- <li class="fl cp" v-for="(item,index) in item">{{item.label}}</li> -->
          <router-link v-for="(item,index) in items" :to="{path: item.url}" :key="index">
            <li class="fl cp">{{item.label}}</li>
          </router-link>
  			</ul>
  		</div>
      <div class="footer tec corfff absolute fs12">
        依托移动互联、物联网、云计算等信息技术构建智慧医疗
      </div>
  	</div>
  	<!-- 功能页End -->
    
  </div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
	export default {
		name: 'homepage',
    components: {
      Carousel3d,
      Slide
    },
		data() {
			return {
				name: '',
        slides: 5,
        slides: [
          {
            title:'体格统计',
            value: 0,
            url:'/view/physicalData'
          },
          {
            title:'健康档案',
            value: 1,
            url:'/view/healthRecords'
          },
          {
            title:'医院分布',
            value: 2,
            url:'/view/hosDistribute'
          },
          {
            title:'病种分析',
            value: 3,
            url:'/view/physicalData'
          },
          {
            title:'疾病趋势',
            value: 4,
            url:'/view/physicalData'
          }
        ],
        titles:['体格统计','健康档案','医院分布','病种分析','疾病趋势'],
        items:[
          {
            label:'账号管理',
            url:'/manage/accountManage/list'
          },
          {
            label:'医院管理',
            url:'/manage/hospitalManage/list'
          },
          {
            label:'签约管理',
            url:'/manage/signManage/list'
          },
          {
            label:'服务管理',
            url:'/manage/serviceManage/list'
          },
          {
            label:'设备管理',
            url:'/manage/deviceManage/list'
          }
        ]
			}
		},
    methods: {
      showMethod(index) {
        // console.log('点击了',index);
      },
      quitMethod() {
        this.$store.commit('SET_TOKEN', null)
        this.$router.push('/login');
      }
    },
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.homepage {
  background: #100838;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .homepage-top {
    height: 20%;
    .quit {
      height: 80%

    }
    .top-title {
      color:rgba(1,215,253,1);
      letter-spacing:5px;
    }
  }
  .home-show {
    padding-top: 5%;
    height: 50%;
    .pic-content {
      background: #0B113D;
    }
  }
  .home-manane {
    height: 20%;
    padding: 0 5%;
    .manage-wrap {
      height: 60px;
    }
    li {
      color: #FFFFFF;
      height: 48px;
      line-height: 48px;
      border: 1px solid #4F546E;
      border-radius: 4px;
      width: 10%;
      margin: 0 4.8%;
      text-align: center;
    }
    .footer {
      bottom: 0px;
      height: 50px;
      line-height: 50px;
      left: 50%;
      margin-left: -150px;
    }
  }
  .show-content {
    width: 80%;
  }
  // 设置展示页
  .carousel-3d-container {
    .carousel-3d-slide {
      padding: 20px;
      background: #0B113D;
      .title { font-size: 22px; }
    }
  }
}
</style>
