import { Component } from "react";
import { Form, Input, Button, Checkbox, Table } from "antd";

import styles from './Index.module.css'

import Sidebar from '../Sidebar/Sidebar'

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
                <a>删除</a>
            </>
        )},
];

const dataSource = [
    { key: '1', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '2', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '3', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '4', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '5', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '6', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '7', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '8', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '9', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '10', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '11', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '12', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '13', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
    { key: '14', name: '高陵公安分局', creator: 'admin', time: '2021-06-10  11:34'},
];



export default class Index extends Component{

    render(){

        return (
            <div className={styles['container']}>
                <Sidebar></Sidebar>
                <div className={styles['right-box']}>
                    <div className={styles['header'] + ' clearfix'}>
                        <div className={styles['title'] + ' fl'}>智慧公安综合管理平台</div>
                        <div className='fr'>管理员</div>
                    </div>
                    <div className={styles['content']}>
                        <div className={styles['box']}>
                            <div className={styles['top']}>
                                <Input className={styles['input']} placeholder="请输入单位名称" />
                                <Button className={styles['btn']} type="primary">搜索</Button>
                            </div>
                            <div className={styles['bottom']}>
                                <Table dataSource={dataSource} columns={columns} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }

}