import React from 'react';

import { brushX as d3BrushX } from 'd3-brush';
import { scaleTime } from 'd3-scale';
import { timeParse } from 'd3-time-format';
import { select as d3Select, event as d3Event } from 'd3-selection';

import './../../styles/brush.css';

class Brush extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.enableBrush();
  }

  enableBrush() {
    const brush = d3BrushX()
      .extent([[this.props.margins.left, this.props.margins.top],[this.props.width, this.props.height]])
      .on('start brush end', this.moveBrush.bind(this));
    this.brush = brush;
    d3Select(this.elem)
      .call(brush)
      .call(brush.move, [
        this.props.xScale(timeParse('%Y-%m-%d')(this.props.brushRange[0])), 
        this.props.xScale(timeParse('%Y-%m-%d')(this.props.brushRange[1]))
      ])
  }

  moveBrush() {
    if (d3Event.sourceEvent) {
      const selection = d3Event.selection.map(number => {
        return this.props.xScale.invert(number);
      });
      this.props.adjustRange(selection[0],selection[1]);
    }
  }

  render() {
    const { width, height, margins, xScale, brushRange } = this.props;

    return (
      <g
        id='brush'
        ref={ref => this.elem = ref}
      />
    );
  }
}

export default Brush;

// x={xScale(timeParse('%Y-%m-%d')(brushRange[0]))}
// y={margins.top}
// width={xScale(timeParse('%Y-%m-%d')(brushRange[1])) - xScale(timeParse('%Y-%m-%d')(brushRange[0]))}
// height={height - margins.top - margins.bottom}

// width={xScale(timeParse('%Y-%m-%d')(brushRange[1])) - xScale(timeParse('%Y-%m-%d')(brushRange[0]))}