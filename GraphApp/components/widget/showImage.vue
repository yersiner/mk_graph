<template>
  <div class="show-image">
  	<img src="../../assets/close.png" alt="" class="delete-img cp" @click="deleteMethod()">
    <div class="content tec fs20">
      	<img :src="'http://qn.newmicrotech.cn/' + parameter.hash" alt="">
    </div>
  </div>
</template>

<script>

export default {
    name: 'logout',
    props: {
      parameter: {
        type:Object,
        default:function() {
          return {
            index:'',
            hash:''
          }
        }
      }
    },
    data () {
      return {
        isShow:true
      }
    },
    methods: {
      deleteMethod () {
      	this.$emit('closeEvent');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.show-image {
  	.content {
	    margin: 20px 20px 20px 20px;
	    background: rgba(2,45,96,0.80);
	    border-radius: 8px;
		    >img {
		    	width: 560px;
		        height: 402px;
		        display: inline-block;
	    }
    }
	.delete-img {
		position: absolute;
		top: -60px;
		right: -60px;
		width: 40px;
		height: 40px;
	}
}
</style>
