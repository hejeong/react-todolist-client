import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, Space, Typography } from 'antd';


const { Title } = Typography;

function Home({loggedIn}) {
  return loggedIn ? <div className="home">
                      <Title>Welcome to WhatTodo</Title>
                      <Button type='primary'><Link to='/todos'>View my Todolist</Link></Button>
                    </div>
                  : <div className="home">
                      <Title>Welcome to WhatTodo</Title>
                      <Space align='center' size={30} className='login-and-signup' >
                        <Button type='primary' className='login-btn'><Link to='/login'>Login</Link></Button>
                        <Button type='primary'><Link to='/signup'>Signup</Link></Button>
                      </Space>
                    </div> 
}

const mapStateToProps = (state) => {
  return {
      loggedIn: state.usersReducer.loggedIn,
  }
}

export default connect(mapStateToProps, null)(Home);