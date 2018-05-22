<template>
  <div class="info-service">
    <table class="width100">
        <thead>
            <tr class="table-title bg-opcity">
                <th class="healthy-id corfff fs14">评分</th>
                <th class="name corfff fs14">评论内容</th>
                <th class="sort corfff fs14">评论者姓名</th>
                <th class="operation corfff fs14">评论商品</th>
                <th class="operation corfff fs14">所属分类</th>
                <th class="operation corfff fs14">订单ID</th>
                <th class="operation corfff fs14">服务医生/所属医院</th>
                <th class="operation corfff fs14">当前状态</th>
                <th class="operation corfff fs14">操作</th>
            </tr>
        </thead>
        <tbody id="mainShow" class="main-show">                      
            <tr>
                <td class="tec colortable fs12">5</td>
                <td class="tec colortable fs12">评论内容评论内容</td>
                <td class="tec colortable fs12">张洪亮</td>
                <td class="tec colortable fs12">手术刀刀</td>
                <td class="tec colortable fs12">器械类</td>
                <td class="tec colortable fs12">2333</td>
                <td class="tec colortable fs12">李四/金阳医院</td>
                <td class="tec colortable fs12">未处理</td>
                <td class="tec colortable fs12">
                    <router-link :to="{path: ''}"><span class="handle colorbtn cp">处理</span></router-link>
                    <router-link :to="{path: ''}"><span class="delete colorbtn cp">删除</span></router-link>
                </td>
            </tr>
            <tr>
                <td class="tec colortable fs12">5</td>
                <td class="tec colortable fs12">评论内容评论内容</td>
                <td class="tec colortable fs12">张洪亮</td>
                <td class="tec colortable fs12">手术刀刀</td>
                <td class="tec colortable fs12">器械类</td>
                <td class="tec colortable fs12">2333</td>
                <td class="tec colortable fs12">李四/金阳医院</td>
                <td class="tec colortable fs12">未处理</td>
                <td class="tec colortable fs12">
                    <router-link :to="{path: '/manage/EvaluateDetail'}"><span class="delete colorbtn cp">处理</span></router-link>
                    <router-link :to="{path: '/manage/detail'}"><span class="delete colorbtn cp">删除</span></router-link>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'infoService',
  props: ['list'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.info-service {
    margin-top: 40px;
    border-top: 0.5px solid #3C4E78;
    >table {
    	margin-top: 40px;
        color: #7689B6;
        .table-title {
        	height: 40px;
        	line-height: 40px;
        	:not(:first-child) {border-left: 1px solid #122442}
        }
	    .main-show {
	    	height: 60px;
	        line-height: 60px;
	        >:nth-child(2n) {
	            background-color: #2C3D5D;
	        }
            .handle {
                padding: 2px 4px;
                border-radius: 4px;
                border: 1px #0BA6CB solid;
                background: #1E4C6C;
            }
            .delete {
                padding: 2px 4px;
                border-radius: 4px;
                border: 1px #0BA6CB dashed;
                background: #1E4C6C;
            }
	    }
    }
}
</style>

