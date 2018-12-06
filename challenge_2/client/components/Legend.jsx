import React from 'react';

import './../styles/legend.css';

const Legend = ({ coins }) => (
  <div id='legend'>
    <div className='metric'>Unit Value ($USD)</div>
    {
      coins.map((coin, i) => 
        <div key={`item_${i}`} className={`item${coin.active? ' active': ' inactive'}`}>
          <div className='icon' style={{background:`${coin.hex}`}}></div>
          <div className='name'>{coin.name}</div>
        </div>
      )
    }
  </div>
)

export default Legend;