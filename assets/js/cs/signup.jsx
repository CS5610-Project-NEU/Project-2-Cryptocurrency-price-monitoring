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
console.log("ev is ")
    console.log(ev);
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
        <Label for="email" className="col-md-2 text-right"><b>Email</b></Label>
        <Input type="email" className="form-control col-md-6 home" name="email" placeholder="abc@example.com" value={props.form.email} onChange={update}/>
        <span>{props.errors.email[0]}</span>
      </FormGroup>
      <FormGroup className="row">
        <Label for="name" className="col-md-2 text-right"><b>Name</b></Label>
        <Input className="form-control col-md-6 home" name="name" value={props.form.name} onChange={update}/>
        <span>{props.errors.name[0]}</span>
      </FormGroup>
      <FormGroup className="row">
        <Label for="money" className="col-md-2 text-right"><b>Money</b></Label>
        <Input className="form-control col-md-6 home" name="money" value={props.form.money} placeholder="in USD $" onChange={update}/>
        <span>{props.errors.money[0]}</span>
      </FormGroup>
      <FormGroup className="row">
        <Label for="password" className="col-md-2 text-right"><b>Password</b></Label>
        <Input type="password" className="form-control col-md-6 home" name="password" value={props.form.password} onChange={update}/>
        <span>{props.errors.password[0]}</span>
      </FormGroup>
      <FormGroup className="row">
        <Label for="password_confirmation" className="col-md-2 text-right"><b>Confirm Password</b></Label>
        <Input type="password" className="form-control col-md-6 home" name="password_confirmation" value={props.form.password_confirmation} onChange={update}/>
        <span>{props.errors.password_confirmation[0]}</span>
      </FormGroup>
      </div>
      <div className="row offset-md-5">
        <div>
          <Button className="btn btn-warning" id="register" onClick={submit}>Register</Button>&nbsp;&nbsp;&nbsp;
        </div>
        <div className="offset-md-1">
          <Button className="btn btn-danger" id ="clear"onClick={clearuserdata}>Clear</Button>
        </div>
      </div>
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
