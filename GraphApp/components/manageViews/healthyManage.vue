<template>
  <div class="heathy-container">
  	<div class="heathy-wrap">
      <router-link :to="{path: '/manage/healthyManage/artlist'}"><span class="article-list cp">文章列表</span></router-link>
      <router-link :to="{path: '/manage/healthyManage/addart/'}"><span class="add-article cp">添加文章</span></router-link>
      <router-link :to="{path: '/manage/healthyManage/artcate'}"><span class="article-cate cp">文章分类</span></router-link>
      <router-link v-show="$route.params.id" :to="{path: '/manage/healthyManage/edit/'+ $route.params.id}"><span class="article-cate cp">编辑文章</span></router-link>
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
  	name: 'healthyManage',
  	data () {
    	return {
      		msg:"healthyManage",
          items: [
            {
              label: '',
              path: ''
            }
          ]
    	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>

.heathy-container .heathy-wrap span {
  color: #FFF;
}
.heathy-container .heathy-wrap .active span{
  line-height: 52px;
  color: #01D7FD;
  width: 64px;
  border-bottom: 4px solid #01D7FD;
}
.heathy-container{
	background-color: #243554;
    .heathy-wrap{
      background: #1B2E4C;
      padding:0 60px;
      height: 60px;
      line-height: 60px;
      .article-list{
        display: inline-block;
        text-align: center;
        width: 64px;
        font-size: 16px;
      }
      .add-article,.article-cate,.add-cate{
        margin-left: 70px;
        display: inline-block;
        text-align: center;
        width: 64px;
        font-size: 16px;
      }
    }
    .content-view {
      padding: 0 41px;
      margin-top: 70px;
    }
}
</style>
