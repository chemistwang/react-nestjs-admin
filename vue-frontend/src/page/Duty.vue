<template>
    <div class="content">
        <sub-sidebar :menuList=formatMenuList></sub-sidebar>
        <div class="bottom-box">
            <div class="top-box">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import SubSidebar from '../components/common/SubSidebar.vue'
export default {
    components: { SubSidebar },
    data() {
        return {
            baseUrl: '/manage/duty',
            menuList: [
                {text: '值班管理', path: '/duty'},
                {text: '值班组织', path: '/org'},
                {text: '人员管理', path: '/member'},
            ]
        }
    },
    computed: {
        formatMenuList: function() {
            return this.menuList.map(m => {
                return {
                    text: m.text,
                    path: `${this.baseUrl}${m.path}`
                }
            })
        }
    }
}
</script>

<style scoped>
.content {
    height: 100%;
}
.bottom-box {
    background: #EFEFEF;
    padding: .625rem;
    flex: 1;
    box-sizing: border-box;
}
.top-box {
    background: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: .625rem;
}
</style>