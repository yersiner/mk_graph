<template>
    <div class="table-wrapper">
        <div class="search-list">
          <input type="text" v-model="name" placeholder="医院名称" class="hosptial-input input-color">
          <div @click="search()" class="hosptial-serch cp tec">
            <img src="../../../assets/search1x.png" alt="">
            <span class="corfff">搜索</span>
          </div>
        </div>
        <div class="hospital-datial">
          <!-- 表组件 分页组件 Start -->
          <HospitalTable :list="tableData"></HospitalTable>
          <!-- 表组件 分页组件 End -->
        </div>
        <div>
          <ExportCurrent @exportEvent="exportEvent"></ExportCurrent>
          <DataTable :total="totalCount" @loadData="loadCurList" v-show="totalCount>9"></DataTable>
        </div>
    </div>
</template>
<script>
    import DataTable from "~/GraphApp/components/widget/DataTable.vue"
    import ExportCurrent from "~/GraphApp/components/widget/exportCurrent.vue"
    import HospitalTable from '~/GraphApp/components/manageViews/hospitalManage/hospitalTable'
    import { mapState } from 'vuex'
    export default {
        name: 'listView',
        data(){
          return {
            name: '',
            oldName: ''
          }
        },
        asyncData ({ store, route }) {
           // 触发 action 后，会返回 Promise
           return store.dispatch('HospitalModule/queryHospitalList', {
              name: '',
              page_index: 1,
              item_count: 10
           })
        },
        components: {
          DataTable,
          HospitalTable,
          ExportCurrent
        },
        methods: {
          search() {
            if (this.oldName === this.name) {
              return;
            }
            this.$store.dispatch('HospitalModule/queryHospitalList', {
              name: this.name,
              page_index: 1,
              item_count: 10
             }).then((res)=> {
                  this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
             })
             this.oldName = this.name;
          },
          //导出当前
          exportEvent() {

            this.$store.dispatch('HospitalModule/exportHospitalList', {
              hospitalIds:this.exportIds
            }).then((res)=> {
              this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
            })
          },
          loadCurList(currentPage) {
            //console.log('test--current');
              this.$store.dispatch('HospitalModule/queryHospitalList', {
                 name: this.curName,
                 page_index: currentPage,
                 item_count: 10
              }).then((res)=> {
                this.$store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
              })
          }
        },
        computed: mapState('HospitalModule', {
          //把vuex里面的状态取出来 给该组件去使用
          // arrow functions can make the code very succinct!
          tableData: state => state.list,
          totalCount: state => state.totalCount,
          exportIds: state => state.exportIds
        })
    }
</script>
<style scoped lang="less">
    @bgColor:#243554;
    .search-list{
      overflow:hidden;
      .hosptial-input{
        display: block;
        float: left;
        outline: none;
        background: rgba(5,30,56,0.50);
        border-radius: 4px;
        width: 253px;
        height: 40px;
        border: 0px;
        padding: 0 0 0 10px;
      &:hover,&:active{
        border: 0px solid #01D7FD;
        box-shadow: 0 2px 3px 0 #051E38;
        border-radius: 4px;
        background: #051E38;
      }
      &::-webkit-input-placeholder{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(118,137,182,0.73);
        letter-spacing: 0;
      }
      }
    }
    .hosptial-serch{
      display: block;
      float: left;
      width: 89px;
      height: 36px;
      line-height: 36px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      // opacity: 0.7;
      border: 2px solid #01D7FD;
      box-shadow: 0 2px 3px 0 #051E38;
      border-radius: 4px;
      background: @bgColor;
      padding: 0;
      margin-left: 10px;
      outline: none;
        &:hover,&:active{
          outline: none;
        }
      &>img{
        display: inline-block;
        width: 19px;
        height: 19px;
        background-size: 19px;
        background-repeat: no-repeat;
        vertical-align: top;
        margin-top: 12px;
      }
    }

    .hospital-datial {
      margin-top: 30px;
      padding-top: 30px;
      border-top: 0.5px solid #3C4E78;
    }
    .hosptial-bottom{
      height: 181px;
      display: flex;
      .bottom-btn{
        flex:1;
        line-height: 181px;
        &>button{
          width: 160px;
          height: 32px;
          background-image: linear-gradient(270deg, #04BBE4 0%, #059AFF 100%);
          border-radius: 4px;
          border: 0;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 0;
          outline: none;
          &:hover,&:active{
            outline: none;
          }
        }

      }
    }
</style>