<template>
<div class="hosDistribute" id="hosDistribute">
        <BMap class='map'></BMap>
        <DataPreview></DataPreview>
  </div>  
</template>

<script>
import BMap from "./HospitalDistribute/hospitalMap.vue";
import DataPreview from "./HospitalDistribute/dataPreview"
export default {
  name: 'hosDistribute',
  components: {
    DataPreview,
    //'areaList': AreaList,
    BMap
    //'graphCircle': graphCircle
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.hosDistribute{
  height: 1068px;
  position: relative;
  z-index: 10;
}
.map{
  height: 1000px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index:-1;
  margin-bottom: 60px;

}
</style>