import React from 'react';
import { Collapse,NavItem, NavLink, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const responseGoogle = (response) => {
  console.log("Response google ID:",response.profileObj.googleId)
  console.log("Response Token:",response.tokenId)
  window.localStorage.setItem("gtoken", response.tokenId);
  window.localStorage.setItem("guser_id", response.profileObj.givenName);
  let googleuser = {email: response.profileObj.email, name: response.profileObj.givenName, password: response.profileObj.email+1234, password_confirmation: response.profileObj.email+1234, money: "50000"}
  window.localStorage.setItem("uservalues",googleuser);
  api.register_user(googleuser);
  console.log("responseGoogle",googleuser);
  window.location.reload();
}

const logout = (response) => {
 console.log(response);
 localStorage.clear();
 window.location.reload();
}

function Signin(props) {

  function update(ev) {
     let tgt = $(ev.target);
     let data = {};
     data[tgt.attr('name')] = tgt.val();
     props.dispatch({
       type: 'UPDATE_SIGNIN_FORM',
       data: data,
     });
   }

   function submit(ev) {
   console.log("ev is ")
     console.log(ev);
     api.register_user(window.localStorage.getItem("uservalues"));
   }

   function create_token(ev) {
     api.submit_signin(props.signin);
     console.log(props.signin);
   }
    return (

      <div className="container text-center">
      <div className="p-4">
   <Form className="p-4">
     <FormGroup className="row p-2">
       <Label for="email" className="col-md-2 text-right"><b>Email</b></Label>
       <Input type="email" name="email" className="form-control col-md-4 home" placeholder="alice@example.com"
              value={props.signin.email} onChange={update} />
     </FormGroup>
     <FormGroup className="row">
     <Label for="pass" className="col-md-2 text-right"><b>Password</b></Label>
       <Input type="password" name="pass" className="form-control col-md-4 home"
              value={props.signin.pass} onChange={update} />
     </FormGroup>
     <div className = "row text-center offset-md-3">
     <Button onClick={create_token} id="signin" className="btn btn-warning">Log In</Button>
     &nbsp; &nbsp;&nbsp;&nbsp;
     <GoogleLogin
         className="btn btn-danger"
        clientId="317561470256-ucp1c7ndasd91qvpmterg15940s9phhc.apps.googleusercontent.com"
        buttonText="Google Sign In"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        onClick={submit}/>
      </div>
      <br/><br/><span className="span-padding">{props.user_errors.signin}</span>
   </Form>
   </div>


    </div>

    )
}

function state2props(state) {
    return {
        token: state.token,
        signin: state.signin,
        user_errors: state.user_errors,
        uservalues: state.uservalues,
    };
}

export default connect(state2props)(Signin);
