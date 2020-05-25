import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { message } from 'antd';
import { logout } from './actions/user';


const Logout = ({logout}) => {
    message.info('You are now logged out');
    localStorage.removeItem('jwt-access');
    localStorage.removeItem('jwt-refresh');
    logout();
    return <Redirect to = '/' />
}


export default connect(null, {logout})(Logout);