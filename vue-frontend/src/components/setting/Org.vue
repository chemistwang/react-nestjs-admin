<template>
    <div class="content">
        <div class="top">
            <div class="search">
                <el-input class="search-input" v-model="searchKey" placeholder="请输入组织名称"></el-input><el-button type="primary">搜索</el-button>
            </div>
            <el-button type="primary">添加</el-button>
        </div>
         <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="组织名称"
                width="1260">
            </el-table-column>
            <el-table-column
                label="操作"
                width="360"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            ]
        }
    }
}
</script>

<style scoped>
.content {

}
.top {
    display: flex;
    justify-content: space-between;
}
.search {
    display: flex;
    margin: .625rem 0;
}
.search-input {
    width: 16.25rem;
    margin-right: .625rem;
}
</style>