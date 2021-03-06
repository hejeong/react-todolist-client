import { message } from 'antd';

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export const resetError = () =>{
    return dispatch => {
        dispatch({type: "RESET_ERROR"})
    }
}

export const login = cred => {
    return dispatch => { 
        return fetch(`http://Whattodoapp-env.eba-jpp393pq.us-east-1.elasticbeanstalk.com/api/token`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: cred.username,
                password: cred.password
        })
    })
    .then(response => response.json())
    .then(data => {
        // if login error -> data contains 'detail' message
        if(data.detail){
            message.error("Incorrect username or password. Please try again.")
            dispatch({type: "LOGIN_SIGNUP_ERROR", data: {
                                                error: "Incorrect username or password. Please try again.",
                                            }})
        }else {
            localStorage.setItem('jwt-access', data.access)
            localStorage.setItem('jwt-refresh', data.refresh)
            message.success("Logged in as " + cred.username)
            dispatch({type: "SET_USERNAME", username: cred.username})
        }
    })
    .catch(error => {
        throw(error);
    });
    }
}

export const signUp = cred => {
    return dispatch => { 
        return fetch(`http://Whattodoapp-env.eba-jpp393pq.us-east-1.elasticbeanstalk.com/api/users`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: cred.username,
                password: cred.password
        })
    })
    .then(response => response.json())
    .then(data => {
        // if login error -> data contains 'detail' message
        if(data.error){
            dispatch({type: "LOGIN_SIGNUP_ERROR", data: {
                                                error: data.error,
                                            }})
        }else {
            localStorage.setItem('jwt-access', data.access)
            dispatch({type: "SET_USERNAME", username: cred.username})
        }
    })
    .catch(error => {
        throw(error);
    });
    }
}


export const checkToken = () => {
    return dispatch => {
        return fetch('http://Whattodoapp-env.eba-jpp393pq.us-east-1.elasticbeanstalk.com/api/token/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',   
                    },
                    body: JSON.stringify({
                        "token": localStorage.getItem("jwt-access")
                    })
                })
                .then(response => {
                    if(response.status == 200){
                        return response.json()
                    }else if (response.status == 401) {
                        // remove the expired access token
                        localStorage.removeItem("jwt-access")
                    }
                })
                .then(data => {
                    dispatch({type: "SET_USERNAME", username: data.username})
                })
                .catch(error => console.log(error))
    }
}