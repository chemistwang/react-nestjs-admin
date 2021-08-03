import { Component } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Button, Select, Avatar, Input, Upload, Table, Modal, Form, message } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import styles from './Index.module.css'

import Sidebar from '../Sidebar/Sidebar'
import Police from '../Police/Police'
import Station from '../Station/Station'
import Duty from '../Duty/Duty'
import Setting from '../Setting/Setting'


const { Option } = Select;


class Index extends Component {

    render() {
        return (
            <>
                <div className={styles['container']}>
                    <Sidebar></Sidebar>
        
                    <div className={styles['right-box']}>
                        <div className={styles['header']}>
                            <div className={styles['title']}>智慧公安综合管理平台</div>
                            <div>
                            <Avatar icon={<UserOutlined />} />
                            <Select defaultValue="管理员" bordered={false}>
                                <Option value="logout">退出登录</Option>
                            </Select>
                            </div>
                            
                        </div>
                      
                        <div className={styles['content']}>
                            <Switch>
                                <Route path="/index/duty">
                                    <Duty></Duty>
                                </Route>
                                <Route path="/index/setting">
                                    <Setting></Setting>
                                </Route>
                                <Route path="/index/police">
                                    <Police></Police>
                                </Route>
                                <Route path="/index/station">
                                    <Station></Station>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default Index;