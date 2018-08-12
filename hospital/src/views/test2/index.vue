<template>
    <div>TEST2
        <div v-for="(item, index) in test" :key="index">
            <!-- <Selection :index="index"></Selection> -->
            <test :test="index"></test>
        </div>
    </div>
</template>
<script>
import Selection from '@/components/selection'
import test from './test'
export default {
    name: 'TEST2',
    components: {
        test,
        Selection
    },
    data () {
        return {
            test: [1,2,3,4,5]
        }
    },
    methods: {

    }
}
</script>

