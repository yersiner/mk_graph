<template>
		<div id="leftBarLoader" v-show="load">
	        <div class="mask_transparent"></div>
	        <RingLoader :loading="load"></RingLoader>
	    </div>
</template>
<script>
  import RingLoader from '~/GraphApp/components/widget/loader/RingLoader'
  export default {
    name: "leftBarLoader",
    components: {
       RingLoader
    },
    props: {
      load: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
         
      }
    }
  }
</script>
<style scoped>
	#leftBarLoader {
	      position: absolute;
	      width: 100%;
	      z-index: 99999;
	      height: 700px;
	      top: 0;
	}
	.mask_transparent{
	    height: 700px;
	}
</style>