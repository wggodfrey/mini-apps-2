import React from 'react';
import { scaleTime, scaleLinear } from 'd3-scale';
import { timeParse } from 'd3-time-format';
import { line, curveCardinal } from 'd3-shape';

import ResponsiveWrapper from './ResponsiveWrapper';
import Axes from './Axes';
import Lines from './Lines';

import './../styles/chart.css';

class Chart extends React.Component {
  
  constructor(props) {
    super(props);
    this.xScale = scaleTime();
    this.yScale = scaleLinear();
  }

  render() {
    const margins = { 
      top: 50, 
      right: 0, 
      bottom: 50, 
      left: 75, 
    };
    const dimensions = {
      width: Math.max(this.props.parentWidth - 50, 300),
      height: 500,
    }
    let yMax = 0;
    for (let key in this.props.data) {
      let ym = Math.max(...this.props.data[key].map(d => d.value));
      yMax = yMax > ym? yMax: ym; 
    }
    const extents = { 
      yMin: 0,
      yMax: yMax,
      xMin: timeParse('%Y-%m-%d')(this.props.range[0]),
      xMax: timeParse('%Y-%m-%d')(this.props.range[1]),
    };
    const xScale  = this.xScale
      .domain([extents.xMin, extents.xMax])
      .range([margins.left, dimensions.width - margins.right]);
    const yScale  = this.yScale
      .domain([extents.yMin, extents.yMax])
      .range([dimensions.height - margins.bottom, margins.top]);
    const lineFn  = line()
      .curve(curveCardinal)
      .x(d => xScale(timeParse('%Y-%m-%d')(d.date)))
      .y(d => yScale(d.value));

    console.log(this.props.data)
    return (
      <svg width={dimensions.width} height={dimensions.height}>
        <Axes 
          scales={{xScale, yScale}}
          margins={margins}
          dimensions={dimensions} 
        />
        <Lines
          func={lineFn}
          coins={this.props.coins}
          data={this.props.data}
        />
      </svg>
    )
  }
};

export default ResponsiveWrapper(Chart);