
import React from 'react';
import { Collapse,NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';


function Home() {




}

















function state2props(state) {
    return {
        token: state.token,
    };
}

export default connect(state2props)(Home);