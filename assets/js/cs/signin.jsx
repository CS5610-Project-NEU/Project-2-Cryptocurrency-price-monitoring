import React from 'react';
import { Collapse,NavItem, NavLink, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const responseGoogle = (response) => {
  console.log("Response google ID:",response.profileObj.googleId)
  console.log("Response Token:",response.tokenId)
  window.localStorage.setItem("googletoken", response.tokenId);
  window.localStorage.setItem("googleuser_id", response.profileObj.givenName);
  console.log("responseGoogle",response);
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

   function create_token(ev) {
     api.submit_signin(props.signin);
     console.log(props.signin);
   }
    return (
    <div>
    <div className="col-lg-4"/>
   <div className="col-lg-4">
   <Form>
     <FormGroup>
       <Label for="email">Email</Label>
       <Input type="email" name="email" placeholder="abc@example.com"
              value={props.signin.email} onChange={update} />
     </FormGroup>
     <FormGroup>
     <Label for="pass">Password</Label>
       <Input type="password" name="pass"
              value={props.signin.pass} onChange={update} />
     </FormGroup>
     <span className="span-padding">{props.user_errors.signin}</span><br/>
     <Button onClick={create_token} id="signin" className="btn btn-primary mb1 bg-green">Log In</Button>
     {/*<GoogleLogin*/}
         {/*className="google-signin"*/}
           {/*clientId="317561470256-ucp1c7ndasd91qvpmterg15940s9phhc.apps.googleusercontent.com"*/}
           {/*buttonText="Google Sign In"*/}
           {/*onSuccess={responseGoogle}*/}
           {/*onFailure={responseGoogle}/>*/}
   </Form>
   </div>

   {/*<div className="col-lg-4"/>*/}
      {/*<a className="btn btn-primary btn-lg" href="/auth/google">*/}
        {/*<i className="fa fa-google"></i>*/}
        {/*Sign in with Google*/}
      {/*</a>*/}

      {/*<a className="btn btn-primary btn-lg" href="/auth/github">*/}
        {/*<i className="fa fa-github"></i>*/}
        {/*Sign in with GitHub*/}
      {/*</a>*/}

    </div>

    )
}

function state2props(state) {
    return {
        token: state.token,
        signin: state.signin,
        user_errors: state.user_errors,
    };
}

export default connect(state2props)(Signin);
