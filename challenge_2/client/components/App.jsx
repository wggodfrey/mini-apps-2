import React from 'react';
import axios from 'axios';
import moment from 'moment';
import promise from 'bluebird';

import Banner from './Banner';
import InnerWrapper from './InnerWrapper';

import './../styles/app.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedRange: [
        moment().subtract(31, 'days').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      fullRange: [
        moment().subtract(365, 'days').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      coins: [
        {id: 'bpi', name: 'BitCoin', hex: '#fbb157', active: true},
        {id: 'eth', name: 'Ethereum', hex: '#db7093', active: true},
        {id: 'xmr', name: 'Monero', hex: '#4169e1', active: true},

      ],
      data: {
        bpi: [],
        eth: [],
        xmr: [],
      },
    };
  }

  componentDidMount() {
    let stateData = {};
    let dataGets = [];

    this.state.coins.forEach(coin => {
      let get = axios.get(`/${coin.id}/${this.state.fullRange[0]}/${this.state.fullRange[1]}`)
        .then(({data}) => {
          if (coin.id === 'bpi') {
            stateData['bpi'] = Object.keys(data.bpi).map(key => ({date:key, value: data.bpi[key]}));
          } else {
            stateData[coin.id] = data.map(d => ({date:moment.unix(d.time).format('YYYY-MM-DD'), value: d.open }));
          }
        });
      dataGets.push(get)
    });

    promise.all(dataGets)
      .then(() => {
        this.setState({
          data: stateData,
        });
      });
  }

  toggleCoin(id) {
    this.setState(previous => {
      let coin = previous.coins.filter(d => d.id === id)[0];
      coin.active = !coin.active;
      return ({
        coins: previous.coins,
      })
    });
  }

  render() {
    return (
      <div>
        <Banner />
        <InnerWrapper 
          toggleCoin={this.toggleCoin.bind(this)}
          coins={this.state.coins} 
          data={this.state.data} 
          selectedRange={this.state.selectedRange} 
          fullRange={this.state.selectedRange}
        />
      </div>
    )
  }
};

export default App;