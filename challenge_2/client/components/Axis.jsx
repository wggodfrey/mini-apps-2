import React from 'react';
import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';

import './../styles/axis.css';

class Axis extends React.Component {

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const type = `axis${this.props.orient}`;
    const axis = d3Axis[type]()
      .scale(this.props.scale)
      .ticks(this.props.ticks);

    d3Select(this.elem).call(axis);
  }

  render() {
    return (
      <g 
        className={`axis ${this.props.orient.toLowerCase()}`} 
        ref={ref => this.elem = ref} 
        transform={this.props.translate}
      />
    )
  }
};

export default Axis;