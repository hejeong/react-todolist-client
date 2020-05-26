import React from 'react';
import Home from './Home.js';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Logout from './Logout';
import Navbar from './Navbar.js';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
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
            <Route path="/logout">
              <Logout />
            </Route>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>

    </div>
  );
}

export default App;