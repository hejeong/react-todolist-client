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
        return fetch(`http://localhost:8000/api/token`, {
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
            dispatch({type: "LOGIN_SIGNUP_ERROR", data: {
                                                error: "Incorrect username or password. Please try again.",
                                            }})
        }else {
            localStorage.setItem('jwt-access', data.access)
            localStorage.setItem('jwt-refresh', data.refresh)
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
        return fetch(`http://localhost:8000/api/users`, {
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
            localStorage.setItem('jwt-refresh', data.refresh)
            dispatch({type: "SET_USERNAME", username: cred.username})
        }
    })
    .catch(error => {
        throw(error);
    });
    }
}