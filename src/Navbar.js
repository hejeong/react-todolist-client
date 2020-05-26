import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Space, Button } from 'antd';

function Navbar({loggedIn}) {
  if(!loggedIn){
    return (
      <div className="navbar">
        <Space align='center' className='login-and-signup' >
          <Button type='primary' className='login-btn'><Link to='/login'>Login</Link></Button>
          <Button type='primary'><Link to='/signup'>Signup</Link></Button>
        </Space>
      </div>
    );
  }
  return(
    <Space align='center' className='login-and-signup' >
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