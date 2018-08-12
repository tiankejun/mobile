import fatch from '../fatch'
let testURL = '../../static'

/**
 * 获取列表
 */
// export function getColName () {
//     return fatch.get(testURL + '/testData/colomn.json')
// }

/**
 * 获取数据
 */
// export function getColData () {
//     return fatch.get(testURL + '/testData/test.json')
// }

// let getColName = function  () {
//     return fatch.get(testURL + '/testData/colomn.json')
// }
let getModelData = function () {
    return fatch.get(testURL + '/testData/test.bak.json')
}

let getColName = function (params) {
    return fatch.post('/nmr/api/args/columns', params)
}

// let getColData = function  () {
//     return fatch.get(testURL + '/testData/test.bak.json')
// }
let getColData = function (params) {
    return fatch.post('/nmr/api/args/vals', params)
}

export default {
    getModelData,
    getColName,
    getColData,
}