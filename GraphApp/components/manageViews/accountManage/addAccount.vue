<template>
  <div class="add-page">
  	<!-- 添加账号 Start -->
	  	<div class="account-add">
  			<div class="add-wrap">
  				<ul>
            <li>
              <label class="inblock ter" name="valid">账&nbsp;&nbsp;号</label>
              <input data-vv-delay="500" type="text" placeholder="请输入手机号" name="phone" class="bgmain input-color" v-on:blur="isExistMethod(detailInfo.phone)" v-model="detailInfo.phone" maxlength="11" v-validate="'required|numeric|min:11'" :class="{'input': true, 'is-danger': errors.has('phone') }">
              <span v-show="errors.has('phone')" class="help is-danger has-text-right">{{ errors.first('phone') }}</span>
            </li>
	  				<li>
	  					<label class="inblock ter" name="valid">密&nbsp;&nbsp;码</label>
              <input type="password" name="password" class="bgmain input-color" placeholder="请输入密码" v-model="detailInfo.password" maxlength="6" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }">
              <i v-show="errors.has('password')" class="fa fa-warning"></i>
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
	  				</li>
	  				<li>
	  					<label class="inblock ter" name="valid">职&nbsp;&nbsp;务</label>
              <input type="text" name="jobs" class="bgmain input-color" v-model="detailInfo.title" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('jobs') }" >
              <i v-show="errors.has('jobs')" class="fa fa-warning"></i>
              <span v-show="errors.has('jobs')" class="help is-danger">{{ errors.first('jobs') }}</span>
	  				</li>
	  				<li>
              <label class="inblock ter" name="valid">姓&nbsp;&nbsp;名</label>
              <input type="text" name="name" :class="{'input': true, 'is-danger': errors.has('name') }" class="bgmain input-color" v-model="detailInfo.name" v-validate="'required'" placeholder="姓名">
              <i v-show="errors.has('name')" class="fa fa-warning"></i>
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </li>
	  			</ul>
  			</div>
  			<div class="operation">
  				<input type="button" name="" value="提  交" class="is-primary fs16 bgmain corfff cp submitbtn" @click="submit">
  			</div>
        {{this.updateAccountInfo.code}}
	  	</div>
	  	<!-- 添加账号 End -->
		<!-- 弹出组件Start -->
		<my-popup :is-show="isSuccess" @on-close="closePopup('isSuccess')">
	      <my-success :parameter="successParm" @closeEvent="successEvent"></my-success>
	  </my-popup>
    <!-- <my-popup :is-show="isfailed" @on-close="closePopup('isfailed')">
        <my-failed :parameter="successParm" @closeEvent="failedEvent"></my-failed>
    </my-popup> -->
		<!-- 弹出组件End -->

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Popup from '../../widget/popup.vue'
import SuccessFull from '../../widget/successfull.vue'
import AddFailed from '../../widget/addFailed.vue'
import zh_CN from 'vee-validate/dist/locale/zh_CN';

export default {
  	name: 'addAccount',
  	components: {
  		"my-popup":Popup,
  		"my-success":SuccessFull,
      "my-failed":AddFailed
  	},
  	data () {
    	return {
      		name: '',
      		password: '',
      		title: '',
      		phone: '',
          locale: 'zh_CN',
      		//isSuccess: false,
          isfailed: false,
      		successParm:{}
    	}
  	},
  	asyncData ({ store, route }) {
       // 触发 action 后，会返回 Promise
       if (route.params.id !== 'normal') {
          return store.dispatch('AccountModule/queryAccountDetail', {
            accountId:route.params.id
         })
       }
    },
  	methods: {
  		submit() {
          this.$validator.validateAll().then((result) => {
            if (result) {
              // eslint-disable-next-line
              console.log('验证成功');
              
              //添加账号
                if (this.$route.params.id === 'normal') {
                  this.$store.dispatch('AccountModule/sendAddAccount', {
                      name:this.detailInfo.name,
                      password:this.detailInfo.password,
                      title:this.detailInfo.title,
                      phone:this.detailInfo.phone
                    }).then((res)=> {
                      console.log('添加账号');
                      this.$store.commit('UPDATE_SUCCESS_STATUS', true)
                    })
                }else{
                  //修改账号
                  this.$store.dispatch('AccountModule/updateAccountInfo', {
                        name:this.detailInfo.name,
                        password:this.detailInfo.password,
                        title:this.detailInfo.title,
                        phone:this.detailInfo.phone,
                        accountId:this.$route.params.id
                      })
                  }
            }else{
              console.log('验证失败');
            }
          });
  		},
      failedEvent () {
        //this.isSuccess = false;
        this.isfailed = false;
      },
  		successEvent() {
        this.$store.commit('UPDATE_SUCCESS_STATUS', false)
  			//this.isSuccess = false;
        this.isfailed = false;
  			this.$router.push(name.redirect ? data.redirect : '/manage/accountManage/list')	
  		},
  		closePopup() {
  			console.log("关闭外层");
  		},
      //离开账号输入框时调用
      isExistMethod() {
          // console.log("account:",this.detailInfo.name);
          this.$store.dispatch('AccountModule/queryAccuntIsExist', {
            phone:this.detailInfo.name,
          }).then((res)=> {
            console.log('添加账号',res);
          })
          // console.log("失去焦点");
        }
  	},
    created() {
      //配置中文
      this.$validator.localize('zh_CN', {
        messages: zh_CN.messages,
        attributes: {
          email: '邮箱',
          phone: '手机号',
          password: '密码',
          jobs: '职务',
          name: '全英文姓名'
        }
      });
      this.$validator.localize('zh_CN');
    },
  	computed: {
      ...mapState('AccountModule', [
      //把vuex里面的状态取出来 给该组件去使用
      // arrow functions can make the code very succinct!
          'detailInfo',
          'addAccountInfo',
          'updateAccountInfo',
          'existAcountInfo'
    ]),
    ...mapGetters('AccountModule',[
          'isSuccess'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@bgColor:#243554;
.add-page {
	margin-top: 40px;
	border-top: 0.5px solid #3C4E78;
	.account-add {
		margin-top: 30px;
		li {
      >span {
        color: #E34692;
      }
			height: 40px;
			line-height: 40px;
			margin-bottom: 20px;
			label {
				width: 80px;
				text-align: right;
				margin-right: 20px;
				color: #8C9BBE;
				font-size: 14px;
			}
			input {
				border-radius: 4px;
				text-indent: 20px;
				width: 260px;
				border: 0px;
				height: 40px;
        outline: none;
			}
		}
	}
	.operation {
		margin-top: 60px;
		input {
      outline: none;
			width: 160px;
			height: 40px;
			background: #01D7FD;
			border-radius: 4px;
			display: inline-block;
			border: 0px;
			margin-left: 105px;
		}
	}
}
</style>