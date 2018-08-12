<template>
  <div id="app" class="wrap">
    <SideBar></SideBar>
    <div class="main">
        <div class="right-header">

        </div>
        <div class="right-main">
            <router-view/>
        </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/views/layout'
export default {
  name: 'App',
  components: {
      SideBar,
  },
  data () {
      return {
      }
  }
}
</script>

<style>

</style>
