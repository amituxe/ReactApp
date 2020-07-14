import { combineReducers } from 'redux'
import { ADD_TODO } from '../Actions/Action'

//create a new item, while the second one will push that item to the list
function todo(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                text: action.text,
            }
        default:
            return state
    }
}

//Push that item to the list
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(undefined, action)
            ]
        default:
            return state
    }
}

//we can combine both reducers by using Redux combineReducers utility.
const reducer = combineReducers({
    todos
})
export default reducer