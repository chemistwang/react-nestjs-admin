import React, {Component} from "react";
import { Form, Input, Button, Table, Modal, message } from "antd";
import styles from './Department.module.css'
import API from '../../../apis/index.js'
class Department extends React.Component{
    
    constructor(props) {
        super(props);
    }

    formRef = React.createRef();

    columns = [
        { title: '组织名称', dataIndex: 'name', key: 'name'},
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

    state = {
        // 弹出框数据
        isModalVisible: false,
        modalTitle: '',
        // 表格数据
        dataSource: [],
        dataTotal: 0,
    }

    // 分页器属性
    paginationProps = {
        total: this.state.dataTotal,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: () => {
            return `共${this.state.dataTotal}条`
        },
        onChange: (page, pageSize) => this.paginationChange(page, pageSize),
    }

    paginationChange = (page, pageSize) => {
        console.log(page, pageSize)
    }

    // 初始化数据
    initDataSource = async () => { 
        let {data} = await API.getDepartment();
        // this.paginationProps.total = data.data.count
        this.setState({
            dataSource: data.data.rows,
            dataTotal: data.data.count
        })
    }

    // 新增部门
    addDepartment = async(name) => {
        let {data} = await API.createDepartment({name: name});
        if (data.success) {
            message.success(data.msg);
            this.initDataSource();
        } else {
            message.error(data.msg)
        }
    }

    // 删除部门
    deleteDepartment = async(id) => {
        let {data} = await API.getDepartmentMemberCount({
            params: {
                id: id
            }
        });
        if (data.data > 0) {
            message.error('该组织下有所属人员，不可删除!')
        } else {
            let {data: delData} = await API.deleteDepartment({
                params: {
                    id: id
                }   
            });
            if (delData.success) {
                message.success(delData.msg);
                this.initDataSource();
            } else {
                message.error(delData.msg);
            }
        }
    }

    // 表单成功回调
    onFinish = (values) => {
        console.log('Success:', values);
        let { department } = values;
        this.setState({
            isModalVisible: false
        });
        this.resetForm();
        this.addDepartment(department);
    }
    // 表单失败回调
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    // 弹出框取消按钮
    handleCancel = () => {
        this.setState({
            isModalVisible: false,
        })
        this.resetForm();
    }
    // 清除表单
    resetForm = () => {
        this.formRef.current.resetFields();
    }
    // 添加
    showModalAdd = () => {
        this.setState({
            modalTitle: '添加',
            isModalVisible: true
        })
        console.log(1)
    }
    // 编辑
    showModalEdit = (id, value) => {
        this.setState({
            modalTitle: '编辑',
            isModalVisible: true
        })
        


        setTimeout(() => {
            this.formRef.current.setFieldsValue({
                department: value
            })
          }, 100);
    }

    componentDidMount(){
        this.initDataSource();
    }

    componentWillUnmount(){
    }


    render(){
        return (
            <div>
                {/* <Modal 
                    title={this.state.modalTitle} 
                    visible={this.state.isModalVisible} 
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
                            label="组织名称"
                            name="department"
                            rules={[{ required: true, message: '请输入组织名称' }]}
                        >
                            <Input 
                                className={styles['modal-input']} 
                                maxLength="20" 
                                />
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
                </Modal> */}
                <DepartmentModal title={this.state.modalTitle} visible={this.state.isModalVisible}></DepartmentModal>
                <div className={styles['top']}>
                    <div>
                        <Input className={styles['input']} placeholder="请输入组织名称" />
                        <Button className={styles['search-btn']} type="primary">搜索</Button>
                    </div>
                    <Button className={styles['add-btn']} type="primary" onClick={this.showModalAdd}>添加</Button>
                </div>
                <div className={styles['bottom']}>
                    <Table rowKey="id" dataSource={this.state.dataSource} columns={this.columns} pagination={this.paginationProps}/>
                </div> 
            </div>
        )
    }
}


// 组织机构弹出框
class DepartmentModal extends Component {
    
    constructor(props){
        super(props);
        console.log(props, 'xxxx')
        this.state.modalTitle = props.title;
        this.state.isModalVisible = props.visible;
    }

    formRef = React.createRef();

    state = {
        isModalVisible: false,
        modalTitle: '',
    }

    handleCancel = () => {
        this.setState({
            isModalVisible: false,
        })
        this.resetForm();
    }

    onFinish = (values) => {
        console.log('Success:', values);
        let { department } = values;
        this.setState({
            isModalVisible: false
        });
        this.resetForm();
    }

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    // 清除表单
    resetForm = () => {
        this.formRef.current.resetFields();
    }

    render() {
        return (
             <Modal 
                title={this.state.modalTitle} 
                visible={this.state.isModalVisible} 
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
                        label="组织名称"
                        name="department"
                        rules={[{ required: true, message: '请输入组织名称' }]}
                    >
                        <Input 
                            className={styles['modal-input']} 
                            maxLength="20" 
                            />
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


export default Department;