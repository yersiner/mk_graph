<template>
    <div class="add-page">
      	<div class="add-container">
        		<ul class="add-item">
          			<li>
          				  <label for="" class="fl" name="valid">医院名称</label><input type="text" name="name" v-model="detailInfo.name" class="input-color" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('name')}">
                    <i v-show="errors.has('name')" class="fa fa-warning"></i>
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name')}}</span>
          			</li>
          			<li>
          				  <label for="" class="" name="valid">负责人</label><input type="text" v-model="detailInfo.res_person" class="input-color" name="res_person" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('res_person')}">
                    <i v-show="errors.has('name')" class="fa fa-warning"></i>
                    <span v-show="errors.has('res_person')" class="help is-danger">{{ errors.first('res_person') }}</span>
          			</li>
          			<li>
          				  <label for="" name="valid">联系电话</label><input type="text" v-model="detailInfo.phone" maxlength="11" class="input-color" name="phone" v-validate="'required|numeric|min:11'" :class="{'input': true, 'is-danger': errors.has('phone')}">
                    <i v-show="errors.has('phone')" class="fa fa-warning"></i>
                    <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone')}}</span>
          			</li>
          			<li>
            				<label for="" name="valid">医院等级</label>
                    <v-select placeholder="请选择" v-model="detailInfo.grade" class="inblock nature" :options="grades" name="grade" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('grade')}"></v-select>
                    <i v-show="errors.has('grade')" class="fa fa-warning"></i>
                    <span v-show="errors.has('grade')" class="help is-danger">{{ errors.first('grade') }}</span>
          			</li>
          			<li>
            				<label for="" name="valid">医院性质</label>
                    <v-select placeholder="请选择" v-model="detailInfo.nature" class="inblock nature" :options="natures" name="nature" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('nature')}"></v-select>
                    <i v-show="errors.has('nature')" class="fa fa-warning"></i>
                    <span v-show="errors.has('nature')" class="help is-danger">{{ errors.first('nature')}}</span>
          			</li>
          			<li>
            				<label for="" name="valid">所在地区</label>
            				<region-picker 
              				  :province="detailInfo.province"
              				  :city="detailInfo.prefecture"
              				  :district="detailInfo.county" @onchange="regionChanged">
              				  <span slot="province" class="tec addr" style="color:#7689B6;padding:0 5px;">省</span>
              				  <span class="tec city" slot="city" style="color:#7689B6;padding:0 5px;">市/州</span>
              				  <span class="tec district" slot="district" style="color:#7689B6;padding:0 5px;">县/区</span>
          				  </region-picker>
          			</li>
          			<li class="detail-addr">
          				  <label for="" name="valid">详细地址</label><textarea v-model="detailInfo.address" id="" cols="30" rows="10" class="input-color" name="address" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('address') }">
          				  </textarea>
                    <i v-show="errors.has('address')" class="fa fa-warning"></i>
                    <span v-show="errors.has('address')" class="help is-danger address-show">{{ errors.first('address') }}</span>
          			</li>
          			<li class="hospital-des relative">
          				  <label for="" name="valid">医院简介</label><textarea v-model="detailInfo.introduction" class="des-text input-color" id="des-text" cols="30" rows="10" name="content" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('content')}"></textarea>
                    <i v-show="errors.has('content')" class="fa fa-warning"></i>
                    <span v-show="errors.has('content')" class="help is-danger">{{ errors.first('content') }}</span>

            				<div class="file-wrapper absolute">
            					<div class="des-box" v-for="(item,index) in detailInfo.images" :key="index">
            						  <div class="delete-img inblock cp" @click="deletebtn(item,index)"></div>
            						  <img :src="'http://qn.newmicrotech.cn/' + item" alt="" class="des-img">
            					</div>
            						  <upload url="/api/hospitalModule/fileUpload"
              							lang-type="zh"
              							field="upload"
                            shapeSize="36px"
                            imgType="small"
              							size="1"
                            @uploadSuccess="uploadSuccess"
              							max-size="5120"
              							:only-single="true"
              							:value="true"
              							:only-img="true"
              							></upload>
            				</div>
          			</li>
        		</ul>
      	</div>
      	<div class="add-operation">
      		  <input @click="submit()" type="button" value="提交" class="submit fs16 corfff cp">
      	</div>
        <!-- 弹出成功的框Start -->
        <my-popup :is-show="isSuccess" @on-close="closePopup('isSuccess')">
            <my-success :parameter="successParm" @closeEvent="successEvent"></my-success>
        </my-popup>
        <!-- 弹出成功的框End -->
        <!-- 弹出失败的框Start -->
        <my-popup :is-show="isFailed" @on-close="closePopup('isFailed')">
            <my-failed :parameter="failedParm" @closeEvent="failedEvent"></my-failed>
        </my-popup>
        <!-- 弹出失败的框End -->
    </div>
</template>

<script>

import vSelect from "vue-select";
import Popup from '../../widget/popup.vue'
import SuccessFull from "../../widget/successfull.vue";//添加成功
import AddFailed from "../../widget/addFailed.vue";//添加失败

import RegionPicker from "../../widget/regionPicker.vue";//省市县
import REGION_DATA from "~/GraphApp/api/cityData";
import upload from "../../widget/upload.vue";
import { mapState, mapGetters} from 'vuex';
import zh_CN from 'vee-validate/dist/locale/zh_CN';

RegionPicker.region = REGION_DATA

export default {
  	name: 'addhospital',
  	components: {
        'my-popup':Popup,
  		  'my-success':SuccessFull,
        'my-failed':AddFailed,
  		  RegionPicker,
  		  upload,
        vSelect
  	},
  	methods: {
      uploadSuccess(data, field, key){
        console.log('-------- 上传成功xx --------');
        console.log('data--',data);
        console.log('field: ' + field);
        console.log('key: ' + key);
        /*this.images.push({
          hash: data.obj.hashList[0].hash
        });*/

        this.detailInfo.images.push(data.obj.hashList[0].hash);

        console.log('detailInfo---images',this.detailInfo.images);
        console.log('detailInfo---images',this.detailInfo.images instanceof Array);
        console.log('detailInfo---images',this.images instanceof Array);

      },
      uploadFail(status, field, key){
        console.log('-------- 上传失败 --------');
        console.log(status);
        console.log('field: ' + field);
        console.log('key: ' + key);
      },
      //删除照片
      deletebtn(hash,index) {
            if (this.$route.params.id === "normal") {
                  this.detailInfo.images.splice(index, 1);
                  this.$store.dispatch('HospitalModule/deleteFile', {
                  hash:hash,
                  type:1,
                  hospitalId:''
                })
            }else{
                this.detailInfo.images.splice(index, 1);
                this.$store.dispatch('HospitalModule/deleteFile', {
                  hash:hash,
                  type:2,
                  hospitalId:this.$route.params.id
                })
            }
        },
  		regionChanged(regionInfo, t) {
        this.detailInfo.province = regionInfo.province;
        this.detailInfo.prefecture = regionInfo.city;
  			this.detailInfo.county = regionInfo.district;
  			console.log('regionInfo:',regionInfo);
  		},
  		toggleShow(flag) {
  			console.log(99999);
  			this.showImg = !flag;
  		},
  		submit() {
        //拼接地址area_id
        var area_id = this.detailInfo.province+'|'+this.detailInfo.prefecture+'|'+this.detailInfo.county;
        //判断输入是否为空
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log('验证成功',result);
            //添加医院
            if (this.$route.params.id === "normal") {
              console.log("normal");
              this.$store.dispatch('HospitalModule/sendAddHostpital', {
                name:this.detailInfo.name,
                res_person:this.detailInfo.res_person,
                phone:this.detailInfo.phone,
                grade:this.detailInfo.grade,
                nature:this.detailInfo.nature,
                area_id:area_id,
                address:this.detailInfo.address,
                content:this.detailInfo.introduction,
                images:this.detailInfo.images
              })
            }else{
              // 修改医院 多了一个hospitalId 参数
              console.log(this.$route.params.id);
              this.$store.dispatch('HospitalModule/updateHospitalInfo', {
                name:this.detailInfo.name,
                res_person:this.detailInfo.res_person,
                phone:this.detailInfo.phone,
                grade:this.detailInfo.grade,
                nature:this.detailInfo.nature,
                area_id:area_id,
                address:this.detailInfo.address,
                content:this.detailInfo.introduction,
                images:this.detailInfo.images,
                hospitalId:this.$route.params.id,
                region_id:this.detailInfo.region_id
              })
            }
          }else{
            console.log('验证失败');
          }
        });
  		},
      //关闭成功的按钮
      successEvent () {
        this.$store.commit('UPDATE_SUCCESS_STATUS', false)
        this.isFailed = false;
        //location.href = '/manage/hospitalManage/list'
        this.$router.push({ name: 'hospitalManage'})
        //this.$router.push('/manage/hospitalManage/list')
      },
      failedEvent () {
        this.$store.commit('UPDATE_SUCCESS_STATUS', false);
        this.isFailed = false;
      },
      closePopup () {
        //只能点击按钮才能关闭

      }
  	},
    created() {
      //配置中文
      this.$validator.localize('zh_CN', {
        messages: zh_CN.messages,
        attributes: {
          name: '医院名字',
          res_person: '负责人名字',
          phone: '手机号',
          grade: '医院等级',
          nature: '性质',
          area_id: '籍贯',
          address: '医院地址',
          content: '医院简介',
          images: '简介图片'
        }
      });
      this.$validator.localize('zh_CN');
    },
  	data () {
    	return {
          isFailed:false,
          locale: 'zh_CN',
          successParm: {},
          failedParm:{},
      		showImg: false,
      		images: [],
      		token: '3333',
      		natures: ['公立','民营','其他'],
      		grades: ['专科医院','社区医院','三级甲等']
    	}
  	},
    asyncData ({ store, route }) {
       // 触发 action 后，会返回 Promise
       //直接添加 则不用回显详情的数据
       if (route.params.id !== 'normal') {
          return store.dispatch('HospitalModule/getHospitalDetail', {
            hospitalId:route.params.id
         })
       }
    },
    computed:  {
        ...mapState('HospitalModule', [
            'detailInfo'
          ]),
        ...mapGetters('HospitalModule',[
            'isSuccess'
          ])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.add-page {
	.add-container {
		.add-item {
			>li {
				height: 40px;
				line-height: 40px;
				margin-bottom: 20px;
				.grade,.nature {
          vertical-align: bottom;
          
					width: 120px;
					height: 40px;
					background: #172945;
					border-radius: 4px;
					.selection-wrap {
						width: 120px;
						.selection-show {
							height: 40px;
							line-height: 40px;
							width: 120px;
							background: #172945;
							>span,.arrow {
								color: #596C93;
							}
						}
						.selection-list {
							margin-top: 18px;
						}
					}
				}
				.region {
					.addr {padding: 0 10px;}
				}
				>span {
					color: #E34692;
					display: inline-block;
					padding: 0 10px;
				}
        .address-show {
          vertical-align: top;
        }
				>label {
					display: inline-block;
					width: 80px;
					text-align: right;
					margin-right: 30px;
					color: #7689B6;
					font-size: 14px;
					:before {
						content: '*';
					    color: red;
					    margin-right: 5px;
					}
				}
				>input {
          outline: none;
					height: 40px;
					width: 260px;
					border-radius: 4px;
					border: none;
					background: #172945;
					text-indent: 20px;
				}
				>textarea {
					width: 500px;
          outline: none;
          border-radius: 4px;
					background: #172945;
				}
			}
			.detail-addr {
				height: 80px;
				label {
					vertical-align: top;
				}
				textarea {
					height: 60px;
          padding: 10px;
					resize:none;
					border: 0px;
				}
			}
			.hospital-des {
				height: 100px;
				border: 0px;
				>label {
					vertical-align: top;
				}
				.file-wrapper {
					display: flex;
					bottom: 10px;
					left: 120px;
					.des-box {
					border-radius: 4px;
					display: inline-block;
					margin-right: 10px;
					width: 36px;
					height: 36px;
					left: 110px;
					background: #46597D;
					.delete-img {
						width: 14px;
						height: 14px;
						float: right;
						margin-top: -7px;
						margin-right: -7px;
						background: red;
						border-radius: 7px;
						z-index: 3;
            position: relative;
						background-image: url('../../../assets/delete-img.png');
					}
					.des-img {
						display: inline-block;
						width: 36px;
						height: 36px;
						margin-top: -7px;
					}
				}
				.uploadImg {
					display: inline-block;
					height: 36px;
					width: 36px;
					left: 0;
					position: relative;
					border-radius: 4px;
					background: #46597D;
					background-image: url('../../../assets/add-pic.png');
					input {
			    	    opacity: 0;
					    position: absolute;
					    z-index: 2;
					    height: 36px;
					    width: 36px;
					}
				}
				}
				
				.des-text {
					vertical-align: top;
          padding: 0px 10px;
          padding-top: 10px;
					height: 90px;
					resize:none;
					border: 0px;
				}
			}
		}
		
	}
	.add-operation {
		padding: 60px 0 0 120px;
		.submit {
      outline: none;
			width: 160px;
			height: 40px;
			border: 0px;
      background: #01D7FD;
			border-radius: 4px;
      letter-spacing: 5px;
		}
	}
}
</style>
