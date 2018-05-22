<template>
  <div class="physique-data">
    <div class="physique-top">
        <input type="text" v-model="keyword" placeholder="患者姓名/手机" class="corfff">
        <div class="searchbtn inblock tec cp">
            <img src="" alt="">
            <span class="corfff fs12" @click="search">搜索</span>
        </div>
    </div>   
    <table class="width100">
        <thead>
            <tr class="table-title bg-opcity">
                <th class="number corfff fs14">编号</th>
                <th class="sex corfff fs14">性别</th>
                <th class="phone corfff fs14">联系电话</th>
                <th class="heart-rate corfff fs14">心率</th>
                <th class="oxygen corfff fs14">血氧</th>
                <th class="sugar corfff fs14">血糖</th>
                <th class="pressure corfff fs14">血压</th>
                <th class="sign corfff fs14">签约医院</th>
                <th class="operation corfff fs14">操作</th>
            </tr>
        </thead>
        <tbody id="mainShow" class="main-show">                      
            <tr v-for="(item,index) in physiqueList" :key="index">
                <td class="tec colortable fs12">{{index+1}}</td>
                <td class="tec colortable fs12">{{item.sex==0?'男':'女'}}</td>
                <td class="tec colortable fs12">{{item.phone}}</td>
                <td class="tec colortable fs12">
                    <span>{{item.index_0.value}}</span>
                    <span :class="[{normalSide:item.index_0.status === 0},{lowSide:item.index_0.status === -1},{highSide:item.index_0.status === 1}]">{{item.index_0.status ==1?'正常':item.index_0.status == -1?'正常偏低':'正常偏高'}}</span> 

                    <br>
                    <span>{{item.index_0.times.$numberLong | prettyDate}}</span>

                </td>
                <td class="tec colortable fs12">
                    <span>{{item.index_0.value}}</span>
                    <span :class="[{normalSide:item.index_0.status === 0},{lowSide:item.index_0.status === -1},{highSide:item.index_0.status === 1}]">{{item.index_0.status ==1?'正常':item.index_0.status == -1?'正常偏低':'正常偏高'}}</span> 

                    <br>
                    <span>{{item.index_0.times.$numberLong | prettyDate}}</span>
                </td>
                <td class="tec colortable fs12">
                    <span>{{item.index_0.value}}</span>
                    <span :class="[{normalSide:item.index_0.status === 0},{lowSide:item.index_0.status === -1},{highSide:item.index_0.status === 1}]">{{item.index_0.status ==1?'正常':item.index_0.status == -1?'正常偏低':'正常偏高'}}</span> 

                    <br>
                    <span>{{item.index_0.times.$numberLong | prettyDate}}</span>
                </td>
                <td class="tec colortable fs12">
                    <span>{{item.index_0.value}}</span>
                    <span :class="[{normalSide:item.index_0.status === 0},{lowSide:item.index_0.status === -1},{highSide:item.index_0.status === 1}]">{{item.index_0.status ==1?'正常':item.index_0.status == -1?'正常偏低':'正常偏高'}}</span> 

                    <br>
                    <span>{{item.index_0.times.$numberLong | prettyDate}}</span>
                </td>
                <td class="tec colortable fs12">{{item.hospitalName}}</td>
                <td class="tec colortable fs12">
                    <router-link :to="{path: '/manage/physiqueManage/phyDetail/'+item.user_id}"><span class="detail colorbtn cp">详情</span></router-link>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'physiqueData',
    props: ['list'],
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            keyword: ''
        }
    },
    methods: {
        search() {
            this.$store.dispatch('PhysiqueModule/physiqueList', {
                  findCondition: this.keyword,
                  pageIndex: 1,
                  pageSize: 10
            })
        }
        
    },
    asyncData ({ store, route }) {
       // 触发 action 后，会返回 Promise
       return store.dispatch('PhysiqueModule/physiqueList', {
          findCondition: '',
          pageIndex: 1,
          pageSize: 10
       })
    },
    computed: mapState('PhysiqueModule', {
        //把vuex里面的状态取出来 给该组件去使用
        // arrow functions can make the code very succinct!
        physiqueList: state => state.list,
        totalCount: state => state.totalCount,
      })
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.physique-data {
    
    .physique-top {
        margin-top: 40px;
        height: 63px;
        border-bottom: 1px solid #3C4E78;
        .searchbtn {
            border: 2px solid #01D7FD;
            width: 86px;
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            margin-left: 20px;
        }
        >input {
            outline: none;
            width: 260px;
            height: 40px;
            background: #1B2E4C;
            border: 0px;
            border-radius: 4px;
            text-indent: 18px;
        }
    }
    >table {
        margin-top: 30px;
        .table-title {
            height: 40px;
            line-height: 40px;
            >:not(:first-child) {border-left: 1px solid #122442}
                
        }
        .main-show {
            height: 60px;
            line-height: 60px;
            
            td {
                // display: table-cell;
            }
            .highSide {
                color: #E34692;
                line-height: 60px;
                font-size: 14px;
            }
            .lowSide {
                color: #F5A623;
            }
            .normalSide {
                color: #01D7FD;
            }
            >:nth-child(2n) {
                background-color: #2C3D5D;
            }
            .detail {
                    padding: 2px 4px;
                    border-radius: 4px;
                    border: 1px #0BA6CB solid;
                    background: #1E4C6C;

            }
        }
    }
}
</style>
