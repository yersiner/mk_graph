<template>
  <div class="authorize">
  	<div class="authorize-title tec">
  		{{this.parameter.hospitalName}}账号授权
  	</div>
	<div class="authorize-content">
		<ul>
			<li>
				<label for="" class="fl">登录账号</label>
				<input type="text" name="account" v-model="account" class="input-color" maxlength="11" v-on:blur ="isExistFunc()" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('account')}">
			</li>
			<li>
				<label for="" class="fl">登录密码</label>
				<input type="password" name="password" placeholder="6位数以上数字，字母" v-model="password" class="input-color" maxlength="6" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password')}">
			</li>
			<li>
				<label for="" class="fl">短信通知</label>
				<input type="text" name="messages" placeholder="手机，账号将发送到这个手机号" v-model="phone" class="input-color" maxlength="11" v-validate="'required|numeric|min:11'" :class="{'input': true, 'is-danger': errors.has('messages')}">
			</li>
			<li>
				<span class="cancel inblock cp" @click="cancelBtn">取消</span>
				<span class="submit inblock cp" @click="sureBtn">确定</span>
				<!-- <input type="button" value="取消" class="cancel" @click="cancelBtn">
				<input type="button" value="确定" class="submit" @click="sureBtn"> -->
			</li>
		</ul>
	</div>
  </div>
</template>

<script>
import zh_CN from 'vee-validate/dist/locale/zh_CN';

export default {
  	name: 'authorize',
  	props: {
  		parameter: {
  			type:Object,
  			default:{
  				hospitalId:'',
  				region_id:'',
  				hospitalName:''
  			}
  		}
  	},
  	data () {
    	return {
			account:'',
			password:'',
			phone:'',
			hospitalId:this.hospitalId,
			region_id:this.region_id,
			hospitalName:this.hospitalName
    	}
  	},
  	methods: {
  		//账号是否存在

  		isExistFunc () {
  			console.log('账号为:',this.account);
  			//判断是否存在
			this.$store.dispatch('HospitalModule/queryAccountIsExist', {
				account:this.account
			}).then((res)=> {
				this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
				if (res.data.obj.isExist === true) {
					this.$notify({ group: 'app', title: '操作失败',  type: 'error', text: '此账号已经被授权' });
					this.account = '';
				}
			})
  		},
		sureBtn() {
			//信息判断是否为空
			this.$validator.validateAll().then((result) => {
				if (result) {
					console.log('验证成功');
					//授权
					this.$store.dispatch('HospitalModule/sendAccountAuthorization', {
		  				hospitalId:this.parameter.hospitalId,
						account:this.account,
						password:this.password,
						phone:this.phone,
						region_id:this.parameter.region_id,
						hospitalName:this.parameter.hospitalName
		  			}).then((res)=> {
		                  this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
		                  
		                  this.$emit('closeEvent');
		  			})
				}else{
					console.log('验证失败');
				}
			});
  			
		},
		cancelBtn() {
			this.$emit('closeEvent');
		}
	},
	created() {
      //配置中文
      this.$validator.localize('zh_CN', {
        messages: zh_CN.messages,
        attributes: {
          account: '登录账号',
          password: '登录密码',
          message: '短信通知',
        }
      });
      this.$validator.localize('zh_CN');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.authorize {
	background-image: radial-gradient(91% 143%, #003A6A 0%, #042458 100%);
	border-radius: 2px;
	.authorize-title {
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid #01D7FD;
		color: #01D7FD;
		font-size: 22px;
	}
	.authorize-content {
		text-align: center;
		margin-top: 42px;
		padding: 0 78px;
		li {
			height: 40px;
			margin-bottom: 33px;
			>label {
				height: 40px;
				line-height: 40px;
				color: #7689B6;
				font-size: 18px;
				text-align: center;
			}
			>input {
				width: 320px;
				height: 40px;
				outline: none;
				border: 0px;
				border-radius: 4px;
				background: #004475;
				text-indent: 10px;
				margin-left: 30px;
			}

			.submit {
				 width: 140px;
				 height: 40px;
				 color: #fff;
				 line-height: 40px;
				 border-radius: 4px;
				 margin-left: 70px;
				 background: #01D7FD;
				 letter-spacing: 5px;
			}
			.cancel {
				 width: 140px;
				 height: 38px;
				 color: #fff;
				 border-radius: 4px;
				 line-height: 38px;
				 border: 1px solid #01D7FD;
				 border-radius: 4px;
				 letter-spacing: 5px;
			}
		}
	}
}
</style>
