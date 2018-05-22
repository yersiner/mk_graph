<template>
  <div class="hosptial-container">
  	{{msg}}
    <span @click="popupClick">弹出</span>
    <my-popup :is-show="isShow" @on-close="closePopup('isShow')">
      <authorize></authorize>
    </my-popup>

  </div>
</template>

<script>
import Popup from '../widget/popup.vue'
import Authorize from './hospitalManage/authorize'

export default {
  	name: 'systemManage',
    components: {
      'my-popup':Popup,
      'authorize': Authorize
    },
  	data () {
    	return {
      		msg:"systemManage.vue test",
          isShow : false
    	}
  	},
    methods:{
      popupClick() {
        console.log("点击了弹出");
        this.isShow = true;
      },
      closePopup (attr) {
        this[attr] = false;
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
