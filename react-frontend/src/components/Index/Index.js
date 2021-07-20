import { Component } from "react";



import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import styles from './Index.module.css'

import Sidebar from '../Sidebar/Sidebar'
import Police from '../Police/Police'
import Station from '../Station/Station'
import Duty from '../Duty/Duty'
import Setting from '../Setting/Setting'





const Index = () => {
    return (
        <>
            <div className={styles['container']}>
                <Sidebar></Sidebar>
    
                <div className={styles['right-box']}>
                    <div className={styles['header']}>
                        <div className={styles['title']}>智慧公安综合管理平台</div>
                        <div>管理员</div>
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


export default Index;