import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, BrowserHistroy } from 'react-router';
import { Alert, Button, Form, Input, PageHeader, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../actions/user';


const FormItem = Form.Item;
const { Title } = Typography;


class LoginForm extends Component {

    componentDidUpdate(){
        this.props.history.push("/");
    }
    handleSubmit = (values) => {
        this.props.login(values)
    }
    render(){
    
        return (
            <div id="login-form-container">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="WhatTodo"
                />
                <Form id='login-form' onFinish={this.handleSubmit}>
                    <Title className='login-title' level={4}>Login</Title>
                    <FormItem 
                        name="username"
                        rules={[{ required: true, message: 'Please input your username' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='Username'/>
                    </FormItem>
                    <FormItem 
                        name="password" 
                        rules={[{ required: true, message: 'Please input your password' }]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Password'/>
                    </FormItem>
                    <Button type="primary" htmlType='submit' className='submit-btn'>Login</Button>
                    Or <a href="/signup">register now!</a>
                </Form>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        username: state.usersReducer.username,
        loggedIn: state.usersReducer.loggedIn,
        loginError: state.usersReducer.error,
    }
}

export default connect(mapStateToProps,{login})(LoginForm);