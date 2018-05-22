<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true}"
    pane="labelPane"
    @draw="draw">
    <div class="speech-bubble" v-text="text" @click="handleClick"></div>
  </bm-overlay>
</template>

<script>
 import {BmOverlay} from 'vue-baidu-map'
export default {
  props: ['text', 'position'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  components: {
      BmOverlay
  },
  methods: {
    handleClick () {
      global.alert('Well done.')
    },
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x + 65 + 'px'
      el.style.top = pixel.y - 100 + 'px'
    }
  }
}
</script>

<style scoped>
.speech-bubble {
  position: relative;
  background: #ffffff;
  border-radius: .4em;
  padding: 0 10px;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 9px solid transparent;
  border-right-color: #ffffff;
  border-left: 0;
  margin-top: -9px;
  margin-left: -9px;
}
.sample {
  width: max-content;
  line-height: 56px;
  overflow: hidden;
  height:56px;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
  color: #E7BF04;
  text-align: center;
  font-size: 24px;
  padding: 0 30px;
  border-radius: .4em;
}
</style>