import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Alert, Button, Form, Input, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signUp, resetError } from '../actions/user';


const FormItem = Form.Item;
const { Title } = Typography;


const SignupForm = ({loggedIn, resetError, signUp, signUpError, username}) => {
    const handleSubmit = (values) => {
        signUp(values)
    }

    resetError()
    if(loggedIn){
        message.success("Sign up successful. Logged in as " + username)
        return <Redirect to='/' />
    }
    if(signUpError){
        message.error(signUpError)
    }
    return (
        <div id="signup-form-container">
            <div className='login-title'><Title>WhatTodo</Title></div>
            <Form id='login-form' onFinish={handleSubmit}>
                <Title className='login-title' level={4}>Create your account</Title>
                <FormItem 
                    name="username"
                    rules={[{ required: true, message: 'Please input your username' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder='Username'/>
                </FormItem>
                
                <FormItem 
                    name="password" 
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your password' }]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Password'/>
                </FormItem>
                <FormItem 
                    name="password2" 
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your password' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject('Passwords do not match');
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Confirm Password'/>
                </FormItem>
                <Button type="primary" htmlType='submit' className='submit-btn'>Create Account</Button>
            </Form>
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        username: state.usersReducer.username,
        loggedIn: state.usersReducer.loggedIn,
        signUpError: state.usersReducer.error,
    }
}

export default connect(mapStateToProps,{signUp, resetError})(SignupForm);