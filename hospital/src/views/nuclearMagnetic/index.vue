<template>
    <div class="magnetic">
        <h2 class="title">磁共振数据对比</h2>
        <el-row type="flex" :gutter="20" justify="space-around">
            <el-col :span="6" class="tabel-header">
                <div class="selection header-top">
                    <el-checkbox v-model="hiddenSameItem" @change="hiddenSameItemFn">隐藏相通相</el-checkbox>
                </div>
                <div class="grid-content">
                    <el-collapse v-model="activeNames" v-for="(group, key, index) in colomTitle" :key="index" @change="handleChange">
                        <el-collapse-item :title="group.title" :name="group.key">
                            <div class="item" v-for="(fieldName, fieldKey) in group.fields" :key="fieldKey">
                                {{fieldName.title}}
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div
            ></el-col>
            <el-col :span="6" v-for="(colData, colIndex) in colomData" :key="colIndex">
                <Selection :colIndex="colIndex" :imgURL="colData.imgURL" @getParams="getParams" @moveData="moveData"></Selection>
                <div class="grid-content">
                    <el-collapse v-model="activeNames" v-if="key !== 'imgURL'" v-for="(model, key, modelIndex) in colData" :key="colIndex + '-' + modelIndex"  @change="handleChange">
                        <el-collapse-item v-if="key !== 'imgURL'" :title="model.title" :name="key">
                            <div v-for="(item, index) in model.fields" :key="index">
                                <span class="item" v-if="item.isEqual">{{item.value}}</span>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>
        </el-row>
    </div>
    
</template>
<script>
import apis from '@/api'
import Selection from '@/components/selection.vue'
export default {
    name: 'NuclearMagnetic',
    components: {
        Selection,
    },
    data () {
        return {
            colomData: [],
            colomTitle: [],
            params: [],
            hiddenSameItem: false,
            activeNames: ['MagnetSYS', 'RadiofrequencySYS', 'GradientSYS', 'SequenceInfor', 'ComputerSYS'],
        }
    },
    created () {
        this.getModelData()
        this.getColName()
    },
    methods: {
        // 获取模型数据
        getModelData () {
            return new Promise((resolve, reject) => {
                apis.getModelData().then(res => {
                    this.colomData = res
                    resolve()
                })
            })
        },
        // 根据参数获取列数据
        getData () {
            this.params = ['22', '23']
            let params = {
                modelIds: this.params.join(',')
            }
            return new Promise((resolve, reject) => {
                apis.getColData(params).then(res => {
                    // 如果  模版数据的长度 ＝＝＝ 返回数据的长度 则直接赋值
                    if (this.colomData.length === res.length) {
                        this.colomData = res.splice(0)    
                    } else {
                    // 否则将返回的数据按顺序插入到模板数据的头部
                        if (res.length) {
                            // 先删除返回数据的长度
                            this.colomData.splice(0, res.length)
                            res.forEach(item => {
                                this.colomData.unshift(item)    
                            })
                        }
                    }
                    resolve()
                })
            })
        },
        // 获取列名
        getColName () {
            return new Promise((resolve, reject) => {
                apis.getColName().then(res => {
                    this.colomTitle = res
                    resolve()
                })
            })
        },
        // 隐藏咧
        hiddenSameItemFn (flag) {
            this.hiddenSameItem = flag
            if (this.hiddenSameItem ) {
                this.colomData = this.$tools.hideSameItem(this.data)
            } else {
                this.colomData = this.$tools.resetList(this.data)
            }
        },
        // 数据左右移动
        moveData (moveInfo) {
            let data = JSON.parse(JSON.stringify(moveInfo))
            let currentIndex = data.index
            let currentData = this.colomData[currentIndex]
            if (moveInfo.dir === 'left') {
                if (moveInfo.index === 0) {
                    return
                }
                currentIndex = currentIndex - 1
            } else if (moveInfo.dir === 'right') {
                if (moveInfo.index === this.colomData.length) {
                    return
                }
                currentIndex = currentIndex + 1
            }
            this.colomData.splice(data.index, 1)
            this.colomData.splice(currentIndex, 0, currentData)
        },
        // 下拉框事件
        getParams (val) {
            console.log('test', val)
            // this.params.push(val[val.length-1])
            this.getData()
        },
        // 收起，展开功能
        handleChange (val) {
            console.log(val)
        }
    }
}
</script>
<style lang="less">
.magnetic{
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    .title {
        padding-left: 30px;
        font-size: 14px;
        color: #4a4a4a;
        text-align: left;
    }
    .header-top {
        padding-left: 10px;
        text-align: left;
    }
    .tabel-header {
        .el-collapse-item__wrap {
            background: #f9f9f9;
        }
    }
    .item {
        display: block;
        height: 32px;
        padding: 5px;
        font-size: 12px;
        border-top: 1px solid #CCC;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .grid-content {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        background: #FFF;
    }
}

</style>

