import React from 'react';
import { Collapse,NavItem, Button } from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../api';



let Session = connect(({token}) => {return {token};})((props) => {
  function remove_token(){
    let act = {
      type: 'REMOVE_TOKEN'
    };
    props.prop.dispatch(act);
  }

  return <div>
    <span className="links p-blue inline1" >Logged in as { props.token.user_name } | </span>
    <NavLink to="/" href="#" className="nav-link links inline1" onClick={remove_token}>Logout</NavLink> </div>;
});

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} prop={props} />;
  }
  else {

    session_info =
    <div>
    <ul className="navbar-nav mr-auto">
      <NavItem>
        <NavLink to="/signin" href="#" className="nav-link links" onClick={clearuserdata}>Sign in</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/signup" href="#" className="nav-link links" onClick={clearuserdata}>Sign Up</NavLink>
      </NavItem>
      </ul></div>;
  }
  function clearuserdata() {
    let act = {
      type: 'CLEAR_FORM',
    };
    props.dispatch(act);
    let act1 = {
      type: 'CLEAR_USER_ERROR',
    };
    props.dispatch(act1);
    let act2 = {
      type: 'CLEAR_LOGIN',
    };
    props.dispatch(act2);
  }

  function cleardata() {
    let act = {
      type: 'CLEAR_TASK_ERROR',
    };
    props.dispatch(act);
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand head1">
        CoinBase
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
           <NavLink to="/dashboard" href="#"  className="nav-link">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          {props.token? <NavLink to="/charts" href="#"  className="nav-link">Charts</NavLink> : ""}
        </NavItem>

      </ul>
      { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token
  };
}

export default connect(state2props,null,null,{pure: false})(Nav);
