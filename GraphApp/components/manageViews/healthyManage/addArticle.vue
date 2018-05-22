<template>
    <div class="article-wrapper">
        <ul class="add-item">
            <li class="single-item">
                <label for="" class="des-title" name="valid">文章标题</label><input type="text" class="des-input" v-model="articleInfo.title" name="title" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('title')}">
                <i v-show="errors.has('title')" class="fa fa-warning"></i>
                <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
            </li>
            <li class="single-item">
                <label for="" class="des-title category-label" name="valid">所属分类</label>
                <region-picker
                class="mleft-item"
                :class="{'input': true, 'is-danger': !articleInfo.categoryId}"
                               :auto="true"
                               :completed="true"
                               :regionData="CategoryMap"
                               :province="articleInfo.categoryId"
                               :city="articleInfo.categoryId_two"
                               :district="articleInfo.categoryId_three"
                               @onchange="regionChanged">
                </region-picker>
                <!-- <v-select placeholder="请选择" v-model="articleInfo.articleInfo.categoryId" class="inblock nature category" :options="categorys" ></v-select> -->
                <i v-show="!articleInfo.categoryId" class="fa fa-warning"></i>
                <span v-show="!articleInfo.categoryId" class="help is-danger the-cate">必须填写分类</span>
            </li>
            <li class="single-item">
                <label for="" class="des-title">排序</label>
                <input type="text" class="des-input mleft-item" v-model="articleInfo.sortValue" name="sort" v-validate="'numeric'" :class="{'input': true, 'is-danger': errors.has('sort')}">
                <i v-show="errors.has('sort')" class="fa fa-warning"></i>
                <span v-show="errors.has('sort')" class="help is-danger">{{ errors.first('sort') }}</span>
            </li>
            <li class="pic-item">
                <label for="" class="des-title">封面图</label>
                <upload url="/api/hospitalModule/fileUpload"
                lang-type="zh"
                field="upload"
                shapeSize="80px"
                imgType="large"
                size="1"
                @uploadSuccess="uploadSuccess"
                @uploadFail="uploadFail"
                max-size="2048"
                :only-single="true"
                :value="true"
                :only-img="true"
                ></upload>
                <span class="pic-des">建议尺寸500px*500px</span>
                <img :src="'http://qn.newmicrotech.cn/' + articleInfo.imgHash" alt="" class="pic-show">
            </li>
            <li class="article-item">
                <label for="" class="des-title">文章内容</label>
                <wysiwyg class="myEditor" v-model="articleInfo.content" />
            </li>
            <li class="single-select">
                <label for="" class="des-title">是否显示</label>
                <div class="select-item inblock">
                    <input type="radio" id="yes" class="cp" name="radiobutton" :value="true" v-model="articleInfo.picked">
                    <label for="yes" class="cp">是</label>
                    <input type="radio" class="select-y cp" id="no" name="radiobutton" :value="false" v-model="articleInfo.picked">
                    <label for="no" class="cp">否</label>
                </div>
            </li>
        </ul>
        <div class="add-submit">
            <span class="submit cp fs16 corfff inblock tec" @click="submitMethod">提交</span>
        </div>
        <!-- 弹出成功的框 -->
        <my-popup :is-show="isSuccess" @on-close="closePopup('isSuccess')">
            <my-success :parameter="successParm" @closeEvent="successEvent"></my-success>
        </my-popup>
    </div>
</template>
<script>
import Vue from 'vue'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import Popup from '../../widget/popup.vue'
import SuccessFull from '../../widget/successfull.vue'
import upload from "../../widget/upload.vue";
import RegionPicker from "../../widget/regionPicker.vue";//省市县
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {
  image: {
    uploadURL: "/api/myEndpoint",
    dropzoneOptions: {}
  }
}); 
import { mapState, mapGetters } from 'vuex'
    export default {
        name: 'addarticle',
        components: {
            "my-popup":Popup,
            "my-success":SuccessFull,
            RegionPicker,
            upload
        },
        asyncData ({ store, route }) {
           // 触发 action 后，会返回 Promise
           return store.dispatch('HealthyModule/getCategory', true).then((res) => {
                RegionPicker.region = Object.assign({}, RegionPicker.region, res)
                if(route.params.id) {
                    return store.dispatch('HealthyModule/articleFindById', route.params.id)
                }
           })
        },
        computed: {
             ...mapState('HealthyModule', [
               // map this.count to store.state.count
               'CategoryList',
               'linkCategory',
               'CategoryMap',
               'articleInfo'
             ]),
             ...mapGetters('LoginModule', [
                'UserInfo'
            ])
        },
        data(){
          return {
            isSuccess:false,
            successParm: {}
          }
        },
        methods: {
            regionChanged(region) {
                if(region.province[1] === 'o') {
                    this.articleInfo.categoryId = false
                }else {
                    this.articleInfo.categoryId = region.province[0]
                }
                if(region.city !== 'novalue') {
                    this.articleInfo.categoryId_two = region.city[0]
                }else {
                    this.articleInfo.categoryId_two = ''
                }
                if(region.district !== 'novalue') {
                    this.articleInfo.categoryId_three = region.district[0]
                }else {
                    this.articleInfo.categoryId_three = ''
                }
                console.log(this.linkCategory[region.province[0]], this.articleInfo.categoryId)
                console.log('category Changed')
            },
            uploadSuccess(data) {
                console.log('上传图片成功')
                this.articleInfo.imgHash = data.obj.hashList[0].hash
            },
            uploadFail() {
                console.log('上传图片失败')
            },
            submitMethod() {
                if(this.articleInfo.categoryId === true || !this.articleInfo.categoryId) {
                    this.articleInfo.categoryId = false
                    return;
                }
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let categoryId = this.articleInfo.categoryId_three || this.articleInfo.categoryId_two || this.articleInfo.categoryId //子分类id
                        this.$store.dispatch('HealthyModule/articleAddOrEdit', {
                            userId:this.UserInfo.accountId,
                            articleId:this.articleInfo._id || '', //文章id 【有值表示编辑，否则表示添加】
                            articleTitle:this.articleInfo.title, //#文章标题
                            categoryId: this.linkCategory[categoryId],
                            sortValue:parseInt(this.articleInfo.sortValue, 10), //str #排序值
                            cover:this.articleInfo.imgHash, //#封面
                            content:this.articleInfo.content, //str #内容
                            show:this.articleInfo.picked //#是否显示【true,false】
                        }).then((res)=> {
                            this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false});
                            this.isSuccess = true;
                        })
                    }else{
                        console.log('验证失败');
                    }
                });
            },
            //点击确定
            successEvent() {
                this.isSuccess = false;
                this.$router.push(name.redirect ? data.redirect : '/manage/healthyManage/artlist')
            },
            closePopup() {
                
            }
        },
        created() {
          //配置中文
          this.$validator.localize('zh_CN', {
            messages: zh_CN.messages,
            attributes: {
              title: '文章标题',
              category: '所属分类',
              sort: '排序',
              articleContent: '文章内容'
            }
          });
          this.$validator.localize('zh_CN');
        },
    }
</script>
<style lang="less">
    .article-wrapper .myEditor {
        display: inline-block;
        width: 60%;
        height: 400px;
        background: white;
        color: black;
        b, i {
            font-weight: bold;
        }
        ol {
            list-style: decimal;
        }
        ul {
            list-style: disc;
        }
        h1 {
            font-size: 30px;
            font-weight: bold;
        }
        h2 {
            font-size: 25px;
            font-weight: bold;
        }
        h3 {
            font-size: 20px;
            font-weight: bold;
        }
        h4 {
            font-size: 18px;
            font-weight: bold;
        }
        h5 {
            font-size: 16px;
            font-weight: bold;
        }
        h6 {
            font-size: 14px;
            font-weight: bold;
        }

    }
</style>
<style scoped lang="less">
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";

    .mleft-item {
        margin-left: -4px;
    }
    .article-wrapper {
        margin-top: 40px;
        border-top: 0.5px solid #3C4E78;
        .add-item {
            margin-top: 30px;
            >li {
                margin-bottom: 20px;
                .des-title {
                    display: inline-block;
                    width: 80px;
                    margin-right: 30px;
                    text-align: right;
                    color: #8C9BBE;
                    
                }
                .des-input {
                    outline: none;
                    height: 40px;
                    width: 260px;
                    background: #172945;
                    border: none;
                    border-radius: 4px;
                    text-indent: 5px;
                    color: #EFF3FC;
                }
            }
            .single-item {
                >span {
                    color: #E34692;
                }
                .the-cate {
                    vertical-align: middle;
                    margin-top: 10px;
                }
                .category {
                    height: 40px;
                    width: 260px;
                    background: #172945;
                    border: none;
                    border-radius: 4px;
                    color: #EFF3FC;
                }
                label[name="valid"]:before {vertical-align: top;margin-top: 8px;}
                .category-label {vertical-align: top;margin-top: 8px;}
            }
            .pic-item {
                height: 80px;
                overflow: hidden;
                .file-btn {
                    width: 80px;
                    height: 80px;
                    background-image: url(../../../assets/healthy-pic.png);
                    background-size: cover; 
                    -moz-background-size: cover; 
                    >input {
                        height: 80px;
                        width: 80px;
                        display: inline-block;
                        opacity: 0;

                    }
                }
                .pic-des {
                    vertical-align: top;
                    display: inline-block;
                    margin: 30px 20px 0 20px;
                    color: #596C93;
                }
                .pic-show {
                    display: inline-block;
                    width: 80px;
                    height: 80px;
                    vertical-align: top;
                }
            }
            .article-item {

                >label {
                    vertical-align: top;
                }
                >textarea {
                    width: 580px;
                    height: 130px;
                    background: #172945;
                    border: none;
                    resize:none;
                    border-radius: 4px;
                    color: #EFF3FC;
                    padding: 10px;
                    outline: none;
                }
            }
            .single-select {
                label {
                    color: #8C9BBE;
                }
                .select-y {
                    margin-left: 60px;
                }
                .select-item {
                    input[type="radio"]{
                        background: red;
                        width: 16px;
                        height: 16px;
                        border-radius: 10px;
                        border: 3px solid #8C9BBE;
                        color: red;
                        vertical-align: top;
                        margin-top: 2px;
                        // visibility: hidden;
                    }
                }
            }

        }
        .add-submit {
            margin-top: 60px;
            .submit {
                height: 40px;
                line-height: 40px;
                width: 160px;
                background-image: linear-gradient(89deg, #04BBE4 0%, #059AFF 100%);
                border-radius: 4px;
                margin-left: 110px;
                border: 0px;
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