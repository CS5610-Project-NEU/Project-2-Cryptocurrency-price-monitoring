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

let default_user_form = {
    user_id: "1",
    username: "alice",
    email: "alice@a.com",
    money: "10000",
    bitcoin: "100",
    litcoin: "200",
    ethereum: "0",
    cash: "1000",
    bitcoin_alert_above : "8000",
    litcoin_alert_above : "100",
    ethereum_alert_below : "1000",
    cash_alert_below : "500",


};



function user_form(state = default_user_form, action){

    switch (action.type) {
        case '':
            return state;
        default:
            return state;
    }

}





///////////////////////  coin related states
function bitcoin_curr_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.bitcoin_curr_coinbase];
        default:
            return state;
    }
}

function bitcoin_month_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.bitcoin_month_coinbase];
        default:
            return state;
    }
}

function bitcoin_week_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.bitcoin_week_coinbase];
        default:
            return state;
    }
}

function bitcoin_day_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.bitcoin_day_coinbase];
        default:
            return state;
    }
}


function bitcoin_hour_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.bitcoin_hour_coinbase];
        default:
            return state;
    }
}

function bitcoin_year_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.bitcoin_year_coinbase];
        default:
            return state;
    }
}

///// ethereum

function ethereum_curr_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.ethereum_curr_coinbase];
        default:
            return state;
    }
}

function ethereum_month_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.ethereum_month_coinbase];
        default:
            return state;
    }
}

function ethereum_week_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.ethereum_week_coinbase];
        default:
            return state;
    }
}

function ethereum_day_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.ethereum_day_coinbase];
        default:
            return state;
    }
}


function ethereum_hour_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.ethereum_hour_coinbase];
        default:
            return state;
    }
}

function ethereum_year_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.ethereum_year_coinbase];
        default:
            return state;
    }
}


///////////// litcoin

function litcoin_curr_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.litcoin_curr_coinbase];
        default:
            return state;
    }
}

function litcoin_month_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.litcoin_month_coinbase];
        default:
            return state;
    }
}

function litcoin_week_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.litcoin_week_coinbase];
        default:
            return state;
    }
}

function litcoin_day_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.litcoin_day_coinbase];
        default:
            return state;
    }
}


function litcoin_hour_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.litcoin_hour_coinbase];
        default:
            return state;
    }
}

function litcoin_year_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.litcoin_year_coinbase];
        default:
            return state;
    }
}


//////////////// cash


function cash_curr_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.cash_curr_coinbase];
        default:
            return state;
    }
}

function cash_month_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.cash_month_coinbase];
        default:
            return state;
    }
}

function cash_week_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.cash_week_coinbase];
        default:
            return state;
    }
}

function cash_day_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.cash_day_coinbase];
        default:
            return state;
    }
}


function cash_hour_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.cash_hour_coinbase];
        default:
            return state;
    }
}

function cash_year_coinbase(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ALL':
            return [...action.datas.cash_year_coinbase];
        default:
            return state;
    }
}



function root_reducer(state0, action) {
   /// console.log("reducer", action);
    // {posts, users, form} is ES6 shorthand for
    // {posts: posts, users: users, form: form}
    let reducer = combineReducers(
        {
            user_form,
            bitcoin_curr_coinbase,bitcoin_month_coinbase,bitcoin_week_coinbase,bitcoin_day_coinbase,bitcoin_hour_coinbase,bitcoin_year_coinbase,
            ethereum_curr_coinbase,ethereum_month_coinbase,ethereum_week_coinbase,ethereum_day_coinbase,ethereum_hour_coinbase,ethereum_year_coinbase,
            litcoin_curr_coinbase,litcoin_month_coinbase,litcoin_week_coinbase,litcoin_day_coinbase,litcoin_hour_coinbase,litcoin_year_coinbase,
            cash_curr_coinbase,cash_month_coinbase,cash_week_coinbase,cash_day_coinbase,cash_hour_coinbase,cash_year_coinbase
        });
    let state1 = reducer(state0, action);
   /// console.log("state1", state1);
    return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;