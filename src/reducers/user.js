const initialState = {
    username: "",
    loggedIn: false,
    error: "",
}

export default (state=initialState, action) => {
    switch(action.type){
    case "LOGIN_SIGNUP_ERROR":
        return Object.assign({}, state, {error: action.data.error})
    case "LOGOUT":
        return initialState
    case "RESET_ERROR":
        return Object.assign({}, state, {error:""})
    case "SET_USERNAME":
        return Object.assign({}, state, {
                                        username: action.username, 
                                        loggedIn: true,
                                        error: "",
                                    })
    default:
        return state
    }

}