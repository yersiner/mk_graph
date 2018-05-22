<template>
    <!-- footer -->
    <div class="app-foot">
      <span>@版权归：米可医疗科技有限公司所有</span>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        users:'系统管理员',
        time:'今天是2017年11月8日 星期三'
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  @bgColor: #27406A;
    .app-foot{
      position: fixed;
      bottom: 0;
      height: 60px;
      width: 100%;
      background: #1F304E;
      color: #fff;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #7689B6;
      z-index: 99999;
      &>span{
        display: inline-block;
        line-height: 60px;
      }
    }

</style>