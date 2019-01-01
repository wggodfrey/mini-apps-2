import React from 'react';

import Axis from './Axis';
import Grid from './Grid';

const Axes = ({scales, margins, width, height}) => {
  
  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    ticks: Math.round(width/75),
    translate: `translate(0, ${height - margins.bottom})`,
  };
  
  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    ticks: Math.round(height/25),
    translate: `translate(${margins.left}, 0)`,
  };

  const gProps = {
    scale: scales.yScale,
    ticks: Math.round(height/25),
    translate: `translate(${margins.left}, 0)`, 
    tickSize: width - margins.left - margins.right,
  }

  return (
    <g>
      <Grid {...gProps} />
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
};

export default Axes;
