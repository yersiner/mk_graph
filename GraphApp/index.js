import Vue from 'vue'
import VueRouter from 'vue-router'

//表单验证
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'//引入中文文件
import { Validator } from 'vee-validate'
import '../static/js/vee-validate.js'
import messages from '../static/js/zh_CN'//引入中文文件
//首页幻灯片播放
// import Carousel3d from 'vue-carousel-3d';
// Vue.use(Carousel3d);

import {sync} from 'vuex-router-sync'
import {INIT_ADD_HOT} from './store/mutation_types.js'

import api from '~/GraphApp/api/index.js'

import AppView from './components/App.vue'

Vue.use(VueRouter);
import routes from './routes'
import store from './store'

//项目基础样式
import '../static/common.css'
/*字体图标*/
import '../static/fonts/iconfont.css'

//import BaiduMap from 'vue-baidu-map'

import Notifications from 'vue-notification'

Vue.use(Notifications)

// Import Helpers for filters
import { domain, count, prettyDate, pluralize,nicedate } from './filter'

// Import Install and register helper items
Vue.filter('count', count);
Vue.filter('prettyDate', prettyDate)

//百度地图初始化
//Vue.use(BaiduMap, {
//  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
//  ak: 'YOUR_APP_KEY'
//})

// Routing logic
var router = new VueRouter({
  routes,
  linkActiveClass: "active", 
  mode: 'history'
});

router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
      // 我们只关心之前没有渲染的组件
      // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
    //console.log(9999);
    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to
        })
      }
    })).then(() => {
      //console.log('加载成功');
      store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && 
    (!router.app.$store.state.token 
    || router.app.$store.state.token === 'null')) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log('Not authenticated')
    next({
      path: '/login'
    })
  } else {
    if(to.name === 'addhospital') {
        store.commit('HospitalModule/INIT_ADD_HOT');
    }
    if(to.name === 'addart') {
        store.commit('HealthyModule/INIT_ARTICLE_DETAIL_INFO')
    }
    next()
  }
})

sync(store, router);

let vm = new Vue({
  el: "#root",
  store,
  router: router,
  render: h => h(AppView)
})

api.interceptorsMethod(store, vm)

//配置中文
// Validator.addLocale(zh_CN);

const config  = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
};

Vue.use(VeeValidate);
