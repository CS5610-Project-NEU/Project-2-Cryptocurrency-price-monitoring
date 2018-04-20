import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Nav from './nav';

import Home from './home'

import Signin from './signin'

import Signup from './signup'

import Users from './users';

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
  var token =  localStorage.getItem("token");
  var tokengoogle =  localStorage.getItem("gtoken");
    let height = $(document).height();
let valid_user = props.token || token || tokengoogle;

    return (
        <Router>
            <div style={{height:height}}>
            <Nav/>
                <Route path="/" exact={true} render={() =>
                    <div>
                        <Home/>
                    </div>
                } />

                <Route path="/signin" exact={true} render={() =>
                   valid_user? (<div><Redirect to="/" /> </div>) :
                   (  <div>
                       <Signin />
                     </div>)

                } />

                <Route path="/signup" exact={true} render={() =>
                    <div>
                        <Signup/>
                    </div>
                } />

                <Route path="/users" exact={true} render={() =>
                    <div>

                        <Users/>
                    </div>
                } />

                <Route path="/charts" exact={true} render={() =>

                    <div>
                        <Charts />
                      </div>

                } />

                <Route path="/dashboard" exact={true} render={() =>
                    valid_user?
                    (  <div>
                        <Dashboard />
                      </div>) :  (<div><Redirect to="/" /> </div>)
                } />
            </div>
        </Router>
    );
});
