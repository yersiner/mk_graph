<template>
  <div class="healthRecords">
    <!-- 左边布局 Start-->
    <div class="health-left absolute">
        <!-- 个人信息Start -->
        <div class="person-info">
            <div class="base-info">
                <div class="inblock info-pic">
                    <img src="../../../assets/1.jpg" alt="">
                </div>
                <div class="info-des inblock">
                    <ul class="corfff">
                        <li>
                            <span class="info-key">姓名</span><span class="info-value">{{recordDetail.name}}</span>
                        </li>
                        <li>
                            <span class="info-key">性别</span><span class="info-value">{{recordDetail.sex==1?'男':'女'}}</span>
                        </li>
                        <li>
                            <span class="info-key">年龄</span><span class="info-value">{{recordDetail.age}}</span>
                        </li>
                        <li>
                            <span class="info-key">民族</span><span class="info-value">{{recordDetail.peoples}}</span>
                        </li>
                        <li>
                            <span class="info-key">病种</span><span class="info-value">{{recordDetail.diseases == 0?'糖尿病':recordDetail.diseases == 1?'高血压':recordDetail.diseases == 2?'脑梗':'其他'}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="record-info">
                <ul class="corfff">
                    <li>
                        <span class="info-key">所在地区</span><span class="info-value">{{recordDetail.nativeFlag}}</span>
                    </li>
                    <li>
                        <span class="info-key" style="vertical-align: top">详细地址</span><span class="info-value" style="white-space:nowrap;overflow:hidden">{{recordDetail.address}}</span>
                    </li>
                    <li>
                        <span class="info-key">联系电话</span><span class="info-value">{{recordDetail.phone}}</span>
                    </li>
                    <li>
                        <span class="info-key">档案编号</span><span class="info-value">{{recordDetail.number}}</span>
                    </li>
                    <li>
                        <span class="info-key">创建时间</span><span class="info-value">{{recordDetail.times.$numberLong}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 个人信息End -->

        <!-- 最近体格数据记录 Start-->
        <div class="physique-data">
            <div class="physique-title">
                <span class="fs18">最近一次体格数据</span>
                <span class="more corfff fr cp">更多</span>
            </div>
            <div class="physique-content">
                <ul class="corfff">
                    <li>
                        <span class="info-key">类别</span>
                        <span class="info-value">测量结果</span>
                        <span class="info-sub-value">结果分析</span>
                    </li>
                    <li>
                        <span class="info-key">心率</span>
                        <span class="info-value">20次/分</span>
                        <span class="info-sub-value">正常</span>
                    </li>
                    <li>
                        <span class="info-key">血氧</span>
                        <span class="info-value">20次/分</span>
                        <span class="info-sub-value">正常</span>
                    </li>
                    <li>
                        <span class="info-key">血压</span>
                        <span class="info-value">20次/分</span>
                        <span class="info-sub-value">正常</span>
                    </li>
                    <li>
                        <span class="info-key">血糖</span>
                        <span class="info-value">20次/分</span>
                        <span class="info-sub-value">正常</span>
                    </li>
                </ul>
                <div class="back-content">
                    <span class="fr backlist fs14 inblock cp" @click="backList()">列表返回</span> 
                </div>
            </div>
        </div>
        <!-- 最近体格数据记录 End-->
    </div>
    <!-- 左边布局 End -->

    <!-- 右边布局Start -->
    <div class="health-right">
        <div class="history" v-show="false">
            <div class="item-top">
                <span>家族病史</span>
            </div>
            <ul>
                <li class="th">
                    <span class="info-key">父系家族</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
                <li>
                    <span class="info-key">父亲</span>
                    <span class="info-value"></span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
                <li>
                    <span class="info-key">父系家族</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
                <li>
                    <span class="info-key">父系家族</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
                <li>
                    <span class="info-key">父系家族</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
            </ul>
        </div>
        <div class="history" v-show="false">
            <div class="item-top">
                <span>既往史</span>
            </div>
            <ul>
                <li class="th">
                    <span class="info-key">父系家族</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
                <li>
                    <span class="info-key">父亲</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
                <li>
                    <span class="info-key">父系家族</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
                <li>
                    <span class="info-key">父系家族</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
                <li>
                    <span class="info-key">父系家族</span>
                    <span class="info-value">病史</span>
                    <span class="info-key">母系家族</span>
                    <span class="info-value">病史</span>
                </li>
            </ul>
        </div>
        <div class="history">
            <div class="item-top">
                <span>现病情</span>
            </div>
            <div class="history-content">
                {{recordDetail.illness}}
            </div>
        </div>
        <div class="history">
            <div class="item-top">
                <span>疾病治疗记录</span>
            </div>
            <div class="history-content">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="history">
            <div class="item-top">
                <span>体检记录</span>
            </div>
            <div class="history-content">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="history">
            <div class="item-top">
                <span>职业经历</span>
            </div>
            <div class="history-content">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="history">
            <div class="item-top">
                <span>生活习惯</span>
            </div>
            <div class="history-content">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="history">
            <div class="item-top">
                <span>饮食习惯</span>
            </div>
            <div class="history-content">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="history">
            <div class="item-top">
                <span>生活记录</span>
            </div>
            <div class="history-content">
                <p>暂无数据</p>
            </div>
        </div>
    </div>
    <!-- 右边布局End -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'healthRecords',
  props: {
    parameter:{
        type:Object,
        default: function () {
            // body...
            return {
                case_id:'',
                region_id:'',
                user_id:''
            }
        } 
    }
  },
  components: {
    
  },
  data () {
    return {

    }
  },
  asyncData ({ store, route }) {
     // 触发 action 后，会返回 Promise
     return store.dispatch('RecordModule/queryHealthRecordDetail', {
        case_id:route.params.case_id,
        user_id:route.params.user_id,
        region_id:route.params.region_id
     })
  },
  methods: {
    backList() {
        console.log('点击了返回');
        this.$router.push('/view/healthRecords');
    }
  },
  computed: mapState('RecordModule', {
      //把vuex里面的状态取出来 给该组件去使用
      // arrow functions can make the code very succinct!
      recordDetail: state => state.recordDetail,

    })
}
</script>
<style lang='less' scoped>
  /*健康档案*/
   .healthRecords {
        width: 100%;
        margin-top: 30px;
        .health-left {
            width: 413px;
            margin-left: 56px;
            .person-info {
                background: #122442;
                padding: 30px;
                border-radius: 4px;
                margin-bottom: 1px;
                .base-info {
                    .info-pic {
                        width: 160px;
                    }
                    .info-des {
                        width: 180px;
                        li {
                            height: 36px;
                            line-height: 36px;
                            margin-bottom: 1px;
                            span {
                                display: inline-block;
                                font-size: 14px;
                            }
                            .info-key {
                                text-align: center;
                                background: rgba(31,53,89,0.50);
                                width: 79px;
                                margin-right: 1px;
                            }
                            .info-value {
                                text-align: center;
                                background: rgba(31,53,89,0.50);
                                width: 100px;
                            }
                        }
                    }
                }
                .record-info {
                    margin-top: 20px;
                    li {
                        line-height: 36px;
                        height: 36px;
                        margin-bottom: 1px;
                        span {
                            display: inline-block;
                            font-size: 14px;
                        }
                        .info-key {
                            width: 97px;
                            text-align: center;
                            background: rgba(31,53,89,0.50);
                            margin-right: 1px;
                        }
                        .info-value {
                            width: 255px;
                            text-align: center;
                            background: rgba(31,53,89,0.50);
                        }
                    }
                }
            }
            // 体格数据
            .physique-data {
                background: #122442;
                border-radius: 4px;
                .physique-title {
                    height: 47px;
                    line-height: 47px;
                    border-bottom: 2px solid #243554;
                    :first-child {
                        color: #8494A5;
                        margin-left: 30px;
                    }
                    :last-child {
                        margin-right: 30px;
                    }
                }
                .physique-content {
                    padding: 30px;
                    li {
                        line-height: 50px;
                        height: 50px;
                        margin-bottom: 1px;
                        span {
                            display: inline-block;
                            font-size: 14px;
                            float: left;
                        }
                        .info-key {
                            width: 88px;
                            text-align: center;
                            background: rgba(31,53,89,0.50);
                            margin-right: 1px;
                        }
                        .info-value {
                            width: 172px;
                            text-align: center;
                            background: rgba(31,53,89,0.50);
                            margin-right: 1px;
                        }
                        .info-sub-value {
                            width: 80px;
                            text-align:  center;
                            background: rgba(31,53,89,0.50);
                        }
                    }
                    ul {
                        >:first-child {
                            height: 36px;
                            line-height: 36px;
                        }
                    }
                    .back-content {
                        height: 40px;
                        .backlist {
                            margin-top: 20px;
                            padding: 2px 5px;
                            width: 60px;
                            text-align: center;
                            height: 20px;
                            line-height: 20px;
                            background: rgba(0,209,255,0.20);
                            color:#00D1FF;
                            border-radius: 4px;
                            border: 1px solid #00D1FF;
                        }
                    }
                    
                }
            }

        }
        /*右边Start*/
        .health-right {
            margin-left: 494px;
            margin-right: 56px;
            padding-bottom: 100px;
            border-radius: 4px;
            .history {
                background: #122442;
                padding: 10px 58px;
                margin-bottom: 1px;
                .item-top {
                    height: 60px;
                    line-height: 60px;
                    color: #01D7FD;
                }
                .history-content {
                    color: #fff;
                    padding: 10px 0;
                    line-height: 30px;
                }
                li {
                    height: 40px;
                    line-height: 40px;
                    .info-key {
                        width: 15%;
                        display: inline-block;
                        color: #fff;
                        font-size: 14px;
                    }
                    .info-value {
                        width: 30%;
                        display: inline-block;
                        color: #fff;
                        font-size: 14px;
                    }
                }
                .th {
                    /*class 优先级 高于 标签*/ 
                    .info-key,.info-value {
                        color: #8494A5;
                        font-size: 16px;
                    }
                    
                }
            }
        }
    /*媒体查询布局Start*/
    @media screen and (max-width:1400px) {

    }
    /*媒体查询End*/
  }
</style>
