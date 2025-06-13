import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import { getAllPizzasReducers } from './Reducers/pizzaReducers';

import { CartReducer } from './Reducers/cartReducers';

import {registerUserReducer} from './Reducers/userReducer'

import {loginUserReducer} from './Reducers/loginReducers'


import { placeOrderReducer } from './Reducers/OrderReducers';
const finalReducer = combineReducers({
    getAllPizzasReducers: getAllPizzasReducers , 
    CartReducer : CartReducer,
    registerUserReducer : registerUserReducer,
    loginUserReducer : loginUserReducer,
    placeOrderReducer:placeOrderReducer

});

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
const initialState = {
    CartReducer: { cartItems: cartItems } ,
    loginUserReducer : { user: currentUser }
};

const composeEnhancers = composeWithDevTools({});

const store = createStore(
    finalReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

// Save cartItems to localStorage on every change
store.subscribe(() => {
    localStorage.setItem('cartItems', JSON.stringify(store.getState().CartReducer.cartItems));
});

// logic for the current User in the Login 

export default store;