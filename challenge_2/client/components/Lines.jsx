import React from 'react';

import './../styles/line.css';

class Lines extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMouseEnter(e) {
    e.target.style.strokeWidth = 6;
  }

  handleMouseLeave(e) {
    e.target.style.strokeWidth = 4;
  }

  render() {
    return (
      <g>
        {
          this.props.coins.map((coin, i) =>
            <path 
              key={`path${i}`}
              className='line'
              d={this.props.lineFn(this.props.data[coin.id])}
              stroke={coin.hex}
              fill='none'
              strokeWidth={4}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            />
          )
        }
      </g>
    );
  }
};

export default Lines;