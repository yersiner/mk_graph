<template>
  <div class="opinion-deatil">
      <div class="detail-title">
        <span></span>
        <span class="sub-title">反馈详情</span>
        <div class="backbtn cp fr inblock" @click="backMethod()">
          <img src="../../../assets/return.png" alt="">
          <span class="fs14 cp">返回</span>
        </div>
      </div>
      <div class="detail-content">
        <ul>
          <li class="single-list">
            <label for="">反馈用户</label>
            <input type="text" disabled="disabled" v-model="backDetailInfo.name">
          </li>
          <li class="single-list">
            <label for="">用户账号</label>
            <input type="text" disabled="disabled" v-model="backDetailInfo.fk_account">
          </li>
          <li class="single-list">
            <label for="">联系方式</label>
            <input type="text" disabled="disabled" v-model="backDetailInfo.phone">
          </li>
          <li class="single-list">
            <label for="">反馈渠道</label>
            <input type="text" disabled="disabled" v-model="backDetailInfo.channel=0?'IOS':'Android'">
          </li>
          <li class="text-list">
            <label for="">反馈内容</label>
            <textarea name="" id="text-content" cols="30" rows="10" class="back-content" disabled="disabled" v-model="backDetailInfo.content"></textarea>
          </li>
          <li class="text-list">
            <label for="">图片</label>
            <div class="pic-show inblock">
              <img :src="'http://qn.newmicrotech.cn/' + imageItem.url" alt="" v-for="(imageItem,index) in backDetailInfo.images" :key="index" @click="imageMethod(imageItem.url,index)" class="cp">
              <!-- <img src="../../../assets/48.jpg" alt=""> -->
            </div>
          </li>
          <li class="single-list">
            <label for="">反馈时间</label>
            <input type="text" disabled="disabled" v-model="backDetailInfo.fk_time.$numberLong">
          </li>
          <!-- 未回复显示的框 -->
          <li class="text-list" v-show="backDetailInfo.status == 0">
            <label for="">回复用户</label>
            <textarea name="content" id="" cols="30" rows="10" class="reply-user" v-model="replyContent" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('content') }"></textarea>
            <i v-show="errors.has('content')" class="fa fa-warning"></i>
            <span v-show="errors.has('content')" class="help is-danger">{{ errors.first('content')}}</span>
          </li>
          <!-- 已回复显示的框 -->
          <li class="text-list" v-show="backDetailInfo.status == 1">
            <label for="">回复用户</label>
            <textarea disabled="disabled" name="content" id="" cols="30" rows="10" class="reply-usered" v-model="backDetailInfo.disposal == null?'':backDetailInfo.disposal.comment"></textarea>
          </li>
          <li class="single-list" v-show="backDetailInfo.status == 1">
            <label for="">回复时间</label>
            <input type="text" disabled="disabled" v-model="backDetailInfo.disposal == null?'':backDetailInfo.disposal.timed.$numberLong">
          </li>
        </ul>
        <div class="opration-info" v-show="backDetailInfo.status == 0">
          <span class="submit corfff fs16 cp inblock tec" @click="submitMethod">提交</span>
        </div>
      </div>
      <my-popup :is-show="isSuccess" @on-close="closePopup('isSuccess')">
        <my-success :parameter="successParm" @closeEvent="successEvent"></my-success>
      </my-popup>
      <!-- 放大图 -->
      <image-popup :is-show="isShowImage" @on-close="closePopup('isShowImage')">
        <show-image :parameter="parameter" @closeEvent="closeEvent"></show-image>
      </image-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import Popup from '../../widget/popup.vue'
import SuccessFull from '../../widget/successfull.vue'
import ImagePopup from '../../widget/showImagePop.vue'
import ShowImage from '../../widget/showImage.vue'
export default {
  	name: 'opinionDetail',
    components: {
      'my-success':SuccessFull,
      'my-popup':Popup,
      'show-image':ShowImage,
      'image-popup':ImagePopup
    },
  	data () {
    	return {
          isShowImage:false,
          isSuccess:false,
          replyContent:'',
          successParm:{},
          parameter:{}
    	}
  	},
    methods: {
      //提交事件
      submitMethod() {
        console.log('点击了提交',this.backDetailInfo);
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log('验证通过');
            this.$store.dispatch('MessageModule/replyMsgBack', {
            "feedBackId":this.backDetailInfo._id,
            "phone":this.backDetailInfo.phone,
            "comment":this.replyContent,
            "channel":this.backDetailInfo.channel="安卓"?1:0
           }).then((res)=> {
            this.isSuccess = true;
            this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
           })
          }else{
            console.log('验证失败');
          }
        })
      },
      //点击弹出的确定事件
      successEvent() {
        this.isSuccess = false;
        this.$router.push(name.redirect ? data.redirect : '/manage/infoManage/opinion') 
      },
      closePopup() {

      },
      backMethod() {
        this.$router.push('/manage/infoManage/opinion') 
      },
      //放大图片
      imageMethod(hash,index) {
        console.log(index);
        this.parameter = {
          hash:hash,
          index:index
        }
        this.isShowImage = true;
      },
      closeEvent () {
        this.isShowImage = false;
      }
    },
    created() {
      //配置中文
      this.$validator.localize('zh_CN', {
        messages: zh_CN.messages,
        attributes: {
          content: '反馈内容'
        }
      });
      this.$validator.localize('zh_CN');
    },
    asyncData ({ store, route }) {
       //console.log('ssss-->', route, store);
       // 触发 action 后，会返回 Promise
       return store.dispatch('MessageModule/getMessageDetail', {
          feedBackId:route.params.id
       })
    },
    computed: mapState('MessageModule', {
      //把vuex里面的状态取出来 给该组件去使用
      // arrow functions can make the code very succinct!
      backDetailInfo: state => state.backDetailInfo,
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@bgColor:#243554;

.opinion-deatil {
  margin-top: 30px;
  height: 1100px;
  .detail-title {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    >:first-child {
      width: 4px;
      height: 18px;
      background: #01D7FD;
      border-radius: 4px;
      margin-right: 5px;
      vertical-align: top;
      margin-top: 5px;
      display: inline-block;
    }
    .sub-title {
      color:#01D7FD;
      vertical-align: top;
      display: inline-block;
      margin-top: -5px;
    }
    .backbtn {
      height: 26px;
      line-height: 26px;
      border-radius: 4px;
      width: 76px;
      text-align: center;
      vertical-align: top;
      margin-top: 5px;
      border: 2px solid #01D7FD;
      img {
        width: 8px;
        height: 14px;
        vertical-align: top;
        margin: 6px 5px 0 0;
      }
      span {
        color: #FFFFFF;
      }
    }
  }
  .detail-content {
    padding-top: 30px;
    border-top: 0.5px solid #3C4E78;
    .single-list {
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
    }
    label {
      width: 80px;
      text-align: right;
      height: 40px;
      margin-right: 20px;
      display: inline-block;
      color: #7689B6;
      font-size: 14px;
    }
    input {
      outline: none;
      width: 260px;
      height: 40px;
      line-height: 40px;
      border: 0px;
      border-radius: 4px;
      background: #1E2F4E;
      text-indent: 18px;
      color: #8C9BBE;
    }
    .text-list {
      margin: 20px 0;
      label {
        vertical-align: top;
      }
      .pic-show {
        >img {
          width: 100px;
          height: 100px;
          margin-right: 20px;
        }
      }
      .back-content {
        outline: none;
        width: 680px;
        height: 80px;
        padding: 10px;
        background: #1E2F4E;
        resize: none;
        border: 0px;
        border-radius: 4px;
        color: #8C9BBE;
      }
      .pic-show {
        height: 100px;
      }
      .reply-user {
        outline: none;
        width: 680px;
        padding: 10px;
        height: 180px;
        background: #1E2F4E;
        resize: none;
        border: 0px;
        font-size: 14px;
        border-radius: 4px;
        color: #8C9BBE;
        text-indent: 18px;
        line-height: 20px;
      }
      .reply-usered {
        outline: none;
        width: 680px;
        padding: 10px;
        background: #1E2F4E;
        resize: none;
        border: 0px;
        font-size: 14px;
        border-radius: 4px;
        color: #8C9BBE;
        text-indent: 18px;
        line-height: 20px;
      }
      >span {
        color: #E34692;
        vertical-align: top;
      }
    }

  }
  .opration-info {
    margin-top: 60px;
    .submit {
      height: 40px;
      line-height: 40px;
      width: 160px;
      background: #01D7FD;
      border-radius: 4px;
      color: #FFF;
      margin-left: 110px;
    }
  }
}
</style>
