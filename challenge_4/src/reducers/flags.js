const flagsReducer = (state = 0, action) => {
  switch (action.type) {
    
    case 'ADJUST_FLAGS':
      return state += action.payload;

    default:
      return state;
  }
}

export default flagsReducer;
