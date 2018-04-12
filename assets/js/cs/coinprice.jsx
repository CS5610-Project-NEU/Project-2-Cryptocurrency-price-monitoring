import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';

import Home from './home'

import Signin from './signin'

export default function coinprice_init(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Coinprice state={store.getState()}/>
        </Provider>,
        document.getElementById('root'),
    );
}


let Coinprice = connect((state) => state)((props) => {

    return (
        <Router>
            <div>
                <Route path="/" exact={true} render={() =>
                    <div>
                         <Nav/>
                        <Home/>
                    </div>
                } />

                <Route path="/signin" exact={true} render={() =>
                    <div>
                        <Nav/>
                        <Signin/>
                    </div>
                } />

            </div>




        </Router>
    );
});


