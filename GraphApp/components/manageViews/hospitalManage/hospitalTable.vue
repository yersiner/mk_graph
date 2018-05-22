<template>
  <div class="hospital">
  	<table class="width100">
  		<thead>
		    <tr class="table-title bg-opcity">
		        <th class="hospital-id corfff fs14">ID</th>
		        <th class="name corfff fs14">名称</th>
		        <th class="area corfff fs14">所在社区</th>
		        <th class="address corfff fs14">详情地址</th>
		        <th class="phone corfff fs14">联系电话</th>
		        <th class="grade corfff fs14">医院等级</th>
		        <th class="nature corfff fs14">医院性质</th>
		        <th class="count corfff fs14">管理家庭数</th>
		        <th class="status corfff fs14">授权状态</th>
		        <th class="operation corfff fs14">操作</th>
		    </tr>
		</thead>
		<tbody id="mainShow" class="main-show">                      
            <tr v-for="(item, index) in list" :key="index">
                <td class="tec colortable fs12">{{index + 1}}</td>
                <td class="tec colortable fs12">{{item.name}}</td>
                <td class="tec colortable fs12">{{item.nativeFlag}}</td>
                <td class="tec colortable fs12">{{item.address}}</td>
                <td class="tec colortable fs12">{{item.phone}}</td>
                <td class="tec colortable fs12">{{item.grade}}</td>
                <td class="tec colortable fs12">{{item.nature}}</td>
                <td class="tec colortable fs12">{{item.familyCount.$numberLong}}</td>
                <!-- <td class="tec colortable fs12" v-bind:class="[{status: item.authorization === false}]">{{item.authorization == true?"已授权":"未授权"}}</td> -->
                <td class="tec colortable fs12" v-bind:class="[{status: item.authorization === false}]">{{item.authorization == true?"已授权":"未授权"}}</td>
                <td class="tec colortable fs12">
                  	<router-link :to="{path: '#'}">
                      <span class="edit colorbtn cp" v-bind:class="[{activation:item.status === -99},{authorized:item.authorization === true}]" @click="authorizeClick(item.hospitalId,item.region_id,item.name,item.status,item.authorization)">账号授权</span>
                    </router-link>
                    <router-link :to="{path: '/manage/hospitalManage/edit/' + item.hospitalId}">
                      <span class="edit colorbtn cp" v-bind:class="[{activation:item.status === -99}]" @click="edit(item.hospitalId,item.region_id,item.name,item.status,item.authorization)">编辑</span>
                    </router-link>
                    <router-link :to="{path: '/manage/hospitalManage/detail/' + item.hospitalId}">
                      <span class="detail colorbtn cp" v-bind:class="[{activation:item.status === -99}]">详情</span>
                    </router-link>
                    <router-link :to="{path: '#'}">
                      <span class="logout colorbtn cp" v-bind:class="{status:item.status === -99}" @click="logoutClick(item.hospitalId,item.region_id,item.name,item.status)">{{item.status == 0?"注销":"激活"}}</span>
                    </router-link>
                </td>
            </tr>
        </tbody>
  	</table>
	
    <!-- 注销账号Start -->
    <my-popup :is-show="isLogout" @on-close="closePopup('isLogout')">
  		<my-logout :parameter="logoutParm" @closeEvent="closeEvent"></my-logout>
    </my-popup>
    <!-- 授权分配 Start -->
    <my-popup :is-show="isAuthor" @on-close="closePopup('isAuthor')">
      <authorize :parameter="authorizeParm" @closeEvent="closeEvent"></authorize>
    </my-popup>
    <!-- 授权分配 End -->
    <!-- 请先激活 Start -->
    <my-popup :is-show="isActive" @on-close="closePopup('isActive')">
      <my-activation :parameter="activeParm" @closeEvent="closeEvent"></my-activation>
    </my-popup>

  </div>
</template>

<script>
import Popup from '../../widget/popup.vue'
import Authorize from './authorize'
import Logout from '../../widget/logout.vue'
import Activation from '../../widget/activation.vue'

export default {
  name: 'hospitalTable',
  props: {
    list:{
      type:Array,
      default:[]
    }
  },
  components: {
  	'my-popup': Popup,
  	'authorize': Authorize,
  	'my-logout': Logout,
    'my-activation':Activation
  },
  data () {
    return {
    	isAuthor: false,
    	isLogout: false,
      isActive: false,
      authorizeParm:{},
      logoutParm:{},
      activeParm:{},
      editParm:{}
    }
  },
  methods:{
      edit (hospitalId,region_id,name,status) {
          /*if (status == 0) {
              this.editParm = {
                hospitalName:name,
                hospitalId:hospitalId,
                region_id:region_id
            }
          }else {
            this.isActive = true;
            this.activeParm = {
              hospitalName:name
            }
          }*/
      },
      //授权
      authorizeClick(hospitalId,region_id,name,status,authorization) {
        console.log('点击了授权',authorization,status);
        //当为激活状态下
        if (status == 0) {
          //并且HIA没有被授权
          if (authorization == false) {
              this.authorizeParm.authordes = "已经授权，不能重复操作"
              this.authorizeParm.hospitalName = name,
              this.authorizeParm.hospitalId = hospitalId,
              this.authorizeParm.region_id = region_id
              this.isAuthor = true;
          }
        }else {
          this.isActive = true;
          this.activeParm = {
            hospitalName:name
          }
        }     
        
      },
      //注销
      logoutClick(hospitalId,region_id,name,status) {
  		  this.isLogout = true;
        this.logoutParm = {
          name:name,
          _id:hospitalId,
          region_id:region_id,
          status:status,
          category:'hospital'
        }
  	  },
      closePopup (attr) {
        this[attr] = false;
      },
      //关闭
      closeEvent() {
        this.isLogout = false;
        this.isAuthor = false;
        this.isActive = false;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.hospital {
	.table-title {
		height: 36px;
		line-height: 36px;
    >th {border-left: 1px solid #122442;}
		.hospital-id {width: 7%;border-left: 0}
		.name {width: 10.6%;}
		.area {width: 6.2%;}
		.address {width: 16%;}
		.phone {width: 10.6%;}
		.grade {width: 6.2%}
		.nature {width: 6.2%}
		.count {width: 8%;}
		.status {width: 6.2%}
		.operation {width: 20.4%}

	}
	.main-show {
		height: 48px;
		line-height: 48px;
		>:nth-child(2n) {
			background-color: #2C3D5D;
		}
    .status {
      color: #E34692;
    }
    .activation {
      color: #999;
    }
    .authorized {
      color: #999;
    }
		.authorize,.edit,.detail {
			padding: 2px 4px;
			border-radius: 4px;
			border: 1px #0BA6CB solid;
			background: #1E4C6C;
		}
    .logout {
      padding: 2px 4px;
      border-radius: 4px;
      border: 1px #0BA6CB dashed;
      // background: rgba(1,215,253,0.10);
    }
	}
}
</style>
