import React from 'react';
import { Collapse,NavItem, NavLink, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';



function Signup(props) {

    return (
    <div>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input className="form-control" name="name" value={props.form.name} onChange={update}/>
    </FormGroup>
    </div>)
}

function state2props(state) {
    return {
        token: state.token,
        form: state.form

    };
}

export default connect(state2props)(Signup);
