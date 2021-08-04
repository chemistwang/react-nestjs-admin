import { Component } from "react";

import { Form, Input, Button, Table, Tree, Modal, message } from "antd";
import styles from './Role.module.css'
import API from '../../../apis/index.js'

export default class Role extends Component{
    // constructor(){}

    columns = [
        { title: '角色名称', dataIndex: 'name', key: 'name', width: '13rem'},
        { title: '角色描述', dataIndex: 'description', key: 'description', width: '37.75rem'},
        { title: '添加人', dataIndex: 'creator', key: 'creator', width: '14.125rem'},
        { title: '添加时间', dataIndex: 'createDate', key: 'createDate', width: '16.25rem'},
        { 
            title: '操作', 
            dataIndex: 'op', 
            key: 'op', 
            render: (_, record)=> (
                <>
                    <a onClick={() => this.showModalEdit(record.id, record.name)}>编辑</a>
                    <a className={styles['delete']} onClick={() => this.deleteDepartment(record.id)}>删除</a>
                </>
            )},
    ];

    paginationProps = {

    }

    state = {
        // 弹出框标题
        modalTitle: '',
        // 弹出框可见
        isModalVisible: false,
        // 数据源
        dataSource: [],
        apiTreeData: []
    }

    
    showModalAdd = async() => {
        this.setState({
            isModalVisible: true,
            modalTitle: '创建'
        })
        let {data} = await API.getApi();
        this.setState({
            apiTreeData: data.data
        })
    }

    showModalEdit = () => {
        this.setState({
            isModalVisible: true,
            modalTitle: '编辑'
        })
    }

    modalCancel = () => {
        this.setState({
            isModalVisible: false
        })    
    }
    
    modalFinish = async (info) => {
        let title = this.state.modalTitle;
        console.log(info, 'xxxxxxxxx')
        let bodyParam = {creator: 'admin', ...info};
        if (title === '创建') {
            console.log('create....');
            let {data} = await API.createRole(bodyParam);
            if (data.success) {
                message.success(data.msg);
                this.initDataSource();
            } else {
                message.error(data.msg)
            }
        } else {
            console.log('update....');
        }
    }


    initDataSource = async() => {
        let {data} = await API.getRole();
        this.setState({
            dataSource: data.data.list
        })
    }


    componentDidMount(){
        this.initDataSource();
    }

    componentWillUnmount(){
    }



    render(){
        return (
            <>
                <RoleModal 
                title={this.state.modalTitle} 
                visible={this.state.isModalVisible}
                treeData={this.state.apiTreeData}
                cancel={this.modalCancel}
                finish={(info) => this.modalFinish(info)}
                ></RoleModal>
                <div className={styles['top']}>
                    <div>
                        <Input className={styles['input']} placeholder="请输入角色名称" />
                        <Button className={styles['search-btn']} type="primary">搜索</Button>
                    </div>
                    <Button className={styles['add-btn']} type="primary" onClick={this.showModalAdd}>创建</Button>
                </div>
                <div className={styles['bottom']}>
                    <Table rowKey="id" dataSource={this.state.dataSource} columns={this.columns} pagination={this.paginationProps}/>
                </div> 
            </>
        )
    }
}

// 角色弹出框
class RoleModal extends Component {

    state = {
        apiIdList: []
    }


    handleCancel = () => {
        this.props.cancel();
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        this.setState({
            apiIdList: checkedKeys
        })
    };

    onFinish = (values) => {
        values.apiIdList = this.state.apiIdList;
        console.log('Success:', values);
        this.props.finish(values);
    };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
        return (
            <Modal 
            title={this.props.title} 
            visible={this.props.visible} 
            onCancel={this.handleCancel}
            footer={null}
            >
            <Form
                ref={this.formRef}
                name="depForm"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="角色名称"
                    name="name"
                    rules={[{ required: true, message: '请输入角色名称' }]}
                >
                    <Input 
                        className={styles['modal-input']} 
                        maxLength="20" 
                        />
                </Form.Item>
                <Form.Item
                    label="角色描述"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="权限管理"
                    name="apiIdList"
                    // rules={[{ required: true, message: '至少勾选一个权限' }]}
                >   
                    <div
                        className={styles['tree-box']}
                    >
                        <Tree
                            checkable
                            defaultExpandAll
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                            treeData={this.props.treeData}
                        />
                    </div>
                    
                </Form.Item>
                <div className={styles['modal-btn']}>
                    <Form.Item>
                        <Button onClick={this.handleCancel}>取消</Button>
                    </Form.Item>
                    <Form.Item className={styles['modal-btn-submit']}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>    
                </div>
            </Form>  
            </Modal>
        )
    }
}