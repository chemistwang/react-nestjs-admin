<template>
    <div class="header">
        <div class="title">VUE DEMO</div>
        <div class="info">
            <el-avatar class="avatar" src="../../assets/logo.png">user</el-avatar>
            <el-dropdown>
                <span class="el-dropdown-link">
                    VUE<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header {
    height: 3.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 1.25rem;
}
.title {
    font-size: 1.125rem;
    color: #222;
} 
.info {
    display: flex;
    align-items: center;
}
.avatar {
    margin-right: .3125rem;
}
</style>