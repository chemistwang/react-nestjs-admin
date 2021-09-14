<template>
    <div class="content">
        <div class="l-content">
            <Sidebar/>
        </div>
        <div class="r-content">
            <Header/>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from '../components/common/Header.vue'
import Sidebar from '../components/common/Sidebar.vue'

export default {
  components: { Header, Sidebar },

}
</script>

<style scoped>
.content {
    height: 100%;
    display: flex;
}
.l-content {
    width: 5rem;
}
.r-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}
router-view {
    flex: 1;
}
</style>