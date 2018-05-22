<template>
  <div class="hosptial-container">
  	{{msg}}
  </div>
</template>

<script>
export default {
  	name: 'deviceManage',
  	data () {
    	return {
      		msg:"hospital5.vue test"
    	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@bgColor:#243554;

.hosptial-container{
	width: auto;
	height: 912px;
	background-color: @bgColor;
	padding: 0 42px;
	color: #fff;
	text-align: center;
}
</style>
