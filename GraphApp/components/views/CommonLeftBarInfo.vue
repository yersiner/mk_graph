<template>
  <div>
       <div class="hos-kind">
                <div class="kind-title bgmain title-des relative">
                  <span class="fs20 title-color">信息概览</span>
                </div>
                <div class="hos-info-content bgmain">
                    <ul v-if="this.$route.name === 'healthRecords'">
                      <li class="info-item">
                        <span class="inblock" style="background-color:#01D7FD"></span>
                        <span class="fs48 corfff">{{data.casesCount}}</span>
                        <span class="title-color fs16">份 / 健康档案</span>
                      </li>
                      <li class="info-item">
                        <span class="inblock" style="background-color:#50E3C2"></span>
                        <span class="fs48 corfff">{{data.hospitalCount}}</span>
                        <span class="title-color fs16">个 / 覆盖区域</span>
                      </li> 
                      <li class="info-item">
                        <span class="inblock" style="background-color:#A094FF"></span>
                        <span class="fs48 corfff">{{data.familyCount}}</span>
                        <span class="title-color fs16">家 / 涵盖家庭</span>
                      </li>
                    </ul>
                    <ul v-if="this.$route.name === 'hosDistribute'">
                      <li class="info-item">
                        <span class="inblock" style="background-color:#A094FF"></span>
                        <span class="title-color fs16">共整合</span>
                        <span class="fs48 corfff">{{data.hospitalCount}}</span>
                        <span class="title-color fs16">家社区医院</span>
                      </li>
                      <li class="info-item">
                        <span class="inblock" style="background-color:#01D7FD"></span>
                        <span class="title-color fs16">签约家庭</span>
                        <span class="fs48 corfff">{{data.familyCount}}</span>
                        <span class="title-color fs16">家</span>
                      </li>
                      <li class="info-item">
                        <span class="inblock" style="background-color:#50E3C2"></span>
                        <span class="title-color fs16">覆盖人数</span>
                        <span class="fs48 corfff">{{data.userCount}}</span>
                        <span class="title-color fs16">人</span>
                      </li>
                    </ul>
                    <ul v-if="this.$route.name === 'physicalData'">
                      <li class="info-item">
                        <span class="inblock" style="background-color:#A094FF"></span>
                        <span class="title-color fs16">共检测</span>
                        <span class="fs48 corfff">{{data.signTotalCount}}</span>
                        <span class="title-color fs16">份体格数据</span>
                      </li>
                      <li class="info-item">
                        <span class="inblock" style="background-color:#01D7FD"></span>
                        <span class="title-color fs16">覆盖</span>
                        <span class="fs48 corfff">{{data.userCount}}</span>
                        <span class="title-color fs16">个用户</span>
                      </li>
                    </ul>
                </div>  
        </div>
        <!-- 区域数据Start -->
        <div class="area-data">
              <div class="data-title title-des bgmain bottom-line relative">
                  <span class="fs20 title-color inblock">区域数据</span>
                  <div class="area-region inblock fr">
                      <region-picker 
                        :province="provinceSelected"
                        :city="citySelected"
                        :twoSelect="true"
                        @onchange="regionChanged">
                      </region-picker>
                  </div>
              </div>
              <div class="data-content bgmain" v-if="this.$route.name === 'healthRecords'">
                      <ul class="">
                        <li class="bgkey">
                          <span class="corfff inblock bgtablel fs16 ter">健康档案</span>
                          <span class="corfff fs16">{{data.regionCaseCount}}</span>
                        </li>
                        <li class="bgkey">
                          <span class="corfff inblock bgtablel ter fs16">覆盖社区</span>
                          <span class="corfff fs16">{{data.regionHospitalCount}}</span>
                        </li>
                        <li class="bgkey">
                          <span class="corfff inblock bgtablel ter fs16">涵盖家庭</span>
                          <span class="corfff fs16">{{data.regionFamilyCount}}</span>
                        </li>
                      </ul>
                      <!-- 圆柱表 Start-->
                      <div class="followup-rate bgmain">
                            <graphCircle :percentObject="{resultcout: (data.regionPercent||'') + '%',resultdes:'区域占比'}"></graphCircle>
                      </div>
                      <!-- 圆柱表End -->
               </div>
               <div class="data-content bgmain" v-if="this.$route.name === 'hosDistribute'">
                       <ul class="">
                         <li class="bgkey">
                           <span class="corfff inblock bgtablel fs16 ter">整合医院</span>
                           <span class="corfff fs16">{{data.regionHospitalCount}}个</span>
                         </li>
                         <li class="bgkey">
                           <span class="corfff inblock bgtablel ter fs16">签约家庭</span>
                           <span class="corfff fs16">{{data.regionFamilyCount}}家</span>
                         </li>
                         <li class="bgkey">
                           <span class="corfff inblock bgtablel ter fs16">覆盖人数</span>
                           <span class="corfff fs16">{{data.regionUserCount}}人</span>
                         </li>
                       </ul>
                       <!-- 圆柱表 Start-->
                       <div class="followup-rate bgmain">
                             <graphCircle :percentObject="{resultcout:(data.visitPercent||'') + '%',resultdes:'随访率'}"></graphCircle>
                       </div>
                       <!-- 圆柱表End -->
                </div>
                <div class="data-content bgmain" v-if="this.$route.name === 'physicalData'">
                        <ul class="">
                          <li class="bgkey">
                            <span style="width: 130px;" class="corfff inblock bgtablel fs16 ter">共上传体格数据</span>
                            <span class="corfff fs16">{{data.regionSignTotalCount}}份</span>
                          </li>
                          <li class="bgkey">
                            <span style="width: 130px;" class="corfff inblock bgtablel ter fs16">覆盖用户</span>
                            <span class="corfff fs16">{{data.regionUserCount}}人</span>
                          </li>
                        </ul>
                        <!-- 圆柱表 Start-->
                        <div class="followup-rate bgmain">
                              <graphCircle :percentObject="{resultcout:(data.aveUpload||'') + '次/个',resultdes:'平均上传'}"></graphCircle>
                        </div>
                        <!-- 圆柱表End -->
                 </div>
        </div>
        <leftBarLoader :load="left_loading"></leftBarLoader>
    </div>
</template>

<script>
  import graphCircle from "~/GraphApp/components/widget/GraphCircle";
  import REGION_DATA from "~/GraphApp/api/cityData";
  import RegionPicker from "../widget/regionPicker.vue";//省市县
  import leftBarLoader from "./leftBarLoader";//进度条
  import { mapState } from 'vuex'
  RegionPicker.region = REGION_DATA
  export default {
    name: 'CommonLeftBar',
    props:{
      data: {}
    },
    computed: {
       ...mapState([
         // map this.count to store.state.count
         'left_loading'
       ])
    },
    data () {
      return {
        provinceSelected: '贵州省',
        citySelected: '贵阳市',
      }
    },
    components: {
      graphCircle,
      leftBarLoader,
      RegionPicker
    },
    mounted(){
      this.$store.commit('UPDATE_LEFT_LOADING_STATUS', {
        isLoading: true
      })
      this.$emit('updateData', {
          province: this.provinceSelected,
          city: this.citySelected
      })
    },
    methods: {
        regionChanged(regionInfo) {
            this.provinceSelected = regionInfo.province;
            this.citySelected = regionInfo.city;
            this.$store.commit('UPDATE_LEFT_LOADING_STATUS', {
              isLoading: true
            })
            this.$emit('updateData', regionInfo)
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
      .title-des {
          height: 62px;
          line-height: 62px;
          padding: 0 32px;
          border-bottom: 0.5px solid #2C3D5D;
      }
      .hos-kind {/*医院分类*/
        .hos-info-content {
            padding: 10px 0 20px 0;
            border-bottom: 1px solid #7689B6;
            .info-item {
              height: 60px;
              line-height: 60px;
              padding: 11px 31px;
              :first-child {
                width: 10px;
                height: 10px;
                border-radius: 4px;
              }
            }
        }
      }
        .area-data {
          .data-content {
            padding: 24px 32px;
            .bgkey {
              height: 40px;
              line-height: 40px;
              border-radius: 4px;
              margin-bottom: 1px;
              :first-child {
                width: 80px;
                text-align: center;
              }
            }
          }
        }
      .followup-rate {
        height: 260px;
        margin-top: 40px;
        margin-left: 66px;
      }
</style>