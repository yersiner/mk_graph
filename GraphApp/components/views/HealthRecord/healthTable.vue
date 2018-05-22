<template>
  <div class="health-table">
  	<table class="width100">
  		<thead>
		    <tr class="table-title bg-opcity">
		        <th class="number corfff fs14">编号</th>
		        <th class="name corfff fs14">姓名</th>
		        <th class="sex corfff fs14">性别</th>
		        <th class="nation corfff fs14">民族</th>
		        <th class="disease corfff fs14">病种</th>
		        <th class="location corfff fs14">所在地</th>
		        <th class="operation corfff fs14">操作</th>
		    </tr>
		</thead>
		<tbody id="mainShow" class="main-show">                      
            <tr :key="index" v-for="(item, index) in data">
                <td class="tec colortable fs12">{{item.number}}</td>
                <td class="tec colortable fs12">{{item.name}}</td>
                <td class="tec colortable fs12">{{sexMap[item.sex]}}</td>
                <td class="tec colortable fs12">{{item.peoples}}</td>
                <td class="tec colortable fs12">
                    <span class="single" v-for="disease in item.diseases">
                        {{diseaseMap[disease]}}
                    </span>
                </td>
                <td class="tec colortable fs12">{{item.nativeFlag}}</td>
                <td class="tec colortable fs12">
                  <router-link :to="{name: 'recordDetail',params:{case_id:item.case_id,region_id:item.region_id,user_id:item.user_id}}"><span class="detail colorbtn cp" @click="detailMethod(item.case_id,item.region_id,item.user_id)">详情</span></router-link>
                </td>
            </tr>
        </tbody>
  	</table>
  </div>
</template>

<script>
export default {
  name: 'healthTable',
  props: {
    data: {}
  },
  data () {
    return {
        parameter:{},
        sexMap: {
            1: '男',
            2: '女',
            '-1': '未知'
        },
        diseaseMap: {
            0:"血糖",
            1:"高血压",
            2:"脑梗",
            3:"其他"
        },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    detailMethod(case_id,user_di,region_id) {
        console.log('点击了详情',case_id,user_di,region_id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.single {
    padding: 0 5px;
}
.health-table {
	.table-title {
		height: 36px;
		line-height: 36px;
		.number {
			width: 15%;
		}
		.name,.sex,.nation,.operation {width: 10%;border-left: 1px solid #122442;}
		.disease {width: 24%;margin-left: 1px;border-left: 1px solid #122442;}
		.location {width: 20%;margin-left: 1px;border-left: 1px solid #122442;}
	}
	.main-show {
		height: 48px;
		line-height: 48px;
		>:nth-child(2n) {
			background-color: #2C3D5D
		}
		

	}
}
</style>
