import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default function coinprice_init(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Coinprice state={store.getState()}/>
        </Provider>,
        document.getElementById('root'),
    );
}


let Coinprice = connect((state) => state)((props) => {

    props.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => {
            console.log("Unable to join", resp)
        });
    return (
        <Router>
            <div>
                {}
            </div>

        </Router>
    );
});


