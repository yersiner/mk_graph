<template>
  <div class="logout">
  	<div class="logout-title tec">提示</div>
  	<div class="content tec fs20">
  		“{{parameter.hospitalName}}”&nbsp;为注销状态，激活后才能进行该操作，请先点击激活按钮
		
  	</div>
  	<div class="logout-operation tec">
  		<span class="inblock cp corfff" @click="sureBtn()">确定</span>
  	</div>
  </div>
</template>

<script>

export default {
  	name: 'logout',
  	props: {
      parameter: {
        type:Object,
        default:{
          hospitalName:''
        }
      }
  	},
  	data () {
    	return {
        isShow:true
    	}
  	},
  	methods: {
		  
      sureBtn(mapName) {
        this.$emit('closeEvent');
      }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.logout {
	.logout-title {
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid #01D7FD;
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #01D7FD;
    text-shadow: 0 2px 4px rgba(0,0,0,0.50);
	}
	.content {
		height: 80px;
		line-height: 40px;
		margin: 60px 100px;
    color: #7689B6;

    .notice {
      color: #E34692;
    }
	}
	.logout-operation {
		margin: 30px 100px;
		padding-bottom: 50px;
		span {
      width: 120px;
			text-align: center;
			line-height: 40px;
			height: 40px;
			background: #01D7FD;
			border-radius: 4px;
		}
	}

}
</style>
