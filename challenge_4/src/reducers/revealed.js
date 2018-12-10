const revealedReducer = (state = 0, action) => {
  switch (action.type) {
    
    case 'ADJUST_REVEALED':
      return action.payload;

    default:
      return state;
  }
}

export default revealedReducer;
