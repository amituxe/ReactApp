const apiMiddleware = (store) => (next) => (action) => {
    switch (action.type)
    {
        // only catch a specific action
        case 'FETCH_MOVIE_DATA':
            // continue propagating the action through redux
            // this is our only call to next in this middleware
            next(action)

            // fetch data from an API that may take a while to respond
            //MyMovieApi.get('/movies')
            //    .then(res => {
            //        // successfully received data, dispatch a new action with our data
            //        store.dispatch({
            //            type: 'SET_MOVIE_DATA',
            //            payload: { movies: res.data },
            //        })
            //    })
            //    .catch(err => {
            //        // received an error from the API, dispatch a new action with an error
            //        store.dispatch({
            //            type: 'SET_MOVIE_DATA_ERROR',
            //            payload: { error: err },
            //        })
            //    })
            break
        case 'ADD_TODO' :
            next(action)
            console.log('Middleware/ apiMiddleware - state when action is dispatched');

            break
        // if we don't need to handle this action, we still need to pass it along
        default: next(action)
    }
}

export default apiMiddleware