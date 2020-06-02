import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Layout} from 'antd';

import { checkToken } from './actions/user.js';
import Home from './Home.js';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import PrivateRoute from './containers/PrivateRoute';
import TodoListContainer from './containers/TodoListContainer';
import Logout from './Logout';
import Navbar from './Navbar.js';


const { Header, Content, Footer } = Layout;

class App extends Component {
  
  componentDidMount(){
    if(localStorage.getItem("jwt-access")){
      this.props.checkToken()
    }
  }

  render(){
    return (
      <div className="app">
        <Layout style={{height:"100vh"}}>
          <Header id='header'>
            <Navbar />          
          </Header>
          <Content id='content'>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/signup">
                <SignUpForm />
              </Route>
              <PrivateRoute path='/todos' component={TodoListContainer}>
              </PrivateRoute>
              <Route path="/logout">
                <Logout />
              </Route>
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>

      </div>
    )}
}

export default connect(null, {checkToken})(App);