import React from 'react';

import Search from './Search';

import './../styles/banner.css';

const Banner = props => (
  <div id='banner'>
    <div className='title'>challenge_1</div>
    <Search handleInputChange={ props.handleInputChange } />
  </div>
);

export default Banner;