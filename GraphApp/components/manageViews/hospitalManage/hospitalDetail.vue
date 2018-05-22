<template>
  <div class="hosptial-detail">
    <div class="detail-top">
      <span class="hosptial-name fl">{{detailInfo.full_name}}</span>
      <div class="fr back-operation inblock tec cp" @click="backMethod()">
        <img src="../../../assets/return.png" alt="">
        <span class="backbtn fs14">返回</span>
      </div>
    </div>
    <!-- 基本信息Start -->
    <div class="base-info">
      <div class="info-title">
        <p>基本信息</p>
      </div>
      <div class="info-table">
        <ul>
          <li>
            <span class="info-key">医院名称</span>
            <span class="info-value">{{detailInfo.full_name}}</span>
          </li>
          <li>
            <span class="info-key">负责人</span>
            <span class="info-value">{{detailInfo.res_person}}</span>
          </li>
          <li>
            <span class="info-key">联系电话</span>
            <span class="info-value">{{detailInfo.phone}}</span>
          </li>
          <li>
            <span class="info-key">授权账号</span>
            <span class="info-value">{{detailInfo.authAccount === ""?'暂无授权':detailInfo.authAccount}}</span>
          </li>
          <li>
            <span class="info-key">医院等级</span>
            <span class="info-value">{{detailInfo.grade}}</span>
          </li>
          <li>
            <span class="info-key">医院性质</span>
            <span class="info-value">{{detailInfo.nature}}</span>
          </li>
          <li>
            <span class="info-key">所在地区</span>
            <span class="info-value">{{detailInfo.nativeFlag}}</span>
          </li>
          <li>
            <span class="info-key">详细地址</span>
            <span class="info-value">{{detailInfo.address}}</span>
          </li>
          <div class="hos-des">
            <span class="info-key">医院简介</span>
            <div class="inblock des-content">
                <span class="info-value fs14">{{detailInfo.introduction}}</span>
                <br>
                <!-- <img src="../../../assets/1.jpg" alt="" v-for="(item, index) in detailInfo.images" class="cp"> -->
                <img :src="'http://qn.newmicrotech.cn/' + item" alt="" v-for="(item, index) in detailInfo.images" class="cp" @click="showPicMethod(item,index)">
            </div>
          </div>
        </ul>
      </div>
    </div>
    <!-- 基本信息End -->

    <!-- 业务预览Start -->
    <div class="business-preview">
      <div class="business-title">
        <p>业务概览</p>
      </div>
      <div class="business-table inblock">
        <ul>
          <li>
            <span class="business-key">签约家庭数</span>
            <span class="business-value">{{ detailInfo.familyCount }}</span>
          </li>
          <li>
            <span class="business-key">管理患者数</span>
            <span class="business-value">{{ detailInfo.userCount }}</span>
          </li>
          <li>
            <span class="business-key">加入云病房数</span>
            <span class="business-value">{{ detailInfo.joinCount }}</span>
          </li>
          <li>
            <span class="business-key">随访用户数</span>
            <span class="business-value">{{ detailInfo.visitCount }}</span>
          </li>
        </ul>
      </div>
      <div class="statistics inblock">
        <div class="flow-count">
          <graphCircle :percentObject="followUpRate"></graphCircle>
        </div>
        <div class="join-count">
          <graphCircle :percentObject="{resultcout:detailInfo.joinPercent,resultdes:'加入云病房比例'}"></graphCircle>
        </div>
      </div>
    </div>
    <!-- 业务预览End -->
    <div class="detail-operation">
      <router-link :to="{path: '/manage/hospitalManage/edit/' + detailInfo._id}">
        <span class="cp inblock tec corfff">详情编辑</span>
      </router-link>
    </div>
    <!-- 展示大图片 -->
    <my-popup :is-show="isShowImage" @on-close="closePopup('isShowImage')">
      <show-image :parameter="parameter" @closeEvent="closeEvent"></show-image>
    </my-popup>
  </div>
</template>

<script>
import graphCircle from "~/GraphApp/components/widget/DetailGraph";
import { mapState } from 'vuex'
import Popup from '../../widget/showImagePop.vue'
import ShowImage from '../../widget/showImage.vue'

export default {
  	name: 'hosptialDetail',
    components: {
      'graphCircle': graphCircle,
      'my-popup': Popup,
      'show-image':ShowImage
    },
  	data () {
    	return {
        isShowImage:false,
        parameter:{},
        hosId:this.$route.query.hospitalId,
        followUpRate:{
          resultcout:'42%',
          resultdes:'随访率'
        },
        joinRate:{
          resultcout:'40%',
          resultdes:'加入云病房比例'
        }
    	}
  	},
    methods: {
      backMethod() {
        this.$router.push('/manage/hospitalManage/list');
      },
      showPicMethod(item,index) {
        console.log(index);
        this.parameter = {
          hash:item,
          index:index
        }
        this.isShowImage = true;
      },
      //点击蒙版关闭
      closePopup(attr) {
        // this[attr] = false;

      },
      closeEvent() {
        this.isShowImage = false;
      }
    },
    asyncData ({ store, route }) {
      //console.log('ssss-->', route, store);
       // 触发 action 后，会返回 Promise
       return store.dispatch('HospitalModule/getHospitalDetail', {
          hospitalId:route.params.id
       })
    },
    computed: mapState('HospitalModule', {
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
	padding: 0 13px;
	color: #fff;
  
  .detail-top {
    height: 45px;
    border-bottom: 0.5px solid #3C4E78;
    .hosptial-name {
      color: #01D7FD;
      margin-top: 8px;
    }
    .back-operation {
      border: 2px solid #01D7FD;
      height: 26px;
      line-height: 26px;
      width: 76px;
      border-radius: 4px;
      img {
        width: 8px;
        height: 14px;
        vertical-align: top;
        margin: 6px 5px 0 0;
      }
    }
  }
  /*基础信息*/
  .base-info {
    margin-top: 30px;
    border-radius: 4px;
    background: #122442;
    .info-title {
      padding: 0 30px;
      color: #01D7FD;
      height: 62px;
      line-height: 62px;
      border-bottom: 1px solid #27426F;

    }
    .info-table {
        margin: 20px 0;
        ul {
            padding-bottom: 30px;
            li {
                height: 40px;
                line-height: 40px;
                .info-key {
                    display: inline-block;
                    width: 15%;
                    text-align: center;
                    color: #CAD4E9;
                    font-size: 14px;
                }
                .info-value {
                    display: inline-block;
                    width: 65%;
                    text-align: left;
                    color: #FFF;
                    font-size: 14px;
                }
            }
            .hos-des {
                margin-top: 15px;
                .info-key {
                    vertical-align: top;
                    display: inline-block;
                    width: 15%;
                    text-align: center;
                    color: #CAD4E9;
                    font-size: 14px;
                }
                .des-content {
                    img {
                        width: 50px;
                        height: 50px;
                        margin-right: 10px;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
  }
  /*业务概览*/
  .business-preview {
    margin-top: 30px;
    border-radius: 4px;
    height: 300px;
    background: #122442;
    .business-title {
      padding: 0 30px;
      color: #01D7FD;
      height: 62px;
      line-height: 62px;
      border-bottom: 1px solid #27426F;
    }
    .business-table {
      width: 30%;
      vertical-align: top;
      margin-top: 30px;
      li {
        height: 40px;
        line-height: 40px;
        .business-key {
            display: inline-block;
            width: 45%;
            text-align: center;
            color: #CAD4E9;
            font-size: 14px;
        }
        .business-value {
            display: inline-block;
            width: 45%;
            text-align: left;
            color: #CAD4E9;
            font-size: 14px;
        }
      }
    }
    /*统计图*/ 
    .statistics {
      margin-top: 30px;
      width: 65%;
      .flow-count {
        height: 200px;
        text-align: center;
        display: inline-block;
      }
      .join-count{
        height: 200px;
        padding-left: 10%;
        text-align: center;
        display: inline-block;
      }
    }
  }
  /*详情编辑*/
  .detail-operation {
    margin: 60px 0 130px 0;
    span {
      width: 160px;
      height: 40px;
      background: #01D7FD;
      border-radius: 4px;
      line-height: 40px;
    }
  }
}
</style>
