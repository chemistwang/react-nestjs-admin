import { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons';

import { withRouter } from 'react-router-dom';

import styles from './Login.module.css'

class Login extends Component {
    
    // constructor(props, context){

    // }

    render(){
        const title = 'REACT DEMO PLATFORM';
        const uPlaceholder = '请输入账号';
        const pPlaceholder = '请输入密码';
        const vPlaceholder = '请输入验证码';
        
        const onFinish = (values) => {
            console.log('Received values of form ---: ', values);
            console.log(this.props, '0-=-=-===')
            this.props.history.push('/index');
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
                        // initialValues={{ remember: true }} 
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        {/* 用户名 */}
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入账号！' }]}
                        >
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
                        >
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>

                        <Form.Item
                        >
                            <Button className={styles['btn']} block type="primary" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </div>
             </div>
            
        )
    }


}


export default withRouter(Login)