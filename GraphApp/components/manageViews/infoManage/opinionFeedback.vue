<template>
  <div class="info-opinion">
  	<div class="opinion-item">
  		<v-select v-model="channel" :options="channels" class="inblock channels-item nature" placeholder="全部渠道"></v-select>
  		<v-select v-model="replyContent" :options="replyStatus" class="inblock status-item nature" placeholder="回复状态"></v-select>
  		<div class="inblock search cp" @click="search">
  			<img src="../../../assets/search1x.png" alt="" class="search-icon">
  			<span class="fs12 corfff">搜索</span>
  		</div>
  	</div>
    <table class="width100">
        <thead>
            <tr class="table-title bg-opcity">
                <th class="name corfff fs14">姓名|账号</th>
                <th class="contact corfff fs14">联系方式</th>
                <th class="channel corfff fs14">反馈渠道</th>
                <th class="content corfff fs14">反馈内容</th>
                <th class="enclosure corfff fs14">图片附件</th>
                <th class="time corfff fs14">反馈时间</th>
                <th class="status corfff fs14">回复状态</th>
                <th class="operation corfff fs14">操作</th>
            </tr>
        </thead>
        <tbody id="mainShow" class="main-show">                      
            <tr v-for="(item, index) in tableData" :key="index">
                <td class="tec colortable fs12">{{item.name}}|{{item.fk_account}}</td>
                <td class="tec colortable fs12">{{item.phone}}</td>
                <td class="tec colortable fs12">{{item.channel== 0?'IOS':'Android'}}</td>
                <td class="tec colortable fs12">{{item.content}}</td>
                <td class="tec colortable fs12">
                  <img :src="'http://qn.newmicrotech.cn/' + imageItem.url" alt="" class="pic" v-for="(imageItem, index) in item.images" :key="index">
                  <!-- <img src="../../../assets/pic.png" alt="" class="pic"> -->
                </td>
                <td class="tec colortable fs12">2017-09-29 12:00</td>
                <td class="tec colortable fs12" :class="{remind:item.status === 0}">{{item.status==0?'未回复':'已回复'}}</td>
                <td class="tec colortable fs12">
                    <router-link :to="{path: '/manage/infoManage/opinionDetail/'+ item._id}"><span class="detail colorbtn cp" @click="detailMethod()">详情</span></router-link>
                    <router-link :to="{path: ''}"><span class="delete colorbtn cp" @click="deleteMethod(item._id,item.name,item.phone,index)">删除</span></router-link>
                </td>
            </tr>
        </tbody>
    </table>
    <div>
        <DataTable :total="totalCount" @loadData="loadCurList" v-show="totalCount>10"></DataTable>
    </div>
    <!-- 注销账号Start -->
    <my-popup :is-show="isDelete" @on-close="closePopup('isDelete')">
      <my-logout :parameter="deleteParam" @closeEvent="closeEvent"></my-logout>
    </my-popup>
    <!-- 授权分配 Start -->
  </div>
</template>

<script>
import vSelect from "vue-select"
import { mapState } from 'vuex'
import DataTable from "~/GraphApp/components/widget/DataTable.vue"
import Popup from '../../widget/popup.vue'
import Logout from '../../widget/logout.vue'
export default {
  name: 'infoOpinion',
  components: {
    'my-popup': Popup,
    'my-logout': Logout,
  	vSelect,
    DataTable
  },
  props: ['list'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isSuccess: false,
      isFailed: false,
      isDelete: false,
      channel:'',
      replyContent:'',
      deleteParam:{},
      channels:[
        {
          label:'IOS端',
          value:'0'
        },
        {
          label:'Android端',
          value:'1'
        }
      ],
      replyStatus:[
        {
          label:'未回复',
          value:'0'
        },
        {
          label:'已回复',
          value:'1'
        }
      ]
    }
  },
  asyncData ({ store, route }) {
     // 触发 action 后，会返回 Promise
     return store.dispatch('MessageModule/messageBackList', {
        "msgWay":'',
        "status":'',
        "pageIndex":1,
        "pageSize":10
     })
  },
  methods: {
    search() {
      //搜索列表
      var msgWay = this.channel.value == ''?"":this.channel.value;
      var status = this.replyContent.value == ''?"":this.replyContent.value;

      this.$store.dispatch('MessageModule/messageBackList', {
        "msgWay":msgWay,
        "status":status,
        "pageIndex":1,
        "pageSize":10
       }).then((res)=> {
            this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
       })
       console.log('搜索参数',this.channel.value,this.replyContent.value)
    },
    loadCurList() {

    },
    detailMethod() {
      console.log('点击详情');
    },
    deleteMethod(feedBackId,name,phone,index) {
      console.log('点击了删除');//messageDel

      this.tableData.splice(index, 1);
      this.$store.dispatch('MessageModule/messageDel', {feedBackId:feedBackId})
      /*this.deleteParam = {
          feedBackId:feedBackId,
          name:name,
          phone:phone,
          category:'feedBack'
      }
      this.isDelete = true;*/
    },
    closePopup (attr) {
      this[attr] = false;
    },
    closeEvent () {
      this.isDelete = false;
    }
  },
  computed: mapState('MessageModule', {
      //把vuex里面的状态取出来 给该组件去使用
      // arrow functions can make the code very succinct!
        tableData: state => state.messageBackList,
        totalCount: state => state.totalCount,
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.info-opinion {
    margin-top: 40px;
    
    .opinion-item {
    	height: 70px;
    	border-bottom: 0.5px solid #3C4E78;
    	.channels-item {/*全部反馈*/
    		width: 120px;
    		height: 40px;
        background: #172945;
    		.selection-show {
    			> span {
    				width: 70px;
    				display: inline-block;
    				font-size: 12px;
    				color: #EFF3FC;
    			}
    			width: 120px;
    			height: 40px;
    			line-height: 40px;
    			background: #122442;
    		}
    	}
      
    	.status-item {/*反馈状态*/
			width: 90px;
			height: 40px;
			margin: 0 12px;
      background: #172945;
			.selection-show {
				>span {
    				width: 60px;
    				display: inline-block;
    				font-size: 12px;
    				color: #EFF3FC;
    			}
				width: 90px;
    			height: 40px;
    			line-height: 40px;
    			background: #122442;
    		}
    	}
    	.status-item,.channels-item {
    		.selection-list {
    			margin-top: 16px;
          
    			li {
    				height: 30px;
    				line-height: 30px;
    			}
    		}
    	}
    	.search {
    		height: 36px;
    		line-height: 36px;
    		width: 86px;
    		vertical-align: top;
    		border: 2px solid #01D7FD;
    		border-radius: 4px;
    		text-align: center;
    		.search-icon {
    			vertical-align: top;
    			margin-top: 12px;
    		}
    	}
    }
    >table {
        margin-top: 30px;
        color: #7689B6;
        .table-title {
        	height: 40px;
        	line-height: 40px;
        	:not(:first-child) {border-left: 1px solid #122442}

        }
        .main-show {
            img {
              height: 36px;
              width: 36px;
              vertical-align: top;
              margin-top: 12px;
              margin-right: 12px;
            }
        	  height: 60px;
            line-height: 60px;
            >:nth-child(2n) {
                background-color: #2C3D5D;
            }
            .detail {
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
            .remind {
              color: #E34692;
            }
        }
    }
}
</style>
