<template>
  <div class="list-page">
  	<!-- 账号管理table Start -->
	  	<div class="account-table">
	  		<table class="width100">
		  		<thead class="table-head">
				    <tr class="table-title bg-opcity">
				        <th class="corfff fs14 user-name">用户名</th>
				        <th class="corfff fs14 user-phone">联系电话</th>
				        <th class="corfff fs14 user-title">职务</th>
				        <th class="corfff fs14 operation">操作</th>
				    </tr>
				  </thead>
				<tbody id="mainShow" class="main-show">                      
		            <tr v-for="(item, index) in accountData" :key="index">
		                <td class="tec colortable fs12">{{item.name}}</td>
		                <td class="tec colortable fs12">{{item.phone}}</td>
		                <td class="tec colortable fs12">{{item.title}}</td>
		                <td class="tec colortable fs12">
		                	<router-link :to="{path:'/manage/accountManage/powset/' + item.accountId}">
		                		<span class="colorbtn authorize cp" v-bind:class="[{activation:item.status === -99}]">权限设置</span>
		                	</router-link>
		                	<router-link :to="{path:'/manage/accountManage/edit/' + item.accountId }">
		                		<span class="colorbtn authorize cp" v-bind:class="[{activation:item.status === -99}]" @click="edit(item.name,item.password,item.title,item.phone,item.accountId)">编辑</span>
		                	</router-link>
		                	<router-link to="#">
		                		<span class="colorbtn logout cp" v-bind:class="{status:item.status === -99}" @click="logoutClick(item.accountId,item.status,item.name)">注销</span>
		                	</router-link>
		                </td>
		            </tr>
		            
		        </tbody>
	  		</table>
	  	</div>
		  <div>
          <!-- <ExportCurrent @exportEvent="exportEvent()"></ExportCurrent> -->
          <DataTable :total="totalCount" @loadData="loadCurList" v-show="totalCount>10"></DataTable>
        </div>

	  	<my-popup :is-show="isLogout" @on-close="closePopup('isLogout')">
	  		<my-logout :parameter="logoutParm"  @closeEvent="closeEvent"></my-logout>
	    </my-popup>
	    <!-- 请先激活 Start -->
	    <my-popup :is-show="isActive" @on-close="closePopup('isActive')">
	      <my-activation :parameter="activeParm" @closeEvent="closeEvent"></my-activation>
	    </my-popup>
	<!-- 账号管理table End -->
  </div>
</template>

<script>
import Popup from '../../widget/popup.vue'
import Logout from '../../widget/logout.vue'
import Activation from '../../widget/activation.vue'
import DataTable from "~/GraphApp/components/widget/DataTable.vue"
import ExportCurrent from "../../widget/exportCurrent.vue"
import { mapState } from 'vuex'
export default {
  	name: 'addAccount',
  	components: {
  		'my-popup': Popup,
  		'my-logout': Logout,
  		'my-activation':Activation,
  		DataTable,
  		ExportCurrent
  	},
  	data () {
    	return {
      		isLogout: false,
      		isActive: false,
      		logoutParm:{},
      		activeParm:{},
      		editParm:{}
    	}
  	},
  	asyncData ({ store, route }) {
       // 触发 action 后，会返回 Promise
       return store.dispatch('AccountModule/queryAccountList', {
          conditions: '',
          page_index: 1,
          item_count: 10
       })
    },
  	methods: {
  		//分页
  		loadCurList(currentPage) {
            //console.log('test--current');
          this.$store.dispatch('AccountModule/queryAccountList', {
             name: this.curName,
             page_index: currentPage,
             item_count: 10
          }).then((res)=> {
            
          })
      	},
      	//导出
      	exportEvent(){

      	},
  		//编辑
  		edit(naem,password,title,phone,accountId) {
  			console.log("编辑");
  		},
  		//注销
  		logoutClick (accountId,status,name) {
  			this.isLogout = true;
  			this.logoutParm = {
  				_id:accountId,
  				status:status,
  				name:name,
  				category:'account'
  			}
  		},
  		logout () {
  			this.isLogout = true;
  		},
  		closePopup (attr) {
  			this[attr] = false;
  		},
  		closeEvent () {
  			this.isLogout = false;
  			this.isActive = false;
  		}
  	},
  	computed: mapState('AccountModule', {
      //把vuex里面的状态取出来 给该组件去使用
      // arrow functions can make the code very succinct!
      accountData: state => state.list,
      totalCount: state => state.totalCount,
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@bgColor:#243554;
.list-page {

	border-top: 0.5px solid #3C4E78;
	margin-top: 40px;
	.account-table {
		margin-top: 30px;
    th:not(:first-child) {border-left: 1px solid #122442}
		.table-head {
			height: 36px;
			line-height: 36px;
      .user-name,.user-name,.operation {
        width: 18%;
      }
      .user-phone, .user-title{
        width: 23%;
      }
		}
		.main-show {
			>tr {
				height: 48px;
				line-height: 48px;
				.status {
					color: #E34692
				}
				.activation {
					color: #999;
				}
				.authorize,.edit {
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
			>:nth-child(2n) {
				background-color: #2C3D5D;
			}
		}
	}
	
}
</style>