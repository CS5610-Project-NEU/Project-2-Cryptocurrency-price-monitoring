import React from 'react';
import { Collapse,NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

import {Doughnut} from 'react-chartjs-2';




function Dashboard(props) {


    let data = {
        datasets: [{
            data: [10, 20, 30],
            labels: ['Red', 'Yellow', 'Blue']
        }],

    };



 return <div class="container-fluid">

     <div className={"row"}>
         <div className={"col"}>

    <Doughnut
        data={data}
        width={100}
        height={50}/>

         </div>


         <div className={"col"}>

         </div>

     </div>


 </div>


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