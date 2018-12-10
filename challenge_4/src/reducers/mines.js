const minesReducer = (state = null, action) => {
  switch (action.type) {
    
    case 'ADJUST_MINES':
      return state += action.payload;

    default:
      return state;
  }
}

export default minesReducer;
