/**
 * @file 基于axios的AJAX请求封装
 * 参数不带token和仓库ID
 * @auther Aaron
 * @date 2018.4
 */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { MessageBox } from 'element-ui'

/**
 * 序列变化Object数据
 * @param  {Object} params 需要序列化的数据
 * @return {String}        序列化后的字符串 a=123&b=456&c=888
 */
let paramsSerializer = function (params) {
    let parts = []
    for (let key in params) {
        let val = params[key]
        if (val === null || typeof val === 'undefined') {
            continue
        }
        if (Array.isArray(val)) {
            val = JSON.stringify(val)
        }
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(val))
    }
    let result = parts.join('&')
    return result
}

// 参数配置说明：https://www.kancloud.cn/yunye/axios/234845
let instance = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
    // baseURL: 'static/api/',
    // baseURL: '',
    timeout: 60000,
    paramsSerializer: function (params) {
        return paramsSerializer(params)
    },
    // `headers` 是即将被发送的自定义请求头
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: {
        //  tokenID: tokenID,// 统一向url中添加参数
    },
    transformResponse: [
        function (data) {
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data)
                } catch (e) {
                    /* Ignore */
                }
            }
            return data
        }
    ]
})

// request请求拦截器【可用于发送数据前进行数据加工】
instance.interceptors.request.use(
    config => {
        // console.log(config)
        // 请求前拼接当前服务器地址
        // if (config.url.indexOf('http://') < 0) {
        //     config.url = store.state.serverUrl + config.url
        // }
        // 给指定请求模式添加参数
        // 所有请求发起前加入tokenID参数
        if (config.method === 'post') {
            if (!config.data) {
                config.data = {}
            }
        }
        if (config.method === 'get') {
            if (!config.params) {
                config.params = {}
            }
        }
        // 请求前是否登录检测
        // let tk = Vue.localStore.get('Token')
        // let lg = Vue.localStore.get('Lang')
    
        // 给指定请求模式添加参数
        // 所有请求发起前加入tokenID参数
        if (config.method === 'post') {
            if (!config.data) {
                config.data = {}
            }
            // 根据请求协议规范请求参数
            // config.data = param
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 登录超时提示标识【true代表已经提示】
let isLoginTimeoutMsg = false
// respone数据返回拦截器【可用于全局判断登录是否过期】
instance.interceptors.response.use(
    response => {
        let result = response.data
        try {
            if (typeof result !== 'object') {
                result = JSON.parse(result)
            }

            // 请求成功，但接口返回502错误时
            if (result.c < 600 && result.c > 400) {
                console.log('接口' + result.c + '错误：', {
                    title: 'Fetch request error',
                    method: response.config.method,
                    message: result.msg,
                    rid: result.rid,
                    url: response.config.url,
                    params: response.config.data || response.config.paramsSerializer(response.config.params)
                })
            }
            if (result.c === 505) {
                // 独立新系统处理
                // 给出登录过期提示
                // 加判断是为了屏蔽重复提示
                if (!isLoginTimeoutMsg) {
                    MessageBox({
                        title: window.vm.$t('message.warning'),
                        message: window.vm.$t('code.505'),
                        confirmButtonText: window.vm.$t('buttons.confirm'),
                        type: 'warning',
                        callback: action => {
                            // 清空Token并跳转
                            Vue.localStore.clear('Token')
                            router.push('/')
                        }
                    })
                    isLoginTimeoutMsg = true
                }
                return Promise.reject(result)
                // return false
            } else {
                isLoginTimeoutMsg = false
                return result
            }
        } catch (err) {
            return result
        }
    }
    
)
export default instance