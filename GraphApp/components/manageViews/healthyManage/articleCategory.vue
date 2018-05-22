<template>
  <div class="healthy">
    <table class="width100">
        <thead>
            <tr class="table-title bg-opcity">
                <th class="healthy-id corfff  fs14">ID</th>
                <th class="name corfff fs14">名称</th>
                <th class="sort corfff fs14">排序</th>
                <th class="operation corfff  fs14">操作</th>
            </tr>
        </thead>
    </table>
    <ul>
        <menuItem class="item" :edit="edit" v-for="(model,index) in sortedList"
        :model="model" v-bind:key="model._id" :byIndex="index" :plist="sortedList"></menuItem>
    </ul>
    <button v-show="edit" class="add-button hvr-outline-out button colorbtn cp" @click='addItem'>新增分类</button>
  </div>
</template>

<script>
import menuItem from './menuItem'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'articleCategory',
  components: {
    menuItem
  },
  asyncData ({ store, route }) {
     // 触发 action 后，会返回 Promise
     //console.log('健康分类')
     return store.dispatch('HealthyModule/getCategory')
  },
  data () {
    return {
          msg: 'Welcome to Your Vue.js App',
          editText: {
             true: '保存',
             false: '编辑'
          },
          edit: true
    }
  },
  computed: {
    ...mapState('HealthyModule', [
      // map this.count to store.state.count
      'CategoryList',
      'delList',
      'addCategoryMap',
      'addOrEditList'
    ]),
    ...mapGetters('HealthyModule', [
      'sortedList'
      // ...
    ])
  },
  methods: {
    addItem() {
        let id = Date.now()
        let sort = this.sortedList[this.sortedList.length - 1].sort

        this.$store.dispatch('HealthyModule/addOrEditCategory', {
            name: '新一级分类',
            categoryId: "",
            parent_id: "1",
            sort: sort
        })
        this.sortedList.push({
            name: '新一级分类',
            childNode: [],
            categoryId: "",
            parent_id: "1",
            layerNumber: 1,
            _id: id,
            sort: this.sortedList[this.sortedList.length - 1].sort
        })
    },
    editMethod() {
        if(this.edit) {
            //this.$store.commit('HealthyModule/getAddCatRecursive')
            
            console.log('delList--->', this.delList)
            console.log('addOrEditList--->', this.addOrEditList)
            //this.$store.commit('HealthyModule/clearAddOrEditList')

        }
        this.edit = !this.edit
        console.log('编辑');
    },
    addnextMethod() {
        console.log('新增下级');
    },
    deleteMethod() {
        console.log('删除');
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.flip-list-move {
  transition: transform 1s;
}
.hvr-outline-out {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  position: relative;
}
.hvr-outline-out:before {
  content: '';
  position: absolute;
  border: #0BA6CB solid 1px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: top, right, bottom, left;
  transition-property: top, right, bottom, left;
}
.hvr-outline-out:hover:before{
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
}
.add-button {
    margin-left: 5px;
    position: absolute;
    left: 0;
    bottom: -80px;
    font-size: 20px;
}
.button {
    outline: none;
    background: #1E4C6C;
    border: 1px solid #0BA6CB;
    border-radius: 4px;
    padding: 15px 20px;
}
.edit-button {
    margin-left: 5px;
    position: absolute;
    right: 0;
    bottom: -80px;
    font-size: 20px;
}
.healthy {
    position: relative;
    margin-top: 40px;
    border-top: 0.5px solid #3C4E78;
    >table {
        margin-top: 30px;
            .table-title {

            height: 36px;
            line-height: 36px;
            >td {border-left: 1px solid #122442;margin-left: 1px;}
            .healthy-id {
                width: 9%;
            }
            .name {
                width: 62.3%;;
                border-left: 1px solid #122442;
            }
            .sort {
                width: 8.8%;
                border-left: 1px solid #122442;
            }
            .operation {
                width: 20.5%;
                border-left: 1px solid #122442;
            }
        }
        .main-show {
            height: 48px;
            line-height: 48px;
            >:nth-child(2n) {
                background-color: #2C3D5D;
            }
            .edit,.add,.delete {
                padding: 2px 4px;
                border-radius: 4px;
                border: 1px #0BA6CB solid;
                background: #1E4C6C;
            }
        }
    }
    
}
</style>
