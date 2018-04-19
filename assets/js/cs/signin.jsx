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
  var googleuser = [response.profileObj.givenName,response.profileObj.email, response.profileObj.email+1234,response.profileObj.email+1234, 10000]
  window.localStorage.setItem("uservalues",googleuser);
  //api.register_user(googleuser);
  console.log("responseGoogle",googleuser);
  //window.location.reload();
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
   <Form>
     <FormGroup className="row">
       <Label for="email" className="col-md-1"><b>Email</b></Label>
       <Input type="email" name="email" className="form-control col-md-6" placeholder="abc@example.com"
              value={props.signin.email} onChange={update} />
     </FormGroup>
     <FormGroup className="row">
     <Label for="pass" className="col-md-1"><b>Password</b></Label>
       <Input type="password" name="pass" className="form-control col-md-6"
              value={props.signin.pass} onChange={update} />
     </FormGroup>
     <span className="span-padding">{props.user_errors.signin}</span><br/>
     <Button onClick={create_token} id="signin" className="btn btn-primary mb1 bg-green">Log In</Button>
     <GoogleLogin
         className="loginBtn loginBtn--google"
        clientId="317561470256-ucp1c7ndasd91qvpmterg15940s9phhc.apps.googleusercontent.com"
        buttonText="Google Sign In"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        onClick={submit}/>
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
