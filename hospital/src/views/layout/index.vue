<template>
    <div :class="{'side-bar': 'side-bar', 'sideSystem-full': sideFull, 'sideSystem-mini': !sideFull}">
        <div class="logo">
            <div class="full-logo" v-if="sideFull"></div>
        </div>
        <el-switch class="switch" v-model="sideFull" @change="changeScreen"/>
        <div class="side-bar-menue">
            <ul class="menue-list">
                <li 
                    class="menue"
                    v-if="MenuList.length"
                    v-for="(item, index) in MenuList"
                    :key="index">
                    <router-link :to="item.router" :class="{current:$route.path === item.router}">
                        <i :class="['icon', item.icon]" v-if="!sideFull"></i>
                        <div v-if="sideFull">{{item.title}}</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import routers from '../common/router.js'
export default {
    name: 'SideBar',
    data () {
        return {
            sideFull: true,
            MenuList: routers,
        }
    },
    computed: {
        // ...mapState('common', [
        //     'MenuList',
        // ]),
    },
    created () {
        // console.log(this.MenuList)
    },
    methods: {
        changeScreen (value) {
            this.sideFull = value
        },
    }
}
</script>
<style lang="less">
.sideSystem-full, .sideSystem-mini {
    background: #2e3d51;
    overflow: auto;
    color: #bdbdbd;
    position: relative;
    -webkit-transition-duration: 300ms;
    transition-duration: 300ms;
}
.sideSystem-full { width: 180px;}
.sideSystem-mini { width: 46px;}
.side-bar {
    .full-logo { 
        width: 100px; 
        height: 54px;
        margin: 40px auto; 
        background: url(../../../static/img/logo.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .small-logo { 
        width: 46px; 
        height: 46px; 
        margin: 40px auto; 
        background: indianred;
    }
    .switch {margin: 20px auto;}
    .side-bar-menue, .menue-list, .menue {
        display: block;
        .menue a {
            display: block;
            height: 40px;
            font-size: 14px;
            line-height: 40px;
            text-decoration: none;
            color: #FFF;
            border-left: 3px solid #2e3d51;
        }
        .menue .current { background: #273446; border-left: 3px solid #4b9de6;}
    }
    .icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .icon-electrocardio {background-image: url(../../../static/img/electrocardio.png);}
    .icon-data {background-image: url(../../../static/img/data.png);}
    .icon-admin {background-image: url(../../../static/img/admin.png);}
    .icon-hospital {background-image: url(../../../static/img/hospital.png);}
    
}

</style>


