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
      range: [
        moment().subtract(31, 'days').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      coins: [
        {id: 'bpi', name: 'BitCoin', hex: '#fbb157', active: true},
        {id: 'eth', name: 'Ethereum', hex: '#db7093', active: true},
        {id: 'bcc', name: 'BitCoin Cash', hex: '#008080', active: true},
        {id: 'xmr', name: 'Monero', hex: '#4169e1', active: true},

      ],
      data: {
        bpi: [],
        eth: [],
        bcc: [],
        xmr: [],
      },
    };
  }

  componentDidMount() {
    let stateData = {};
    let dataGets = [];

    this.state.coins.forEach(coin => {
      let get = axios.get(`/${coin.id}/${this.state.range[0]}/${this.state.range[1]}`)
        .then(({data}) => {
          if (coin.id === 'bpi') {
            stateData['bpi'] = Object.keys(data.bpi).map(key => ({date:key, value: data.bpi[key]}));
          } else {
            console.log('hi from: ', coin.id);
            stateData[coin.id] = data.map(d => ({date:moment.unix(d.time).format('YYYY-MM-DD'), value: d.open }));
          }
        });
      dataGets.push(get)
    });

    promise.all(dataGets)
      .then(() => {
        console.log(stateData)
        this.setState({
          data: stateData,
        });
      });

  }

  render() {
    return (
      <div>
        <Banner />
        <InnerWrapper 
          coins={this.state.coins} 
          data={this.state.data} 
          range={this.state.range} 
        />
      </div>
    )
  }
};

export default App;