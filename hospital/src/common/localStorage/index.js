/**
 * @file cookie方法：【挂在在vue上，直接使用】
 * @auther F7
 * @date 2017.10
 */
function set (name, value) {
    localStorage.setItem(name, value)
}
function get (name) {
    return localStorage.getItem(name)
}
function clear (name) {
    localStorage.removeItem(name)
}

export default {
    get,
    set,
    clear,
}
