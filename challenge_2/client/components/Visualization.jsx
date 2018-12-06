import React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    console.log(this.props);
    const margins = { top: 20, right: 20, bottom: 100, left: 50 };
    const extents = { w: 800, h: 500};
    return (
      <div>VIZ</div>
    )
  }
}

export default Visualization;