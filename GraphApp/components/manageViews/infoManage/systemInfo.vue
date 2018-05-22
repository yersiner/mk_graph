<template>
  <div class="info-system">
    <table class="width100">
        <thead>
            <tr class="table-title bg-opcity">
                <th class="title fs14">标题</th>
                <th class="content fs14">内容</th>
                <th class="method fs14">推送方式</th>
                <th class="target fs14">通知对象</th>
                <th class="count fs14">送达人数</th>
                <th class="time fs14">推送时间</th>
                <th class="author fs14">推送者</th>
            </tr>
        </thead>
        <tbody id="mainShow" class="main-show">                      
            <tr v-for="(item, index) in tableData" :key="index">
                <td class="tec colortable fs12">{{item.title}}</td>
                <td class="tec colortable fs12">{{item.content}}</td>
                <td class="tec colortable fs12">{{item.push_type == 0?'自动':'手动'}}</td>
                <td class="tec colortable fs12">{{item.obj == 0?'用户':'医生'}}</td>
                <td class="tec colortable fs12">{{item.number}}</td>
                <td class="tec colortable fs12">{{item.time.$numberLong}}</td>
                <td class="tec colortable fs12">{{item.pusher}}</td>
            </tr>
        </tbody>
    </table>
    <div>
        <DataTable :total="totalCount" @loadData="loadCurList" v-show="totalCount>10"></DataTable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DataTable from "~/GraphApp/components/widget/DataTable.vue"

export default {
    name: 'systemInfo',
    props: ['list'],
    components: {
        DataTable
    },
    data () {
        return {
        msg: 'Welcome to Your Vue.js App'
        }
    },
    asyncData ({ store, route }) {
       // 触发 action 后，会返回 Promise
        return store.dispatch('MessageModule/messageList', {
            pageIndex:1,
            pageSize:10
        })
    
    },
    methods: {
        //分页
        loadCurList(currentPage) {
            //console.log('test--current');
          this.$store.dispatch('AccountModule/queryAccountList', {
             name: this.curName,
             page_index: currentPage,
             item_count: 10
          }).then((res)=> {
            this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
          })
        }
    },
    computed: mapState('MessageModule', {
      //把vuex里面的状态取出来 给该组件去使用
      // arrow functions can make the code very succinct!
        tableData: state => state.list,
        totalCount: state => state.totalCount,
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.info-system {
    >table {
        margin-top: 30px;
        .table-title {
            height: 40px;
            line-height: 40px;
            >th {
                border-left: 1px solid #122442;
                color: #F4F8FC;
            }
            .title {width: 18.5%; border: 0px}
            .content {width: 31%;}
            .method {width: 8.85%}
            .target {width: 8.85%}
            .count {width: 8.85%}
            .time {width: 14%}
            .author {width: 9.7%}
        }
        .main-show {
            height: 48px;
            line-height: 48px;
            >:nth-child(2n) {
                background-color: #2C3D5D;
            }
        }
    }
}
</style>
