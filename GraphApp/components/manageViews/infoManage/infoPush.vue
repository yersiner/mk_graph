<template>
  <div class="info-push">
    <ul class="push-item">
        <li>
            <label for="" name="valid">通知标题</label>
            <input type="text" v-model="msgTitle" name="msgTitle" :class="{'input': true, 'is-danger': errors.has('msgTitle')}"  v-validate="'required'" class="input-color fs14">
            <i v-show="errors.has('msgTitle')" class="fa fa-warning"></i>
            <span v-show="errors.has('msgTitle')" class="help is-danger">{{ errors.first('msgTitle')}}</span>
        </li>
        <li>
            <label for="" name="valid" class="notice-title">通知对象</label>
            <v-select v-model="channel" :options="channels" class="inblock channels-item nature" placeholder="请选择" :class="{'input': true, 'is-danger': errors.has('msgTo')}" name="msgTo"  v-validate="'required'"></v-select>
            <i v-show="errors.has('msgTo')" class="fa fa-warning"></i>
            <span v-show="errors.has('msgTo')" class="help is-danger">{{ errors.first('msgTo')}}</span>
        </li>
        <li class="content-item">
            <label for="" class="content-title" name="valid">通知内容</label>
            <textarea v-model="msgContent" id="" cols="30" rows="10" class="push-content input-color fs14" name="msgContent" :class="{'input': true, 'is-danger': errors.has('msgTitle')}"  v-validate="'required'" placeholder="往社区管理平台或用户端APP推送系统通知"></textarea>
            <i v-show="errors.has('msgContent')" class="fa fa-warning"></i>
            <span v-show="errors.has('msgContent')" class="help is-danger">{{ errors.first('msgContent')}}</span>
        </li>
    </ul>
    <div class="push-operation">
        <input type="button" value="开始通知" class="submit inblock tec cp corfff fs14" @click="submit">
    </div>
    <!-- 弹出成功的组件 Start-->
    <my-popup :is-show="isSuccess" @on-close="closePopup('isSuccess')">
        <my-success @closeEvent="successEvent"></my-success>
    </my-popup>
  </div>
</template>

<script>
import vSelect from "vue-select"
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import Popup from '../../widget/popup.vue'
import SuccessFull from '../../widget/successfull.vue'

export default {
  name: 'infoPush',
  props: ['list'],
  components: {
    vSelect,
    'my-popup':Popup,
    'my-success':SuccessFull
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isSuccess:false,
      phone:'',
      name:'',
      channel:'',
      msgTitle:'',
      msgContent:'',
      channels:[
        {
          label:'IOS端',
          value:0
        },
        {
          label:'Android端',
          value:1
        }
      ]
    }
  },
  methods: {
    submit() {

      console.log('提交：',this.noticeTitle,this.channel.value,this.noticeContent);
      //推送消息
      this.$validator.validateAll().then((result) => {
        if (result) {
            this.$store.dispatch('MessageModule/messageSend', {
            msgTitle:this.msgTitle,
            msgTo:this.channel.value,
            msgContent:this.msgContent
          }).then((res)=> {
            this.isSuccess = true;
            this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
          })
        }else{
          console.log('校验失败');
        }
      });
    },
    successEvent() {
      this.$store.commit('UPDATE_SUCCESS_STATUS', false);
      this.isSuccess = false;
      this.$router.push(name.redirect ? data.redirect : '/manage/infoManage/system') 
    },
    closePopup() {
        console.log("关闭外层");
      }
  },
  created() {
      //配置中文
      this.$validator.localize('zh_CN', {
        messages: zh_CN.messages,
        attributes: {
          msgTitle: '通知标题',
          msgTo: '通知对象',
          msgContent: '通知内容'
        }
      });
      this.$validator.localize('zh_CN');
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.info-push {
    .push-item {
        label[name="valid"]:before ,.notice-title {vertical-align: top;}
        >li {
            height: 40px;
            line-height: 40px;
            margin-bottom: 20px;
            >label {
                width: 80px;
                margin-right: 20px;
                font-size: 14px;
                text-align: right;
                color: #7689B6;
            }
            >input {
                height: 40px;
                width: 260px;
                background: #172945;
                border: 0px;
                border-radius: 4px;
                text-indent: 18px;
                outline: none;
            }
            >span {
              color: #E34692;
              vertical-align: top;
            }
            .channels-item {
                width: 120px;
                height: 40px;
                background: #172945;
            }
        }
        .content-item {
            height: auto;
            .content-title {
                vertical-align: top;
            }
            .push-content {
                outline: none;
                height: 180px;
                width: 680px;
                padding: 10px;
                background: #172945;
                border-radius: 4px;
                resize:none;
                border: 0px;
            }
        }
    }
    ::placeholder  {
      color: #3C4E78;
      font-size: 14px;
    }
    .push-operation {
        margin-top: 60px;
        .submit {
          outline: none;
            margin-left: 100px;
            height: 40px;
            width: 160px;
            background: #01D7FD;
            border: 0px;
            border-radius: 4px;
        }
    }
    .v-select .open-indicator:before {
      border-color: white;
      border-width: 1px 1px 0px 0;
      width: 8px;
      height: 8px;
    }
    .v-select .selected-tag {
        color: #EFF3FC;
        font-size: 14px;
    }
}
</style>
