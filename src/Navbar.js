import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Space, Button } from 'antd';

function Navbar({loggedIn}) {
  if(!loggedIn){
    return (<Button type='link' className='home-logo'><Link to='/'>WhatTodo</Link></Button>)
  }
  return(
    <Space align='center' id='logout' >
      <Button type='primary'><Link to='/logout'>Logout</Link></Button>
    </Space>
  );
}

const mapStateToProps = (state) => {
  return {
      loggedIn: state.usersReducer.loggedIn,
  }
}
export default connect(mapStateToProps, null)(Navbar);