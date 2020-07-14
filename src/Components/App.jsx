import React, { Component } from 'react'

import { connect } from 'react-redux'
import { addTodo } from '../Actions/Action'
import AddTodo from './AddTodo.js'
import TodoList from './TodoList.js'

export class ToDoApp extends Component {
    render() {
        const { dispatch, visibleTodos } = this.props

        return (
            <div>
                <AddTodo onAddClick={text => dispatch(addTodo(text))} />
                <TodoList todos={visibleTodos} />
            </div>
        )
    }
}

// specify what items from state we need, and what props they are assigned to
//const select = state => ({
//    visibleTodos: this.state.todos
//})

function select(state) {
    return {
        visibleTodos: state.todos
    }
}

// connect redux to our component
export default connect(select)(ToDoApp);