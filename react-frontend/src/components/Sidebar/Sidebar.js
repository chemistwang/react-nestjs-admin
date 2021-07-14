import { Component } from "react";

import { GithubOutlined } from '@ant-design/icons';
import styles from './Sidebar.module.css'


import { createFromIconfontCN } from '@ant-design/icons';


const sidebarInfo = [
    {icon: 'icon-homepage', text: '首页'},
    {icon: 'icon-jiagou', text: '组织架构'},
    {icon: 'icon-police', text: '警员管理'},
    {icon: 'icon-jilu', text: '警情记录'},
    {icon: 'icon-rili', text: '值班管理'},
    {icon: 'icon-flag-fill', text: '大型活动'},
    {icon: 'icon-cheliang', text: '人员告警'},
    {icon: 'icon-cheliang', text: '车辆告警'},
    {icon: 'icon-zhanghaoguanli', text: '账号管理'},
    {icon: 'icon-jiaoseguanli', text: '角色管理'},
    {icon: 'icon-rizhiguanli', text: '日志管理'},
    {icon: 'icon-gerenzhongxin', text: '个人中心'},
]

function SideBarList(props){
    const MyIcon = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_2668777_8gko8yj66mq.js'
    })
    const {info} = props;
    const sidebarList = info.map((item,index) => 
        <li key={index.toString()} className={styles['item']}>
            <MyIcon type={item.icon}></MyIcon>
            <div className={styles['text']}>{item.text}</div>
        </li>
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
                {/* <ul>
                    <li class={styles['item']}>
                        <MyIcon type="icon-homepage"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-jiagou"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-police"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-jilu"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-rili"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-flag-fill"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-jinggao"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-cheliang"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-zhanghaoguanli"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-jiaoseguanli"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-rizhiguanli"></MyIcon>
                    </li>
                    <li class={styles['item']}>
                        <MyIcon type="icon-gerenzhongxin"></MyIcon>
                    </li>
                </ul> */}
            </div>

        )
    }
}