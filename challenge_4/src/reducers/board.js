const boardReducer = (state = [], action) => {
  switch (action.type) {
    
    case 'UPDATE_BOARD':
      return action.payload;

    default:
      return state;
  }
}

export default boardReducer;

