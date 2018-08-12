// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import i18n from './i18n'

import '@/assets/common/normalize.css'
import '@/assets/common/layout.less'
// import '@/assets/common/layout.css'

import 'element-ui/lib/theme-chalk/index.css'

import { sync } from 'vuex-router-sync'

// 业务无关的通用组件
import common from './common'

// 引入动态组件
Vue.use(common, {
    // router: router,
    // components: kjRouterComponents
})

import store from '@/store'
// 路由信息同步vuex
sync(store, router)

Vue.use(ElementUI)
// ElementUI初始化
// ElementLocale.i18n((key, value) => i18n.t(key, value))
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>'
})

window.vm = vm
