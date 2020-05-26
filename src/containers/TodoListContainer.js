import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { Button, Modal, Form, Input, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';


class TodoListContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            loading: false
        }
    }
    toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }
    toggleModal = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    
    render(){
        if(!this.props.loggedIn){
            return <Redirect to='/login' />
        }
        return(
        <div id='todo-list-container'>
            <Space size={30}>
            <h1 id="todo-list-title">Todo List</h1>
            <Button icon={<PlusCircleOutlined />} id='create-todo-btn' type='default' onClick={this.toggleModal}>Create Task</Button>
            </Space>
            
            <TodoForm loadingStatus={this.state.loading} toggleLoading={this.toggleLoading} toggleModal={this.toggleModal} visible={this.state.visible}/>
            <ul id="todo-list">
                <TodoList />
            </ul>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.usersReducer.loggedIn
    }
}

export default connect(mapStateToProps, null)(TodoListContainer);