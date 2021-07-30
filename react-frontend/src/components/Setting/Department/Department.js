import React from "react";
import { Form, Input, Button, Table, Modal, message } from "antd";
import styles from './Department.module.css'
import API from '../../../apis/index.js'
class Department extends React.Component{
    
    constructor(props) {
        super(props);
    }

    columns = [
        { title: '组织名称', dataIndex: 'name', key: 'name'},
        { 
            title: '操作', 
            dataIndex: 'op', 
            key: 'op', 
            render: (_, record)=> (
                <>
                    <a onClick={this.showModalEdit}>编辑</a>
                    <a className={styles['delete']} onClick={() => this.deleteDepartment(record.id)}>删除</a>
                </>
            )},
    ];

    state = {
        // 弹出框数据
        isModalVisible: false,
        modalTitle: '',
        modalInputValue: '',
        // 表格数据
        dataSource: [],
        dataTotal: 0,
        id: ''
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

  
    // 弹出框确定按钮
    handleOk = () => {
        this.setState({
            isModalVisible: false
        });
        this.addDepartment(this.state.modalInputValue);
        this.setState({
            modalInputValue: ''
        })
    }
    // 弹出框取消按钮
    handleCancel = () => {
        this.setState({
            isModalVisible: false,
            modalInputValue: ''
        })
    }
    // 添加
    showModalAdd = () => {
        this.setState({
            modalTitle: '添加',
            isModalVisible: true
        })
    }
    // 编辑
    showModalEdit = () => {
        this.setState({
            modalTitle: '编辑',
            isModalVisible: true
        })
    }
    // 输入框回调
    modalInputChange = (e) => {
        console.log(e.target.value, 'e.target.value--')
        this.setState({
            modalInputValue: e.target.value
        })
    }


    componentDidMount(){
        this.initDataSource();
    }

    componentWillUnmount(){
    }


    render(){
        return (
            <div>
                <Modal title={this.state.modalTitle} visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    
                    <Input 
                               
                        value={this.state.modalInputValue}  
                        onChange={this.modalInputChange}/>

                    <Form
                    >
                        <Form.Item
                            label="组织名称"
                            name="station"
                            rules={[{ required: true, message: '请输入组织名称' }]}
                        >
                            <Input 
                                className={styles['modal-input']} 
                                maxLength="20" 
                                value={this.state.modalInputValue}  
                                onChange={this.modalInputChange}/>
                        </Form.Item>
                    </Form>  
                </Modal>
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



export default Department;