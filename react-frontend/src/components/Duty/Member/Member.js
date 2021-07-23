import { Component, useState } from "react";

import { Form, Input, Button, Checkbox, Table, Modal } from "antd";

import styles from './Member.module.css'

const columns = [
    { title: '单位名称', dataIndex: 'name', key: 'name'},
    { title: '创建人', dataIndex: 'creator', key: 'creator'},
    { title: '创建时间', dataIndex: 'time', key: 'time'},
    { 
        title: '操作', 
        dataIndex: 'op', 
        key: 'op', 
        render: ()=> (
            <>
                <a>编辑</a>
                <a className={styles['delete']}>删除</a>
            </>
        )},
];

const dataSource = function(){
    const count = 100;
    let list = [];
    
    for(let i=0;i<=count;i++) {
        list.push({
            key: i,
            name: `高陵公安分局-${i}`,
            creator: 'admin',
            time: '2021-06-10  11:34'
        })
    }

    return list;
}

const Member = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = function(){ setIsModalVisible(true);}
    const handleOk = function(){ setIsModalVisible(false);}
    const handleCancel = function(){ setIsModalVisible(false);}

    return (
        
        <div>
            <Modal title="添加" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                >
                    <Form.Item
                        label="单位名称"
                        name="station"
                        rules={[{ required: true, message: '请输入单位名称' }]}
                    >
                        <Input className={styles['modal-input']} />
                    </Form.Item>
                </Form>  
            </Modal>
            <div className={styles['top']}>
                <div>
                    <Input className={styles['input']} placeholder="请输入单位名称" />
                    <Button className={styles['search-btn']} type="primary">搜索</Button>
                </div>
                <Button className={styles['add-btn']} type="primary" onClick={showModal}>添加人员</Button>
            </div>
            <div className={styles['bottom']}>
                <Table dataSource={dataSource()} columns={columns} />
            </div> 
        </div>
    )

}



export default Member;