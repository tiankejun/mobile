
import LocalStore from './localStorage'

import filters from './filters'

import tools from './tools'

// 定义版本号
const version = '1.0.7'

// 提供组件的列表
const components = [

]

// 注册组件
const install = function (Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component)
    })
    filters.map(filter => {
        Vue.filter(filter.name, filter)
    })
    Vue._v = Vue.prototype.$v = version
    Vue.tools = Vue.prototype.$tools = tools
    Vue.localStore = Vue.prototype.$localStore = LocalStore

    Vue.use(opts)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: version,
    install,
}
