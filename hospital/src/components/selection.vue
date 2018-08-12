<template>
    <div class="selection">
        <div class="slide">
            <span class="arrow" @click="arrowHandler('left')">&lt;&lt;</span>
        </div>
        <div class="center">
            <img class="brand-img" :src="imgUrl">
            <el-cascader
                class="cascader"
                expand-trigger="hover"
                clearable
                :options="options"
                v-model="params"
                @change="getParamter">
            </el-cascader>
        </div>
        <div class="slide">
            <span class="arrow" @click="arrowHandler('right')">&gt;&gt;</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Selection',
    props: {
        colIndex: {
            type: Number
        },
        imgURL: {
            type: String,
            default: '/static/img/default.png'
        }
    },
    data () {
        return {
            params: [],
            options: [{
                    value: 'GE',
                    label: 'GE',
                    children: [{
                        value: '3.0T',
                        label: '3.0T',
                        children: [ {
                            value: 'Signa HDxt',
                            label: 'Signa HDxt'
                        }]
                    },{
                        value: '1.5T',
                        label: '1.5T',
                        children: [{
                            value: 'Signa HDx',
                            label: 'Signa HDx'
                        }]
                    }]
                },{
                    value: 'Siemens',
                    label: 'Siemens',
                    children: [{
                        value: '3.0T',
                        label: '3.0T',
                        children: [{
                            value: 'MAGNETOM Verio',
                            label: 'MAGNETOM Verio'
                        }]
                        },{
                        value: '1.5T',
                        label: '1.5T',
                        children: [{
                            value: 'MAGNETOM Avanto',
                            label: 'MAGNETOM Avanto'
                        }]
                    }]
                },{
                    value: 'Philips',
                    label: 'Philips',
                    children: [{
                        value: '3.0T',
                        label: '3.0T',
                        children: [{
                            value: 'Ingenia',
                            label: 'Ingenia'
                        }]
                    }]
                },{
                    value: '联影',
                    label: '联影',
                    children: [{
                        value: '3.0T',
                        label: '3.0T',
                        children: [{
                            value: 'uMR770',
                            label: 'uMR770'
                        },{
                            value: '1.5T',
                            label: '1.5T',
                            children: [{
                                value: 'uMR560',
                                label: 'uMR560'
                            }]
                        }]
                    }]
                },{
                    value: '东软',
                    label: '东软',
                    children: [{
                        value: '1.5T',
                        label: '1.5T',
                        children: [{
                            value: 'NSM-15P',
                            label: 'NSM-15P'
                        }]
                    }]
                },{
                    value: '奥泰',
                    label: '奥泰',
                    children: [{
                        value: '1.5T',
                        label: '1.5T',
                        children: [{
                            value: 'Centauri',
                            label: 'Centauri'
                        }]
                    }]
            }]
        }
    },
    computed: {
        imgUrl () {
            return this.imgURL
        }
    },
    methods: {
        getParamter (data) {
            this.$emit('getParams', data)
        },
        arrowHandler (dir) {
            let moveInfo = {
                dir: dir,
                index: this.colIndex
            }
            this.$emit('moveData', moveInfo)
        }
    }
}
</script>
<style lang="less">
.selection {
    display: flex;
    width: 100%;
    height: 216px;
    margin-bottom: 15px;
    padding: 10px 0;
    border-radius: 8px;
    background: #FFF;
    .slide {
        width: 20px;
        display: flex;
        .arrow {
            display: flex;
            flex: 1;
            align-items: center;
            cursor: pointer;
        }
    }
    .center {
        flex: 1;
    }
    .brand-img {
        display: block;
        width: 90%;
        max-height: 150px;
        margin: 0 auto;
        margin-bottom: 10px;
    }
    .cascader {
        display: block;
        width: 90%;
        margin: 0 auto
    }
}
</style>

