<template>
  <div class="physique-container">
    <div class="physique-wrap">
      <router-link :to="{path: '/manage/physiqueManage/data'}"><span class="system-item cp">体格数据</span></router-link>
      <router-link :to="{path: '/manage/physiqueManage/advise'}"><span class="info-item cp">体格建议</span></router-link>
      <router-link :to="{path: '/manage/physiqueManage/add/normal'+''}"><span class="info-item cp">添加建议</span></router-link>
      <router-link v-show="$route.params.detailid" :to="{path: '/manage/physiqueManage/phyDetail/'+ $route.params.detailid}"><span class="info-item cp">体格详情</span></router-link>
      <router-link v-show="$route.params.id && $route.params.id !=='normal'" :to="{path: '/manage/physiqueManage/edit/'+ 'edit'}"><span class="info-item cp">编辑建议</span></router-link>
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
  	name: 'physiqueManage',
  	data () {
    	return {
      		msg:"hospital3.vue test"
    	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.physique-container .physique-wrap span {
  color: #FFF;
}
.physique-container .physique-wrap .active span{
  line-height: 52px;
  color: #01D7FD;
  width: 64px;
  border-bottom: 4px solid #01D7FD;
}
.physique-container{
  background-color: #243554;
  
  color: #FFF;
    .physique-wrap{
      height: 60px;
      padding:0 60px;
      line-height: 60px;
      background: #1B2E4C;
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
