import React from 'react';

const Lines = ({func, coins, data}) => (
  <g>
    {
      coins.map((coin, i) =>
        <path 
          key={`path${i}`}
          d={func(data[coin.id])}
          stroke={coin.hex}
          fill='none'
          strokeWidth={2}
        />
      )
    }
  </g>
);

export default Lines;