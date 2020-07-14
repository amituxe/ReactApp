import React, { Component } from 'react';
import axios from 'axios';

//API Call
export class PersonList extends Component {
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    render() {
        return (
            <ul>
                {this.state.persons.map(person => <li>{person.name}</li>)}
            </ul>
        )
    }
}

export const ADD_TODO = 'ADD_TODO'      //defining ADD_TODO action - type attribute to indicate the type of action performed
let nextTodoId = 0;
export function addTodo(text) {         //action creator that returns our action
    return {
        type: ADD_TODO,
        id: nextTodoId++,
        text
    };
}