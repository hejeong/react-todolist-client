import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal, message } from 'antd';
import { createTodo } from '../actions/todo';


const FormItem = Form.Item;
const { TextArea } = Input;

const TodoForm = ({createTodo, toggleLoading, loadingStatus, toggleModal, visible}) => {
    const [ form ] = Form.useForm();
    const handleOnSubmit = () => {
        form.validateFields()
        .then(values =>{
            toggleLoading()
            var formData = {}
            if(!values.memo){
                formData = { 'title': values.title}
            }else{
                formData = values
            }
            createTodo(formData, toggleLoading, toggleModal, form, message)
        })
        .catch(info=>{
            console.log('Validate Failed:', info);
        })
    }
    return (
        <Modal
            title="Create a new task"
            visible={visible}
            okText="Create"
            onOk={handleOnSubmit}
            confirmLoading={loadingStatus}
            onCancel={toggleModal}
        >
            <Form form={form} >
                <FormItem 
                    name="title"
                    rules={[{ required: true, message: 'Please enter a task' }]}
                >
                    <Input placeholder='Title'/>
                </FormItem>
                <FormItem name="memo" >
                    <TextArea autoSize={{minRows:4, maxRows:8}} placeholder='Memo'/>
                </FormItem>
            </Form>
        </Modal>
    )
}


export default connect(null, {createTodo})(TodoForm);