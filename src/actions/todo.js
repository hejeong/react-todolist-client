import { refreshToken } from './user.js';

export const getTodos = () => {
    return dispatch => {
        return fetch('http://localhost:8000/api/todos', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                            'Content-Type': 'application/json'
                        }
                    
                    }
                )
                .then(response => response.json())
                .then(data => {
                    dispatch({type: 'RECEIVED_TODOS', todos: data})
                })
    }
}


export const createTodo = (formData, toggleLoading, toggleModal, form, message) => {
    return dispatch => {
        return (
            fetch('http://localhost:8000/api/todos/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            )
            .then(response => response.json())
            .then(data => {
                setTimeout(()=>{
                    toggleLoading()
                    toggleModal()
                    form.resetFields()
                    dispatch({type:"ADD_CREATED_TODO", todo: data})
                    message.success("Task created.")
                }, 2000);
            })
        )
    }
}


export const editTodo = (id, formData, message, toggleDrawer, toggleFormDrawer) => {
    return dispatch => {
        return (
            fetch(`http://localhost:8000/api/todos/${id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            )
            .then(response => response.json())
            .then(data => {
                data['id'] = id
                dispatch({type:"EDIT_TODO_SUCCESS", data: {todo: data, todoID: id}})
                toggleDrawer()
                toggleFormDrawer()
                message.success("Task has been updated.")
            })
        )
    }
}


export const deleteTodo = (id, message) => {
    return dispatch => {
        return fetch('http://localhost:8000/api/todos/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt-access'),
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    // Django Rest Framework DELETE does not return anything except response code
                    if(response.status == 204){
                        // on success
                        dispatch({type:"DELETE_TODO", todoID: id});
                        message.success("Task deleted.");
                    }else if(response.status == 401){
                        // access token expired, try refresh token
                        refreshToken(message);
                    }
                })
                .catch(error => {
                    alert(error)
                })
    }
}