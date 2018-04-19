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
      <div className="container text-center">
      <div className="p-4">
      <FormGroup className="row">
        <Label for="email" className="col-md-1"><b>Email</b></Label>
        <Input type="email" className="form-control col-md-6" name="email" placeholder="abc@example.com" value={props.form.email} onChange={update}/>
        <span>{props.errors.email[0]}</span>
      </FormGroup>
      <FormGroup className="row">
        <Label for="name" className="col-md-1"><b>Name</b></Label>
        <Input className="form-control col-md-6" name="name" value={props.form.name} onChange={update}/>
        <span>{props.errors.name[0]}</span>
      </FormGroup>
      <FormGroup className="row">
        <Label for="money" className="col-md-1"><b>Money</b></Label>
        <Input className="form-control col-md-6" name="money" value={props.form.money} onChange={update}/>
        <span>{props.errors.money[0]}</span>
      </FormGroup>
      <FormGroup className="row">
        <Label for="password" className="col-md-1"><b>Password</b></Label>
        <Input type="password" className="form-control col-md-6" name="password" value={props.form.password} onChange={update}/>
        <span>{props.errors.password[0]}</span>
      </FormGroup>
      <FormGroup className="row">
        <Label for="password_confirmation" className="col-md-1"><b>Confirm Password</b></Label>
        <Input type="password" className="form-control col-md-6" name="password_confirmation" value={props.form.password_confirmation} onChange={update}/>
        <span>{props.errors.password_confirmation[0]}</span>
      </FormGroup>
      </div>
      <Button className="btn btn-primary" id="register" onClick={submit}>Register</Button>&nbsp;&nbsp;&nbsp;
      <Button className="btn btn-primary" id ="clear"onClick={clearuserdata}>Clear</Button>
      </div>

    )
}

function state2props(state) {
    return {
        token: state.token,
        form: state.form,
        errors: state.user_errors,

    };
}

export default connect(state2props)(Signup);
