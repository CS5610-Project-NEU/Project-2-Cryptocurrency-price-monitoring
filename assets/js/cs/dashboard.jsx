import React from 'react';
import { Badge, Collapse,NavItem, NavLink,  Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';


import {Doughnut} from 'react-chartjs-2';




class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        let coins_list = api.get_coins();

        this.state = {
            sell_buy: "sell",
            sell_buy_coin: parseInt(coins_list[0].id),
            sell_buy_amount: 0,
            set_alert: "above",
            set_alert_coin: parseInt(coins_list[0].id),
            set_alert_amount: 0,
            coins_list: coins_list,

        };

        this.update = this.update.bind(this);
        this.get_user_amounts = this.get_user_amounts.bind(this);
        this.get_curr_prices = this.get_curr_prices.bind(this)
    }


    get_user_amounts(){


        console.log("coin list ",this.state.coins_list); // key -> id .... name -> coin name list
        // user has list of coin name -> coin name .... amount ->  list


        console.log(this.state.coins_list.length);



        console.log("own coin list ",this.props.coins);

        let user_amounts = {};
        for (let i = 0; i < this.state.coins_list.length; i++) {
            let data = {};
            data[this.state.coins_list[i].id] = 0;

            for (let j=0; j < this.props.coins.length; j ++ ){

                if (this.state.coins_list[i].name === this.props.coins[j].name){
                    console.log(this.props.coins[j].amount);

                    data[this.state.coins_list[i].id] = parseInt(this.props.coins[j].amount)

                }

            }
            user_amounts = Object.assign({}, user_amounts, data);
        }

        return user_amounts


    }


    get_curr_prices(){
        let curr_prices = {};
        for (let i = 0; i < this.state.coins_list.length; i++) {
            let data = {};
            if  (this.state.coins_list[i].name === "bitcoin"){

                data[this.state.coins_list[i].id] = this.props.bitcoin_curr_coinbase;
            }

            else if (this.state.coins_list[i].name === "ethereum"){
                data[this.state.coins_list[i].id] = this.props.ethereum_curr_coinbase;


            }
            else if (this.state.coins_list[i].name === "litcoin"){
                data[this.state.coins_list[i].id] = this.props.litcoin_curr_coinbase;
            }

            else {
                data[this.state.coins_list[i].id] = this.props.cash_curr_coinbase;
            }


            curr_prices = Object.assign({}, curr_prices, data);}


            return curr_prices
        }







    transaction(event){

        if (this.state.sell_buy_amount < 0){
            alert("amount cannot be negtive");
            return
        }

        if(this.state.sell_buy_coin == null){
            return;
        }

        let amount = this.state.sell_buy_amount;

        let price = parseFloat(this.get_curr_prices()[parseInt(this.state.sell_buy_coin)].join(''));
        console.log("priceceeeeeeeeeeeeepriceceeeeeeeeeeeeepriceceeeeeeeeeeeee",price);

        if(this.state.sell_buy == "sell" ){

            amount = -amount;

            let user_amount = this.get_user_amounts();

            console.log("You have this amount of money", user_amount[this.state.sell_buy_coin]);

            if (user_amount[this.state.sell_buy_coin] + amount < 0 ){

                alert("You Don't have this amount coin to sell, please buy some first!");
                return;
            }

        }

        else {

            if (this.props.token.money - amount * price < 0 ){

                alert("You Don't have enough money, please contact admin to charge!");
                return;

            }

        }


        api.update_coins({coin_trans: {user_id: this.props.token.user_id, coin_id: parseInt(this.state.sell_buy_coin),coin_price: price ,amount: parseFloat(amount)}}, this.props.token.token)

        return;
    }

    set_alert(event){

        if (this.state.set_alert_amount < 0){
            alert("amount cannot be negtive");
            return
        }
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
        api.update_alert({coin_alert: {user_id: this.props.token.user_id, coin_id: parseInt(this.state.set_alert_coin), amount: parseFloat(this.state.set_alert_amount), above: above}}, this.props.token.token);
    }

    update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();

        this.setState(data);

        console.log(this.state)

    }



    render() {


        let bitcoin_curr_coinbase = parseFloat (this.props.bitcoin_curr_coinbase.join('')) ;
        let ethereum_curr_coinbase = parseFloat (this.props.ethereum_curr_coinbase.join('')) ;
        let litcoin_curr_coinbase = parseFloat (this.props.litcoin_curr_coinbase.join('')) ;
        let cash_curr_coinbase = parseFloat (this.props.cash_curr_coinbase.join(''));


        function get_money(curr,own){
            let price = 0;
            console.log("currcurrcurrcurrcurrcurrcurrcurr",curr)
            switch (curr){
                case "bitcoin":
                    price = bitcoin_curr_coinbase;
                    return Math.round((price * own) * 100) / 100;
            case "ethereum":
            price = ethereum_curr_coinbase;
                return Math.round((price * own) * 100) / 100;
            case "litcoin":
                    price = litcoin_curr_coinbase;
                return Math.round((price * own) * 100) / 100;
            case "cash":
            price = cash_curr_coinbase;
                return Math.round((price * own) * 100) / 100;
                default:
                    return 0
        }

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
        let labels = this.props.token.coins.map(x => get_name(x.name));
        let infodata = this.props.token.coins.map(x => get_money(x.name, x.amount));
        console.log(infodata)
    let data = {
            labels: labels,
            datasets: [
                {
                    data: infodata,
                    backgroundColor: [
                        "#00FF00",
                        "#00BFFF",
                        "#FFFF00",
                        "#E50000"
                    ],
                    hoverBackgroundColor: [
                        "#008000",
                        "#1E90FF",
                        "#999900",
                        "#800000"
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
            return <h6>{name + ": " + x.amount} <Badge color="badge-danger">{above_name}</Badge></h6>

        }


        let coins = this.state.coins_list.map(x => <option key={x.id} value={x.id}>{get_name(x.name)}</option>);

        let coins_show = this.props.token.coins.map(x => <h6>{get_name(x.name)}: {x.amount}</h6>)
        let alerts_show = this.props.token.alerts.map(x => get_alert(x))


        return <div class="container-fluid p-4">
            <div className={"row"}>
                <div className={"col p-2"}>
                    <div class="chart card border border-dark">
                        <div class="card-header text-center">
                            <h2><b>Cryptocurrency you Own (USD)</b></h2>
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
                <div className={"col p-2"}>
                    <div class="chart card border border-dark">
                        <div class="card-header text-center">
                            <h2><b> Buy/Sell Your Coin (USD) </b></h2>
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


        <Button onClick={this.transaction.bind(this)} className="btn btn-warning">Submit</Button>
        </div>
        </div>

        </div>

        </div>
        <div className={"row"}>
          <div className={"col p-2"}>
            <div class="chart card border border-dark">
              <div class="card-header text-center">
                <h2><b>Subscribe/Remove Notification(s), Above or Below Threshold</b></h2>
              </div>
              <div class="card-body">
                <FormGroup>
                  <Label for="set_alert">Select Action</Label>
                  <Input type="select" name="set_alert"
                    onChange={this.update} value={this.state.set_alert}>
                    <option key={"above"} value="above">Above</option>
                    <option key={"below"} value="below">Below</option>
                    <option key={"cancel"} value="cancel">Remove</option>
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
               <Button onClick={this.set_alert.bind(this)} className="btn btn-warning" >Submit</Button>
             </div>
           </div>
          </div>
          <div className={"col p-2"}>
            <div class="chart card border border-dark">
              <div class="card-header text-center">
                <h2><b> General Information </b></h2>
              </div>
              <div class="card-body">
                <h3 className="alert">Alerts</h3>
                {alerts_show}
                <br/>
                <h3 className="amount">Cryptocurrency You Own</h3>
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

        coins : state.token.coins,
        token: state.token,
     //   coins_list: state.coins_list,
        user_form: state.user_form,
        bitcoin_curr_coinbase:state.bitcoin_curr_coinbase,

        ethereum_curr_coinbase:state.ethereum_curr_coinbase,

        litcoin_curr_coinbase:state.litcoin_curr_coinbase,


        cash_curr_coinbase:state.cash_curr_coinbase,



    };
}

export default connect(state2props)(Dashboard);
