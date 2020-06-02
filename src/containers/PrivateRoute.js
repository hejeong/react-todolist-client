import React from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loggedIn, component: Component, path}) => (
    <Route path={path} render={props => ( !!loggedIn ? <Component {...props} /> : <Redirect to ='/login' /> )}/>
)

const mapStateToProps = (state) => {
    return {
        loggedIn: state.usersReducer.loggedIn
    }
}
export default connect(mapStateToProps, null)(PrivateRoute);