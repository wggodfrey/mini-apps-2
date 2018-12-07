import React from 'react';

import Legend from './Legend';
import Chart from './Chart';

import './../styles/innerwrapper.css';

const InnerWrapper = props => (
  <div id='innerwrapper'>
    <Legend coins={props.coins} toggleCoin={props.toggleCoin}/>
    <Chart {...props}/>
    <div className='source'><i>Powered by CoinDesk</i></div>
  </div>
);

export default InnerWrapper;
