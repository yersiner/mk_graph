<template>
  <div id="app">
    <router-view></router-view>
    <Loader :load="loading"></Loader>
    <notifications classes="my-style" position="bottom right" group="auth"/>
    <notifications group="app" position="top center"/>
  </div>
</template>

<script>
  import Loader from './widget/loading'
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    components: {
      Loader
    },
    computed: {
       ...mapState([
          'loading'
       ])
    },
    data () {
      return {
        section: 'Head'
      }
    },
    methods: {
      
    }
  }
</script>
<style lang="less">
  .v-select .open-indicator:before {
      border-color: white;
      border-width: 1px 1px 0px 0;
      width: 8px;
      height: 8px;
  }
  #app .v-select .selected-tag {
      color: #EFF3FC;
      font-size: 14px;
  }
  #app .input.is-danger {
      border: 1px solid #ff3860;
  }
  
  #app .v-select .open-indicator:before {
    border-color:rgb(239,243,252);
  }
  #app .v-select input {
    height: 40px;
    line-height: 40px;
  }
  #app .v-select ::placeholder {
    color: #A2ADCE;
    opacity: 1;
    font-size: 14px;
  }
  .my-style {
    padding: 10px;
    margin: 0 5px 5px;

    font-size: 12px;

    color: #ffffff;
    background: #44A4FC;
    border-left: 5px solid #187FE7;

    &.warn {
      background: #ffb648;
      border-left-color: #f48a06;
    }

    &.error {
      background: #E54D42;
      border-left-color: #B82E24;
    }

    &.success {
      background: #68CD86;
      border-left-color: #42A85F;
    }
    .notification-title {
      font-size: 20px;
    }

    .notification-content {
      font-size: 18px;
    }

    &.my-type {
      /*
      Style for specific type of notification, will be applied when you
      call notification with "type" parameter:
      this.$notify({ type: 'my-type', message: 'Foo' })
      */
    }
  }
  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {margin: 0;padding: 0}
  .absolute {position: absolute;}
  .relative {position: relative;}
  .inblock {display: inline-block;}
  .fr {float: right;}
  .fl {float: left;}
  .tec {text-align: center;}
  .tel {text-align: left;}
  .ter {text-align: right;}
  .cp {cursor: pointer;}
  .width100 {width: 100%}
  /*颜色*/
  .corfff {color: #fff}
  .title-color {color: #8494A5}
  .bgkey {background-color: #1F3559}
  .bgmain {background-color: #122442;}
  .tablecolor {background-color: #A2ADCE}
  .colortable {color: #A2ADCE}
  .bg-opcity {background-color: #2C3D5D}
  .colorbtn {color: #00D1FF}
  .bgtablel {background-color: #1B3053}
  .bgtabler {background-color: #182C4D}
  /*透明度的线*/
  .opacityline {background-color: rgb(118,137,182);height: 0.5px; opacity: 0.7} 
  .opacity40 {opacity: 0.4}
  .opacity50 {opacity: 0.5}
  .opacity60 {opacity: 0.6}
  .opacity70 {opacity: 0.7}

  .fs12 {font-size: 12px}
  .fs13 {font-size: 13px}
  .fs14 {font-size: 14px}
  .fs15 {font-size: 15px}
  .fs16 {font-size: 16px}
  .fs18 {font-size: 18px}
  .fs20 {font-size: 20px}
  .fs22 {font-size: 22px}
  .fs24 {font-size: 24px}
  .fs32 {font-size: 32px}
  .fs48 {font-size: 48px}
  html, body {
    height: 100%;
    min-height: 100%;
    min-width: 1024px;
  }
  #app {
    min-height: 100%;
    height:100%;
    /*height: inherit;*/
  }
</style>
