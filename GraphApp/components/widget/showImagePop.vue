<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>

      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    closeMyself () {
      // 子组件传递事件给父组件
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
/* .drop-leave-active {
  transition: all .3s ease;
} */
/* .drop-enter {
  transform: translateY(-600px);
}
.drop-leave-active {
  transform: translateY(-600px);
} */

.dialog-wrap {
  /*position: fixed;*/
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #2C4062;
  opacity: .8;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  border-radius: 8px;
  position: fixed;
  max-height: 50%;
  background-image: radial-gradient(91% 143%, #003A6A 0%, #042458 100%);
  top: 20%;
  left: 50%;
  width: 600px;
  margin-left: -300px;
  z-index: 10;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
