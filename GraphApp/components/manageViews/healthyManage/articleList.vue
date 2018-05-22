<template>
    <div class="article-wrapper">
        <div class="list-top">
            <input type="text" v-model="keyword"  placeholder="文章标题" class="input-color">
            <region-picker
               :auto="true"
               :completed="true"
               :regionData="CategoryMap"
               @onchange="regionChanged">
            </region-picker>
            <div class="search inblock tec cp" @click="serchMethod()">
                <img class="search-icon" src="../../../assets/search1x.png" alt="">
                <span class="corfff fs12">搜索</span>
            </div>
        </div>
        <!-- 列表 -->
        <list-table :list="tableData"></list-table>
        <div>
          <DataTable :total="totalCount" @loadData="loadCurList" v-show="totalCount>9"></DataTable>
        </div>
    </div>
</template>
<script>
import ArticleListTable from './articleListTable.vue'
import DataTable from "~/GraphApp/components/widget/DataTable.vue"
import { mapState } from 'vuex'
import RegionPicker from "../../widget/regionPicker.vue";//省市县
let currentPageOut = 1;
    export default {
        name: 'articleLisit',
        components : {
            'list-table': ArticleListTable,
            RegionPicker,
            DataTable
        },
        data(){
          return {
            name:'articleLisit',
            keyword: '',
            categoryId: ""
          }
        },
        asyncData ({ store, route }) {
           // 触发 action 后，会返回 Promise
           return store.dispatch('HealthyModule/getCategory', true).then((res) => {
                RegionPicker.region = Object.assign({}, RegionPicker.region, res)
                return store.dispatch('HealthyModule/articleList', {
                     "userId":'',
                     "articleTitle":'',
                     "categoryId":'',
                     "pageIndex": currentPageOut,
                     "pageSize":10
                })
           })
        },
        computed: mapState('HealthyModule', {
          //把vuex里面的状态取出来 给该组件去使用
          // arrow functions can make the code very succinct!
          tableData: state => state.articleList,
          totalCount: state => state.totalCount,
          linkCategory: state => state.linkCategory,
          CategoryMap: state => state.CategoryMap
        }),
        methods: {
            serchMethod(){
               this.$store.dispatch('HealthyModule/articleList', {
                    "userId":'',
                    "articleTitle": this.keyword,
                    "categoryId": this.linkCategory[this.categoryId],
                    "pageIndex":1,
                    "pageSize":10
               })
            },
            loadCurList(currentPage) {
                currentPageOut = currentPage
                this.$store.dispatch('HealthyModule/articleList', {
                     "userId":'',
                     "articleTitle":this.keyword,
                     "categoryId": this.categoryId,
                     "pageIndex":currentPage,
                     "pageSize":10
                })
            },
            regionChanged(region) {
                this.categoryId = "";
                if(region.province !== 'novalue') {
                    this.categoryId = region.province[0]
                }
                if(region.city !== 'novalue') {
                    this.categoryId = region.city[0]
                }
                if(region.district !== 'novalue') {
                    this.categoryId = region.district[0]
                }
            }
        }
    }
</script>
<style scoped lang="less">
.article-wrapper {
    .list-top {
        margin-top: 40px;
        padding-bottom: 25px;
        border-bottom: 0.5px solid #3C4E78;
        height: 40px;
        line-height: 40px;
        >input {
            height: 40px;
            width: 253px;
            outline: none;
            border: 0px;
            border-radius: 4px;
            background: #1B2E4C;
            text-indent: 20px;
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
        .article-cate {
            vertical-align: bottom;
            color: #596C93;
            width: 120px;
            height: 40px;
            background: #1B2E4C;
            border: 4px;
            margin: 0 10px;
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
        .search {
            height: 36px;
            line-height: 36px;
            border: 2px solid #01D7FD;
            width: 90px;
            border-radius: 4px;
            .search-icon {
                vertical-align: middle;
            }
        }
    }
}
</style>