<template>
  <div class="tec circle">
    <div class="grahp-content relative">
        <img src="../../assets/graphcircle.png" alt="" class="graph-img absolute inblock">
        <div class="resultcout-des absolute tec">
          <p class="fs32">{{percentObject.resultcout}}</p>
          <p class="fs12">{{percentObject.resultdes}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectionList',
  props:{
    percentObject: {
      type:Object,
      default:{
        resultcout: '42%',
        resultdes: '区域占比'
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.grahp-content {
  width: 178px;
  height: 180px;
  .graph-img {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 178px;
    height: 180px;
  }
  .resultcout-des {
    top: 55px;
    height: 80px;
    color: white;
    width: 100%;
    :first-child {
      margin-bottom: 10px;
    }
  }
}
</style>
