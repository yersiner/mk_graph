<template>
  <div class="app">
    <!-- header -->
    <div class="app-head">
      <!-- logo -->
      <div class="app-head-left">
          <router-link :to="{path: '/'}">
            <img src="../assets/logo@2x.png" alt="" class="logo-img">
          </router-link>
      </div>
      <div class="app-head-shadow"></div>
      <div class="app-head-right">
        <div class="head-right">
          <span class="head-hi">欢迎您，</span>
          <span class="head-user">{{users}}</span>
          <span class="head-time">{{time}}</span>
          <span class="head-home">
            <router-link :to="{path: '/home'}">
              <img src="../assets/home@2x.png" alt="" class="">
            </router-link>
          </span>
          <span class="head-close">
            <router-link :to="{path: '/'}">
              <img src="../assets/Logoff@2x.png" alt="" class="close-img">
            </router-link>
          </span>
        </div>
      </div>
    </div>
    <!-- container -->
    <div class="container dcontainer">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- footer -->
    <div class="app-foot">
      <span>@版权归：米可医疗科技有限公司所有</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        users:'系统管理员',
        time:'今天是2017年12月25日 星期一'
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  @bgColor: #27406A;
  .dcontainer {
    position: relative;
    z-index: 10;
  }
  .app{
    .app-head{
    box-sizing: border-box;
    margin: 0 auto;
    background-color: @bgColor;
    color: #000;
    display: flex;
    height: 72px;
    .app-head-left{
      width: 220px;
        margin: 0;
        padding: 0;
        >a {display: inline-block;}
      .logo-img{
        width: 149px;
        height: 56px;
        margin-left: 36px;
        padding-top:8px;
      }
    }
    .app-head-shadow{
      width: 16px;
      height: 72px;
      background: linear-gradient(to left, #263F67 0%, #172C4D 100%);
    }
    .app-head-right{
      color:#fff;
      flex:1;
      height: 72px;
      .head-right{
        float: right;
        display: inline-block;
        height: 28px;
        line-height: 72px;
        opacity: 0.75;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-shadow: 0 1px 2px rgba(0,0,0,0.50);
        .head-user{
          margin-right: 24px;
        }
        .head-time{
          margin-right: 61px;
        }
        .head-home{
          img{
          height: 32px;
          width: 34px;
          vertical-align: middle;
          margin-right: 46px;
          }
        }
        .head-close{
          img{
          width: 31px;
          height: 32px;
          vertical-align: middle;
          margin-right: 80px;
          }
        }
      }
    }
  }
    .app-container{
      width: 100%;
    }
    .app-foot{
      position: fixed;
      bottom: 0;
      height: 60px;
      z-index: 99999;
      width: 100%;
      background: #122442;
      color: #fff;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #7689B6;
      &>span{
        display: inline-block;
        line-height: 60px;
      }
    }
  }
</style>