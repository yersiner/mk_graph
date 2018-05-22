<template>
  <baidu-map 
    ak="A152f7aa11928ce39d45f69554d0f657"
    :scroll-wheel-zoom="false"
    :theme="theme"
    :center="center"
    :zoom="zoom"
    @ready="handler"
    class="map">
       <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
       <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
       <bm-marker :icon="{url: '../../../GraphApp/assets/map-point.png', size: {width: 150, height: 179}}" v-for="(item, index) in hospitalList" :key="index" animation="BMAP_ANIMATION_DROP" :position="Points[index]" :dragging="true" @click="focusCurentPoint(index)">
          <Overlay
            :position="Points[index]"
            :text="item.hospitalName">
          </Overlay>
       </bm-marker>
  </baidu-map>
</template>
<script>
  import {BaiduMap, BmOverlay, BmLabel, BmView,BmPointCollection, BmMapType, BmNavigation, BmGeolocation, BmMarker, BmInfoWindow} from 'vue-baidu-map'
  import theme from '~/GraphApp/utils/theme'
  import Overlay from './overlay'
  import { mapState } from 'vuex'
  export default {
    name:'',
    computed: mapState('DistributeModule', ["Points", "hospitalList"]),
    data () {
       return {
         zoom: 16,
         keyword: '',
         show: false,
         center: '贵阳',
         theme: theme,
         markerPoint: {
            lng:106.6367843613,
            lat:26.6527625307
         }
       }
    },
    components: {
        BaiduMap,
        BmOverlay,
        BmView,
        BmLabel,
        BmPointCollection,
        BmMapType,
        BmNavigation,
        BmGeolocation,
        BmMarker,
        BmInfoWindow,
        Overlay
    },
    methods: {
       handler ({BMap, map}) {
        this.BMap = BMap
        this.map = map
        this.$store.commit('DistributeModule/INIT_MAP_INSTANCE', map)
        console.log('map has loaded!');
        //console.log(BMap, map)
        //this.center.lng = 106.6367843613
        //this.center.lat = 26.6527625307
        //this.zoom = 15
       },
       focusCurentPoint(index) {
        //console.log('show...');
        this.center = {};
        this.center.lng = this.Points[index].lng;
        this.center.lat = this.Points[index].lat;
        this.zoom = 18;
        let id = this.hospitalList[index].location.hospitalId
        this.$store.dispatch('HospitalModule/getHospitalDetail', {
          hospitalId: id
        }).then((res) => {
           this.$store.commit('DistributeModule/DETAIL_PANE_TOGGLE')
        })
        //this.show = true
       },
       infoWindowClose() {
        this.show = false
       },
       syncCenterAndZoom(e) {
           const {lng, lat} = e.target.getCenter();
           this.center.lng = lng;
           this.center.lat = lat;
           this.zoom = e.target.getZoom();
          // console.log(this.center);
       }
    }
  }
</script>
<style scoped>
  .map {
    width: 100%;
    /*height: 800px;*/
  }
</style>