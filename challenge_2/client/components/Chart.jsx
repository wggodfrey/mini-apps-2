import React from 'react';

import Legend from './Legend';
import Visualization from './Visualization';

import './../styles/chart.css';

const Chart = ({ coins, data, range }) => (
  <div id='chart'>
    <Legend coins={coins}/>
    <Visualization 
      coins={coins} 
      data={data}
      range={range}
    />
  </div>
)

export default Chart;
