<template>
    <div>
        <h1 class="title">修改登录密码</h1>
        <el-form :model="form" ref="form" label-width="100px" class="form">
            <el-form-item 
            label="原密码" 
            prop="currentPwd"
            >
                <el-input v-model="form.currentPwd" placeholder="输入原登录密码"></el-input>
            </el-form-item>
            <el-form-item 
            label="姓名" 
            prop="name"
            :rules="{
                required: true, message: '姓名不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="form.newPwd" placeholder="6-20位数字、字母或符号，区分大小写"></el-input>
            </el-form-item>
            <el-form-item 
            label="确认新密码" 
            prop="duty"
            >
                <el-input v-model="form.confirmPwd" placeholder="再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item 
            >
                <el-button type="primary">确认修改</el-button>
            </el-form-item>
        </el-form>
      
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                currentPwd: '',
                newPwd: '',
                confirmPwd: '',
            },
        }
    },
    methods: {
    },
}
</script>

<style scoped>
.title {
    font-size: 1rem;
    color: #222;
    padding: 1.25rem;
}
.form {
    width: 31.25rem;
    margin-top: 1.875rem
}
</style>