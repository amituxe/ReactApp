import Rest, { getHeaders, updateHeader } from '../API/Rest';

export const getEmployeeURL = function () {
    return Rest.get('/pml/login/authenticatewithotp', {}, { jsonResponse: false });
};

//Import any modules from libraries
import { getEmployeeURL } from '../API/Employee';
const { Provider, connect } = 'react-redux';
const { applyMiddleware, createStore, combineReducers, bindActionCreators } = 'react-redux';
const CHANGE_MESSAGE = 'change_message';

export const EMP_SUCCESS = 'EMP_SUCCESS';
export const EMP_FAILURE = 'EMP_FAILURE';

export const getEmployeeDetail = function () {
    return dispatch => {
        getEmployeeURL()
            .then(response => dispatch({ type: EMP_SUCCESS, response }))
            .catch(error => dispatch({ type: EMP_FAILURE, error }));
    };
};