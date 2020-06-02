import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Drawer, Form, Space, message } from 'antd';
import EditTodoForm from './EditTodoForm';
import { deleteTodo, editTodo } from '../actions/todo';



class TodoItem extends Component {
    constructor(props){
        super(props)
        var memo = "<None>"
        if(props.todo.memo){
            memo = props.todo.memo
        }
        this.state = {
            formVisible: false,
            visible: false
        }
    }

    toggleDrawer = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    toggleFormDrawer = () => {
        this.setState({
            formVisible: !this.state.formVisible
        })
    }

    handleDelete = () => {
        this.props.deleteTodo(this.props.todo.id, message)
    }

    handleOnCheck = (event) => {
        
    }
    
    render(){
        return(
            <>  
                <Checkbox onChange={this.handleOnCheck}>
                <Button type="default" onClick={this.toggleDrawer}>
                    
                        {this.props.todo.title} 
                    
                </Button>
                </Checkbox>
                <Drawer
                    title={this.props.todo.title}
                    width={400}
                    placement="right"
                    closable={false}
                    onClose={this.toggleDrawer}
                    visible={this.state.visible}
                    footer = {
                            <div>
                                <Space className="edit-delete-todo-space" size={20}>
                                    <Button type="default" onClick={this.toggleFormDrawer}>Edit</Button>
                                    <Button type="primary" className='delete-todo-btn' onClick={this.handleDelete}>Delete</Button>            
                                </Space>
                            </div>
                        }
                >
                    <p>Memo: {this.props.todo.memo}</p>
                    <p>Created on: {this.props.todo.created}</p>

                    <Drawer
                    title={"Todo Edit Form"}
                    placement="right"
                    width={400}
                    closable={false}
                    onClose={this.toggleFormDrawer}
                    visible={this.state.formVisible}
                    footer = {
                            <div>
                                <Space className="edit-delete-todo-space" size={20}>
                                    <Button type="default" onClick={this.toggleFormDrawer}>Cancel</Button>
                                    <Button type="primary" className='submit-edit-todo-btn' form="edit-todo-form" htmlType="submit">Make Changes</Button>         
                                </Space>
                            </div>
                        }
                    >
                        <EditTodoForm formName="edit-todo-form" todo={this.props.todo} toggleDrawer={this.toggleDrawer} toggleFormDrawer={this.toggleFormDrawer} />
                    </Drawer>
                </Drawer>
            </>
        )
    }
}
function mapStateToProps(state) {
    return {
        todos: state.todosReducer.todos
    };
}

export default connect(mapStateToProps, {deleteTodo, editTodo})(TodoItem);