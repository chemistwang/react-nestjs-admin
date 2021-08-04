import { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Table, Modal } from "antd";
import styles from './Setting.module.css'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


import Department from './Department/Department'
import Log from './Log/Log'
import ModPwd from './ModPwd/ModPwd'
import Account from "./Account/Account";
import Role from './Role/Role';
import Personal from "./Personal/Personal";

class Setting extends Component {

    // constructor(){}

    // 菜单列表
    urlPrefix = '/index/setting'

    menuList = [
        {'path': `${this.urlPrefix}/department`, 'name': '组织机构'},
        {'path': `${this.urlPrefix}/account`, 'name': '账号管理'},
        {'path': `${this.urlPrefix}/role`, 'name': '角色管理'},
        {'path': `${this.urlPrefix}/log`, 'name': '系统日志'},
        {'path': `${this.urlPrefix}/personal`, 'name': '个人中心'},
        {'path': `${this.urlPrefix}/modpwd`, 'name': '修改密码'},
    ]

    state = {
        currentMenuIndex: -1
    }

    clickHandle = (index) => {
        this.setState({
            currentMenuIndex: index
        })
    }

    render() {
        return (
            <> 
            <div className={styles["container"]}>
                <div className={styles["left"]}>
                    <ul className={styles["list"]}>
                        {this.menuList.map((item, index) => {
                            return (
                                <li key={index} className={this.state.currentMenuIndex === index ? styles["active"]: ''} onClick={() => this.clickHandle(index)}>
                                     <Link to={item.path}>{item.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                
                <div className={styles["right"]}>
                    <div className={styles['box']}>
                    <Switch>
                        <Route path="/index/setting/department">
                            <Department></Department>
                        </Route>
                        <Route path="/index/setting/account">
                            <Account></Account>
                        </Route>
                        <Route path="/index/setting/role">
                            <Role></Role>
                        </Route>
                        <Route path="/index/setting/log">
                            <Log></Log>
                        </Route>
                        <Route path="/index/setting/personal">
                            <Personal></Personal>
                        </Route>
                        <Route path="/index/setting/modpwd">
                            <ModPwd></ModPwd>
                        </Route>
                    </Switch>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Setting;