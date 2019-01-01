import React from 'react';

import { scaleTime, scaleLinear } from 'd3-scale';
import { area, curveCardinal } from 'd3-shape';
import { timeParse } from 'd3-time-format';

import ResponsiveWrapper from './ResponsiveWrapper';
import Axes from './../svg/Axes';
import Areas from './../svg/Areas';
import Brush from './../svg/Brush';

import './../../styles/wrappers.css';


class BrushWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.xScale = scaleTime();
    this.yScale = scaleLinear();
  }

  render() {
    const width   = Math.max(this.props.parentWidth, 300)
    const height  = this.props.height;
    const margins = this.props.margins;
    const coins   = this.props.coins;
    const data    = this.props.data.map((nest, i) => {
        if (coins[i].active) {
          return nest.filter(record => {
            return record.date >= this.props.chartRange[0] && 
                   record.date <= this.props.chartRange[1];
          });
        }
        return [];
      });
    const ymax = Math.max(...[].concat(...data).map(d => d.value))
    const extents = { 
      yMin: 0,
      yMax: Math.ceil((ymax * 1.1)/250)*250,
      xMin: timeParse('%Y-%m-%d')(this.props.chartRange[0]),
      xMax: timeParse('%Y-%m-%d')(this.props.chartRange[1]),
    };

    const xScale  = this.xScale
      .domain([extents.xMin, extents.xMax])
      .range([margins.left, width - margins.right]);
    const yScale  = this.yScale
      .domain([extents.yMin, extents.yMax])
      .range([height - margins.bottom, margins.top]);

    const areaFn  = area()
      .curve(curveCardinal)
      .x(d => xScale(timeParse('%Y-%m-%d')(d.date)))
      .y0(yScale(0))
      .y1(d => yScale(d.value));
  

    return (
      <div className='wrapper brush'>
        <svg 
          width={width} 
          height={height}>
          <Axes 
            scales={{xScale, yScale}}
            margins={margins}
            width={width}
            height={height}
          />
          <rect
            x={margins.left}
            y={margins.top}
            width={width - margins.right - margins.left}
            height={height - margins.top - margins.bottom}
            fill='#d2d2d2'
            opacity={0.2}
          />
          <Areas
            coins={coins}
            data={data}
            areaFn={areaFn}
          />
          <Brush
            adjustRange={this.props.adjustRange}
            brushRange={this.props.brushRange}
            xScale={xScale}
            margins={margins}
            width={width - margins.right}
            height={height - margins.bottom}
          />
        </svg>
      </div>
    );

  }
};

export default ResponsiveWrapper(BrushWrapper);