import React from 'react';
import { Collapse,NavItem, NavLink,  Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';


import {Doughnut} from 'react-chartjs-2';




class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sel_coin: "bitcoin",
            sel_time: "H"
        };
    }



    render() {


        let bitcoin_curr_coinbase = parseFloat (this.props.bitcoin_curr_coinbase) ;
        let ethereum_curr_coinbase = parseFloat (this.props.ethereum_curr_coinbase) ;
        let litcoin_curr_coinbase = parseFloat (this.props.litcoin_curr_coinbase) ;
        let cash_curr_coinbase = parseFloat (this.props.cash_curr_coinbase);
        let bitcoin_own = parseFloat(this.props.user_form.bitcoin) ;
        let ethereum_own = parseFloat(this.props.user_form.ethereum) ;
        let litcoin_own = parseFloat(this.props.user_form.litcoin);
        let cash_own = parseFloat(this.props.user_form.cash);


        function get_money(curr,own){
            console.log(curr,own);
            return Math.round((curr * own) * 100) / 100 ;
        }

        let data = {
            labels: [
                "Bitcoin",
                "Ethereum",
                "Litcoin",
                "Bitcoin Cash",
            ],
            datasets: [
                {
                    data: [get_money(bitcoin_curr_coinbase , bitcoin_own), get_money(ethereum_curr_coinbase , ethereum_own), get_money(litcoin_curr_coinbase , litcoin_own), get_money(cash_curr_coinbase, cash_own)],
                    backgroundColor: [
                        "#f9ca24",
                        "#eb4d4b",
                        "#6ab04c",
                        "#686de0"
                    ],
                    hoverBackgroundColor: [
                        "#ffeaa7",
                        "#e66767",
                        "#A3CB38",
                        "#487eb0"
                    ]
                }]
        };


        let options = {
            animation: {
                animateScale: true
            }
        };


        return <div class="container-fluid">

            <div className={"row"}>
                <div className={"col"}>


                    <div class="card">
                        <div class="card-header">
                            COIN YOU OWN (USD)
                        </div>
                        <div class="card-body">
                            <Doughnut
                                data={data}
                                width={70}
                                height={50}
                                options={options}/>
                        </div>
                    </div>
                </div>


                <div className={"col"}>

                    <div class="card">
                        <div class="card-header">
                            Buy/Sell Your Coin (USD)
                        </div>
                        <div class="card-body">
                            <Doughnut
                                data={data}
                                width={70}
                                height={50}
                                options={options}/>
                        </div>
                    </div>

                </div>

            </div>


        </div>


    }
}




function state2props(state) {
    return {
        // token: state.token,
        // data: [20, 10],

        user_form: state.user_form,
        bitcoin_curr_coinbase:state.bitcoin_curr_coinbase,
        bitcoin_day_coinbase:state.bitcoin_day_coinbase,

        ethereum_curr_coinbase:state.ethereum_curr_coinbase,
        ethereum_day_coinbase:state.ethereum_day_coinbase,

        litcoin_curr_coinbase:state.litcoin_curr_coinbase,
        litcoin_day_coinbase:state.litcoin_day_coinbase,

        cash_curr_coinbase:state.cash_curr_coinbase,
        cash_day_coinbase:state.cash_day_coinbase,


    };
}

export default connect(state2props)(Dashboard);