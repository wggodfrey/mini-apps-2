import React from 'react';
import axios from 'axios';
import moment from 'moment';


import Banner from './Banner';
import Chart from './Chart';

import './../styles/app.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      range: [
        moment().subtract(31, 'days').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      coins: [
        {name: 'BitCoin', hex: '#fbb157', active: true},
      ],
      data: [],
    };
  }

  componentDidMount() {
    axios.get(`/bpi/${this.state.range[0]}/${this.state.range[1]}`)
      .then(({data}) => this.setState({data: data.bpi}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Banner />
        <Chart 
          coins={this.state.coins} 
          data={this.state.data} 
          range={this.state.range} 
        />
      </div>
    )
  }
}

export default App;