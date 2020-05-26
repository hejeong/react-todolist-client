import React from 'react';
import { Form, Input, Modal, message } from 'antd';
import {connect} from 'react-redux';
import { editTodo } from '../actions/todo';


const FormItem = Form.Item;
const { TextArea } = Input;

const EditTodoForm = ({ editTodo, formName, todo, toggleDrawer, toggleFormDrawer}) => {
    const handleOnFinish = values => {
        editTodo(todo.id, values, message, toggleDrawer, toggleFormDrawer)
    }
    return (
            <Form id={formName}
                layout="vertical" 
                onFinish={handleOnFinish}
                initialValues={{"title":todo.title, "memo":todo.memo}}
                hideRequiredMark
            >
                <FormItem 
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter a task' }]}
                >
                    <Input />
                </FormItem>
                <FormItem label="Memo" name="memo" >
                    <TextArea autoSize={{minRows:4, maxRows:8}} />
                </FormItem>
            </Form>
    )
}


export default connect(null, {editTodo})(EditTodoForm);