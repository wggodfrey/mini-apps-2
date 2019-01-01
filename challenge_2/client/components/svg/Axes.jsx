import React from 'react';

import Axis from './Axis';

const Axes = ({scales, margins, width, height}) => {
  
  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    ticks: Math.round(width/75),
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
  };
  
  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    ticks: Math.round(height/25),
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  };

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
};

export default Axes;
