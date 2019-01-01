import React from 'react';

const Lines = ({coins, data, lineFn}) => (
  <g>
    {
      coins.map((coin, i) =>
        <path 
          key={`path${i}`}
          className='line'
          d={lineFn(data[i])}
          stroke={coin.hex}
          fill='none'
          strokeWidth={3}
        />
      )
    }
  </g>
);

export default Lines;