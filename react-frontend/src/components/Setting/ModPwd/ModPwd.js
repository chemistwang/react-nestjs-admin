import { Component } from "react";
import { Form, Input, Button } from 'antd';

export default class ModPwd extends Component{
    // constructor(){}


    onFinish = () => {

    }

    onFinishFailed = () => {

    }

    render(){
        return (
            <div>
                <div>修改登录密码</div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                    <Form.Item
                        label="原密码"
                        name="oldPwd"
                        rules={[{ required: true, message: '请输入原登录密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="设置新密码"
                        name="setPwd"
                        rules={[{ required: true, message: '请设置新密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="确认新密码"
                        name="confirmPwd"
                        rules={[{ required: true, message: '请再次输入新密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                    </Form>
            </div>
        )
    }
}