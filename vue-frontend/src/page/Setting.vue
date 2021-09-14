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
            baseUrl: '/manage/setting',
            menuList: [
                {text: '组织机构', path: '/org'},
                {text: '账号管理', path: '/account'},
                {text: '角色管理', path: '/role'},
                {text: '系统日志', path: '/log'},
                {text: '个人中心', path: '/profile'},
                {text: '修改密码', path: '/modifyPwd'},
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
    width: 100%;
    box-sizing: border-box;
}
.top-box {
    background: #fff;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: .625rem
}
</style>