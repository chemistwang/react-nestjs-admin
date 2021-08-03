import { Component } from "react";
import { Button, Select, Input, Upload, Table, Modal, Form, Switch, message } from 'antd';
import { QuestionCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './Account.module.css'

import API from '../../../apis/index'

export default class Account extends Component{

    // constructor(){

    // }
    // 表格列数据
    columns = [
        { title: '账号', dataIndex: 'account', key: 'account', width: '9rem'},
        { title: '姓名', dataIndex: 'name', key: 'name', width: '6.25rem'},
        { title: '角色', dataIndex: 'role', key: 'role', width: '9.25rem'},
        { title: '部门', dataIndex: 'department', key: 'department', width: '7.5rem'},
        { title: '职位', dataIndex: 'duty', key: 'duty', width: '9.5rem'},
        { title: '手机号码', dataIndex: 'phone', key: 'phone', width: '9.125rem'},
        { 
            title: '账号状态', 
            dataIndex: 'status', 
            key: 'status', 
            width: '9.5rem',
            render: (_, record) => (
                <Switch checked={record.status} onChange={this.onSwitchChange} />
            )
        },
        { title: '添加人', dataIndex: 'creator', key: 'creator', width: '9.5rem'},
        { title: '添加时间', dataIndex: 'createDate', key: 'createDate', width: '12.5rem'},
        { 
            title: '操作', 
            dataIndex: 'op', 
            key: 'op', 
            render: (_, record)=> (
            <>
                <a onClick={() => this.showModalEdit(record.id)}>编辑</a>
                <a className={styles['edit']} onClick={() => this.showModalReset(record.id)}>重置密码</a>
                <a className={styles['delete']} onClick={() => this.showModalDelete(record.id)}>删除</a>
            </>)
        },
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
        // 角色下拉框数据
        roleSelectSource: [{'label': '全部角色', 'value': 'all'}],
        // 状态下拉框数据
        statusSelectSource: [{'label': '全部账号状态', value: 'all'}, {'label': '启用中', value: true}, {'label': '禁用中', value: false}],
        // 表格数据
        id: '',
        dataSource: [
            { account: 'account',name: 'name',role: 'role',department: 'department',duty: 'duty',phone: 'phone',status: true,creator: 'creator',createDate: 'createDate'},
            { account: 'account',name: 'name',role: 'role',department: 'department',duty: 'duty',phone: 'phone',status: false,creator: 'creator',createDate: 'createDate'},
        ],
        // 禁用启用账号弹窗
        isStatusModalVisible: false,
        // 编辑弹窗
        isEditModalVisible: false,
        // 重置弹窗
        isResetModalVisible: false,
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


    // 角色下拉框
    roleSelectChange = (role) => {
        console.log(role, 'role...')
    }
    // 账号状态下拉框
    statusSelectChange = (status) => {
        console.log(status, 'status...')
    }

    // 开关切换
    onSwitchChange = () => {
        console.log('onSwitchChange---')
    }

    // 弹出框

    // 编辑
    showModalEdit = () => {

    }
    // 重置 
    showModalReset = () => {

    }



    // 删除
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
        // this.initDepOption();
        // this.initDataSource();
    }

    componentWillUnmount(){
    }

    render(){
        return (
 
                <>
                    {/* 添加 + 编辑弹窗 */}
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
                    {/* 账号启用禁用弹窗 */}
                    <Modal 
                    title="删除" 
                    visible={this.state.isDeleteModalVisible} 
                    onOk={this.deleteHandleOk} 
                    onCancel={this.deleteHandleCancel}>
                        <p><InfoCircleFilled className={styles['danger']}/> 此操作将永久删除信息，是否继续删除？</p>
                        <p className={styles['gray']}>确定删除后，数据永久删除且无法恢复</p>
                    </Modal>
                    {/* 重置密码弹窗 */}
                    <Modal 
                    title="重置密码" 
                    visible={this.state.isResetModalVisible} 
                    onOk={this.deleteHandleOk} 
                    onCancel={this.deleteHandleCancel}>
                        <p><QuestionCircleFilled className={styles['orange']}/> 确定对此账号执行重置密码操作？</p>
                        <p className={styles['gray']}>重置密码后，登录密码为初始登录密码admin123</p>
                    </Modal> 
                    {/* 账号删除弹窗 */}
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
                                defaultValue="全部角色" 
                                style={{ width: '10rem', marginRight: '.625rem' }} 
                                onChange={this.roleSelectChange}
                                options={this.state.roleSelectSource}
                            >
                            </Select>
                            <Select 
                                defaultValue="全部账号状态" 
                                style={{ width: '10rem', marginRight: '.625rem' }} 
                                onChange={this.statusSelectChange}
                                options={this.state.statusSelectSource}
                                >
                            </Select>
                            <Input className={styles['filter-input']} placeholder="请输入账号或姓名" />
                            <Button type="primary">搜索</Button>
                        </div>
                        <div className={styles['right']}>
                            <Button type="primary" style={{marginRight: '.625rem'}}>添加</Button>
                        </div>
                    </div>
                    <Table rowKey="id" dataSource={this.state.dataSource} columns={this.columns} pagination={this.paginationProps}/>
            </>
        )
    }

}