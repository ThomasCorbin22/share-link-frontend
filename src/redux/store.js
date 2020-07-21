import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { linkReducer } from './reducers/linkReducer'

import logger from 'redux-logger'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    linkReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = () => {
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk, logger)),
    )
}
