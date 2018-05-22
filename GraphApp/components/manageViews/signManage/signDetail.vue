<template>
  <div class="hosptial-detail">
    <!-- 审核通过情况Start -->
    <div class="pass" v-show="detailInfo.status === 2||detailInfo.status === 1 || detailInfo.status === -1">
      <!-- 基本信息Start -->
      <div class="base-info">
        <div class="info-title">
          <p>基本信息</p>
        </div>
        <div class="info-table">
          <ul>
            <li>
              <span class="info-key">姓名</span>
              <span class="info-value">{{detailInfo.name}}</span>
            </li>
            <li>
              <span class="info-key">性别</span>
              <span class="info-value">{{detailInfo.sex === 1?"男":"女"}}</span>
            </li>
            <li>
              <span class="info-key">民族</span>
              <span class="info-value">{{detailInfo.peoples}}</span>
            </li>
            <li>
              <span class="info-key">年龄</span>
              <span class="info-value">{{detailInfo.age}}</span>
            </li>
            <li>
              <span class="info-key">身份证号</span>
              <span class="info-value">{{detailInfo.id_card}}</span>
            </li>
            
            <li>
              <span class="info-key">住址</span>
              <span class="info-value">{{detailInfo.address}}</span>
            </li>
            
            <li>
              <span class="info-key">病种</span>
              <span class="info-value">{{detailInfo.marking}}</span>
            </li>
            <li>
              <span class="info-key">手机号</span>
              <span class="info-value">{{detailInfo.phone}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 基本信息End -->
      <!-- 业务预览Start -->
      <div class="business-preview">
        <div class="business-title">
          <p>业务信息</p>
        </div>
        <div class="business-table">
          <ul>
            <li>
              <span class="business-key">责任医生</span>
              <span class="business-value">{{detailInfo.doctorName}}</span>
            </li>
            <li>
              <span class="business-key">签约日期</span>
              <span class="business-value">2017-07-07</span>
            </li>
            <li>
              <span class="business-key">签约人</span>
              <span class="business-value">{{detailInfo.signMan}}</span>
            </li>
            <li>
              <span class="business-key">服务截止日期</span>
              <span class="business-value">2018-07-07</span>
            </li>
            <div class="sign-data">
              <span class="business-key">签约资料</span>
              <div class="inblock">

                <img :src="'http://qn.newmicrotech.cn/' + item" v-for="(item, index) in detailInfo.upload_img"  alt="" :key="index" class="cp" @click="showPicMethod(item,index)">
                
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <!-- 审核通过情况End -->
    <!-- 审核不通过情况Start -->
    <div class="fail" v-show="detailInfo.status === 3">
      <div class="fail-title">
        <img src="../../../assets/audit-faild.png" alt="">
        <span class="fs18">审核不通过原因</span>
      </div>
      <div class="fail-content">
            <div class="fail-reson">
                <ul>
                    <li>
                        <span class="fail-key">不通过原因</span>
                        <span class="fail-value">{{detailInfo.desc}}</span>
                    </li>
                    <li>
                        <span class="fail-key">审核时间</span>
                        <span class="fail-value">{{detailInfo.audit_time.$numberLong}}</span>
                    </li>
                    <li>
                        <span class="fail-key">审核人</span>
                        <span class="fail-value">{{detailInfo.audit}}</span>
                    </li>
                </ul>
            </div>
            <div class="deal-line"></div>
            <div class="fail-info">
                <ul>
                    <li>
                        <span class="fail-key">姓名</span>
                        <span class="fail-value">{{detailInfo.name}}</span>
                    </li>
                    <li>
                        <span class="fail-key">性别</span>
                        <span class="fail-value">{{detailInfo.sex === 1?"男":"女"}}</span>
                    </li>
                    <li>
                        <span class="fail-key">年龄</span>
                        <span class="fail-value">{{detailInfo.age}}</span>
                    </li>
                    <li>
                        <span class="fail-key">手机</span>
                        <span class="fail-value">{{detailInfo.phone}}</span>
                    </li>
                    <li>
                        <span class="fail-key">病种</span>
                        <span class="fail-value">{{detailInfo.marking}}</span>
                    </li>
                    <li>
                        <span class="fail-key">住址</span>
                        <span class="fail-value">{{detailInfo.address}}</span>
                    </li>
                </ul>
            </div>
      </div>
    </div>
    <!-- 审核不通过情况End -->
    <!-- 点击资料放大 -->
    <image-popup :is-show="isShowImage" @on-close="closePopup('isShowImage')">
        <show-image :parameter="parameter" @closeEvent="closeEvent"></show-image>
      </image-popup>
  </div>
</template>

<script>
import graphCircle from "~/GraphApp/components/widget/GraphCircle";
import { mapState } from 'vuex'
import ImagePopup from '../../widget/showImagePop.vue'
import ShowImage from '../../widget/showImage.vue'
export default {
    name: 'signDetail',
    components: {
      'graphCircle': graphCircle,
      'show-image':ShowImage,
      'image-popup':ImagePopup
    },
    data () {
      return {
        isShowImage:false,
        parameter:{}
      }
    },
    methods: {
      showPicMethod(hash,index) {
        this.parameter = {
          hash:hash,
          index:index
        }
        this.isShowImage = true;
      },
      closeEvent () {
        this.isShowImage = false;
      },
      //点击遮罩 背景消失
      closePopup() {

      }
    },
    asyncData ({ store, route }) {
      //console.log('ssss-->', route, store);
       // 触发 action 后，会返回 Promise
       return store.dispatch('SignModule/querySignDetail', {
          signId:route.params.id
       })
    },
    computed: mapState('SignModule', {
      //把vuex里面的状态取出来 给该组件去使用
      // arrow functions can make the code very succinct!
      detailInfo: state => state.detailInfo,

    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.hosptial-detail{
  background-color: #243554;
  color: #fff;  
  .detail-top {
    padding-top: 40px;
    height: 125px;
    .top-item {
      height: 40px;
      line-height: 40px;
      span {
        padding: 5px 26px;
        border: 2px solid #01D7FD;
        border-radius: 100px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        color: #01D7FD;
      }
      .add-hospital {
        margin-left: 20px;
      }
    }
    .detail-title {
      margin-top: 40px;
      height: 40px;
      .back-btn {
        padding: 5px 26px;
        border: 2px solid #01D7FD;
        border-radius: 4px;
      }
    }
  }
  /*基础信息*/
  .base-info {
    margin-top: 30px;
    border-radius: 4px;
    height: 420px;
    background: #122442;
    .info-title {
      padding: 0 60px;
      color: #01D7FD;
      height: 62px;
      line-height: 62px;
      border-bottom: 1px solid #27426F;
    }
    .info-table {
      margin: 20px 0;
      li {
        height: 40px;
        line-height: 40px;
        .info-key {
            display: inline-block;
            width: 10%;
            text-align: right;
            margin-right: 60px;
            color: #CAD4E9;
            font-size: 14px;

        }
        .info-value {
            display: inline-block;
            width: 65%;
            text-align: left;
            color: #CAD4E9;
            font-size: 14px;
        }
      }
    }
  }
  /*业务概览*/
  .business-preview {
    margin-top: 30px;
    border-radius: 4px;
    height: 400px;
    background: #122442;
    .business-title {
      padding: 0 30px;
      color: #01D7FD;
      height: 62px;
      line-height: 62px;
      border-bottom: 0.5px solid #27426F;
    }
    .business-table {
      margin: 20px 0;
      li {
        height: 40px;
        line-height: 40px;
        .business-key {
            display: inline-block;
            width: 10%;
            text-align: right;
            margin-right: 60px;
            color: #CAD4E9;
            font-size: 14px;

        }
        .business-value {
            display: inline-block;
            width: 65%;
            text-align: left;
            color: #CAD4E9;
            font-size: 14px;
        }
      }
      .sign-data {
          margin-top: 10px;
          .business-key {
            display: inline-block;
            width: 10%;
            text-align: right;
            margin-right: 60px;
            color: #CAD4E9;
            font-size: 14px;
            vertical-align: top;
            margin-top: 5px;
          }
          div {
            width: 420px;
            img {
              height: 50px;
              width: 50px;
              margin-right: 20px;
            }
          }
        }
    }
  }
  // 不通过情况
  .fail {
    background: #122442;
    border-radius: 4px;
    .fail-title {
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #27426F;
        img {
            vertical-align: top;
            margin: 18px 20px;
        }
        span {
           
            color: #FF5AAA;
        }
    }
    .fail-content {
        .fail-reson {
            padding: 20px 0;
            li {
                height: 40px;
                line-height: 40px;
                .fail-key {
                    display: inline-block;
                    width: 10%;
                    text-align: right;
                    margin-right: 60px;
                    color: #CAD4E9;
                    font-size: 14px;
                }
                .fail-value {
                    display: inline-block;
                    width: 65%;
                    text-align: left;
                    color: #CAD4E9;
                    font-size: 14px;
                }
            }
        }
        .deal-line {
            border-top: 1px dashed #27426F;
        }
        .fail-info {
            padding: 20px 0;
            li {
                height: 40px;
                line-height: 40px;
                .fail-key {
                    display: inline-block;
                    width: 10%;
                    text-align: right;
                    margin-right: 60px;
                    color: #CAD4E9;
                    font-size: 14px;
                }
                .fail-value {
                    display: inline-block;
                    width: 65%;
                    text-align: left;
                    color: #CAD4E9;
                    font-size: 14px;
                }
            }
        }
    }
  }
}
</style>
