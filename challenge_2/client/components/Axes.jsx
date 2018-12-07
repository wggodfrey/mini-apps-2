import React from 'react';

import Axis from './Axis';

const Axes = ({scales, margins, dimensions}) => {
  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    ticks: Math.round(dimensions.width/75),
    translate: `translate(0, ${dimensions.height - margins.bottom})`,
    tickSize: dimensions.height - margins.top - margins.bottom,
  };
  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    ticks: 14,
    translate: `translate(${margins.left}, 0)`,
    tickSize: dimensions.width - margins.left - margins.right,
  };

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
};

export default Axes;
