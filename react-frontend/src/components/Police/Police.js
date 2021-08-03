import { Component } from "react";
import { Button, Select, Input, Upload, Table, message } from 'antd';


import styles from './Police.module.css'

import API from '../../apis/index'

const { Option } = Select;
export default class Police extends Component{

    // constructor(){

    // }

    columns = [
        { title: '警员姓名', dataIndex: 'name', key: 'name', width: '7.5rem'},
        { title: '警员编号', dataIndex: 'number', key: 'number', width: '7rem'},
        { title: '性别', dataIndex: 'gender', key: 'gender', width: '7rem'},
        { title: '所属单位', dataIndex: 'department', key: 'department', width: '11.25rem'},
        { title: '职务', dataIndex: 'job', key: 'job', width: '8.5rem'},
        { title: '警衔', dataIndex: 'rank', key: 'rank', width: '9.375rem'},
        { title: '出生日期', dataIndex: 'birth', key: 'birth', width: '9.375rem'},
        { title: '联系方式', dataIndex: 'phone', key: 'phone', width: '11.625rem'},
        { title: '添加人', dataIndex: 'creator', key: 'creator', width: '8.125rem'},
        { title: '添加时间', dataIndex: 'createDate', key: 'createDate', width: '16.625rem'},
        { 
            title: '操作', 
            dataIndex: 'op', 
            key: 'op', 
            render: (_, record)=> (
                <>
                    <a onClick={() => this.showModalView(record.id)}>查看</a>
                    <a className={styles['edit']} onClick={() => this.showModalEdit(record.id)}>编辑</a>
                    <a className={styles['delete']} onClick={() => this.deletePolice(record.id)}>删除</a>
                </>
            )},
    ];

    paginationProps = {

    }

    // 批量导入属性
    importProps = {
        name: 'police',
        action: 'http://localhost:5000/police/import',
        headers: {
            authorization: 'authorization-text',
        },
        data: {
            'creator': 'admin'  
        },
        method: 'post',
        showUploadList: false
    }

    state = {
        // 部门下拉框数据
        depSelectSource: [{'label': '全部部门', 'value': 'all'}],
        // 表格数据
        dataSource: [],
    }

    importHandlerChange = (info) => {
        console.log(info, 'info....')
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList, 'uploading...');

        // }
        // if (info.file.status === 'done') {
        //   message.success(`${info.file.name} 导入成功`);
        // } else if (info.file.status === 'error') {
        //   message.error(`${info.file.name} 导入失败`);
        // }
        
        if (info.file.status === 'error') {
            message.error(`${info.file.name} 导入失败`);
        }
        if (info.file.status === 'done') {
            if (info.file.response.success) {
                message.success(`${info.file.name} 导入成功`);
                this.initDataSource();
            } else {
                message.error(`${info.file.response.msg}, ${info.file.name} 导入失败`);
            }
        }
    }


    // 部门下拉框
    depSelectChange = (dep) => {
        console.log(dep, 'dep...')
    }
    // 性别下拉框
    genderSelectChange = (gender) => {
        console.log(gender, 'gender...')
    }

    showModalView = () => {

    }

    showModalEdit = () => {

    }

    deletePolice = () => {

    }

    // 初始化部门下拉框数据
    initDepOption = async () => {
        let {data} = await API.getDepartment();
        let option = data.data.rows.map(item => {
            return {
                'label': item.name,
                'value': item.id
            }
        })
        this.setState({
            depSelectSource: this.state.depSelectSource.concat(option)
        })
    }

    initDataSource = async () => {
        let {data} = await API.getPolice();
        this.setState({
            dataSource: data.data.rows
        })
    }



    // 生命周期
    componentDidMount(){
        this.initDepOption();
        this.initDataSource();
    }

    componentWillUnmount(){
    }

    render(){
        return (
            <div className={styles['container']}>
                <div className={styles['box']}>
                    <div className={styles['filter']}>
                        <div className={styles['left']}>
                            <Select 
                                defaultValue="所有单位" 
                                style={{ width: 214, marginRight: '.625rem' }} 
                                onChange={this.depSelectChange}
                                options={this.state.depSelectSource}
                            >
                            </Select>
                            <Select 
                                defaultValue="所有性别" 
                                style={{ width: 104, marginRight: '.625rem' }} 
                                onChange={this.genderSelectChange}>
                                <Option value="all">所有性别</Option>
                                <Option value="1">男</Option>
                                <Option value="0">女</Option>
                            </Select>
                            <Input className={styles['filter-input']} placeholder="请输入警员名称或警员编号" />
                            <Button type="primary">搜索</Button>
                        </div>
                        <div className={styles['right']}>
                            <Button type="primary" style={{marginRight: '.625rem'}}>添加警员</Button>
                            <Upload 
                                {...this.importProps}
                                accept=".xls, .xlsx"
                                enctype="multipart/form-data"
                                onChange={this.importHandlerChange}
                            >
                                <Button>批量导入</Button>
                            </Upload>
                        </div>
                    </div>
                    <Table rowKey="id" dataSource={this.state.dataSource} columns={this.columns} pagination={this.paginationProps}/>
                </div>
            </div>
        )
    }

}