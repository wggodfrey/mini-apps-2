import React from 'react';
import { Dropdown } from 'semantic-ui-react'

import './Settings.css';

class Settings extends React.Component {
  
  constructor(props) {
    super(props);
    this.pendingSize = this.props.size;
    this.pendingDifficulty = this.props.difficulty;
  }

  updatePendingSize(e, data) {
    this.pendingSize = data.value;
  }

  updatePendingDifficulty(e, data) {
    this.pendingDifficulty = data.value;
  }

  render() {
    const sizeOptions = [
      {text: 'SMALL', value: 10},
      {text: 'MEDIUM', value: 15},
      {text: 'LARGE', value: 20},
    ];
    const diffOptions = [
      {text: 'EASY', value: 10},
      {text: 'MODERATE', value: 15},
      {text: 'HARD', value: 20},
    ];

    return (
      <div className='Settings'>
        <div className='setting'>
          <div className='label'>Select Board Size</div>
          <Dropdown 
            fluid selection options={sizeOptions}
            defaultValue={this.props.size} 
            onChange={this.updatePendingSize.bind(this)}/>
        </div>
        <div className='setting'>
          <div className='label'>Select Difficulty</div>
          <Dropdown 
            fluid selection options={diffOptions}
            defaultValue={this.props.difficulty} 
            onChange={this.updatePendingDifficulty.bind(this)}/>
        </div>
        <button 
          className='reset'
          onClick={(e) => {
            e.target.blur();
            this.props.handleSubmit({size:this.pendingSize, difficulty:this.pendingDifficulty});
          }}
        >RESET
        </button>
      </div>
    );
  }
};

export default Settings;