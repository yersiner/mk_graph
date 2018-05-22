<template>
  <div class="info-container">
    <div class="info-wrap">
      <router-link :to="{path: '/manage/infoManage/system'}"><span class="system-item cp">系统消息</span></router-link>
      <router-link :to="{path: '/manage/infoManage/push'}"><span class="info-item cp">消息推送</span></router-link>
      <router-link :to="{path: '/manage/infoManage/opinion'}"><span class="info-item cp">意见反馈</span></router-link>
      <router-link :to="{path: '/manage/infoManage/service'}"><span class="info-item cp">服务评价</span></router-link>
      <router-link v-show="$route.params.id" :to="{path: '/manage/infoManage/opinionDetail/' + $route.params.id}"><span class="info-item cp">反馈详情</span></router-link>
    </div>
    <div class="content-view">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  	name: 'infoManage',
  	data () {
    	return {
      		msg:"infoManage.vue test"
    	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.info-container .info-wrap span {
  color: #fff;
}
.info-container .info-wrap .active span{
  line-height: 52px;
  color: #01D7FD;
  width: 64px;
  border-bottom: 4px solid #01D7FD;
}
.info-container{
  background-color: #243554;
    .info-wrap{
      background: #1B2E4C;
      height: 60px;
      padding: 0 60px;
      line-height: 60px;
      .system-item{
        display: inline-block;
        text-align: center;
        width: 64px;
        font-size: 16px;
      }
      .info-item{
        margin-left: 70px;
        display: inline-block;
        text-align: center;
        width: 64px;
        font-size: 16px;
      }
    }
    .content-view {
      margin-top: 70px;
      padding: 0 41px;
    }
}
</style>
