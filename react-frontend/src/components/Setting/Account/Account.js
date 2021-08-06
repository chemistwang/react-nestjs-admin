import { Component } from "react";
import { Button, Select, Input, Upload, Table, Modal, Form, Switch, message } from 'antd';
import { QuestionCircleFilled, InfoCircleFilled, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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
        // 编辑弹窗
        isViewModalVisible: false,
        // 禁用启用账号弹窗
        isStatusModalVisible: false,
        // 重置弹窗
        isResetModalVisible: false,
        // 删除弹窗
        isDeleteModalVisible: false,
        // 上传加载
        uploadLoading: false,
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

    // 新建
    showModalAdd = () => {
        this.setState({
            isViewModalVisible: true
        })
    }


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
    

    // 初始化角色下拉框数据
    initRoleOption = async () => {
        let {data} = await API.getRole();
        let option = data.data.list.map(item => {
            return {
                'label': item.name,
                'value': item.id
            }
        })
        this.setState({
            roleSelectSource: this.state.roleSelectSource.concat(option)
        })
    }

    initDataSource = async () => {
        
    }


    // 图片上传 start
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    uploadHandleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj, imageUrl =>
        //         this.setState({
        //         imageUrl,
        //         loading: false,
        //         }),
        //     );
        // }
        if (info.file.status === 'done') {
            console.log('done....')
            console.log(info, 'info...')
            let res = info.file.response;
            if (res.success) {
                message.success(res.msg);
                this.setState({
                    imageUrl: res.data
                })
            } else {
                message.error(res.msg);
            }
        }
    }
    uploadButton = (
        <div>
          {this.state.uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
          {/* <div style={{ marginTop: 8 }}>Upload</div> */}
        </div>
      );

    // 图片上传 end





    // 生命周期
    componentDidMount(){
        this.initRoleOption();
        // this.initDataSource();
    }

    componentWillUnmount(){
    }

    render(){
        return (
 
                <>
                    {/* 添加 + 编辑弹窗 */}
                    <Modal
                    title="查看-编辑" 
                    visible={this.state.isViewModalVisible}
                    footer={null}
                    onCancel={this.viewHandleCancel}
                    >   
                    <Form
                        name="view"
                        labelCol={{ span: 4 }}
                        >
                        <Form.Item label="头像" name="name">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://localhost:5000/upload"
                            beforeUpload={this.beforeUpload}
                            onChange={this.uploadHandleChange}
                            // enctype="multipart/form-data"
                        >
                            {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : this.uploadButton}
                        </Upload>  
                        </Form.Item>
                        <Form.Item label="账号" name="number"><Input /></Form.Item>
                        <Form.Item label="姓名" name="gender"><Input /></Form.Item>
                        <Form.Item label="角色" name="department"><Input /></Form.Item>
                        <Form.Item label="部门" name="edu"><Input /></Form.Item>
                        <Form.Item label="职位" name="school"><Input /></Form.Item>
                        <Form.Item label="手机号码" name="phone"><Input /></Form.Item>
                        </Form>
                        <div className={styles['modal-btn']}>
                        <Form.Item>
                            <Button onClick={this.handleCancel}>取消</Button>
                        </Form.Item>
                        <Form.Item className={styles['modal-btn-submit']}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>    
                        </div>
                    </Modal>
                    {/* 账号启用禁用弹窗 */}
                    <Modal 
                    title="禁用账号" 
                    visible={this.state.isStatusModalVisible} 
                    onOk={this.deleteHandleOk} 
                    onCancel={this.deleteHandleCancel}>
                        <p><InfoCircleFilled className={styles['orange']}/> 确定将此账号禁用？</p>
                        <p className={styles['gray']}>账号禁用后，将无法登陆任何系统</p>
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
                            <Button type="primary" style={{marginRight: '.625rem'}} onClick={this.showModalAdd}>添加账号</Button>
                        </div>
                    </div>
                    <Table rowKey="id" dataSource={this.state.dataSource} columns={this.columns} pagination={this.paginationProps}/>
            </>
        )
    }
}


class AccountModal extends Component {

}
