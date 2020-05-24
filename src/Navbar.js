import React from 'react';
import { Link } from 'react-router-dom';
import { Space, Button } from 'antd';

function Navbar() {
  return (
    <div className="navbar">
      <Space align='center' className='login-and-signup' >
        <Button type='primary' className='login-btn'><Link to='/login'>Login</Link></Button>
        <Button type='primary'><Link to='/signup'>Signup</Link></Button>
      </Space>
    </div>
  );
}

export default Navbar;