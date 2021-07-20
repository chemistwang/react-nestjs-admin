import { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Table, Modal } from "antd";
import styles from './Duty.module.css'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


import Member from './Member/Member'
import Org from './Org/Org'


const Duty = () => {

    // constructor(){}

        return (
            <>
           
            <div className={styles["container"]}>
                <div className={styles["left"]}>
                    <ul className={styles["list"]}>
                        {/* <li>
                            <Link to="/">值班管理</Link>
                        </li>
                        <li>
                            <Link to="/">备勤管理</Link>
                        </li> */}
                        <li>
                            <Link to="/index/duty/org">值班组织</Link>
                        </li>
                        <li>
                            <Link to="/index/duty/member">人员管理</Link>
                        </li>
                    </ul>
                </div>
                


                <div className={styles["right"]}>
                    <div className={styles['box']}>
                    <Switch>
                        <Route path="/index/duty/member">
                            <Member></Member>
                        </Route>
                        <Route path="/index/duty/org">
                            <Org></Org>
                        </Route>
                    </Switch>
                    </div>
                </div>
            </div>
            </>
        )
    

}

export default Duty;