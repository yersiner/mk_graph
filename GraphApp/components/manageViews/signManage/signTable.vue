<template>
  <div class="sign-table">
  	<table class="width100">
  		<thead>
		    <tr class="table-title bg-opcity">
		        <th class="number corfff fs14">居民编号</th>
		        <th class="name corfff fs14">姓名</th>
		        <th class="phone corfff fs14">手机</th>
		        <th class="address corfff fs14">所在区域</th>
		        <th class="patient-mark corfff fs14">病种</th>
		        <th class="account corfff fs14">用户账号</th>
		        <th class="sign-status corfff fs14">签约状态</th>
		        <th class="sign-hos corfff fs14">签约医院</th>
		        <th class="doctor corfff fs14">责任医生</th>
		        <th class="operation corfff fs14">操作</th>
		    </tr>
		</thead>
		<tbody id="mainShow" class="main-show">                      
            <tr v-for="(item, index) in tableData" :key="index">
                <td class="tec colortable fs12">{{item.number_no}}</td>
                <td class="tec colortable fs12">{{item.name}}</td>
                <td class="tec colortable fs12">{{item.phone}}</td>
                <td class="tec colortable fs12">{{item.address}}</td>
                <td class="tec colortable fs12">{{item.marking}}</td>
                <td class="tec colortable fs12">{{item.phone}}</td>
                <td class="tec colortable fs12" :class="[{fail: item.status === 3}]">{{item.status == 1?"正在审批":item.status == 2 && item.type ==1?"审批通过":item.status == 2 && item.type ==0?"已签约":item.status == 3?"审批失败":"停止"}}</td>
                <td class="tec colortable fs12">{{item.hospitalName}}</td>
                <td class="tec colortable fs12">{{item.doctorName}}</td>
                <td class="tec colortable fs12">
                    <router-link :to="{path: '/manage/signManage/detail/'+item.signId}">
                      <span class="detail colorbtn cp" @click="signDetail()">详情</span>
                    </router-link>
                </td>
            </tr>
        </tbody>
  	</table>
  	<!-- 分页Start -->
  	<div v-show="totalCount > 10">
  		<DataTable :total="totalCount" @loadData="loadCurList"></DataTable>
  	</div>
  </div>
</template>

<script>
import DataTable from "~/GraphApp/components/widget/DataTable.vue"
import { mapState } from 'vuex'
export default {
	name: 'signTable',
	components: {
		DataTable
	},
	data () {
		return {
		  conditions: ''
		}
	},
	asyncData ({ store, route }) {
	// 触发 action 后，会返回 Promise
	  return store.dispatch('SignModule/getList', {
	     conditions: '',
	     page_index: 1,
	     item_count: 10
	  })
	},
	methods: {
		signDetail() {
			console.log("详情");
		},
		//分页
  		loadCurList(currentPage) {
			this.$store.dispatch('SignModule/getList', {
             name: this.curName,
             page_index: currentPage,
             item_count: 10
          }).then((res)=> {
            this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
          })
  		}
	},
	computed: mapState('SignModule', {
	  //把vuex里面的状态取出来 给该组件去使用
	  // arrow functions can make the code very succinct!
	  tableData: state => state.list,
	  totalCount: state => state.totalCount
	})
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.sign-table {
	.table-title {
		height: 36px;
		line-height: 36px;
		>th {border-left: 1px solid #122442;margin-left: 1px;}
		.number {width: 10%;border-left: 0}
		.name {width: 8.8%}
		.phone {width: 10%;}
		.address {width: 15.5%;}
		.patient-mark {width: 12%}
		.account {width: 10%}
		.sign-status {width: 8%;}
		.sign-hos {width: 8.8%;}
		.doctor {width: 8%}
		.operation {width: 7%}
	}
	.main-show {
		height: 48px;
		line-height: 48px;
		>:nth-child(2n) {
			background-color: #2C3D5D;
		}
		.distribute, .detail {
			padding: 2px 4px;
			border-radius: 4px;
			border: 1px #0BA6CB solid;
			background: #1E4C6C;
		}
		.fail {
			color:#E34692;
		}
		

	}
}
</style>
