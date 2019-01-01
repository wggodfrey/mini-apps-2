import React from 'react';

const Areas = ({coins, data, areaFn}) => (
  <g>
    {
      coins.map((coin, i) =>
        <path 
          key={`path${i}`}
          className='area'
          d={areaFn(data[i])}
          fill={coin.hex}
          opacity={0.5}
        />
      )
    }
  </g>
);

export default Areas;