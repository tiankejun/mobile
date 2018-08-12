/**
 * @description 隐藏相同项，如果所有列对应的行都相等（isEqual: true），则隐藏，不相等（isEqual: flase）则不隐藏
 * @param {Array} list
 */
let hideSameItem = function (list) {
    // 存储最后结果数据
    let result = []
    // 存储数据结构
    let pathTemplate = []
    if (list.length) {
        // 组装数据路径模板
        pathTemplate = getPath(list[0])
        // console.log(pathTemplate)
        // 按照模板规则，处理所有数据，判断每一列中对应的行数据是否相等
        processList(pathTemplate, list)
        // 更新原数据
        result = updateData(pathTemplate, list)
        return result
    } else {
        return result
    }
    /**
     *  组装path模板，
     * @deprecated 根据第一列数据格式，获取数据路径
     * @param {Boolean} colData 第一列数据
     * @returns {Array} 行数据存储的路径模板
     *  [
     *      { path: [ 'magnet', 'fields', 'magnet1' ], flag: false }
     *  ]
     */
    function getPath (colData) {
        let paths = []
        let keys = Object.keys(colData)
        if (keys[0] === 'imgURL') {
            keys = keys.splice(1)
        }
        // console.log('keys--', keys)
        keys.forEach(key => {
            let fields = colData[key].fields
            let fieldsKeys = Object.keys(fields)
            fieldsKeys.forEach(fieldsKey => {
                paths.push({
                    path:[key, 'fields', fieldsKey],
                    flag: false,    // 占位符，后面会进行计算
                })
            })
        })
        return paths
    }
    /**
     * 处理所有list 数据
     * @deprecated 根据第一条数据格式，将所有数据都按照之前的格式进行处理
     * @param {Array} path 存储每一行数据的路径
     * @param {Array} list 所有要处理的数据
     * @returns {Array} 所有处理后的数据
     * [
     *      { path: [ 'magnet', 'fields', 'magnet1' ], flag: false }
     *      ...
     * ]
     */
    function processList (paths) {        
        paths.forEach(item => {
            let tempPath = JSON.parse(JSON.stringify(item.path))
            // 根据对比结果重新赋值，所有列对应的行相等，则为true，不相等则为false
            item.flag = judge(tempPath, list)
            return item
        })

        console.log('所有数据对应的路径--->', paths)
    }
    /**
     * @description 判断每一行数据是否相等
     * @param {Array} path 路径
     * @param {Array} list 所有数据
     * @returns {Boolean} flag
     */
    function judge(path, list) {
        let flag = true // 默认每一行数据都是相等
        let value = ''
        let field = ''
        // 先获取第一列的值，在循环获取其他列的值，拿第一列的值与下面的每一列进行比较，如果不相等，则返回false
        list.forEach(item => {
            field = getValueByPath(path, item)
            if (!value) {
                value = field.value
            } else if (value !== field.value) {
                flag = false
            }
        })
        return flag
    }
    /**
     * @description 根据路径递归查询 路径对应的值
     * @param {Array} path 路径
     * @param {Object} colData 每一列数据
     * @return {Boolean} 路径对应的数据
     * {
     *      isShow: true,
     *      value: ''
     * }
     */
    function getValueByPath(path, colData) {
        // 因为shift()会改变原始数据所以用深拷贝
        let tempPath = JSON.parse(JSON.stringify(path))
        let key = tempPath.shift()
        if (tempPath.length === 0) {
            return colData[key]
        } else {
            return getValueByPath(tempPath, colData[key])
        }
    }
    /**
     * @description 根据
     * @param {Array} path
     * @param {Array} list
     */
    function updateData (paths, list) {
        list.map(item => {
            paths.forEach(path => {
                let value = getValueByPath(path.path, item)
                value.isEqual = !path.flag
            })
            return item
        })
        return list
    }
}
let resetList = function (list) {
    list.forEach(item => {
        for (let key in item) {
            let fields = item[key].fields
            for (let field in fields) {
                fields[field].isEqual = true
             }
        }
    })
    return list
}
export default {
    resetList,
    hideSameItem,
}