<template>
    <div class="content">
        <div class="top">
            <div class="search">
                <el-input class="search-input" v-model="searchKey" placeholder="请输入组织名称"></el-input><el-button type="primary">搜索</el-button>
            </div>
            <el-button class="add" type="primary" @click="showAddModal">添加</el-button>
        </div>
         <el-table
            class="table"
            :data="tableData"
            :border=true
            :height="460"
            >
            <el-table-column prop="name" label="组织名称"></el-table-column>
            <el-table-column
                label="操作"
                width="360"
                >
                <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
                    <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
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
            label="组织名称" 
            prop="name"
            :rules="{
                required: true, message: '组织名称不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="dialogForm.name"></el-input>
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
            searchKey: '',
            tableData: [
                {name: '生产安全部'},
                {name: '生产安全部2'}
            ],
            dialogTitle: '添加',
            dialogVisible: false,
            dialogForm: {
                name: ''
            },
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
</style>