import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

import socket from "./socket"

/**
 *  state layout
 *  {
 *
 *   bitcoin: []
 *   bitcoinCash: []
 *   Ethereum: []
 *   Litecoin: []
 *   user_form : {
 *   user_id: null;
 *   username: "";
 *   email: "";
 *   money: 0;
 *
 *   }
 *
 *
 *
 *
 *  }
 *
*/







function root_reducer(state0, action) {
    console.log("reducer", action);
    // {posts, users, form} is ES6 shorthand for
    // {posts: posts, users: users, form: form}
    let reducer = combineReducers({});
    let state1 = reducer(state0, action);
    console.log("state1", state1);
    return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;