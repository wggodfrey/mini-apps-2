import React from 'react';

import './Cell.css';

const Cell = props => {
  switch (props.status) {
    case 'mine':
      return (
        <div className='Cell mine'>
          <img src='./images/logo-24x24.png' alt="F"/>
        </div>
      )
    case 'flag':
      return (
        <button 
          className='Cell flag' 
          onClick={(e) => {
            if (e.altKey) {
              props.toggleFlag(props.rIndex, props.cIndex);
            }
          }}>
          <img src='./images/flag-24x24.png' alt="F"/>
        </button>
      )
    case 'inert':
      return (
        <div className='Cell inert' />
      )
    case 'revealed':
      return (
        <div 
          className={`Cell revealed nearby${props.nearby}`}>
          {props.nearby}
        </div>
      )
    default: 
      return (
        <button 
          className='Cell hidden' 
          onClick={(e) => {
            e.target.blur();
            if (e.altKey) {
              props.toggleFlag(props.rIndex, props.cIndex);
            } else {
              props.toggleCell(props.rIndex, props.cIndex);
            }
          }}
        />
      )
  } 

}

export default Cell;