import { Component } from "react";
import { Button, Select, Input, Upload, Table, Modal, Form, message } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';

import styles from './Police.module.css'

import API from '../../apis/index'

const { Option } = Select;
export default class Police extends Component{

    // constructor(){

    // }
    // 表格列数据
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
                    <a className={styles['delete']} onClick={() => this.showModalDelete(record.id)}>删除</a>
                </>
            )},
    ];

    // 分页器数据
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
        id: '',
        dataSource: [],
        // 查看弹窗
        isViewModalVisible: false,
        // 编辑弹窗
        isEditModalVisible: false,
        // 删除弹窗
        isDeleteModalVisible: false
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

    // 弹出框
    showModalView = () => {
        this.setState({
            isViewModalVisible: true
        })
    }

    showModalEdit = () => {

    }

    showModalDelete = (policeId) => {
        this.setState({
            isDeleteModalVisible: true,
            id: policeId
        })
    }

    deleteHandleOk = async () => {
        this.setState({
            isDeleteModalVisible: false
        })
        let {data} = await API.deletePolice({
            params: {
                id: this.state.id
            } 
        });
        if (data.success) {
            message.success(data.msg);
            this.initDataSource();
        } else {
            message.error(data.msg)
        }
    }

    viewHandleCancel = () => {
        this.setState({
            isViewModalVisible: false
        })
    }
    editHandleCancel = () => {
        this.setState({
            isEditModalVisible: false
        })
    }
    deleteHandleCancel = () => {
        this.setState({
            isDeleteModalVisible: false
        })
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
            dataSource: data.data.list
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
                    <Modal
                    title="查看" 
                    visible={this.state.isViewModalVisible}
                    footer={null}
                    onCancel={this.viewHandleCancel}
                    >   
                    <Form
                        name="view"
                        labelCol={{ span: 4 }}
                        >
                        <Form.Item label="姓名" name="name"><Input disabled/></Form.Item>
                        <Form.Item label="警员编号" name="number"><Input disabled/></Form.Item>
                        <Form.Item label="性别" name="gender"><Input disabled/></Form.Item>
                        <Form.Item label="所属单位" name="department"><Input disabled/></Form.Item>
                        <Form.Item label="职务" name="job"><Input disabled/></Form.Item>
                        <Form.Item label="警衔" name="rank"><Input disabled/></Form.Item>
                        <Form.Item label="出生日期" name="birth"><Input disabled/></Form.Item>
                        <Form.Item label="籍贯" name="native"><Input disabled/></Form.Item>
                        <Form.Item label="政治面貌" name="politics"><Input disabled/></Form.Item>
                        <Form.Item label="学历" name="edu"><Input disabled/></Form.Item>
                        <Form.Item label="毕业院校" name="school"><Input disabled/></Form.Item>
                        <Form.Item label="联系方式" name="phone"><Input disabled/></Form.Item>
                        </Form>
                    </Modal>



                    <Modal 
                    title="删除" 
                    visible={this.state.isDeleteModalVisible} 
                    okText="删除"
                    okButtonProps={{danger: true}}
                    onOk={this.deleteHandleOk} 
                    onCancel={this.deleteHandleCancel}>
                        <p><InfoCircleFilled className={styles['danger']}/> 此操作将永久删除信息，是否继续删除？</p>
                        <p className={styles['gray']}>确定删除后，数据永久删除且无法恢复</p>
                    </Modal>
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