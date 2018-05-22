<template>
	<div id="loadingToast" :class="load ? 'show' : 'hide'">
        <div class="weui-mask_transparent"></div>
        <Spinner :size="spinner_size" :font-size="spinner_font_size" :line-size="spinner_line_size" text-fg-color="#009900" message="正在加载.."></Spinner>
    </div>
</template>
<script>
  import Spinner from 'vue-simple-spinner'
  export default {
    name: "Loading",
    components: {
       Spinner
    },
    props: {
      load: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        innerStatus: this.load,
        spinner_line_size: 10,
        spinner_size: 85,
        spinner_font_size: 25,
        section: 'test Found'
      }
    }
  }
</script>
<style scoped>
  #loadingToast {
        position: absolute;
        width: 100%;
        z-index: 99999;
        /* height: 1024px; */
        top: 50%;
  }
  .weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}
  .weui-icon-warn {
    font-size: 35px;
    margin-bottom: 15px;
  }
	.hide {
		opacity: 0; display: none;
	}
	.show {
		opacity: 1;
		display: block;
	}
  .weui-toast__content {
    font-size: 12px;
  }
</style>