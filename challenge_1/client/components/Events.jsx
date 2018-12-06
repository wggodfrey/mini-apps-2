import React from 'react';

import './../styles/events.css';

const Events = props => (
  props.events.length > 0
  ? <div id='events'>
      {
        props.events.map((event, i) => {
          let sign  = event.date.charAt(0) === '-'? 'BC': 'AD';
          let year  = Math.abs(parseInt(event.date.split('/')[0]));
          let place = event.category1 === 'By place'? event.category2: '';
          return (
            <div className={ `record` }
                 key={ `event_${i}` }>
              <div className='context'>
                <div className='year'>{ [year, sign].join(' ') }</div>
                <div className='place'><i>{ place }</i></div>
              </div>
              <div className='desc'>{ event.description }</div>
            </div>
          )
        })
      }
    </div>
  : <div />
)

export default Events;