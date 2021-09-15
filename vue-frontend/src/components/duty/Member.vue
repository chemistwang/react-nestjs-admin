<template>
    <div class="content">
        <div class="top">
            <div class="search">
                <el-select class="search-select" v-model="depSelectModel" placeholder="请选择">
                    <el-option
                    v-for="item in depSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input class="search-input" v-model="searchKey" placeholder="请输入工号/姓名"></el-input>
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
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="number" label="工号"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="department" label="部门"></el-table-column>
            <el-table-column prop="duty" label="职位"></el-table-column>
            <el-table-column prop="phone" label="手机号码"></el-table-column>
            <el-table-column prop="birth" label="出生日期"></el-table-column>
            <el-table-column prop="creator" label="添加人"></el-table-column>
            <el-table-column prop="createDate" label="添加时间" width="194"></el-table-column>
            <el-table-column
                label="操作"
                width="246"
                >
                <template slot-scope="scope">
                    <el-button type="text">编辑</el-button>
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
                支持JPG、PNG格式的图片
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
            label="工号" 
            prop="number"
            :rules="{
                required: true, message: '工号不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="dialogForm.number"></el-input>
            </el-form-item>
            <el-form-item 
            label="性别" 
            prop="role"
            :rules="{
                required: true, message: '性别不能为空', trigger: 'blur'
            }"
            >
                <el-select v-model="dialogForm.gender" placeholder="请选择性别">
                    <el-option
                    v-for="item in dialogGenderSelectOptions"
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
             <el-form-item 
            label="出生日期" 
            prop="birth"
            :rules="{
                required: true, message: '出生日期不能为空', trigger: 'blur'
            }"
            >
                <el-date-picker
                v-model="dialogForm.birth"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
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
            depSelectModel: 'all',
            depSelectOptions: [
                { value: 'all', label: '全部部门'},
                { value: 'dep1', label: '部门1'},
                { value: 'dep2', label: '部门2'},
                { value: 'dep3', label: '部门3'},
            ],
            searchKey: '',
            tableData: [
                { name: '赛博朋克', number: 'A10001', gender: '男', department: '指挥中心', duty: '指挥中心管理员', phone: '13100000000', birth: '2021-10-01', creator: 'admin', createDate: '2021-10-01 00:00:00'},
            ],
            dialogTitle: '添加',
            dialogVisible: false,
            dialogForm: {
                name: '',
                number: '',
                gender: '',
                department: '',
                duty: '',
                phone: '',
                birth: ''
            },
            dialogGenderSelectOptions: [
                { value: 1, label: '男'},
                { value: 0, label: '女'},
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