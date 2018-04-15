import React from 'react';
import { Collapse,NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';



function Signin(props) {

    return <label>You need to sign in</label>
}














function state2props(state) {
    return {
        token: state.token,
    };
}

export default connect(state2props)(Signin);
