//Store
// Apply middleware here

import { createStore, applyMiddleware } from 'redux'

import reducer from '../Reducers/Reducer'
import apiMiddleware from '../Middleware/Middleware'

function logger({ getState }) {
    return next => action => {
        console.log('action', action);
        const returnVal = next(action);
        console.log('Middleware - state when action is dispatched', getState());
        return returnVal;
    }
}

export let store = createStore(reducer, applyMiddleware(apiMiddleware))