<template>
  <div class="sign">
  	<div class="sign-wrap">
  		<span class="sign-item cp fs16">签约居民</span>
  	</div>
	<div class="sign-container">
		<!-- <signTable></signTable> -->
		<keep-alive>
  			<router-view></router-view>
  		</keep-alive>
	</div>
	
  </div>
</template>

<script>
import SignTable from './signManage/signTable'
export default {
  	name: 'signManage',
  	components: {
  		'signTable':SignTable
  	},
  	data () {
    	return {
      		msg:"hospital2.vue test"
    	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@bgColor:#243554;

.sign{
	width: auto;
	background-color: @bgColor;
	
	color: #fff;
	.sign-wrap {
		height: 60px;
		line-height: 60px;
		padding: 0px 60px;
		background: #1B2E4C;
		.sign-item {
			display: inline-block;
			text-align: center;
			line-height: 52px;
			width: 64px;
			height: 52px;
			color: #01D7FD;
			border-bottom: 4px solid #01D7FD;
		}
	}
	.sign-container {
		margin-top: 70px;
		padding: 0 42px;
	}
}
</style>
