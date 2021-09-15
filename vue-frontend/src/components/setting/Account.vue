<template>
    <div class="content">
        <div class="top">
            <div class="search">
                <el-select class="search-select" v-model="roleSelectModel" placeholder="请选择">
                <el-option
                v-for="item in roleSelectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
                <el-select class="search-select" v-model="statusSelectModel" placeholder="请选择">
                    <el-option
                    v-for="item in statusSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input class="search-input" v-model="searchKey" placeholder="请输入账号或姓名"></el-input>
                <el-button type="primary">搜索</el-button>
            </div>
            <el-button class="add" type="primary" @click="showAddModal">添加</el-button>
        </div>
         <el-table
            class="table"
            :data="tableData"
            :border=true
            :height="460"
            >
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="department" label="部门"></el-table-column>
            <el-table-column prop="duty" label="职位"></el-table-column>
            <el-table-column prop="phone" label="手机号码"></el-table-column>
            <el-table-column prop="status" label="账号状态"  width="154">
                <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="启用"
                    inactive-text="禁用"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="creator" label="添加人"></el-table-column>
            <el-table-column prop="createDate" label="添加时间" width="200"></el-table-column>
            <el-table-column
                label="操作"
                width="360"
                >
                <template slot-scope="scope">
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">重置密码</el-button>
                    <el-button @click="handleEdit(scope.row)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        class="pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>


        <!-- 弹出框 -->
        <el-dialog
            :title=dialogTitle
            :visible.sync="dialogVisible"
            width="30%">
        <el-form :model="dialogForm" ref="dialogForm" label-width="100px" class="demo-ruleForm">
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
            </el-form-item>
            <el-form-item 
            label="账号" 
            prop="account"
            :rules="{
                required: true, message: '账号不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="dialogForm.account"></el-input>
            </el-form-item>
            <el-form-item 
            label="姓名" 
            prop="name"
            :rules="{
                required: true, message: '姓名不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="dialogForm.name"></el-input>
            </el-form-item>
            <el-form-item 
            label="角色" 
            prop="role"
            :rules="{
                required: true, message: '角色不能为空', trigger: 'blur'
            }"
            >
                <el-select v-model="dialogForm.role" placeholder="请选择角色">
                    <el-option
                    v-for="item in dialogRoleSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
            label="部门" 
            prop="department"
            :rules="{
                required: true, message: '部门不能为空', trigger: 'blur'
            }"
            >
                <el-select v-model="dialogForm.department" placeholder="请选择部门">
                    <el-option
                    v-for="item in dialogDepSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
            label="职位" 
            prop="duty"
            :rules="{
                required: true, message: '职位不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="dialogForm.duty"></el-input>
            </el-form-item>
            <el-form-item 
            label="手机号码" 
            prop="phone"
            :rules="{
                required: true, message: '手机号码不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="dialogForm.phone"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            roleSelectModel: 'all',
            roleSelectOptions: [
                { value: 'all', label: '全部角色'},
                { value: 'admin', label: '管理员'},
            ],
            statusSelectModel: 'all',
            statusSelectOptions: [
                { value: 'all', label: '全部账号状态'},
                { value: 'true', label: '启用中'},
                { value: 'false', label: '禁用中'},
            ],
            searchKey: '',
            tableData: [
                {account: 'chemputer', name: '赛博朋克', role: '超级管理员', department: '指挥中心', duty: '指挥中心管理员', phone: '13100000000', status: false, creator: 'admin', createDate: '2021-10-01 00:00:00'},
            ],
            dialogTitle: '添加',
            dialogVisible: false,
            dialogForm: {
                account: '',
                name: '',
                role: '',
                department: '',
                duty: '',
                phone: ''
            },
            dialogRoleSelectOptions: [
                { value: 'role1', label: '角色1'},
                { value: 'role2', label: '角色2'},
            ],
            dialogDepSelectOptions: [
                { value: 'dep1', label: '部门1'},
                { value: 'dep2', label: '部门2'},
            ],
            imageUrl: '',
            currentPage: 0
        }
    },
    methods: {
        showAddModal(){
            this.dialogVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleDelete(){

      },
      handleEdit(){
          
      },
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
.content {

}
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
}
.search {
    display: flex;
    margin: .625rem 0;
}
.search-select {
    margin-right: .625rem;
}
.search-input {
    width: 16.25rem;
    margin-right: .625rem;
}
.table {
    width: 100%;
    overflow: hidden;
}
.pagination {
    margin-top: 1.25rem;
    float: right;
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