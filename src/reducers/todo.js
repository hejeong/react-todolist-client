const initialState = {
    todos: []
}

export default (state=initialState, action) => {
    switch(action.type){
        case "ADD_CREATED_TODO":
            return Object.assign({}, state, {todos: [action.todo, ...state.todos]})
        case "RECEIVED_TODOS":
            return Object.assign({}, state, {todos: action.todos})
        case "EDIT_TODO_SUCCESS":
            const found = state.todos.findIndex((todo) => {
                return todo.id == action.data.todoID
            })
            var updated = state.todos;
            updated[found] = action.data.todo;
            return Object.assign({}, state, {todos: updated})
        case "DELETE_TODO":
            const result = state.todos.filter(todo => todo.id != action.todoID)
            return Object.assign({}, state, {todos: result})
        default:
            return state
    }
}