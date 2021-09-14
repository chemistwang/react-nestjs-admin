<template>
    <div class="content">
        <div class="l-content"></div>
        <div class="r-content">
            <h1 class="title">VUE DEMO PLATFORM</h1>
            <el-form class="form" ref="form" :model="form">
                <el-form-item>
                    <el-input 
                    prefix-icon="el-icon-user"
                    v-model="form.username" 
                    placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    prefix-icon="el-icon-lock"
                    v-model="form.password" 
                    placeholder="请输入密码"
                    type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    prefix-icon="el-icon-magic-stick"
                    v-model="form.captcha" 
                    placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="form.isRememberPwd">记住密码</el-checkbox>
                </el-form-item>
                <el-button class="btn" type="primary" @click="onSubmit">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                username: '',
                password: '',
                isRememberPwd: false
            }
        }
    },
    methods: {
        onSubmit(){
            console.log(this.form)
        }
    },
}
</script>

<style scoped>
.content {
    display: flex;
    height: 100%;
}
.l-content {
    width: 81.25rem;
    background: #E9ECF7;
}
.r-content {
    flex: 1;
}
.title {
    margin-top: 14.0625rem;
    margin-bottom: 3.75rem;
    font-size: 2rem;
    color: #222;
    text-align: center;
}
.form {
    padding: 0 9.375rem;
}
el-form-item {
    margin-bottom: 1.5625rem;
}
.btn {
    width: 100%;
}

</style>


