import React from 'react';
import { Collapse,NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

import {Line} from 'react-chartjs-2';

class Charts extends React.Component{


    constructor(props) {
        super(props);

        this.state = {
            sel_coin: "bitcoin",
            sel_time: "H"
        };

        this.select_coin = this.select_coin.bind(this);
        this.select_time = this.select_time.bind(this);

    }

    select_coin(ev){
        let btn = $(ev.target);
        this.setState({
            sel_coin: btn.attr('value')
        });
    }

    select_time(ev){
        let btn = $(ev.target);
        this.setState({
            sel_time: btn.attr('value')
        });
    }


    render () {

        let sel_bitcoin = "nav-link disabled";
        let sel_ethereum =  "nav-link disabled";
        let sel_litcoin = "nav-link disabled";
        let sel_cash =  "nav-link disabled";
        let sel_H ="nav-link disabled";
        let sel_D = "nav-link disabled";
        let sel_W =  "nav-link disabled";

        let sel_M =  "nav-link disabled";
        let sel_Y =  "nav-link disabled";

        let curr_price = 0;
        let coin_name = "";
        let sel_time = "";
        let curr_day = [];
        let curr_month = [];
        let curr_hour = [];
        let curr_year = [];
        let curr_week = [];
        let color = "#f1c40f";
        let background = "#ffeaa7";


        if (this.state.sel_coin === "bitcoin"){
            sel_bitcoin = "nav-link ";
            curr_price = this.props.bitcoin_curr_coinbase;
            coin_name = "BITCOIN PRICE"
            curr_day = this.props.bitcoin_day_coinbase;
            curr_month = this.props.bitcoin_month_coinbase;
            curr_hour = this.props.bitcoin_hour_coinbase;
            curr_year = this.props.bitcoin_year_coinbase;
            curr_week = this.props.bitcoin_week_coinbase;
            color = "#FFC312";
            background = "#ffeaa7";
        }
        else if (this.state.sel_coin === "ethereum"){
            sel_ethereum = "nav-link ";
            curr_price = this.props.ethereum_curr_coinbase;
            coin_name = "ETHEREUM PRICE";
            curr_day = this.props.ethereum_day_coinbase;
            curr_month = this.props.ethereum_month_coinbase;
            curr_hour = this.props.ethereum_hour_coinbase;
            curr_year = this.props.ethereum_year_coinbase;
            curr_week = this.props.ethereum_week_coinbase;
            color = "#c23616";
            background = "#e66767";
        }
        else if (this.state.sel_coin === "litcoin"){
            sel_litcoin = "nav-link ";
            curr_price =  this.props.litcoin_curr_coinbase;
            coin_name = "LITCOIN PRICE"
            curr_day = this.props.litcoin_day_coinbase;
            curr_month = this.props.litcoin_month_coinbase;
            curr_hour = this.props.litcoin_hour_coinbase;
            curr_year = this.props.litcoin_year_coinbase;
            curr_week = this.props.litcoin_week_coinbase;
            color = "#009432";
            background = "#A3CB38"
        }
        else {
            sel_cash = "nav-link ";
            curr_price = this.props.cash_curr_coinbase;
            coin_name = "BITCOIN CASH PRICE"
            curr_day = this.props.cash_day_coinbase;
            curr_month = this.props.cash_month_coinbase;
            curr_hour = this.props.cash_hour_coinbase;
            curr_year = this.props.cash_year_coinbase;
            curr_week = this.props.cash_week_coinbase;
            color = "#192a56";
            background ="#487eb0";
        }

        function get_diff(prices) {
            if (prices.length > 0){
                let start_price = prices[prices.length - 1].y;
                let end_price = prices[0].y;
                let diff = Math.round((end_price - start_price) * 100) / 100 ;
                let res = "";
                if (diff > 0){
                    res = "+" + diff

                }else if(diff < 0){
                    res = diff
                }else{
                    res = "0"
                }
                return res

            }
            else {
                return null
            }

        }

        function get_percentage(prices) {

            if (prices.length > 0){
                let start_price = prices[prices.length - 1].y;
                let end_price = prices[0].y;
                let diff = Math.round((end_price - start_price) * 100) / 100 ;
                let res = "";
                let perc = Math.round((diff / start_price) * 10000) / 100 ;

                if (diff > 0){
                    res = "+" + perc + "%"

                }else if(diff < 0){
                    res = perc + "%"
                }else{
                    res = "0%"
                }

                return res

            }
            else {
                return null
            }

        }

        let diff = 0;
        let perc = 0;
        let dataset = [];
        let time_scale = "";

        if (this.state.sel_time === "H"){sel_time = "PAST HOUR";
            sel_H = "nav-link";
            diff = get_diff(curr_hour);
            perc = get_percentage(curr_hour);
            dataset = curr_hour;
            time_scale = "hour";

        }
        else if (this.state.sel_time === "D"){sel_time = "SINCE YESTERDAY";
            sel_D = "nav-link ";
            diff = get_diff(curr_day);
            perc = get_percentage(curr_day);
            dataset = curr_day;
            time_scale = "day";
        }
        else if (this.state.sel_time === "W"){sel_time = "SINCE LAST WEEK";
            sel_W = "nav-link ";
            diff = get_diff(curr_week);
            perc = get_percentage(curr_week);
            dataset = curr_week;
            time_scale = "week";
        }
        else if (this.state.sel_time === "M"){sel_time = "SINCE LAST MONTH";
            sel_M = "nav-link ";
            diff = get_diff(curr_month);
            perc = get_percentage(curr_month);
            dataset = curr_month;
            time_scale = "month";
        }
        else{sel_time = "SINCE LAST YEAR";
            sel_Y = "nav-link ";
            diff = get_diff(curr_year);
            perc = get_percentage(curr_year);
            dataset = curr_year;
            time_scale = "year";

        }


        function get_datasets(data,name,color,background){
            return {
                datasets: [{
                    label: name,
                    data: [...data],
                    borderColor: color,
                    fill: true,
                    backgroundColor: background,
                }]
            };
        }


        function get_option(time_scale){
            return {
                elements: { point: { radius: 0 } },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)"},
                        type: 'time',
                        distribution: 'linear',
                        time: {
                            unit: time_scale,
                        },
                        ticks: {
                            autoSkip: true,
                            source: 'data',
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }]
                },
                legend: false
            };
        }


        return <div style={{backgroundColor:"#dfe4ea", height:"800px"}}>
            <div className={"container border border-dark"} style={{position:"relative",top:"20px",backgroundColor:"#ffffff"}}>

                <div class="row justify-content-between">
                    <div class="col-8">
                <ul class="nav nav-tabs" >
                    <li class="nav-item">
                        <a className={sel_bitcoin} href="#" onClick={this.select_coin} value ="bitcoin">Bitcoin・${this.props.bitcoin_curr_coinbase}</a>
                    </li>
                    <li class="nav-item">
                        <a className={sel_ethereum}  href="#" onClick={this.select_coin} value ="ethereum">Ethereum・${this.props.ethereum_curr_coinbase}</a>
                    </li>
                    <li class="nav-item">
                        <a className={sel_litcoin}  href="#" onClick={this.select_coin} value ="litcoin">Litcoin・${this.props.litcoin_curr_coinbase}</a>
                    </li>
                    <li class="nav-item">
                        <a className={sel_cash}  href="#" onClick={this.select_coin} value ="cash">BitcoinCash・${this.props.cash_curr_coinbase}</a>
                    </li>
                </ul>
                    </div>

                    <div class="col-4">
                        <ul class="nav nav-tabs" >
                            <li class="nav-item">
                                <a className={sel_H} href="#" onClick={this.select_time} value ="H">1H</a>
                            </li>
                            <li class="nav-item">
                                <a className={sel_D}  href="#" onClick={this.select_time} value ="D">1D</a>
                            </li>
                            <li class="nav-item">
                                <a className={sel_W}  href="#" onClick={this.select_time} value ="W">1W</a>
                            </li>
                            <li class="nav-item">
                                <a className={sel_M}  href="#" onClick={this.select_time} value ="M"> 1M</a>
                            </li>
                            <li class="nav-item">
                                <a className={sel_Y}  href="#" onClick={this.select_time} value ="Y">1Y</a>
                            </li>
                        </ul>
                    </div>


                </div>


                <div class="card-body">
                    <div className={"row"}>

                        <div className={"col"} style={{borderRight:"1px solid",color:"#222f3e"}}>

                            <h1 className={"text-center"}>${curr_price}</h1>
                            <h5 className={"text-center"} style={{color:"#576574"}}>{coin_name}</h5>
                        </div>

                        <div className={"col"} style={{borderRight:"1px solid",color:"#222f3e"}}>
                            <h1 className={"text-center"}>{diff}</h1>
                            <h5 className={"text-center"} style={{color:"#576574"}}>{sel_time} (USD)</h5>
                        </div>

                        <div className={"col"} style={{color:"#222f3e"}}>
                            <h1 className={"text-center"}>{perc}</h1>
                            <h5 className={"text-center"} style={{color:"#576574"}}>{sel_time} (%)</h5>
                        </div>

                    </div>

                    <Line data={get_datasets(dataset,coin_name,color,background)}
                          options ={get_option(time_scale)}
                    />
                </div>

            </div>
        </div>



     }

}





function state2props(state) {
    return {
        // token: state.token,
        // data: [20, 10],
        bitcoin_curr_coinbase:state.bitcoin_curr_coinbase,
        bitcoin_day_coinbase:state.bitcoin_day_coinbase,
        bitcoin_month_coinbase:state.bitcoin_month_coinbase,
        bitcoin_hour_coinbase:state.bitcoin_hour_coinbase,
        bitcoin_year_coinbase:state.bitcoin_year_coinbase,
        bitcoin_week_coinbase:state.bitcoin_week_coinbase,

        ///////////////


        ethereum_curr_coinbase:state.ethereum_curr_coinbase,
        ethereum_day_coinbase:state.ethereum_day_coinbase,
        ethereum_month_coinbase:state.ethereum_month_coinbase,
        ethereum_hour_coinbase:state.ethereum_hour_coinbase,
        ethereum_year_coinbase:state.ethereum_year_coinbase,
        ethereum_week_coinbase:state.ethereum_week_coinbase,

        litcoin_curr_coinbase:state.litcoin_curr_coinbase,
        litcoin_day_coinbase:state.litcoin_day_coinbase,
        litcoin_month_coinbase:state.litcoin_month_coinbase,
        litcoin_hour_coinbase:state.litcoin_hour_coinbase,
        litcoin_year_coinbase:state.litcoin_year_coinbase,
        litcoin_week_coinbase:state.litcoin_week_coinbase,

        cash_curr_coinbase:state.cash_curr_coinbase,
        cash_day_coinbase:state.cash_day_coinbase,
        cash_month_coinbase:state.cash_month_coinbase,
        cash_hour_coinbase:state.cash_hour_coinbase,
        cash_year_coinbase:state.cash_year_coinbase,
        cash_week_coinbase:state.cash_week_coinbase,


    };
}


export default connect(state2props)(Charts);


