import React from 'react';
import axios from 'axios';
import moment from 'moment';
import promise from 'bluebird';

import Banner from './html/Banner';
import MainWrapper from './html/MainWrapper';
import BrushWrapper from './html/BrushWrapper';

import './../styles/app.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeRange: [
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
      data: [],
    };
  }

  componentDidMount() {
    let stateData = [];
    let dataGets = [];

    this.state.coins.forEach((coin, i) => {
      let index = i;
      let get = axios.get(`/${coin.id}/${this.state.fullRange[0]}/${this.state.fullRange[1]}`)
        .then(({data}) => {
          if (coin.id === 'bpi') {
            stateData[index] = Object.keys(data.bpi).map(key => ({date:key, value: data.bpi[key]}));
          } else {
            stateData[index] = data.map(d => ({date:moment.unix(d.time).format('YYYY-MM-DD'), value: d.open }));
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

  adjustRange(start, end) {
    this.setState({
      activeRange: [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
    });
  }

  render() {
    return (
      <div>
        <Banner />
        {
          this.state.data.length
          ? 
            <div id='outer-wrapper'>
              <MainWrapper 
                toggleCoin={this.toggleCoin.bind(this)}
                coins={this.state.coins} 
                data={this.state.data} 
                chartRange={this.state.activeRange}
                margins={{top:20, right: 40, bottom: 25, left: 70}}
                height={400}
              />
              <BrushWrapper 
                adjustRange={this.adjustRange.bind(this)}
                coins={this.state.coins} 
                data={this.state.data} 
                chartRange={this.state.fullRange}
                brushRange={this.state.activeRange}
                margins={{top:20, right: 40, bottom: 25, left: 70}}
                height={100}
              />
              <div className='source'><i>Powered by CoinDesk</i></div>
            </div>
          : <div />
        }
        
      </div>
    )
  }
};


export default App;