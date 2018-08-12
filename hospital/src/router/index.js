/**
 * @file 路由分发中心
 * @auther Jake
 * @date 2017.10
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Error from './error'
import NuclearMagnetic from './nuclearMagnetic'
import TEST1 from './test1'
import TEST2 from './test2'
import TEST3 from './test3'

Vue.use(Router)

const router = new Router({
    routes: [
        ...NuclearMagnetic,
        ...TEST1,
        ...TEST2,
        ...TEST3,
        ...Error,
    ]
})

let MenuList = [
    ...NuclearMagnetic,
    ...TEST1,
    ...TEST2,
    ...TEST3,
]
// store.dispatch('common/update_menuList', MenuList)

const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
    Vue.localStore.set('Token', '123')
    let token = Vue.localStore.get('Token')
    // 跳转到登录页面时记录下来源页面path
    // if (to.path === '/login') {
    //     store.dispatch('layout/update_loginBeforeRouter', from.path)
    // }

    if (whiteList.indexOf(to.path) >= 0) {
        next()
    } else if (!token) {
        next({path: '/login'})
    } else {
        next()
    }
})

export default router
