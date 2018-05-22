<template>
  <div class="healthy">
  	<table class="width100">
  		<thead>
		    <tr class="table-title bg-opcity">
		        <th class="healthy-id corfff fs14">ID</th>
		        <th class="title corfff fs14">文章标题</th>
		        <th class="category corfff fs14">所属分类</th>
		        <th class="count corfff fs14">浏览量</th>
		        <th class="add-time corfff fs14">添加时间</th>
		        <th class="show corfff fs14">是否显示</th>
		        <th class="sort corfff fs14">排序</th>
		        <th class="operation corfff fs14">操作</th>
		    </tr>
		</thead>
		<tbody id="mainShow" class="main-show">                      
            <tr v-for="(item, index) in list" :key="index">
                <td class="tec colortable fs12">{{item._id}}</td>
                <td class="tec colortable fs12">{{item.title}}</td>
                <td class="tec colortable fs12">{{item.category_name}}</td>
                <td class="tec colortable fs12">{{item.view_count}}</td>
                <td class="tec colortable fs12">{{item.time.$numberLong|prettyDate}}</td>
                <td class="tec colortable fs12">{{item.show == "false"?'否':'是'}}</td>
                <td class="tec colortable fs12">{{item.sort}}</td>
                <td class="tec colortable fs12">
                     <router-link :to="{path: '/manage/healthyManage/edit/' + item._id}"><span class="delete colorbtn cp">编辑</span></router-link>
                    <a><span class="delete colorbtn cp" @click="deleteArticle(index, item._id)">删除</span></a>
                </td>
            </tr>
        </tbody>
  	</table>
  </div>
</template>

<script>
export default {
  name: 'ListTable',
  props: {
  	list:{
      type:Array,
      default:function () {
      	return [];
      }
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  	deleteArticle(index, id) {
  		this.list.splice(index, 1);
  		this.$store.dispatch('HealthyModule/articleDelById', id)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.healthy {
	margin-top: 30px;
	.table-title {
		height: 36px;
		line-height: 36px;
		>td {border-left: 1px solid #122442;margin-left: 1px;}
		.healthy-id {width: 7%}
		.title {width: 30%;}
		.category {width: 11.5%;}
		.count {width: 8%;}
		.add-time {width: 14.1%}
		.show {width: 8%}
		.sort {width: 7%}
		.operation {width: 14.1%}
	}
	.main-show {
		height: 48px;
		line-height: 48px;
		>:nth-child(2n) {
			background-color: #2C3D5D;
		}
		.edit,.delete {
			padding: 2px 4px;
			border-radius: 4px;
			border: 1px #0BA6CB solid;
			background: #1E4C6C;
		}
	}
}
</style>
