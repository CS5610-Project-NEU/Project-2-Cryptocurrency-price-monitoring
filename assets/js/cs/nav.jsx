import React from 'react';
import { NavItem, Collapse } from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import api from "../api";



class Nav extends React.Component{

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };


    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render () {


        let Session = connect(({token}) => {return {token};})((props) => {

            function remove_token(){
                let act = {
                    type: 'REMOVE_TOKEN'
                };
                props.prop.dispatch(act);
                localStorage.clear();
                window.location.reload();
            }

            return <div>
                <ul className="navbar-nav mr-auto">
                    <NavItem>
                <NavLink to="/" href="#" className="nav-link links inline1" onClick={remove_token}>Log out</NavLink>
                    </NavItem>
                </ul>
            </div>;
        });


        let session_info;

        if (this.props.token ) {
            session_info = <Session token={this.props.token} prop={this.props} />;
        }
        else {

            session_info =
                <div>
                    <ul className="navbar-nav mr-auto">
                        <div className={"row"}>
                            <div style={{width: "80px"}}>
                        <NavItem>
                            <NavLink to="/signin" href="#" className="nav-link" >Sign in</NavLink>
                        </NavItem>
                            </div>
                            <div style={{width: "80px"}} >
                        <NavItem>
                            <NavLink to="/signup" href="#" className="nav-link" >Sign up</NavLink>
                        </NavItem>
                            </div>
                        </div>
                    </ul>
                </div>;
        }

        let balance = this.props.token? Math.round((this.props.token.money) * 100) / 100 : 0;
        return(

            <div>
                {this.props.token?
                <Collapse isOpen={!this.state.collapsed}>
                    <div className="bg-dark p-4">
                    {/*Welcome { window.localStorage.getItem("user_id") ? window.localStorage.getItem("user_id") : window.localStorage.getItem("guser_id") }*/}

                        <h4 className="text-white">Welcome {this.props.token.user_name}</h4>
                        <span className="text-muted">Your balance is ${balance}</span>
                    </div>
                </Collapse>

                    : ""}
                <nav className="navbar navbar-light" style={{height: "45px"}}>
                    <div className={"row"} style={{position:"relative",top:"-10px"}}>

                    {this.props.token?
                        <div className={"col"}>
                <NavItem>

                    <div className="border border-dark" >
                        <button className="navbar-toggler" type="button" onClick={this.toggleNavbar}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                </NavItem>
                        </div>
                        : ""}
                        <div className={"col"}>
                <NavItem>

                    <NavLink to="/" href="#"  className="nav-link" >
                              <span className="navbar-brand">
                              <img src="/images/coin.svg" width="30" height="30" className="d-inline-block align-top" alt=""></img>
                            WebCoin
                                </span>
                    </NavLink>

                </NavItem>
                        </div>

                    </div>

                <ul className="navbar-nav mr-auto">

                    <div className={"row"}>
                        <div style={{width: "80px"}}>

                        <NavItem>
                             <NavLink to="/charts" href="#"  className="nav-link">Charts</NavLink>
                        </NavItem>
                    </div>
                      <div style={{width: "80px"}}>
                          <NavItem>
                          {(this.props.token )? <NavLink to="/dashboard" href="#"  className="nav-link">Dashboard</NavLink> : ""}
                          </NavItem>
                        </div>

                    </div>
                </ul>
                { session_info }
            </nav>

            </div>
        );



    }


}


function state2props(state) {
  return {
      token: state.token,
      user_form: state.user_form,
   //   coins_list : state.coins_list
  };
}

export default connect(state2props,null,null,{pure: false})(Nav);
