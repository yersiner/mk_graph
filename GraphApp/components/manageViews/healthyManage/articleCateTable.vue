<template>
  <div class="healthy">
  	<table class="width100">
  		<thead>
		    <tr class="table-title bg-opcity">
		        <th class="healthy-id corfff fs14">ID</th>
		        <th class="name corfff fs14">名称</th>
		        <th class="sort corfff fs14">排序</th>
		        <th class="operation corfff fs14">操作</th>
		    </tr>
		</thead>
		<tbody id="mainShow" class="main-show">                      
            <tr>
                <td class="tec colortable fs12">sss</td>
                <td class="tec colortable fs12">一级分类</td>
                <td class="tec colortable fs12">123</td>
                <td class="tec colortable fs12">
                    <span class="edit colorbtn cp">编辑</span>
                    <span class="add colorbtn cp">新增下级</span>
                    <router-link :to="{path: '/manage/detail'}"><span class="delete colorbtn cp">删除</span></router-link>
                </td>
            </tr>
        </tbody>
  	</table>
  </div>
</template>

<script>
export default {
  name: 'articleCateTable',
  props: {
  	list: {
  		type:Array,
  		default:[]
  	}
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

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
		.healthy-id {width: 9%}
		.name {width: 62.3%;}
		.sort {width: 8.8%}
		.operation {width: 20.5%}
	}
	.main-show {
		height: 48px;
		line-height: 48px;
		>:nth-child(2n) {
			background-color: #2C3D5D;
		}
		.edit,.add,.delete {
			padding: 2px 4px;
			border-radius: 4px;
			border: 1px #0BA6CB solid;
			background: #1E4C6C;
		}
	}
}
</style>
