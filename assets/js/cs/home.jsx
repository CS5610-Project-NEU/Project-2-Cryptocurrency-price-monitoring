
import React from 'react';
import { Collapse,NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

import {Line} from 'react-chartjs-2';


function Home(props) {



  let data_month= {

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
                  x: '2018-4-18 07:00',
                  y: Math.random() * 100
              },
              {
                  x: '2018-4-19 08:00',
                  y: Math.random() * 100
              },
              {
                  x: '2018-4-20 09:00',
                  y: Math.random() * 100
              },
              {
                  x: '2018-4-21 10:00',
                  y: Math.random() * 100
              },
              {
                  x: '2018-4-22 11:00',
                  y: Math.random() * 100
              },
              {
                  x: '2018-4-23 12:00',
                  y: Math.random() * 100
              },
          ],
          borderColor: "#3e95cd",
          fill: false
      }]
  };

  let option_month = {

      scales: {
          xAxes: [{
              gridLines: {
                  color: "rgba(0, 0, 0, 0)"},
              type: 'time',
              distribution: 'linear',
              time: {
                  unit: 'day',

              },
              ticks: {
                  autoSkip: false,
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
                    autoSkip: false,
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
                     <Line data={data_month}
                           width={100}
                           height={50}
                           options ={option_month}
                     />
                     <a href="#" class="btn btn-primary">Buy bitcoin</a>
                 </div>
             </div>

         </div>
         <div className={"col-3"}>
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">bitcoinCash</h5>
                     <Line data={data_hour}
                           width={100}
                           height={50}
                           options ={option_hour}
                     />
                     <a href="#" class="btn btn-primary">Buy bitcoinCash</a>
                 </div>
             </div>

         </div>
         <div className={"col-3"}>
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">Ethereum</h5>
                     <Line data={data_month}
                           width={100}
                           height={50}
                           options ={option_month}
                     />
                     <a href="#" class="btn btn-primary">Buy Ethereum</a>
                 </div>
             </div>

         </div>

         <div className={"col-3"}>
             <div class="card">
                 <div class="card-body">
                     <h5 class="card-title">Litecoin</h5>
                     <Line data={data_month}
                           width={100}
                           height={50}
                           options ={option_month}
                     />
                     <a href="#" class="btn btn-primary">Buy Litecoin</a>
                 </div>
             </div>

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
        token: state.token,
        // data: [20, 10],
    };
}

export default connect(state2props)(Home);