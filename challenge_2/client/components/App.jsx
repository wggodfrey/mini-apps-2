import React from 'react';

import Banner from './Banner';

import './../styles/app.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Banner />
    )
  }
}

export default App;