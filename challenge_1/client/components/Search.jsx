import React from 'react';

import './../styles/search.css';

const Search = props => (
  <div id='search'>
    <input className='field' 
           type='text' 
           onChange={ props.handleInputChange }>
    </input>
  </div>
);

export default Search;