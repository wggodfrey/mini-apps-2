import React, { Component } from 'react';
import './App.css';

import Banner from './Banner.js';
import Settings from './../containers/Settings.js';
import Board from './../containers/Board.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Banner />
        <Settings />
        <Board />
      </div>
    );
  }
}

export default App;
