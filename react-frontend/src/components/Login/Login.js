import { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons';

import styles from './Login.module.css'

export default class Login extends Component {
    
    // constructor(props, context){

    // }

    render(){
        const title = '智慧公安综合管理平台';
        const uPlaceholder = '请输入账号';
        const pPlaceholder = '请输入密码';
        const vPlaceholder = '请输入验证码';
        
        const onFinish = (values) => {
            console.log('Received values of form ---: ', values);
        };
        const onFinishFailed = (values) => {
            console.log('Received values of form: ', values);
        };

        return (
            <div className={styles['content']}>
                <div className={styles['left-box']}></div>
                <div className={styles['right-box']}>
                    <h1 className={styles['title']}>{title}</h1>
                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        // initialValues={{ remember: true }} 
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        {/* 用户名 */}
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入账号！' }]}
                        >
                            {/* <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" /> */}
                            <Input className={styles['login-input']} prefix={<UserOutlined/>} placeholder={uPlaceholder} />
                        </Form.Item>

                        {/* 密码 */}
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input className={styles['login-input']} prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder={pPlaceholder}/>
                        </Form.Item>

                        <Form.Item
                            name="validator"
                            rules={[{ required: true, message: '请输入验证码!' }]}
                        >
                            <Input className={styles['login-input']} prefix={<VerifiedOutlined />} placeholder={vPlaceholder} />
                        </Form.Item>

                  
                        <Form.Item 
                            name="remember" 
                            valuePropName="checked"
                            // noStyle
                            // wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>


                        <Form.Item
                        //  wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button className={styles['btn']} block type="primary" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            
        )
    }


}