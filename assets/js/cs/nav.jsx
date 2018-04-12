import React from 'react';
import { Collapse,NavItem, Button } from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../api';



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

        return(

            <div class="">
                <Collapse isOpen={!this.state.collapsed}>
                    <div class="bg-dark p-4">
                        <h4 class="text-white">Welcome name</h4>
                        <span class="text-muted">Your balance is 0000</span>
                    </div>
                </Collapse>

                <nav class="navbar navbar-dark bg-dark ">
                    <div className={"row"}>

                        <div className={"col-3"} style={{position:"relative",top:"20%"}}>
                        <button class="navbar-toggler" type="button" onClick={this.toggleNavbar}>
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        </div>

                    <div className={"col-5"}>



                    <NavLink to="/" href="#"  className="nav-link">

                    <a class="navbar-brand" href="#">
                        <img src="/images/coin.svg" width="30" height="30" class="d-inline-block align-top" alt=""></img>
                            WebCoin
                    </a>

                    </NavLink>


                    </div>
                    </div>


                    <ul className="navbar-nav">

                        <div className={"row"}>
                            <div className={"col"}>


                                <NavItem>
                                    <NavLink to="/signin" href="#"  className="nav-link">Sign in</NavLink>
                                </NavItem>
                            </div>
                            <div className={"col"}>
                        <NavItem>
                            <Button outline color="secondary">Sign up</Button>{' '}
                        </NavItem>
                            </div>
                        </div>
                    </ul>


                </nav>
            </div>
        )


    }


}


function state2props(state) {
    return {
        token: state.token,
    };
}

export default connect(state2props)(Nav);