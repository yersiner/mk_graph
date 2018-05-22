<template>
  <div class="hosptial-container">
  	{{msg}}
    <button @click="test">测试</button>
  </div>
</template>

<script>
export default {
  	name: 'serviceManage',
  	data () {
    	return {
      		msg:"hospital4.vue test"
    	}
  	},
    methods: {
      test() {
        console.log('ceshi')
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
