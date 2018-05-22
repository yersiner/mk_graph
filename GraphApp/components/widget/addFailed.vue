<template>
  <div class="logout">
    <div class="content tec fs20">
      <img src="../../assets/addfailed.png" alt="">
       <span class="success-title">请填写完整的添加信息</span>
    
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
        default:{
          _id:'',
          region_id:'',
          name:'',
          status:'',
          category:''
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
          console.log("确定",this.parameter.status);
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
      color:#FF5AAA;
      line-height: 50px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.50);
    }
  }
  .logout-operation {
    margin: 30px 100px;
    padding-bottom: 50px;
    span {
      background-image: linear-gradient(90deg, #FF5AAA 0%, #FF8E95 100%);
      width: 160px;
      display: inline-block;
      text-align: center;
      line-height: 40px;
      height: 40px;
      border-radius: 4px;
    }
  }

}
</style>
