<template>
    <div class="content">
        <div class="top">
            <div class="search">
                <el-input class="search-input" v-model="searchKey" placeholder="请输入角色名称"></el-input><el-button type="primary">搜索</el-button>
            </div>
            <el-button class="add" type="primary" @click="showAddModal">添加</el-button>
        </div>
         <el-table
            class="table"
            :data="tableData"
            :border=true
            :height="460"
            >
            <el-table-column prop="name" label="角色名称"></el-table-column>
            <el-table-column prop="desc" label="角色描述" width="604"></el-table-column>
            <el-table-column prop="creator" label="添加人"></el-table-column>
            <el-table-column prop="createDate" label="添加时间"></el-table-column>
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
            label="角色名称" 
            prop="name"
            :rules="{
                required: true, message: '角色名称不能为空', trigger: 'blur'
            }"
            >
                <el-input v-model="dialogForm.name"></el-input>
            </el-form-item>
            <el-form-item 
            label="角色描述" 
            prop="desc"
            :rules="{
                required: true, message: '角色描述不能为空', trigger: 'blur'
            }"
            >
                <el-input 
                resize="none"
                type="textarea" 
                maxlength="100" 
                show-word-limit
                rows=4
                v-model="dialogForm.desc"></el-input>
            </el-form-item>
            <el-form-item 
            label="权限管理" 
            prop="role"
            :rules="{
                required: true, message: '权限管理不能为空', trigger: 'blur'
            }"
            >
                <el-tree 
                :data="treeData" 
                :props="defaultTreeProps" 
                show-checkbox
                :icon-class=null
                @check-change="handleTreeCheckClick"></el-tree>   
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
                {name: 'IOC指挥中心', desc: '登录IOC指挥中心', creator: 'admin', createDate: '2021-10-01 00:00:00'},
            ],
            dialogTitle: '添加',
            dialogVisible: false,
            dialogForm: {
                name: '',
                desc: '',
                roleList: []
            },
            currentPage: 0,
            treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
            }],
            defaultTreeProps: {
                children: 'children',
                label: 'label'
            }
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
      handleTreeCheckClick(){

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