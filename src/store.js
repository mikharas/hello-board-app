import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './allReducers';

const initialState = {};

const middleware = [thunk, promise];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
