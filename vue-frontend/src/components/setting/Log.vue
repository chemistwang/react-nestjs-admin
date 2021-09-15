<template>
    <div class="content">
        <div class="top">
            <div class="search">
                <el-select class="search-select" v-model="filterValue.systemValue" placeholder="请选择">
                    <el-option
                    v-for="item in systemSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="search-select" v-model="filterValue.moduleValue" placeholder="请选择">
                    <el-option
                    v-for="item in moduleSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="search-select" v-model="filterValue.typeValue" placeholder="请选择">
                    <el-option
                    v-for="item in typeSelectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                class="search-datepicker"
                v-model="filterValue.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
                <el-input class="search-input" v-model="filterValue.searchKey" placeholder="请输入操作用户"></el-input><el-button type="primary">搜索</el-button>
            </div>
            <el-button class="add" type="primary" @click="showAddModal">导出</el-button>
        </div>
         <el-table
            class="table"
            :data="tableData"
            :border=true
            :height="460"
            >
            <el-table-column prop="name" label="操作人"></el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="system" label="系统" width="290"></el-table-column>
            <el-table-column prop="module" label="操作模块"></el-table-column>
            <el-table-column prop="type" label="操作类型"></el-table-column>
            <el-table-column prop="createDate" label="操作时间"></el-table-column>
            <el-table-column prop="detail" label="操作详情" width="512"></el-table-column>
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
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedOptions" @change="handleCheckedOptionsChange">
                <el-checkbox class="check-group" v-for="(option,index) in exportOptions" :label="option" :key="index">{{option.label}}</el-checkbox>
            </el-checkbox-group>
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
            filterValue: {
                systemValue: 'all',
                moduleValue: 'all',
                typeValue: 'all',
                time: '',
                searchKey: ''
            },
            systemSelectOptions: [
                { value: 'all', label: '全部系统'},
            ],
            moduleSelectOptions: [
                { value: 'all', label: '全部模块'},
            ],
            typeSelectOptions: [
                { value: 'all', label: '全部类型'},
            ],
            tableData: [
                {name: '管理员', ip: '127.0.0.1', system: '系统', module: '操作模块', type: '操作类型', createDate: '2021-10-01 00:00:00', detail: '具体操作详情'},
            ],
            dialogTitle: '导出',
            dialogVisible: false,
            dialogForm: {
                name: ''
            },
            currentPage: 0,
            // 导出选项
            checkAll: false,
            checkedOptions: [],
            exportOptions: [
                {label: '操作人', value: 'nameCol'},
                {label: 'IP', value: 'ipCol'},
                {label: '系统', value: 'sysCol'},
                {label: '操作模块', value: 'moduleCol'},
                {label: '操作类型', value: 'typeCol'},
                {label: '操作时间', value: 'timeCol'},
                {label: '操作详情', value: 'detailCol'},
            ],
            isIndeterminate: true
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
      handleCheckAllChange(val) {
        this.checkedOptions = val ? this.exportOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedOptionsChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.exportOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.exportOptions.length;
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
    width: 10rem;
    margin-right: .625rem;
}
.search-datepicker {
    width: 16.25rem;
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
.check-group {
    display: block;
}
</style>