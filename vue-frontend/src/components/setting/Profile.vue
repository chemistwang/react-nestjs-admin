<template>
    <div>
        <h1 class="title">修改个人资料</h1>
        <el-form :model="form" ref="form" label-width="100px" class="form">
            <el-form-item 
            label="头像" 
            prop="avatar"
            >
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span>支持JPG、PNG格式的图片</span>
            </el-form-item>
            <el-form-item 
            label="账号" 
            prop="account"
            >
                <el-input disabled v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item 
            label="姓名" 
            prop="name"
            :rules="{
                required: true, message: '姓名不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item 
            label="角色" 
            prop="role"
            >
                <el-select v-model="form.role" disabled placeholder="请选择角色">
                    <el-option
                    v-for="item in roleSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
            label="职位" 
            prop="duty"
            >
                <el-input v-model="form.duty"></el-input>
            </el-form-item>
            <el-form-item 
            label="手机号码" 
            prop="phone"
            >
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item 
            >
                <el-button type="primary">保存修改</el-button>
            </el-form-item>
        </el-form>
      
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                account: 'chemputer',
                name: '',
                role: 'role1',
                duty: '',
                phone: ''
            },
            imageUrl: '',
            roleSelectOptions: [
                {label: '角色1', value: 'role1'},
                {label: '角色2', value: 'role2'},
            ]
        }
    },
    methods: {
        handleAvatarSuccess(res, file){
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
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
.avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 6.25rem;
    height: 6.25rem;
    line-height: 6.25rem;
    text-align: center;
}
.avatar {
    width: 6.25rem;
    height: 6.25rem;
    display: block;
}
</style>