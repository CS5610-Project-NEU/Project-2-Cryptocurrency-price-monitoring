import React from 'react';
import { Collapse,NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';



function Signin(props) {

    return (
    <div>
      <a className="btn btn-primary btn-lg" href="/auth/google">
        <i className="fa fa-google"></i>
        Sign in with Google
      </a>

      <a className="btn btn-primary btn-lg" href="/auth/github">
        <i className="fa fa-github"></i>
        Sign in with GitHub
      </a>
    </div>)
}














function state2props(state) {
    return {
        token: state.token,
    };
}

export default connect(state2props)(Signin);
