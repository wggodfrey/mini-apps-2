import React from 'react';

import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';

import './../../styles/grid.css';

class Grid extends React.Component {

  componentDidMount() {
    this.renderGrid();
  }

  componentDidUpdate() {
    this.renderGrid();
  }

  renderGrid() {
    const grid = d3Axis.axisLeft()
      .scale(this.props.scale)
      .tickSize(-this.props.tickSize)
      .ticks(this.props.ticks);
    d3Select(this.elem).call(grid);
  }

  render() {
    return (
      <g 
        className={`grid`} 
        ref={ref => this.elem = ref}
        transform={this.props.translate}
      />
    )
  }
};

export default Grid;