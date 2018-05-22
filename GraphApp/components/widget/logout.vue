<template>
  <div class="logout">
  	<div class="logout-title tec">提示</div>
  	<div class="content tec fs20" v-show="parameter.category == 'hospital' || parameter.category == 'account'">
  		账号一旦{{parameter.status == 0?"注销":"激活"}}，“{{parameter.name}}”下的所有管理员将&nbsp;<span class="notice">{{parameter.status == 0?"不能登录":"正常使用"}}</span>，确定执行该操作吗？
  	</div>

    <div class="content tec fs20" v-show="parameter.category == 'feedBack'">
      姓名：{{parameter.name }}&nbsp;账号:{{parameter.phone}}&nbsp;<span class="notice">即将被删除</span>，确定执行该操作吗？
    </div>

  	<div class="logout-operation">
  		<span class="inblock fl cp corfff cancel" @click="cancel">取消</span>
  		<span class="inblock fr cp corfff" @click="sureBtn(parameter.status)">确定</span>
  	</div>
  </div>
</template>

<script>

  const logMap = {
    "0": {
      status: -99
    },
    "-99": {
      status: 0
    }
  }
export default {
  	name: 'logout',
  	props: {
      parameter: {
        type:Object,
        default:{
          _id:'',
          region_id:'',
          name:'',
          status:'',
          category:'',
          type:'',
          list:[]
        }
      }
  	},
  	data () {
    	return {
        isShow:true
    	}
  	},
  	methods: {
		  cancel() {
        this.$emit('closeEvent');
      },
      sureBtn(mapName) {
          console.log("注销，",this.parameter.status);
          console.log("类型",this.parameter.category);
          //医院注销
          if (this.parameter.category === "hospital") {
            this.$store.dispatch('HospitalModule/sendAccountLogout', {
              hospitalId:this.parameter._id,
              region_id:this.parameter.region_id,
              status: logMap[mapName].status
            }).then((res)=> {
              this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
            });
          }
          //账号注销
          if (this.parameter.category === "account") {
            this.$store.dispatch('AccountModule/stopOrStartAccount', {
              accountId:this.parameter._id,
              status: logMap[mapName].status
            }).then((res)=> {
              this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
            });
          }
          //反馈信息删除
          if (this.parameter.category === "feedBack") {
            console.log('反馈信息删除');
            this.$store.dispatch('MessageModule/messageDel', {
              feedBackId:this.parameter.feedBackId
             }).then((res)=> {
                  
             })
          }
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
			width: 140px;
			text-align: center;
			line-height: 40px;
			height: 40px;
			background: #01D7FD;
			border-radius: 4px;
		}
    .cancel {
      border: 1px solid #01D7FD;
      line-height: 38px;
      height: 38px;
      background-image: radial-gradient(91% 143%, #003A6A 0%, #042458 100%);
    }
	}

}
</style>
