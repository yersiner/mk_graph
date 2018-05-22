<template>
  <div class="login">
    <div class="login-content">
        <div class="login-logo tec">
          <img src="../assets/Microtech.png">
        </div>
        <div class="login-title">
          <p class="fs32 tec">社区健康大数据管理平台</p>
        </div>
        <div class="form">
          <div class="account">
            <input type="input" v-model="phone" name="" id="account" class="tec corfff" maxlength="11" placeholder="请输入登录账号" AUTOCOMPLETE="off" @keyup="show($event)">
          </div>
          <div class="password">
            <input type="password" v-model="password" name="" id="password" class="tec corfff" maxlength="6" placeholder="请输入密码" AUTOCOMPLETE="off" @keyup="show($event)">
          </div>
          <div class="code">
            <input type="" v-model="verification" name="" id="code" placeholder="请输入验证码" class="corfff" @keyup="show($event)"><span class="code-img inblock">
              <a  href="#">
                  <img :src="random" alt="">
              </a>
            </span>
            <img @click="refresh()" src="../assets/Refresh.png" class="cp">
          </div>
          <div class="operation tec">
            <img @click="login()" src="../assets/login.png" class="cp">
          </div> 
        </div>
      </div>
      <div class="footer">
        <p class="tec corfff fs12">依托移动互联网，物联网，云计算等信息技术构建智慧医疗</p>
      </div>
  </div>
</template>
<script>
import zh_CN from 'vee-validate/dist/locale/zh_CN';
    export default {
        name: 'Login',
        data () {
          return {
            password: '123456',
            phone: '18085280111',
            verification: '',
            random: `/api/loginModule/captchaImage?code=${Math.random()}`
          }
        },
        methods: {
          refresh() {
              this.random = `/api/loginModule/captchaImage?code=${Math.random()}`
          },
          show:function(ev){
              if(ev.keyCode == 13){
                  // alert('你按回车键了');
                  this.login()
              }
          },
          login() {
              var info = {
                password: this.password, 
                phone: this.phone,
                verification: this.verification
              }
              this.$store.dispatch('LoginModule/sendLogin', info).then(response => {
                    console.log(response);
                    var res = response.data;
                    var data = res.obj;
                    var token = res.token;
                    this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
                    //var token = 88888888888;
                      /* Checking if error object was returned from the server */
                    if (res.code !== 200) {
                      console.log(res.msg);
                      this.$notify({ group: 'auth', title: '登陆失败',  type: 'error', text: res.msg })
                      return
                    }
                    
                    /* Setting user in the state and caching record to the localStorage */
                    if (data.name) {
                      this.$store.commit('LoginModule/SET_USER', data)
                      this.$store.commit('SET_TOKEN', token)

                      window.localStorage.setItem('user', JSON.stringify(data))

                      this.$router.push(data.redirect ? data.redirect : '/')
                      
                      this.$notify({ group: 'auth', title: '登陆成功',  type: 'success', text: res.msg })

                    }
              })
          }
        },
        created() {
          //配置中文
          this.$validator.localize('zh_CN', {
            messages: zh_CN.messages,
            attributes: {
              account: '用戶名',
              password: '密码',
              verification: '验证码',
            }
          });
          this.$validator.localize('zh_CN');
        },
      }
</script>
<style>
    .login {background-color: #100838;height: 100%;position: relative;overflow: hidden;}
    .login .login-content {width: 440px;height: 600px;position: absolute;top:50%;left: 50%;margin-left: -220px; margin-top: -300px}
    .login .login-content .login-logo {height: 115px;}
    .login .login-content .login-title {margin: 10px 0 24px 0;}
    .login .login-title > p {color: #01D7FD;text-align: center;font-size: 32px}
    .login #account,#password {
      height: 54px;
      border-radius: 4px;
      text-align: center;
      border:0px;
      font-size: 15px;
      width: 100%;
      margin-bottom: 10px;
      text-indent: 6px;
      outline: none;
      background:#1A2157;
    }
    .login #password {color: #7794B0}
    /*.login #code::-webkit-input-placeholder {color: #fff;font-size: 15px;}*/

    .login .code {display:table-cell;height: 54px;margin-bottom: 10px;line-height: 54px;overflow: hidden;}
    .login .code > img{vertical-align: top;margin-top: 15px;}
    .login .code #code{
        height: 54px;
        border-radius: 4px;
        border:0px;
        width: 240px;
        margin-bottom: 10px;
        text-indent: 26px;
        letter-spacing:1px;
        vertical-align: top;
        outline: none;
        background: #1A2157;
        color: #7794B0;
    }
    .login .code-img {height: 54px;background-color: #04BBE4;text-align: center; width: 120px;border-radius: 4px; margin: 0 10px;}
    .login .code-img img {vertical-align: top;margin-top: 6px;}
    .login .code-switch {height: 54px;vertical-align: middle;line-height: 54px}
    .login .code-switch >img {margin-top: 14px;}
    .login .operation {height: 174px;text-align: center;}

    .login .footer {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        height: 70px;
    }
    .login .footer > p{
       color: #FAFAFA;
    }

    .home {background: #243554;}
    .home .home-top{height: 60px;background: #122442}
    .home .home-top .top-item{height: 60px;width: 60px;margin-right: 30px;vertical-align: middle;}
    .home .home-show{height: 500px}
    .home .manage{height: 60px;margin-left: 10%;width: 70%;background: #122442;padding: 0 5%}

    .home .manage li{margin-top: 10px;width: 20%;height: 30px;line-height: 30px}
    .home .manage li span{padding: 0 5%;height: 30px;line-height: 30px;border: 1px solid green;border-radius: 4px;}
    .home .footer{position: fixed;bottom: 0;right: 0;left: 0;height: 70px;line-height: 70px;background: #122442}
    .home .footer > p{font-size: 17px;}

</style>