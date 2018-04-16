
import React from 'react';
import { Collapse,NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

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

            scales: {
                xAxes: [{
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
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            },
            legend: false
        };
    }



    let data_hour= {

        datasets: [{
            label: "My First dataset",
            data: [{
                x: '2018-4-12 07:00',
                y: Math.random() * 100
            },
                {
                    x: '2018-4-13 08:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-14 09:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-15 10:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-16 11:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-17 12:00',
                    y: Math.random() * 100
                },{
                    x: '2018-4-18 13:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-19 14:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-20 15:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-21 16:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-22 17:00',
                    y: Math.random() * 100
                },
                {
                    x: '2018-4-23 18:00',
                    y: Math.random() * 100
                },
            ],
            borderColor: "#c0392b",
            fill: false
        }]
    };

    let option_hour = {

        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)"},
                type: 'time',
                distribution: 'linear',
                time: {
                    unit: 'hour',

                },
                ticks: {
                    autoSkip: true,
                    source: 'data',
                }

            }],

            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }]
        },
        legend: false
    };


 return <div style={{backgroundColor:"#dfe4ea", height:"800px"}}>

     <div className={"row"}>
         <div className={"col-3"}>
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">bitcoin</h5>
                     <Line data={get_datasets([...props.bitcoin_day_coinbase],"bitcoin","#f1c40f")}
                           width={100}
                           height={50}
                           options ={get_option('hour')}
                     />
                     <a href="#" class="btn btn-primary">Buy bitcoin</a>
                 </div>
             </div>

         </div>
         <div className={"col-3"}>

             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">ethereum</h5>
                     <Line data={get_datasets([...props.ethereum_day_coinbase],"ethereum","#e74c3c")}
                           width={100}
                           height={50}
                           options ={get_option('hour')}
                     />
                     <a href="#" class="btn btn-primary">Buy bitcoin</a>
                 </div>
             </div>

         </div>
         <div className={"col-3"}>
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">litcoin</h5>
                     <Line data={get_datasets([...props.litcoin_day_coinbase],'litcoin',"#27ae60")}
                           width={100}
                           height={50}
                           options ={get_option('hour')}
                     />
                     <a href="#" class="btn btn-primary">Buy bitcoin</a>
                 </div>
             </div>

         </div>

         <div className={"col-3"}>
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">bitcoinCash</h5>
                     <Line data={get_datasets([...props.cash_day_coinbase],"bitcoinCash","#2980b9")}
                           width={100}
                           height={50}
                           options ={get_option('hour')}
                     />
                     <a href="#" class="btn btn-primary">Buy bitcoin</a>
                 </div>
             </div>

         </div>
     </div>


     <div class="card">
         <div class="card-body">
             <h5 class="card-title">bitcoinCash</h5>
             <Line data={get_datasets([...props.bitcoin_day_coinbase],"bitcoinCash","#c0392b")}
                   width={100}
                   height={50}
                   options ={option_hour}
             />
         </div>
     </div>


     <div class="card">
         <div class="card-body">
             <h5 class="card-title">bitcoinCash</h5>
             <Line data={data_hour}
                   width={100}
                   height={50}
                   options ={option_hour}
             />
         </div>
     </div>



 </div>


}









function state2props(state) {
    return {
       // token: state.token,
        // data: [20, 10],
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