const outcomeReducer = (state = 'pending', action) => {
  switch (action.type) {
    
    case 'ADJUST_OUTCOME':
      return action.payload;

    default:
      return state;
  }
}

export default outcomeReducer;
