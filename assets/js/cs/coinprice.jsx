import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';

import Home from './home'

import Signin from './signin'

import Signup from './signup'

import Charts from './charts'

import Dashboard from './dashboard'

export default function coinprice_init(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Coinprice state={store.getState()}/>
        </Provider>,
        document.getElementById('root'),
    );
}


let Coinprice = connect((state) => state)((props) => {

    let height = $(document).height();

    return (
        <Router>
            <div style={{backgroundColor:"#dfe4ea",height:height}}>
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

                <Route path="/signup" exact={true} render={() =>
                    <div>
                        <Nav/>
                        <Signup/>
                    </div>
                } />

                <Route path="/charts" exact={true} render={() =>
                    <div>
                        <Nav/>
                        <Charts/>
                    </div>
                } />


                <Route path="/dashboard" exact={true} render={() =>
                    <div>
                        <Nav/>
                        <Dashboard/>
                    </div>
                } />
            </div>
        </Router>
    );
});
