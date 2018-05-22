<template>
  <div id="manage">
      <CloudHead></CloudHead>
      <div class="container">
        
        <div class="manage-left">
          <ul>
            <router-link :key="index" v-for="(item, index) in manages" class="cp fs16" :to="{ path: item.path }" tag="li" active-class="active">
                <i :class="['iconfont','icon-normal_' + index]"></i>{{ item.name }}
              </router-link>
          </ul>
          <div class="left-bottom-shadow"></div>
        </div>
        <div class="manage-right">
          <keep-alive>
              <router-view></router-view>
          </keep-alive>
        </div>
       
      </div>
      <CloudFooter></CloudFooter>
  </div>
</template>
<script>

import CloudHead from './Head';
import CloudFooter from './Footer';
export default {
  name: 'manageApp',
  components: {
    CloudHead,
    CloudFooter
  },
  data () {
    return {
    	isActive:false,
      	manages: [
        {
          name: '医院管理',
          path: '/manage/hospitalManage',
          active: true
        },
        {
          name: '签约管理',
          path: '/manage/signManage',
          active: false
        },
        {
          name: '体格管理',
          path: '/manage/physiqueManage',
          active: false
        },
        {
          name: '服务管理',
          path: '/manage/serviceManage',
          active: false
        },
        {
          name: '设备管理',
          path: '/manage/deviceManage',
          active: false
        },
        {
          name: '健康常识',
          path: '/manage/healthyManage',
          active: false
        },
        {
          name: '账号管理',
          path: '/manage/accountManage',
          active: false
        },
        {
          name: '信息管理',
          path: '/manage/infoManage',
          active: false
        },
        {
          name: '系统设置',
          path: '/manage/systemManage',
          active: false
        },
      ],
    }
  },
  methods: {
        toggle: function(){
            this.isActive = !this.isActive;
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@hoverBc:rgba(39,64,106,1);
.container{
	display: flex;
  background: #243554;
  height: inherit;
	.manage-left{
		position: relative;
		width:220px;
		background: #122442;
		.left-bottom-shadow{
			position: absolute;
			bottom: 0px;
			width: 220px;
			height: 15px;
			background-image: linear-gradient(0deg, #051329 3%, #122442 100%);
		}
		ul{
			list-style: none;
			color: #fff;
			margin-top: 56px;
			.active{
				color: #fff;
				&::after{
				position: absolute;
				content: '';
				width:5px;
				height: 40px;
				left: 0;
				background-image: linear-gradient(89deg, #04BBE4 0%, #059AFF 100%);
				}
			}
			li{
				display: block;
				position: relative;
				font-family: PingFangSC-Regular;
				height: 40px;
				line-height: 40px;
				text-align: center;
				margin-bottom: 21px;
				color: #8FACC8;
        .iconfont {
          margin-right: 20px;
          height: 20px;
          width: 20px;
          display: inline-block;
          font-size: 22px;
        }
				&:last-child{
					margin-bottom: 0px;
				}
				&:hover,&:active{
					color: #fff;
					&::after{
					position: absolute;
					content: '';
					width:5px;
					height: 40px;
					left: 0;
					background-image: linear-gradient(89deg, #04BBE4 0%, #059AFF 100%);
					}
				}
			}
		}
	}
	.manage-right{
		flex:1;
    margin-bottom: 100px;
    min-height: 750px;
	}
  @media screen and (max-width: 1400px) {
    .manage-left{
      position: relative;
      width:162px;
      background: #122442;
      .left-bottom-shadow{
        position: absolute;
        bottom: 0px;
        width: 162px;
        height: 15px;
        background-image: linear-gradient(0deg, #051329 3%, #122442 100%);
      }
      ul{
        list-style: none;
        color: #fff;
        margin-top: 56px;
        .active{
          color: #fff;
          &::after{
          position: absolute;
          content: '';
          width:5px;
          height: 40px;
          left: 0;
          background-image: linear-gradient(89deg, #04BBE4 0%, #059AFF 100%);
          }
        }
        li{
          display: block;
          position: relative;
          font-family: PingFangSC-Regular;
          height: 40px;
          line-height: 40px;
          text-align: center;
          margin-bottom: 21px;
          color: #8FACC8;
          &:last-child{
            margin-bottom: 0px;
          }
          &:hover,&:active{
            color: #fff;
            &::after{
            position: absolute;
            content: '';
            width:5px;
            height: 40px;
            left: 0;
            background-image: linear-gradient(89deg, #04BBE4 0%, #059AFF 100%);
            }
          }
        }
      }
    }
    .manage-right{
      flex:1;
    }
  }
}
</style>