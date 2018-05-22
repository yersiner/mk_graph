<template>
  <div class="hosptial-container">
  	<div class="hosptial-wrap">
  		<router-link :to="{path: '/manage/hospitalManage/list'}"><span class="list-hospital tec inblock cp">医院列表</span></router-link>
  		<router-link :to="{path: '/manage/hospitalManage/add/normal'+ ''}"><span class="add-hospital tec inblock cp">添加医院</span></router-link>
  		<router-link v-show="$route.params.id && $route.params.id !=='normal'" :to="{path: '/manage/hospitalManage/edit/'+ $route.params.id}"><span class="add-hospital tec inblock cp">编辑医院</span></router-link>
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
		name: 'hospitalManage',
		data() {
			return {
				name: 'list'
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

@bgColor:#243554;
.hosptial-container .hosptial-wrap span {
	color: #FFF;
}
.hosptial-container .hosptial-wrap .active span{
	border: none;
	line-height: 52px;
	color: #01D7FD;
	width: 64px;
	border-bottom: 4px solid #01D7FD;
}

.hosptial-container{
	
	background-color: @bgColor;
	.hosptial-wrap{
		
		height: 60px;
		line-height: 60px;
		padding: 0 60px;
		background: #1B2E4C;
		.list-hospital{
			width: 64px;
			height: 52px;
			font-size: 16px;
		}
		.add-hospital{
			margin-left: 70px;
			width: 64px;
			height: 52px;
			font-size: 16px;
		}
	}
	.content-view {
		padding: 0 41px;
		margin-top: 70px;
	}
}
</style>
