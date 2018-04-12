
import React from 'react';
import { Collapse,NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

import Chart from 'chart.js';
import {Bar,Line} from 'react-chartjs-2';


function Home(props) {



  let data= {
    //  labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
          label: "My First dataset",
          data: [{time: '2018-4-12 18:00', y:1},{x: '2018-4-12 20:00', y:5} ,{x:  '2018-4-12 19:00', y:10}],
          fill: false
      }]
  }

  let options = {
      scales: {
          xAxes: [{
              type: 'time'
          }]
      },
      legend: false
  };







 return <div>

     <label>welcome home</label>

     <Line data={data}
     options ={options}/>

 </div>


}









function state2props(state) {
    return {
        token: state.token,
        // data: [20, 10],
    };
}

export default connect(state2props)(Home);