<template>
  <div class="hosptial-container">
  	<div class="account-wrap">
  		<router-link :to="{path: '/manage/accountManage/list'}"><span class="list-account cp">账号管理</span></router-link>
  		<router-link :to="{path: '/manage/accountManage/add/normal'+ ''}"><span class="add-account cp">添加账号</span></router-link>
  		<router-link v-show="$route.params.id && $route.params.id !=='normal'" :to="{path: '/manage/accountManage/edit/'+ $route.params.id}"><span class="add-account cp">编辑账号</span></router-link>
  	</div>
  	<div class="content-view">
  		<keep-alive>
  			<router-view></router-view>
  		</keep-alive>
  	</div>
  </div>
</template>

<script>
export default {
  	name: 'accountManage',
  	data () {
    	return {
    	}
  	},
  	methods: {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.hosptial-container .account-wrap span {
	color: #FFF;
}
.hosptial-container .account-wrap .active span{
	line-height: 52px;
	color: #01D7FD;
	width: 64px;
	border-bottom: 4px solid #01D7FD;
}
.hosptial-container{
	background-color: #243554;
	color: #fff;
	.account-wrap {
		background: #1B2E4C;
		height: 60px;
		padding: 0 60px;
		line-height: 60px;
		.list-account {
			display: inline-block;
			text-align: center;
			font-size: 16px;
		}
		.add-account {
			margin-left: 70px;
			display: inline-block;
			text-align: center;
			font-size: 16px;
		}
		
	}
	.content-view {
		padding: 0 41px;
		margin-top: 70px;
	}
}
</style>
