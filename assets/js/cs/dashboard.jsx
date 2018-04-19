import React from 'react';
import { Badge, Collapse,NavItem, NavLink,  Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';


import {Doughnut} from 'react-chartjs-2';




class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        api.get_coins();

        this.state = {
            sell_buy: "sell",
            sell_buy_coin: 1,
            sell_buy_amount: 0,
            set_alert: "above",
            set_alert_coin: 1,
            set_alert_amount: 0,
        };

        this.update = this.update.bind(this);
    }

    transaction(event){
        if(this.state.sell_buy_coin == null){
            return;
        }

        let amount = this.state.sell_buy_amount;
        if(this.state.sell_buy == "sell" ){
            amount = -amount
        }
        api.update_coins({coin_trans: {user_id: this.props.token.user_id, coin_id: parseInt(this.state.sell_buy_coin), amount: parseInt(amount)}}, this.props.token.token)

        return;
    }

    set_alert(event){
        if(this.state.set_alert_coin == null){
            return;
        }
        let above = 1
        if(this.state.set_alert == "below"){
            above = 0
        }
        else if(this.state.set_alert == "cancel"){
            above = -1
        }
        api.update_alert({coin_alert: {user_id: this.props.token.user_id, coin_id: this.state.set_alert_coin, amount: this.state.set_alert_amount, above: above}}, this.props.token.token);
    }
    update(ev) {
        let tgt = $(ev.target);


        let data = {};
        data[tgt.attr('name')] = tgt.val();

        this.setState($.extend(this.state, data));

    }



    render() {


        let bitcoin_curr_coinbase = parseFloat (this.props.bitcoin_curr_coinbase) ;
        let ethereum_curr_coinbase = parseFloat (this.props.ethereum_curr_coinbase) ;
        let litcoin_curr_coinbase = parseFloat (this.props.litcoin_curr_coinbase) ;
        let cash_curr_coinbase = parseFloat (this.props.cash_curr_coinbase);


        function get_money(curr,own){
            let price = 0
            switch (curr){
                case "bitcoin":
                    price = bitcoin_curr_coinbase;
            case "ethereum":
            price = ethereum_curr_coinbase;
            case "litcoin":
                    price = litcoin_curr_coinbase;
            case "cash":
            price = cash_curr_coinbase;
        }
        return Math.round((price * own) * 100) / 100 ;
    }

    function get_name(name){
        switch (name){
                    case "bitcoin":
        return "Bitcoin"
        case "ethereum":
        return "Ethereum"
        case "litcoin":
        return "Litcoin"
        case "cash":
        return "Bitcoin Cash"
        default:
                return "";
        }
    };
        let labels = this.props.token.coins.map(x => get_name(x.name))
        let infodata = this.props.token.coins.map(x => get_money(x.name, x.amount))
        console.log(infodata)
    let data = {
            labels: labels,
            datasets: [
                {
                    data: infodata,
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

        function get_alert(x){
            let above_name = "Above"
            if(x.above == 0){
                above_name = "Below"
            }
            let name = get_name(x.name)
            return <h6>{name + ": " + x.amount} <Badge color="secondary">{above_name}</Badge></h6>

        }


        let coins = this.props.coins_list.map(x => <option key={x.id} value={x.id}>{get_name(x.name)}</option>);

        let coins_show = this.props.token.coins.map(x => <h6>{get_name(x.name)}: {x.amount}</h6>)
        let alerts_show = this.props.token.alerts.map(x => get_alert(x))


        return <div class="container-fluid">
            <div className={"row"}>
                <div className={"col"}>
                    <div class="card border border-dark">
                        <div class="card-header">
                            COIN YOU OWN (USD)
                        </div>
                        <div class="card-body">
                            <Doughnut
                                data={data}
                                width={70}
                                height={39}
                                options={options}/>
                        </div>
                    </div>
                </div>
                <div className={"col"}>
                    <div class="card border border-dark">
                        <div class="card-header">
                            Buy/Sell Your Coin (USD)
                        </div>
        <div class="card-body">
                                <FormGroup>
                                    <Label for="sell_buy">Sell or Buy?</Label>
                                    <Input type="select" name="sell_buy"
                                           onChange={this.update} value={this.state.sell_buy}>
                                        <option key={"sell"} value="sell">Sell</option>
                                        <option key={"buy"} value="buy">Buy</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="sell_buy_coin">Choose a Coin</Label>
                                    <Input type="select" name="sell_buy_coin"
                                           onChange={this.update} value={this.state.sell_buy_coin}>
                                        { coins }
        </Input>
        </FormGroup>

        <FormGroup>
        <Label for="sell_buy_amount">Amount</Label>
        <Input type="text" pattern="[0-9]*" name="sell_buy_amount"
        onChange={this.update} value={this.state.sell_buy_amount} />

        </FormGroup>


        <Button onClick={this.transaction.bind(this)}>Submit</Button>
        </div>
        </div>

        </div>

        </div>
        <div className={"row"}>
        <div className={"col"}>
        <div class="card border border-dark">
        <div class="card-header">
        Subscribe/Cancel Notification, Above or Below Threshold
        </div>
        <div class="card-body">
        <FormGroup>
        <Label for="set_alert">Select Action</Label>
        <Input type="select" name="set_alert"
        onChange={this.update} value={this.state.set_alert}>
        <option key={"above"} value="above">Above</option>
        <option key={"below"} value="below">Below</option>
        <option key={"cancel"} value="cancel">Cancel</option>
        </Input>
        </FormGroup>
        <FormGroup>
        <Label for="set_alert_coin">Choose a Coin</Label>
        <Input type="select" name="set_alert_coin"
        onChange={this.update} value={this.state.set_alert_coin}>
        { coins }
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="set_alert_amount">Threshold</Label>
                                <Input type="text" pattern="[0-9]*" name="set_alert_amount"
                                       onChange={this.update} value={this.state.set_alert_amount} />

                            </FormGroup>


                            <Button onClick={this.set_alert.bind(this)} >Submit</Button>

                        </div>
        </div>


        </div>

        <div className={"col"}>


            <div class="card border border-dark">
                <div class="card-header">
                    General Information
                </div>
        <div class="card-body">
                    <h2>Alerts</h2>
                    {alerts_show}
                    <h2>Coins Amount</h2>
                    {coins_show}


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

        token: state.token,
        coins_list: state.coins_list,
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
