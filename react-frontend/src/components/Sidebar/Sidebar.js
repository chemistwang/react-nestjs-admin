import { Component } from "react";

import { GithubOutlined } from '@ant-design/icons';
import styles from './Sidebar.module.css'


import { createFromIconfontCN } from '@ant-design/icons';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const sidebarInfo = [
    {icon: 'icon-homepage', text: '首页', path: '/index'},
    // {icon: 'icon-jiagou', text: '值班备勤', path: ''},
    {icon: 'icon-police', text: '警员管理', path: '/index/police'},
    // {icon: 'icon-jilu', text: '警情记录', path: ''},
    {icon: 'icon-rili', text: '值班管理', path: '/index/duty'},
    // {icon: 'icon-flag-fill', text: '大型活动', path: ''},
    // {icon: 'icon-cheliang', text: '人员告警', path: ''},
    // {icon: 'icon-cheliang', text: '车辆告警', path: ''},
    // {icon: 'icon-zhanghaoguanli', text: '账号管理', path: ''},
    // {icon: 'icon-jiaoseguanli', text: '角色管理', path: ''},
    // {icon: 'icon-rizhiguanli', text: '日志管理', path: ''},
    // {icon: 'icon-gerenzhongxin', text: '个人中心', path: ''},
    {icon: 'icon-rizhiguanli', text: '系统设置', path: '/index/setting'},
]

function SideBarList(props){  
    const MyIcon = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_2668777_8gko8yj66mq.js'
    })
    const {info} = props;
    const sidebarList = info.map((item,index) =>
        <Link to={item.path} key={index.toString()}>
            <li className={styles['item']}>
                <MyIcon type={item.icon}></MyIcon>
                <div className={styles['text']}>{item.text}</div>
            </li>
        </Link>
    );
    return (
        <ul>{sidebarList}</ul>
    )
}

export default class Sidebar extends Component{
    render(){

        return (
            <div className={styles['sidebar']}>
                <div className={styles['github']}>
                    <GithubOutlined style={{ fontSize: '2rem', color: '#fff' }}/>
                </div>
                <SideBarList info={sidebarInfo}></SideBarList>
            </div>

        )
    }
}