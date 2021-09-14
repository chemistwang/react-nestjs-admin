<template>
    <ul class="sidebar">
        <div class="logo"><img alt="Vue logo" src="../../assets/logo.png"></div>
        <li v-for="(menu, index) in menuList" :key="index" class="menu" @click="go(menu)">
            <div class="icon"><i :class=menu.icon></i></div>
            <div class="text">{{menu.text}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    data(){
        return {
            menuList: [
                {icon: 'el-icon-coffee', text: '首页', path: '/manage'},
                {icon: 'el-icon-ice-tea', text: '值班备勤', path: '/'},
                {icon: 'el-icon-ice-drink', text: '仿真数据', path: '/manage/dictionary'},
                {icon: 'el-icon-milk-tea', text: '系统设置', path: '/manage/setting'}, 
            ]
        }
    },
    methods: {
        go(menu){
            this.$router.push(menu.path)
        }
    },
}
</script>

<style scoped>
.sidebar {
    height: 100%;
    background: #35495D;
    color: #fff;
}
.logo {
    height: 3.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
img {
    width: 2.25rem;
    height: 2.25rem;
}
.menu {
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.menu:hover{
    cursor: pointer;
}
.icon {
   font-size: 1.25rem;
   margin-bottom: .625rem;
}
.text {
    font-size: .75rem
}
</style>