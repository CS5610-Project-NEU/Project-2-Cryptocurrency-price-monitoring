import React from 'react';
import { Collapse,NavItem, NavLink, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';



function Signup(props) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let act = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(act);
    props.dispatch(act);
  }

  function submit(ev) {
    api.register_user(props.form);
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
  }


    return (
    <div className="col-lg-4">
    <FormGroup>
      <Label for="email">Email</Label>
      <Input type="email" className="form-control" name="email" placeholder="abc@example.com" value={props.form.email} onChange={update}/>
      <span>{props.errors.email[0]}</span>
    </FormGroup>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input className="form-control" name="name" value={props.form.name} onChange={update}/>
      <span>{props.errors.name[0]}</span>
    </FormGroup>
    <FormGroup>
      <Label for="money">Money</Label>
      <Input className="form-control" name="money" value={props.form.money} onChange={update}/>
      <span>{props.errors.money[0]}</span>
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password" className="form-control" name="password" value={props.form.password} onChange={update}/>
      <span>{props.errors.password[0]}</span>
    </FormGroup>
    <FormGroup>
      <Label for="password_confirmation">Confirm Password</Label>
      <Input type="password" className="form-control" name="password_confirmation" value={props.form.password_confirmation} onChange={update}/>
      <span>{props.errors.password_confirmation[0]}</span>
    </FormGroup>
    <Button className="btn btn-primary" id="register" onClick={submit}>Register</Button>&nbsp;&nbsp;&nbsp;
    <Button className="btn btn-primary" id ="clear"onClick={clearuserdata}>Clear</Button>
    </div>)
}

function state2props(state) {
    return {
        token: state.token,
        form: state.form,
        errors: state.user_errors,

    };
}

export default connect(state2props)(Signup);
