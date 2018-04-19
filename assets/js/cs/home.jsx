
import React from 'react';

import { connect } from 'react-redux';

import {Redirect} from 'react-router'
import {Line} from 'react-chartjs-2';


function Home(props) {


    function get_datasets(data,name,color){
        return {
            datasets: [{
                label: name,
                data: [...data],
                borderColor: color,
                fill: false
            }]
        };
    }


    function get_option(time_scale){
        return {
            elements: { point: { radius: 0 } },
            scales: {
                xAxes: [{
                    display: false,
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
                    display: false,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            legend: false
        };
    }

    function get_percent(prices){
        if (prices.length > 0){
        let start_price = prices[prices.length - 1].y;
        let end_price = prices[0].y;
        let diff = Math.round((end_price - start_price) * 100) / 100 ;
        let res = "";
        let perc = Math.round((diff / start_price) * 10000) / 100 ;

        if (diff > 0){
            res = "+" + diff + "       +" + perc + "%"

        }else if(diff < 0){
            res = diff + "       " + perc + "%"
        }else{
            res = "0       0%"
        }

            return res

        }
        else {
            return null
        }}


 function get_info(Name,curr_price,prices){

     return <div>
         <div className={"row"}>
             <div className={"col-9"}>
                 <h5 class="card-title">{Name}</h5>
             </div>

             <div className={"col-3"}>
                 <var>24h</var>
             </div>

         </div>

         <div className={"row"}>
             <div className={"col-9"}>
                 <h2>${curr_price}</h2>
             </div>

         </div>
         <var>{get_percent(prices)}</var>


     </div>
 }



 return <div>

     <div className={"container"} style={{position:"relative",top:"100px"}}>
         <div className={"row justify-content-md-center"}>
         <h1>Buy and sell digital currency</h1>
         </div>

         <div className={"row justify-content-md-center"}>
             <h3>Webcoin is the easiest and most trusted place to buy,</h3>
             <h3>sell, and manage your digital currency.</h3>
         </div>
     </div>

     <div className={"container"} style={{position:"relative",top:"160px"}}>

     <div className={"row justify-content-md-center"}>
         <div className={"col-3 "}>
             <div class="card border border-warning">
                 <div class="card-body">
                     {get_info("Bitcoin",props.bitcoin_curr_coinbase,props.bitcoin_day_coinbase)}
                     <Line data={get_datasets(props.bitcoin_day_coinbase,"bitcoin","#f1c40f")}
                           width={100}
                           height={50}
                           options ={get_option('hour')}
                     />



                 </div>
             </div>
         </div>
         <div className={"col-3 "}>

             <div class="card border border-danger">
                 <div class="card-body">
                     {get_info("Ethereum",props.ethereum_curr_coinbase,props.ethereum_day_coinbase)}
                     <Line data={get_datasets(props.ethereum_day_coinbase,"ethereum","#e74c3c")}
                           width={100}
                           height={50}
                           options ={get_option('hour')}
                     />

                 </div>
             </div>

         </div>
         <div className={"col-3"}>
             <div class="card border-success">
                 <div class="card-body">
                     {get_info("Litcoin",props.litcoin_curr_coinbase,props.litcoin_day_coinbase)}
                     <Line data={get_datasets(props.litcoin_day_coinbase,'litcoin',"#27ae60")}
                           width={100}
                           height={50}
                           options ={get_option('hour')}
                     />

                 </div>
             </div>

         </div>

         <div className={"col-3"}>
             <div class="card border-primary">
                 <div class="card-body">
                     {get_info("BitcoinCash",props.cash_curr_coinbase,props.cash_day_coinbase)}
                     <Line data={get_datasets(props.cash_day_coinbase,"bitcoinCash","#2980b9")}
                           width={100}
                           height={50}
                           options ={get_option('hour')}
                     />

                 </div>
             </div>

         </div>
     </div>
     </div>
 </div>


}




function state2props(state) {
    return {
        token: state.token,

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

export default connect(state2props)(Home);