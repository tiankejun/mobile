/**
 * @file VUEX状态存储-日志命名空间
 * @auther Jake
 * @date 2017.10
 */

const state = {
    MenuList: []
}

const mutations = {
    UPDATE_MENULIST (state, value) {
        state.MenuList = value
    },
}

const actions = {
    // 接受数组参数，替换内容
    update_menuList ({commit}, value) {
        commit('UPDATE_MENULIST', value)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
