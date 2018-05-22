<template>
  <div class="logout">
    <div class="content tec fs20">
      <img src="../../assets/successful.png" alt="">
       <span class="success-title">添加成功</span>
    
    </div>
    <div class="logout-operation tec">
      <span class="inblock cp corfff" @click="sureBtn(parameter.status)">确定</span>
    </div>
  </div>
</template>

<script>

export default {
    name: 'logout',
    props: {
      parameter: {
        type:Object,
        default:function() {
          return {
            _id:'',
            region_id:'',
            name:'',
            status:'',
            category:''
          }
        }
      }
    },
    data () {
      return {
        isShow:true
      }
    },
    methods: {
      sureBtn(mapName) {
          
          this.$emit('closeEvent');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.logout {
  
  .content {
    height: 190px;
    line-height: 80px;
    margin: 60px 100px 40px 100px;
    color: #7689B6;
    >img {
      width: 104px;
      height: 104px;
      display: inline-block;
    }
    .success-title {
      display:block;
      color:#01D7FD;
      line-height: 50px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.50);
    }
  }
  .logout-operation {
    margin: 30px 100px;
    padding-bottom: 50px;
    span {
      width: 160px;
      display: inline-block;
      text-align: center;
      line-height: 40px;
      height: 40px;
      
      background: #01D7FD;
      border-radius: 4px;
    }
  }

}
</style>
