<template>
  <div class="export-current inblock">
  	<button @click="exportBtn" class="cp">导出当前</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  	name: 'exportCurrent',
  	components: {
  		
  	},
  	data () {
    	return {
      		
    	}
  	},
  	methods: {
  		exportBtn() {
  			console.log("点击了导出组件");
  			this.$emit('exportEvent');
  		}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.export-current {
	height: 191px;
	line-height: 191px;
	>button {
        outline: none;
		width: 130px;
	    height: 32px;
	    background:#175E97;
	    border-radius: 4px;
	    border: 0;
	    font-family: PingFangSC-Regular;
	    font-size: 16px;
	    color: #E5EBEF;
	    letter-spacing: 0;
        box-shadow: 3px 3px 3px #051E38;
        position: relative;
        top: -45px;
	}
}
</style>