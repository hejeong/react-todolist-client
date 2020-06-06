import {message} from 'antd';


export const getTodos = () => {
    return dispatch => {
        return fetch('http://Whattodoapp-env.eba-jpp393pq.us-east-1.elasticbeanstalk.com/api/todos', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                            'Content-Type': 'application/json'
                        }
                    
                    }
                )
                .then(response => {
                    if(response.status === 200){
                        // on success
                        return response.json()
                    }else if(response.status === 401){
                        // access token expired, remove token
                        localStorage.removeItem("jwt-access")
                        message.info("Your session has expired. Please log in again.");
                        dispatch({type:"LOGOUT"})
                    }
                })
                .then(data => {
                    if(data){
                        dispatch({type: 'RECEIVED_TODOS', todos: data})
                    }
                })
    }
}


export const createTodo = (formData, toggleLoading, toggleModal, form, message) => {
    return dispatch => {
        return (
            fetch('http://Whattodoapp-env.eba-jpp393pq.us-east-1.elasticbeanstalk.com/api/todos/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            )
            .then(response => {
                if(response.status === 201){
                    // on success
                    return response.json()
                }else if(response.status === 401){
                    // access token expired, remove token
                    localStorage.removeItem("jwt-access")
                    message.info("Your session has expired. Please log in again.");
                    dispatch({type:"LOGOUT"})
                }
            })
            .then(data => {
                if(data){
                    setTimeout(()=>{
                        toggleLoading()
                        toggleModal()
                        form.resetFields()
                        dispatch({type:"ADD_CREATED_TODO", todo: data})
                        message.success("Task created.")
                    }, 2000);
                }
               
            })
        )
    }
}


export const editTodo = (id, formData, message, toggleDrawer, toggleFormDrawer) => {
    return dispatch => {
        return (
            fetch(`http://Whattodoapp-env.eba-jpp393pq.us-east-1.elasticbeanstalk.com/api/todos/${id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            )
            .then(response => {
                if(response.status === 200){
                    // on success
                    return response.json()
                }else if(response.status === 401){
                    // access token expired, remove token
                    localStorage.removeItem("jwt-access")
                    message.info("Your session has expired. Please log in again.");
                    dispatch({type:"LOGOUT"})
                }
            })
            .then(data => {
                if(data){
                    data['id'] = id
                    toggleDrawer()
                    toggleFormDrawer()
                    dispatch({type:"EDIT_TODO_SUCCESS", data: {todo: data, todoID: id}})
                    message.success("Task has been updated.")
                }
            })
        )
    }
}


export const deleteTodo = (id, message) => {
    return dispatch => {
        return fetch('http://Whattodoapp-env.eba-jpp393pq.us-east-1.elasticbeanstalk.com/api/todos/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    // Django Rest Framework DELETE does not return anything except response code
                    if(response.status === 204){
                        // on success
                        dispatch({type:"DELETE_TODO", todoID: id});
                        message.success("Task deleted.");
                    }else if(response.status === 401){
                        // access token expired, remove token
                        localStorage.removeItem("jwt-access")
                        message.info("Your session has expired. Please log in again.");
                        dispatch({type:"LOGOUT"})
                    }
                })
                .catch(error => {
                    alert(error)
                })
    }
}