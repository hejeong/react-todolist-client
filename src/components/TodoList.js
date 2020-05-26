import React, { Component } from 'react';
import { getTodos } from '../actions/todo.js';
import { connect } from 'react-redux';
import TodoItem from './TodoItem.js';


class TodoList extends Component {

    componentDidMount(){
        this.props.getTodos()
    }

    render(){
        return(
            this.props.todos.map(todo => {
                return <li key={todo.id} className='todo-item'><TodoItem todo={todo} /></li>
            })
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todosReducer.todos
    }
}

export default connect(mapStateToProps,{getTodos})(TodoList);