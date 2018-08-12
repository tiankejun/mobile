/**
 * @file VUEX状态存储
 * @auther Jake
 * @date 2017.10
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

import common from './common'

const state = {}
const getters = {}
const mutations = {}
const actions = {}
const modules = {
    common,
}
let debug = false
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules,
    plugins: debug ? [createLogger()] : [],
    strict: true
})
