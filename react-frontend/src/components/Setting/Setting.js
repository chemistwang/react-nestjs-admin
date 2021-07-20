import { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Table, Modal } from "antd";
import styles from './Setting.module.css'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


import Department from './Department/Department'
import Log from './Log/Log'
import ModPwd from './ModPwd/ModPwd'


const Duty = () => {

    // constructor(){}

        return (
            <>
           
            <div className={styles["container"]}>
                <div className={styles["left"]}>
                    <ul className={styles["list"]}>
                        <li>
                            <Link to="/index/setting/department">部门机构</Link>
                        </li>
                        <li>
                            <Link to="/index/setting/log">系统日志</Link>
                        </li>
                        <li>
                            <Link to="/index/setting/modpwd">修改密码</Link>
                        </li>
                    </ul>
                </div>
                
                <div className={styles["right"]}>
                    <div className={styles['box']}>
                    <Switch>
                        <Route path="/index/setting/department">
                            <Department></Department>
                        </Route>
                        <Route path="/index/setting/log">
                            <Log></Log>
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

export default Duty;