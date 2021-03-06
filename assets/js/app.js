// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"


import store from './store';
import api from './api';
import socket from "./socket"

import coinprice_init from "./cs/coinprice"

function update_store(datas) {
    store.dispatch({
        type: 'UPDATE_ALL',
        datas: datas,
    });

}

$(function() {

    let default_channel = socket.channel("rooms:lobby", {});
    default_channel.join();

    default_channel.on("new_state", datas => {
      // let test = api.get_coins();

      // console.log("cicicicciciciciciiciciicicicicic",test);
        update_store(datas)
});

    coinprice_init(store);
});
